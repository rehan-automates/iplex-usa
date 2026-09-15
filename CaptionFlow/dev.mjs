#!/usr/bin/env node
/**
 * dev.mjs — run CaptionFlow's three local services in one terminal.
 *
 *   npm run dev           (from this folder; same as `node dev.mjs`)
 *
 *   server  API            http://localhost:<PORT in server/.env, default 4100>
 *   client  editor         http://localhost:5173
 *   matte   person matte   host:port of SEGMENT_SERVICE_URL in server/.env.
 *                          Optional: skipped, never fatal, when that is empty,
 *                          segmentation/.venv is missing or its port is taken.
 *
 * Ctrl+C stops all three, together with everything they spawned (tsx's
 * worker, the venv launcher's real Python). They are started directly rather
 * than through npm, cmd.exe or concurrently: on Windows each of those layers
 * is a place a Ctrl+C gets lost ("Terminate batch job (Y/N)?") and a process
 * is left holding its port.
 *
 * Before starting, a port still held by a CaptionFlow dev process (an earlier
 * run, or one started some other way) is freed. A port held by anything else
 * stops the launch and names the owner.
 *
 * CAPTIONFLOW_DEV_STOP_AFTER_READY_MS=<ms> stops everything that long after all
 * services are up, through the same path as Ctrl+C.
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const IS_WIN = process.platform === 'win32';
const norm = (s) => String(s ?? '').replace(/\\/g, '/').toLowerCase();
const ROOT_NORM = norm(ROOT);

const useColour = Boolean(process.stdout.isTTY || process.env.FORCE_COLOR);
const colour = (code, s) => (useColour ? `\x1b[${code}m${s}\x1b[0m` : s);
const say = (msg) => process.stdout.write(`${colour(1, '[dev]')} ${msg}\n`);

/* ---------------------------------------------------------------- config */

function readEnvFile(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (m) out[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return out;
}

const serverEnv = readEnvFile(path.join(ROOT, 'server', '.env'));
const apiPort = Number(serverEnv.PORT) || 4100;

/**
 * The ffmpeg/ffprobe the server bundles. The matte must be decoded frame for
 * frame like the export, so it gets the same binaries, not whatever is on PATH.
 */
function bundled(pkg) {
  try {
    const p = createRequire(path.join(ROOT, 'server', 'package.json'))(pkg).path;
    return fs.existsSync(p) ? p : null;
  } catch {
    return null;
  }
}

function buildServices() {
  const services = [];
  const problems = [];

  const tsx = path.join(ROOT, 'server', 'node_modules', 'tsx', 'dist', 'cli.mjs');
  if (fs.existsSync(tsx)) {
    services.push({
      name: 'server',
      label: 'API',
      colour: 32,
      cwd: path.join(ROOT, 'server'),
      command: process.execPath,
      args: [tsx, 'watch', 'src/index.ts'],
      host: 'localhost',
      port: apiPort,
      url: `http://localhost:${apiPort}`,
    });
  } else problems.push('server/node_modules is missing: run `npm run install:all` in this folder.');

  const vite = path.join(ROOT, 'client', 'node_modules', 'vite', 'bin', 'vite.js');
  if (fs.existsSync(vite)) {
    services.push({
      name: 'client',
      label: 'Editor',
      colour: 36,
      cwd: path.join(ROOT, 'client'),
      command: process.execPath,
      args: [vite],
      host: 'localhost',
      port: 5173,
      url: 'http://localhost:5173',
    });
  } else problems.push('client/node_modules is missing: run `npm run install:all` in this folder.');

  const matteUrl = (serverEnv.SEGMENT_SERVICE_URL ?? '').trim();
  const python = [
    path.join(ROOT, 'segmentation', '.venv', 'Scripts', 'python.exe'),
    path.join(ROOT, 'segmentation', '.venv', 'bin', 'python'),
  ].find((p) => fs.existsSync(p));
  let target = null;
  try {
    if (matteUrl) {
      const u = new URL(matteUrl);
      target = { host: u.hostname, port: Number(u.port) || 80 };
    }
  } catch {
    say(`matte: skipped, SEGMENT_SERVICE_URL in server/.env is not a URL (${matteUrl}).`);
  }
  if (!matteUrl) {
    say('matte: skipped, SEGMENT_SERVICE_URL is empty in server/.env, so text behind person is off.');
  } else if (target && !python) {
    say('matte: skipped, no Python venv in segmentation/. Text behind person will be unavailable; everything else works.');
    say('matte: to enable it: cd segmentation, `python -m venv .venv` (Python 3.11 or 3.12),');
    say('matte:   then `.venv\\Scripts\\pip install -r requirements.txt`.');
  } else if (target) {
    const ffmpeg = process.env.FFMPEG_PATH || bundled('@ffmpeg-installer/ffmpeg');
    const ffprobe = process.env.FFPROBE_PATH || bundled('@ffprobe-installer/ffprobe');
    services.push({
      name: 'matte',
      label: 'Person matte',
      colour: 35,
      optional: true,
      cwd: path.join(ROOT, 'segmentation'),
      command: python,
      args: ['-m', 'uvicorn', 'app:app', '--host', target.host, '--port', String(target.port)],
      host: target.host,
      port: target.port,
      url: `http://${target.host}:${target.port}`,
      env: {
        PYTHONUNBUFFERED: '1',
        ...(ffmpeg ? { FFMPEG_PATH: ffmpeg } : {}),
        ...(ffprobe ? { FFPROBE_PATH: ffprobe } : {}),
      },
    });
  }
  return { services, problems };
}

/* ----------------------------------------------------------------- ports */

function isListening(host, port, timeoutMs = 800) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const done = (value) => {
      socket.destroy();
      resolve(value);
    };
    socket.setTimeout(timeoutMs, () => done(false));
    socket.once('connect', () => done(true));
    socket.once('error', () => done(false));
  });
}

