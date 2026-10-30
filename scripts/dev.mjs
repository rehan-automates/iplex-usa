import { spawn, execFile } from "node:child_process";
import { createServer } from "node:net";
import { networkInterfaces } from "node:os";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { createInterface } from "node:readline";
import { stripVTControlCharacters } from "node:util";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const wifiName = /wi[-\s]?fi|wireless|wlan|^wl\w|airport/i;
const virtualName = /vethernet|virtual|vmware|vbox|docker|wsl|vpn|wintun|loopback|hyper-v|\btap\b|\btun\b/i;
const virtualMac = /^(?:0[8a]:00:27|00:15:5d|00:05:69|00:0c:29|00:1c:14|00:50:56):/i;

export function lanAddresses(interfaces = networkInterfaces()) {
  const addresses = Object.entries(interfaces).flatMap(([name, entries]) =>
    (entries ?? []).filter((entry) =>
      (entry.family === "IPv4" || entry.family === 4) && !entry.internal &&
      !entry.address.startsWith("169.254.") && entry.address !== "0.0.0.0" &&
      !virtualName.test(name) && !virtualMac.test(entry.mac ?? ""),
    ).map((entry) => ({ name, address: entry.address })),
  );
  const wifi = addresses.filter(({ name }) => wifiName.test(name));
  return (wifi.length ? wifi : addresses).sort((a, b) =>
    `${a.name}:${a.address}`.localeCompare(`${b.name}:${b.address}`),
  );
}

export function devOptions(argv, environmentPort) {
  const network = argv.includes("network") || argv.includes("--network");
  if (!network) return { network: false, args: argv };
  const args = [];
  let port = environmentPort;
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "network" || arg === "--network") continue;
    if (arg === "--port" || arg === "-p") {
      port = argv[++index];
      if (port === undefined) throw new Error(`${arg} needs a port number.`);
    } else if (arg.startsWith("--port=")) {
      port = arg.slice(7);
    } else if (arg === "--hostname" || arg === "-H") {
      if (argv[++index] === undefined) throw new Error(`${arg} needs a hostname.`);
    } else if (!arg.startsWith("--hostname=")) {
      args.push(arg);
    }
  }
  const explicitPort = port !== undefined;
  port = Number(port ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Port must be a number between 1 and 65535.");
  return { network, args, port, explicitPort };
}

export function networkLogLine(line, addresses) {
  if (!stripVTControlCharacters(line).includes("Network:")) return line;
  const host = addresses[0]?.address ?? "localhost";
  return line.replace(/(https?:\/\/)0\.0\.0\.0(?=:\d+\b)/g, `$1${host}`);
}

const warmPaths = ["/", "/services", "/work", "/about", "/blog", "/contact", "/privacy", "/terms"];

