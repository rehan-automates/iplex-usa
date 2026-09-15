"""
segmentation/app.py — person-matte service for Asaan Caption's "text behind
person" (server/src/services/segmentation.service.ts is the caller).

    pip install -r requirements.txt
    uvicorn app:app --host 127.0.0.1 --port 5001

POST /segment  { "video": "<abs path>", "out": "<abs path>/mask.mp4",
                 "fps": 30, "maxEdge": 1280,
                 "windows": [[start, end], ...] }      # seconds, optional
    -> 202 { "started": true }  and the work continues in a background thread.

`windows` lists the stretches where the export will composite the cut-out:
the phrases set behind the speaker. The model runs only on frames inside
them, and only those stretches are decoded. Every other frame is written as
an empty matte, so the output keeps the
full length and frame n still means time n/fps. Omit it to matte every frame.

Progress is written to progress.json beside `out`:
    { "frames": n, "total": t, "done": false }
    { ..., "done": true, "result": { "frames", "inferred", "width", "height", "fps" } }
    { ..., "done": true, "error": "..." }
The Node side polls that file, so a long job never holds an HTTP request open.

Output: a single yuv420p H.264 video whose LUMA is the alpha matte (255 =
person, 0 = background), at `fps`, long edge capped at `maxEdge`. Node's
export scales it to the canvas, reads it with `format=gray`, and uses it as
the alpha of a cut-out layer drawn over the captions.

Two things the Node side relies on:
  - Frames are decoded WITHOUT auto-rotation (-noautorotate). The bundled
    ffmpeg on the Node side does not auto-rotate either, and applies the same
    explicit transpose to the footage and to this matte.
  - Decoding uses `fps=F` from t=0, so matte frame n corresponds to time n/F —
    exactly how the kinetic caption overlay is timed.

Two interchangeable matte engines, chosen by what is installed (see BACKEND):

  mediapipe  Google's selfie segmenter — the same model the browser preview
             uses. Per-frame, so edges are softer and can shimmer slightly,
             but 20-40 fps on a plain CPU. Install: pip install mediapipe.
  rvm        Robust Video Matting (mobilenetv3) with recurrent state carried
             across frames, which is what keeps the matte temporally stable.
             Cleaner edges, especially hair — but it wants a CUDA GPU; on a
             laptop CPU expect 1-2 fps. Install: pip install torch torchvision.

With both installed, rvm wins only when a GPU is actually available; set
MATTE_BACKEND=rvm|mediapipe to force one. /health reports which is live.
"""

from __future__ import annotations

import json
import math
import os
import subprocess
import threading
import time
import traceback
from pathlib import Path
from typing import Optional

import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Two matte engines, picked by what is installed:
#
#   rvm       Robust Video Matting (torch). Best edges — it carries recurrent
#             state between frames, so hair and motion blur stay stable. Wants
#             a CUDA GPU; on a laptop CPU it runs at 1-2 fps, which is minutes
#             per clip.
#   mediapipe Google's selfie segmenter — the SAME model the browser preview
#             uses. Per-frame only (no temporal state), so edges are softer and
#             can shimmer, but it is 20-40 fps on a plain CPU.
#
# Neither import is required: whichever is present wins, and MATTE_BACKEND
# forces one. Installing torch on a machine with no GPU would make the feature
# look broken (an export that takes 20 minutes), so the default is to prefer
# rvm ONLY when it can actually use a GPU.
try:  # pragma: no cover - import probing
    import torch
except ImportError:
    torch = None  # type: ignore[assignment]

try:  # pragma: no cover - import probing
    import mediapipe as mp
except ImportError:
    mp = None  # type: ignore[assignment]

FFMPEG = os.environ.get("FFMPEG_PATH", "ffmpeg")
FFPROBE = os.environ.get("FFPROBE_PATH", "ffprobe")
# 0.25 is RVM's recommendation for >= 720p; 0.375 for smaller sources.
DOWNSAMPLE = float(os.environ.get("RVM_DOWNSAMPLE", "0.25"))


def _pick_backend() -> str:
    forced = os.environ.get("MATTE_BACKEND", "").strip().lower()
    if forced:
        return forced
    if torch is not None and torch.cuda.is_available():
        return "rvm"
    if mp is not None:
        return "mediapipe"
    if torch is not None:
        return "rvm"  # CPU torch: slow, but better than nothing
    raise RuntimeError(
        "No matte backend installed — pip install mediapipe (fast, CPU) "
        "or torch+torchvision (best quality, wants a GPU)"
    )


BACKEND = _pick_backend()
DEVICE = "cuda" if (torch is not None and torch.cuda.is_available()) else "cpu"

app = FastAPI(title="Asaan Caption — person matte")