async function waitUntil(check, timeoutMs, stepMs = 300) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await check()) return true;
    await new Promise((r) => setTimeout(r, stepMs));
  }
  return check();
}

/**
 * Who listens on each port, with its parent chain (Windows). One PowerShell
 * call covers every port, because starting PowerShell is the slow part.
 */
function windowsPortOwners(ports) {
  const script = `
$ErrorActionPreference = 'SilentlyContinue'
$out = @()
foreach ($port in @(${ports.join(',')})) {
  $conn = Get-NetTCPConnection -State Listen -LocalPort $port | Select-Object -First 1
  if (-not $conn) { continue }
  $chain = @()
  $procId = $conn.OwningProcess
  for ($i = 0; $i -lt 10 -and $procId; $i++) {
    $p = Get-CimInstance Win32_Process -Filter "ProcessId=$procId"
    if (-not $p) { break }
    $chain += [pscustomobject]@{ pid = [int]$p.ProcessId; name = [string]$p.Name; cmd = [string]$p.CommandLine }
    $procId = $p.ParentProcessId
  }
  $out += [pscustomobject]@{ port = $port; chain = @($chain) }
}
ConvertTo-Json -InputObject @($out) -Depth 5 -Compress`;
  const r = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script], {
    encoding: 'utf8',
    windowsHide: true,
  });
  const text = (r.stdout || '').trim();
  if (!text) return [];
  try {
    return [].concat(JSON.parse(text)).map((o) => ({ port: o.port, chain: [].concat(o.chain || []) }));
  } catch {
    return [];
  }
}

/**
 * The highest process in a listener's parent chain that still belongs to a
 * CaptionFlow dev run, so killing its tree takes the listener with it. Never
 * climbs into a terminal, an editor or an interactive shell (a cmd.exe only
 * counts when it is running a /c command for npm, vite, tsx or uvicorn).
 * null = the port belongs to something that is not ours.
 */
function windowsKillTarget(chain) {
  const refsRoot = (p) => norm(p.cmd).includes(ROOT_NORM);
  if (!chain.length || !chain.some(refsRoot)) return null;
  let target = chain[0];
  for (let i = 1; i < chain.length; i++) {
    const p = chain[i];
    const name = norm(p.name);
    const cmd = norm(p.cmd);
    const ours =
      (name === 'node.exe' && (refsRoot(p) || /npm-cli\.js|\/tsx\/|\/vite\/|dev\.mjs|start-matte/.test(cmd))) ||
      (name === 'python.exe' && (refsRoot(p) || cmd.includes('uvicorn'))) ||
      (name === 'cmd.exe' && /\s\/c\s/.test(cmd) && /vite|tsx|uvicorn|npm|concurrently/.test(cmd));
    if (!ours) break;
    target = p;
  }
  return target;
}

function posixPortOwners(ports) {
  return ports.flatMap((port) => {
    const r = spawnSync('lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'], { encoding: 'utf8' });
    return (r.stdout || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 1)
      .map((pid) => {
        const ps = spawnSync('ps', ['-o', 'command=', '-p', pid], { encoding: 'utf8' });
        return { port, chain: [{ pid: Number(pid), name: '', cmd: (ps.stdout || '').trim() }] };
      });
  });
}

/**
 * Free the services' ports of CaptionFlow dev processes. Returns the owners of
 * ports held by something that is NOT ours (left untouched).
 */
async function freePorts(services, { quiet = false } = {}) {
  const ports = services.map((s) => s.port);
  const owners = IS_WIN ? windowsPortOwners(ports) : posixPortOwners(ports);
  const foreign = [];
  for (const owner of owners) {
    const target = IS_WIN
      ? windowsKillTarget(owner.chain)
      : norm(owner.chain[0]?.cmd).includes(ROOT_NORM)
        ? owner.chain[0]
        : null;
    if (!target) {
      foreign.push(owner);
      continue;
    }
    if (!quiet) {
      say(`port ${owner.port} is held by an earlier CaptionFlow dev process (${owner.chain[0].name || 'pid'} ${owner.chain[0].pid}); stopping it.`);
    }
    killTree(target.pid);
  }
  const foreignPorts = new Set(foreign.map((o) => o.port));
  await Promise.all(
    services
      .filter((s) => !foreignPorts.has(s.port))
      .map((s) => waitUntil(async () => !(await isListening(s.host, s.port)), 10_000)),
  );
  return foreign;
}

