/**
 * Start the person-matte service (segmentation/) as part of `npm run dev`.
 *
 * Text behind person is OPTIONAL, so this must never take the dev stack down
 * with it: if the Python venv has not been created, it explains how and exits
 * 0. The app runs fine without it — the toggle reports the feature is off and
 * an export that wanted it drops the effect with a note instead of failing.
 *
 * It also hands the service the SAME ffmpeg/ffprobe binaries the Node side
 * uses (@ffmpeg-installer / @ffprobe-installer). The matte has to be decoded
 * frame-for-frame identically to the export or it will not line up, and
 * relying on whatever ffmpeg happens to be on PATH is how that silently drifts.
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const segDir = path.join(root, 'segmentation');

// Windows puts venv executables in Scripts/, everything else in bin/.
const venvPython = [
  path.join(segDir, '.venv', 'Scripts', 'python.exe'),
  path.join(segDir, '.venv', 'bin', 'python'),
].find((p) => existsSync(p));

if (!venvPython) {
  console.log(
    '[matte] skipped — no Python venv in segmentation/.\n' +
      '[matte] Text behind person will be unavailable (everything else works).\n' +
      '[matte] To enable it:\n' +
      '[matte]   cd segmentation\n' +
      '[matte]   python -m venv .venv          (Python 3.11 or 3.12)\n' +
      '[matte]   .venv\\Scripts\\pip install -r requirements.txt\n' +
      '[matte] then set SEGMENT_SERVICE_URL=http://127.0.0.1:5611 in server/.env',
  );
  process.exit(0);
}

/** Resolve a bundled binary from the server's node_modules, if installed. */
function bundled(pkg) {
  try {
    const require = createRequire(path.join(root, 'server', 'package.json'));
    const p = require(pkg).path;
    return existsSync(p) ? p : null;
  } catch {
    return null;
  }
}

const env = { ...process.env };
const ffmpeg = bundled('@ffmpeg-installer/ffmpeg');
const ffprobe = bundled('@ffprobe-installer/ffprobe');
if (ffmpeg && !env.FFMPEG_PATH) env.FFMPEG_PATH = ffmpeg;
if (ffprobe && !env.FFPROBE_PATH) env.FFPROBE_PATH = ffprobe;

const port = env.MATTE_PORT || '5611';
console.log(`[matte] starting on :${port} (${path.basename(venvPython)})`);

const child = spawn(
  venvPython,
  ['-m', 'uvicorn', 'app:app', '--host', '127.0.0.1', '--port', port],
  { cwd: segDir, env, stdio: 'inherit' },
);

child.on('error', (err) => {
  console.log(`[matte] could not start: ${err.message} — continuing without it`);
  process.exit(0);
});

// Exit 0 whatever happens: concurrently is running the API and the client in
// the same group, and an optional service dying must not colour the run red.
child.on('exit', (code, signal) => {
  if (code) console.log(`[matte] exited with ${code}${signal ? ` (${signal})` : ''}`);
  process.exit(0);
});

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    child.kill();
    process.exit(0);
  });
}