_model = None
_model_lock = threading.Lock()
# One job at a time: the GPU is the bottleneck and Node also queues them singly.
_job_lock = threading.Lock()


def get_model():
    """The RVM network (torch backend only)."""
    global _model
    with _model_lock:
        if _model is None:
            if torch is None:
                raise RuntimeError("torch is not installed")
            _model = torch.hub.load("PeterL1n/RobustVideoMatting", "mobilenetv3").eval().to(DEVICE)
        return _model


def new_segmenter():
    """
    A FRESH MediaPipe selfie segmenter, for one job only.

    Deliberately not cached. In VIDEO mode the segmenter enforces strictly
    increasing timestamps for the life of the instance, and every job restarts
    its clock at frame 0 — so a reused instance renders the first matte fine
    and then fails every later one with "Input timestamp must be monotonically
    increasing". The model is a 250KB tflite; rebuilding it per job costs
    milliseconds and also guarantees no state carries between videos.

    Deliberately the SAME .tflite the browser preview loads
    (client/public/mediapipe/selfie_segmenter.tflite), so the editor's
    approximation and the exported matte come from one model rather than two
    that drift. Override with SELFIE_MODEL_PATH.

    Tasks API, not the old `mp.solutions.*` helpers — those were removed in
    mediapipe 1.0.
    """
    if mp is None:
        raise RuntimeError("mediapipe is not installed")
    model_path = os.environ.get("SELFIE_MODEL_PATH") or str(
        (Path(__file__).parent / ".." / "client" / "public" / "mediapipe" /
         "selfie_segmenter.tflite").resolve()
    )
    if not Path(model_path).is_file():
        raise RuntimeError(
            f"selfie_segmenter.tflite not found at {model_path} — set SELFIE_MODEL_PATH"
        )
    from mediapipe.tasks.python import BaseOptions
    from mediapipe.tasks.python import vision

    return vision.ImageSegmenter.create_from_options(
        vision.ImageSegmenterOptions(
            base_options=BaseOptions(model_asset_path=model_path),
            # VIDEO mode lets the graph keep per-stream state between frames.
            running_mode=vision.RunningMode.VIDEO,
            output_confidence_masks=True,
            output_category_mask=False,
        )
    )


class SegmentRequest(BaseModel):
    video: str
    out: str
    fps: int = 30
    maxEdge: int = 1280
    # [start, end] seconds where the export composites the cut-out. None =
    # every frame, which is also what a caller from before windows sends.
    windows: Optional[list[tuple[float, float]]] = None


def tail(text: Optional[str], limit: int = 600) -> str:
    """Last few lines of a child's stderr — the part that names the real cause."""
    s = (text or "").strip()
    return s[-limit:] if s else "(no output)"


def probe(video: str) -> tuple[int, int, float]:
    """Coded width/height (no rotation applied) and duration in seconds."""
    res = subprocess.run(
        [FFPROBE, "-v", "error", "-print_format", "json", "-show_streams", "-show_format", video],
        capture_output=True,
        # ffprobe always emits UTF-8. Without an explicit encoding, text=True
        # decodes with the locale codepage (cp1252 on a stock Windows box) and
        # any non-Latin-1 byte in a path or a metadata tag raises here instead
        # of producing a matte.
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    if res.returncode != 0:
        raise RuntimeError(f"ffprobe failed ({res.returncode}): {tail(res.stderr)}")
    info = json.loads(res.stdout)
    stream = next((s for s in info["streams"] if s.get("codec_type") == "video"), None)
    if not stream:
        raise RuntimeError("no video stream")
    duration = float(info.get("format", {}).get("duration") or stream.get("duration") or 0)
    return int(stream["width"]), int(stream["height"]), duration


def window_spans(
    windows: list[tuple[float, float]], fps: int, total: int
) -> list[tuple[int, int]]:
    """
    Each window as a half-open frame range [start, end), with one frame of
    slack on both sides so rounding can never leave the first or last
    composited frame of a window blank. Clipped to the clip, sorted, and
    merged where ranges overlap or touch.
    """
    spans = sorted(
        (max(0, math.floor(a * fps) - 1), min(total, math.ceil(b * fps) + 2))
        for a, b in windows
        if b > a
    )
    merged: list[list[int]] = []
    for s, e in spans:
        if s >= e:
            continue
        if merged and s <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], e)
        else:
            merged.append([s, e])
    return [(s, e) for s, e in merged]


def fit(w: int, h: int, max_edge: int) -> tuple[int, int]:
    """Scale to fit the long edge, keeping aspect; even dims for yuv420p."""
    k = min(1.0, max_edge / max(w, h))
    return max(2, int(round(w * k / 2)) * 2), max(2, int(round(h * k / 2)) * 2)