/* ------------------------------------------------------------- processes */

function killTree(pid) {
  if (!pid) return;
  if (IS_WIN) {
    spawnSync('taskkill', ['/T', '/F', '/PID', String(pid)], { stdio: 'ignore', windowsHide: true });
    return;
  }
  try {
    process.kill(-pid, 'SIGTERM');
  } catch {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      /* already gone */
    }
  }
}

function pipeLines(stream, svc) {
  let buffer = '';
  stream.setEncoding('utf8');
  const tag = colour(svc.colour, `[${svc.name}]`);
  const emit = (line) => process.stdout.write(`${tag} ${line}\n`);
  stream.on('data', (chunk) => {
    buffer += chunk;
    let i;
    while ((i = buffer.indexOf('\n')) >= 0) {
      emit(buffer.slice(0, i).replace(/\r$/, ''));
      buffer = buffer.slice(i + 1);
    }
  });
  stream.on('end', () => {
    if (buffer) emit(buffer.replace(/\r$/, ''));
  });
}

/* ------------------------------------------------------------------ main */

const { services, problems } = buildServices();
if (problems.length) {
  for (const p of problems) say(p);
  process.exit(1);
}

const running = [];
let stopping = false;

async function stopAll(code) {
  if (stopping) return;
  stopping = true;
  process.stdout.write('\n');
  say(`stopping ${services.map((s) => s.name).join(', ')}…`);
  for (const svc of running) killTree(svc.child.pid);
  // A service that already died on its own can leave a grandchild (tsx's
  // worker, the venv launcher's real Python) still holding its port.
  await freePorts(services, { quiet: true });
  const still = [];
  for (const s of services) if (await isListening(s.host, s.port)) still.push(`${s.name} on ${s.port}`);
  say(still.length ? `could not stop: ${still.join(', ')}` : 'all stopped.');
  process.exit(code);
}

for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK']) {
  process.on(signal, () => void stopAll(0));
}
process.on('exit', () => {
  // Last resort if the launcher itself dies: never leave services behind.
  if (!stopping) for (const svc of running) killTree(svc.child.pid);
});
process.on('uncaughtException', (err) => {
  say(`launcher error: ${err?.stack || err}`);
  void stopAll(1);
});

const foreign = await freePorts(services);
for (const owner of foreign) {
  const svc = services.find((s) => s.port === owner.port);
  const who = owner.chain[0] || {};
  const desc = `${who.name || 'another program'} (pid ${who.pid})`;
  if (svc?.optional) {
    say(`${svc.name}: skipped, port ${owner.port} is in use by ${desc}, which is not a CaptionFlow dev process.`);
    services.splice(services.indexOf(svc), 1);
    continue;
  }
  say(`port ${owner.port} is in use by ${desc}, which is not a CaptionFlow dev process:`);
  say(`  ${who.cmd || '(no command line)'}`);
  say('stop it, then run this again.');
  process.exit(1);
}

// A Ctrl+C that lands during the port check has already begun stopAll, which
// ends the process; never start services behind its back in the meantime.
if (stopping) await new Promise(() => {});

for (const svc of services) {
  const child = spawn(svc.command, svc.args, {
    cwd: svc.cwd,
    env: { ...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? '1', ...(svc.env || {}) },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
    // POSIX: own process group, so stopAll can signal the whole tree at once.
    detached: !IS_WIN,
  });
  svc.child = child;
  running.push(svc);
  pipeLines(child.stdout, svc);
  pipeLines(child.stderr, svc);
  child.on('error', (err) => say(`${svc.name}: failed to start: ${err.message}`));
  child.on('exit', (code, signal) => {
    svc.exited = true;
    if (stopping) return;
    say(`${svc.name} stopped (${signal ?? `exit ${code}`}). The others keep running; Ctrl+C stops everything.`);
    if (running.every((s) => s.exited)) void stopAll(code || 1);
  });
}

say(`starting ${services.map((s) => `${s.name} :${s.port}`).join(', ')}. Ctrl+C stops everything.`);

const ready = await Promise.all(
  services.map(async (svc) => {
    const up = await waitUntil(async () => svc.exited || stopping || (await isListening(svc.host, svc.port)), 180_000, 500);
    if (stopping || svc.exited) return false;
    say(up ? `${colour(32, 'ready')}  ${svc.label} at ${svc.url}` : `${svc.label} is still not answering on ${svc.port} after 3 minutes`);
    return up;
  }),
);

if (!stopping && ready.every(Boolean)) {
  say(`${colour(32, 'all services up.')} Open http://localhost:5173 — Ctrl+C stops everything.`);
  const stopAfter = Number(process.env.CAPTIONFLOW_DEV_STOP_AFTER_READY_MS);
  if (stopAfter > 0) setTimeout(() => void stopAll(0), stopAfter);
}