/** First link of each dynamic route family (/work/[slug], /blog/[slug]) found in a listing page's HTML. */
export function dynamicRouteSamples(html) {
  const samples = new Map();
  for (const [, path, family] of html.matchAll(/href="(\/(work|blog)\/[^"/?#]+)"/g)) {
    if (!samples.has(family)) samples.set(family, path);
  }
  return [...samples.values()];
}

/**
 * `next dev` compiles a page the first time it is requested, so the first click on each link waits for it.
 * Request every page once in the background after startup so those clicks open as fast as later ones.
 */
export async function warmRoutes(port, shouldContinue = () => true) {
  const request = async (path) => {
    const response = await fetch(`http://localhost:${port}${path}`, { signal: AbortSignal.timeout(90_000) });
    return response.text();
  };
  const pages = new Map();
  for (const path of warmPaths) {
    if (!shouldContinue()) return 0;
    try {
      pages.set(path, await request(path));
    } catch {
      // A page that fails to compile reports its own error in the Next.js log; keep warming the rest.
    }
  }
  const samples = [...(pages.has("/work") ? dynamicRouteSamples(pages.get("/work")) : []), ...(pages.has("/blog") ? dynamicRouteSamples(pages.get("/blog")) : [])];
  for (const path of samples) {
    if (!shouldContinue()) return 0;
    await request(path).catch(() => undefined);
  }
  return pages.size + samples.length;
}

export async function availablePort(preferred, explicit = false) {
  for (let port = preferred; port <= Math.min(preferred + (explicit ? 0 : 99), 65535); port++) {
    try {
      for (const host of ["0.0.0.0", "::"]) {
        try {
          await new Promise((accept, reject) => {
            const server = createServer();
            server.once("error", reject);
            server.listen({ port, host, ipv6Only: host === "::" }, () => server.close(accept));
          });
        } catch (error) {
          if (host === "::" && ["EAFNOSUPPORT", "EADDRNOTAVAIL"].includes(error.code)) continue;
          throw error;
        }
      }
      return port;
    } catch (error) {
      if (!["EADDRINUSE", "EACCES"].includes(error.code)) throw error;
    }
  }
  throw new Error(explicit ? `Port ${preferred} is unavailable. Choose another with --port.` : "No available development port was found.");
}

export async function runDev(argv = process.argv.slice(2)) {
  const options = devOptions(argv, process.env.PORT);
  const port = options.network ? await availablePort(options.port, options.explicitPort) : undefined;
  const args = ["dev", "--webpack", ...options.args];
  if (options.network) args.push("--hostname", "0.0.0.0", "--port", String(port));
  let addresses = lanAddresses();
  let child;
  let watcher;
  let stopping = false;
  let restarting = false;

  function printAddresses() {
    console.log(`\nOPEN ON THIS COMPUTER: http://localhost:${port}`);
    if (!addresses.length) console.log("Waiting for a Wi-Fi or Ethernet connection...");
    for (const { name, address } of addresses) console.log(`SHARE ON WI-FI (${name}): http://${address}:${port}`);
    console.log("Network addresses are detected automatically. Press Ctrl+C to stop.\n");
  }

  function start() {
    const active = spawn(process.execPath, [nextCli, ...args], {
      cwd: projectRoot,
      stdio: options.network ? ["inherit", "pipe", "inherit"] : "inherit",
      env: options.network ? {
        ...process.env,
        IPLEX_NETWORK_DEV: "1",
        ...(process.stdout.isTTY ? { FORCE_COLOR: process.env.FORCE_COLOR ?? "1" } : {}),
      } : process.env,
    });
    child = active;
    if (options.network) {
      const output = createInterface({ input: active.stdout, crlfDelay: Infinity });
      output.on("line", (line) => {
        console.log(networkLogLine(line, addresses));
        if (stripVTControlCharacters(line).includes("Ready in")) {
          printAddresses();
          void warmRoutes(port, () => child === active && !stopping).then((count) => {
            if (count) console.log(`Pre-compiled ${count} pages, so the first click on each link is already fast.`);
          });
        }
      });
    }
    active.once("error", (error) => {
      console.error(`Unable to start Next.js: ${error.message}`);
      clearInterval(watcher);
      process.exitCode = 1;
    });
    active.once("exit", (code) => {
      if (!stopping && !restarting && child === active) {
        clearInterval(watcher);
        process.exitCode = code ?? 1;
      }
    });
  }

  async function stopChild() {
    const active = child;
    if (!active?.pid || active.exitCode !== null || active.signalCode !== null) return;
    await new Promise((done) => {
      active.once("exit", done);
      if (process.platform === "win32") {
        // Stop only this launcher's process tree, including Next's worker.
        execFile("taskkill.exe", ["/PID", String(active.pid), "/T", "/F"], { windowsHide: true, timeout: 5000 }, (error) => {
          if (error && active.exitCode === null) active.kill("SIGKILL");
        });
      } else {
        active.kill("SIGTERM");
      }
    });
  }

  async function stop() {
    if (stopping) return;
    stopping = true;
    clearInterval(watcher);
    await stopChild();
    process.exitCode = 0;
  }
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);

  if (options.network) {
    console.log("Starting the Wi-Fi preview. The browser links will appear when Next.js is ready...");
    watcher = setInterval(async () => {
      if (stopping || restarting) return;
      const current = lanAddresses();
      if (JSON.stringify(current) === JSON.stringify(addresses)) return;
      addresses = current;
      printAddresses();
      if (!addresses.length) return;
      restarting = true;
      try {
        console.log("Network changed. Restarting Next.js with the current local addresses...");
        await stopChild();
        if (!stopping) start();
      } finally {
        restarting = false;
      }
    }, 3000);
  }
  start();
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runDev().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