# Windows refuses to replace a file that another process has open, and the
# Node side opens this exact file every 2 s to poll it. While a read is in
# flight, os.replace raises PermissionError (WinError 5, sometimes 32). Those
# windows last milliseconds, so a short retry always gets through. Without it
# a single collision killed the job mid-video: 2,529 of 3,000 back-to-back
# writes failed under a tight reader, and a real 45 s clip died at frame ~210.
REPLACE_ATTEMPTS = 50
REPLACE_BACKOFF_S = 0.02


def write_progress(path: Path, **fields) -> None:
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(fields), encoding="utf-8")
    for attempt in range(REPLACE_ATTEMPTS):
        try:
            os.replace(tmp, path)
            return
        except PermissionError:
            if attempt == REPLACE_ATTEMPTS - 1:
                raise
            time.sleep(REPLACE_BACKOFF_S)


def report_progress(path: Path, **fields) -> None:
    """
    A mid-job progress update: best effort. A missed one is invisible, because
    the next lands 15 frames later. Letting it raise would throw away a matte
    that is rendering fine. The final done/error writes use write_progress
    directly, because the caller has no other way to learn the outcome.
    """
    try:
        write_progress(path, **fields)
    except OSError:
        traceback.print_exc()


def run_job(req: SegmentRequest) -> None:
    out = Path(req.out)
    progress = out.parent / "progress.json"
    dec: Optional[subprocess.Popen] = None
    enc: Optional[subprocess.Popen] = None
    # ffmpeg's stderr goes to FILES, not pipes: nothing here reads those pipes
    # while the frame loop runs, and a child that fills its stderr pipe buffer
    # blocks forever. Files also survive the process, so the reason a run died
    # is still readable afterwards.
    dec_err = out.parent / "decode.log"
    enc_err = out.parent / "encode.log"
    # Closed in the finally below, on success and on failure alike: a leaked
    # segmenter holds its tflite interpreter for the life of the process.
    segmenters_to_close: list = []

    def err_of(path: Path) -> str:
        try:
            return tail(path.read_text(encoding="utf-8", errors="replace"))
        except OSError:
            return "(no output)"

    try:
        src_w, src_h, duration = probe(req.video)
        W, H = fit(src_w, src_h, req.maxEdge)
        total = int(round(duration * req.fps))
        report_progress(progress, frames=0, total=total, done=False)

        frame_bytes = W * H * 3
        # Truncated once here; every decoder run below appends to it.
        open(dec_err, "wb").close()
        enc_log = open(enc_err, "wb")
        enc = subprocess.Popen(
            [
                FFMPEG, "-y", "-v", "error",
                "-f", "rawvideo", "-pix_fmt", "gray", "-s", f"{W}x{H}", "-r", str(req.fps),
                "-i", "pipe:0",
                # yuv420p (luma = matte, neutral chroma) decodes everywhere, including
                # the older bundled ffmpeg on the Node side; near-lossless so edges stay.
                "-c:v", "libx264", "-preset", "veryfast", "-crf", "12", "-pix_fmt", "yuv420p",
                "-movflags", "+faststart",
                str(out),
            ],
            stdin=subprocess.PIPE,
            stderr=enc_log,
        )
        enc_log.close()
        assert enc.stdin is not None

        def decode(start: int, count: Optional[int]):
            """
            rgb24 frames from frame `start`, at most `count` of them (None = to
            the end). Input seeking (-ss before -i) starts decoding at the
            keyframe before the window, so footage outside every window is
            never decoded at all. Frame k of a run is time (start + k) / fps,
            the same grid a decode from t=0 produces.
            """
            nonlocal dec
            args = [FFMPEG, "-v", "error", "-nostdin", "-noautorotate"]
            if start > 0:
                args += ["-ss", f"{start / req.fps:.6f}"]
            args += ["-i", req.video, "-vf", f"fps={req.fps},scale={W}:{H}"]
            if count is not None:
                args += ["-frames:v", str(count)]
            args += ["-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"]
            with open(dec_err, "ab") as dec_log:
                dec = subprocess.Popen(
                    args, stdout=subprocess.PIPE, stderr=dec_log, bufsize=frame_bytes * 4
                )
            assert dec.stdout is not None
            while True:
                buf = dec.stdout.read(frame_bytes)
                if len(buf) < frame_bytes:
                    break
                yield buf
            dec.stdout.close()
            dec.wait()
            if dec.returncode not in (0, None):
                raise RuntimeError(f"ffmpeg decoder exited with {dec.returncode}: {err_of(dec_err)}")

        n = 0
        # Frames that ran the model. Everything outside the windows is written
        # blank without being decoded: the export's enable= gate never
        # composites it.
        inferred = 0
        blank = np.zeros((H, W), dtype=np.uint8)

        def emit(alpha: np.ndarray) -> None:
            nonlocal n
            enc.stdin.write(np.ascontiguousarray(alpha).tobytes())
            n += 1
            if n % 15 == 0:
                report_progress(progress, frames=n, total=max(total, n), done=False)

        # Both backends take the same rgb24 frame and return the same
        # single-channel uint8 alpha — only the inference differs. `reset`
        # runs at the start of every window.
        if BACKEND == "mediapipe":
            seg = new_segmenter()
            segmenters_to_close.append(seg)

            def infer(i: int, buf: bytes) -> np.ndarray:
                # mp.Image wraps the buffer without copying, so it must be a
                # writable contiguous array that outlives the call.
                rgb = np.frombuffer(buf, dtype=np.uint8).reshape(H, W, 3).copy()
                image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
                # Timestamps must strictly increase in VIDEO mode; the output
                # frame index against the fps is exact and never repeats.
                res = seg.segment_for_video(image, int(i * 1000 / req.fps))
                masks = getattr(res, "confidence_masks", None)
                if not masks:
                    # Nothing detected: an all-black matte cuts nothing out, so
                    # the captions simply stay on top for that frame.
                    return blank
                # Two categories: 0 background, 1 person. Use the LAST mask so
                # a single-mask build still means "the foreground one".
                conf = np.asarray(masks[-1].numpy_view()).reshape(H, W)
                return np.clip(conf * 255.0, 0, 255).astype(np.uint8)

            def reset() -> None:
                pass
        else:
            model = get_model()
            rec: list = [None] * 4

            @torch.no_grad()
            def infer(i: int, buf: bytes) -> np.ndarray:
                nonlocal rec
                src = (
                    torch.frombuffer(bytearray(buf), dtype=torch.uint8)
                    .view(H, W, 3)
                    .permute(2, 0, 1)
                    .unsqueeze(0)
                    .contiguous()
                    .to(DEVICE)
                    .float()
                    .div_(255.0)
                )
                _fgr, pha, *rec = model(src, *rec, downsample_ratio=DOWNSAMPLE)
                return pha[0, 0].clamp_(0, 1).mul_(255).to(torch.uint8).cpu().numpy()

            def reset() -> None:
                # Each window starts clean instead of carrying motion from
                # seconds earlier.
                nonlocal rec
                rec = [None] * 4

        def run_window(start: int, count: Optional[int]) -> None:
            nonlocal inferred
            reset()
            for buf in decode(start, count):
                inferred += 1
                emit(infer(n, buf))

        if req.windows is None:
            run_window(0, None)
        else:
            for start, end in window_spans(req.windows, req.fps, total):
                while n < start:
                    emit(blank)
                run_window(start, end - start)
            # The stretch after the last window (and any window the video
            # ended inside) is blank too, so the matte keeps the full length.
            while n < total:
                emit(blank)

        enc.stdin.close()
        enc.wait()
        if enc.returncode != 0:
            raise RuntimeError(f"ffmpeg encoder exited with {enc.returncode}: {err_of(enc_err)}")
        if n == 0:
            raise RuntimeError(f"no frames decoded: {err_of(dec_err)}")

        write_progress(
            progress,
            frames=n,
            total=n,
            done=True,
            result={"frames": n, "inferred": inferred, "width": W, "height": H, "fps": req.fps},
        )
    except Exception as exc:  # noqa: BLE001 — everything goes to the caller as text
        for proc in (dec, enc):
            if proc and proc.poll() is None:
                proc.kill()
        # This write is the ONLY way the caller ever learns the job failed —
        # the 202 was sent long ago and nothing else reports back. If it throws
        # too, the caller sees a file that simply stops changing, so never let
        # it escape: a logged traceback here is recoverable, a silent thread
        # death is the caller waiting out its stall timeout for nothing.
        try:
            write_progress(progress, frames=0, total=0, done=True, error=str(exc))
        except Exception:  # noqa: BLE001
            traceback.print_exc()
        traceback.print_exc()
    finally:
        for seg in segmenters_to_close:
            try:
                seg.close()
            except Exception:  # noqa: BLE001 — cleanup must never mask the real error
                pass


@app.post("/segment", status_code=202)
def segment(req: SegmentRequest):
    if not Path(req.video).is_file():
        raise HTTPException(status_code=400, detail=f"video not found: {req.video}")
    Path(req.out).parent.mkdir(parents=True, exist_ok=True)

    def worker():
        with _job_lock:
            run_job(req)

    threading.Thread(target=worker, daemon=True).start()
    return {"started": True, "backend": BACKEND, "device": DEVICE}


@app.get("/health")
def health():
    return {"ok": True, "backend": BACKEND, "device": DEVICE}
