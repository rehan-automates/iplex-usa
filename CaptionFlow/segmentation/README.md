# Person-matte service (text behind person)

Renders one person matte per project for the **Text behind person** toggle on
the kinetic caption templates. Optional: the app runs without it — the toggle
answers "not enabled on this server", and an export that asked for the effect
drops it and says so rather than failing.

## Which matte engine

Two are supported; install whichever suits the machine.

| | `mediapipe` | `rvm` |
| --- | --- | --- |
| Model | Google selfie segmenter (same one the browser preview uses) | Robust Video Matting, mobilenetv3 |
| Speed | 20–40 fps on a plain CPU | 1–2 fps on CPU, real-time on a CUDA GPU |
| Edges | softer; per-frame, so it can shimmer slightly | cleaner, especially hair; recurrent state keeps it stable |
| Install | `pip install mediapipe` | `pip install torch torchvision` |

With both installed, `rvm` is chosen **only when a CUDA GPU is actually
available** — otherwise `mediapipe`, because CPU torch is slow enough that the
feature looks broken. Force one with `MATTE_BACKEND=rvm|mediapipe`.
`GET /health` reports which is live.

## Run

```bash
cd segmentation
python -m venv .venv && . .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 5001
```

Python 3.11/3.12 — neither mediapipe nor torch publishes wheels for 3.14 yet.
Needs `ffmpeg` and `ffprobe` on `PATH` (or `FFMPEG_PATH` / `FFPROBE_PATH`).
With the `rvm` backend the first request downloads weights via `torch.hub`.

Then in `server/.env`:

```
SEGMENT_SERVICE_URL=http://127.0.0.1:5001
```

Restart the API after changing that — it is read at boot.

## How it fits

- `POST /segment` starts a background job and returns 202 immediately; progress
  is written to `progress.json` next to the output and polled by
  `server/src/services/segmentation.service.ts`. That poller gives up early if
  the file stops advancing (`SEGMENT_STALL_MIN`), so a service that dies after
  accepting a job does not hold the queue for hours.
- Output is a single `mask.mp4` (luma = matte, 255 = person) at the kinetic
  overlay fps (30), long edge capped by `SEGMENT_MAX_EDGE`.
- Only frames inside `windows` run the model. Those are the stretches where a
  phrase is set behind the speaker, sent by the Node side. Every other frame
  is written as an empty matte, so the file keeps the full length. The Node
  side stores the windows a matte covers and renders again only when an export
  needs one that is missing (`ensureMatte` in segmentation.service.ts).
- The export composites it in ffmpeg (`alphamerge` + `overlay`), see
  `renderVideo` in `server/src/services/export.service.ts`. Per-phrase
  Behind/Front choices become `enable=` windows on that overlay.
- The editor preview always uses MediaPipe in the browser, regardless of the
  backend here — it is a live approximation and needs no server.
- `decode.log` / `encode.log` are written beside the output: if a job fails,
  ffmpeg's own reason is in there.
