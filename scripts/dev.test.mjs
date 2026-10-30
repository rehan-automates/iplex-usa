import assert from "node:assert/strict";
import { createServer } from "node:net";
import test from "node:test";

import { availablePort, devOptions, dynamicRouteSamples, lanAddresses, networkLogLine } from "./dev.mjs";

const ip = (address, extra = {}) => ({ family: "IPv4", address, internal: false, ...extra });

test("Next's Network line shows a usable dynamic URL instead of the bind address", () => {
  const line = "- Network: http://0.0.0.0:3001";
  assert.equal(networkLogLine(line, [{ address: "192.168.0.237" }]), "- Network: http://192.168.0.237:3001");
  assert.equal(networkLogLine(line, [{ address: "10.0.0.45" }]), "- Network: http://10.0.0.45:3001");
  assert.equal(networkLogLine(line, []), "- Network: http://localhost:3001");
  assert.equal(networkLogLine("A normal application log", []), "A normal application log");
});

test("prefers the current Wi-Fi over virtual adapters and other addresses", () => {
  assert.deepEqual(lanAddresses({
    "Wi-Fi 2": [ip("192.168.0.237")],
    "Ethernet 3": [ip("192.168.56.1", { mac: "0a:00:27:00:00:1a" })],
    "vEthernet (WSL)": [ip("172.19.176.1")],
    Ethernet: [ip("10.0.0.2")],
    Loopback: [ip("127.0.0.1", { internal: true })],
  }), [{ name: "Wi-Fi 2", address: "192.168.0.237" }]);
});

test("picks up a different Wi-Fi address without a configured IP", () => {
  assert.deepEqual(lanAddresses({ "Wi-Fi": [ip("10.12.4.91")] }), [{ name: "Wi-Fi", address: "10.12.4.91" }]);
  assert.deepEqual(lanAddresses({ "Wi-Fi": [ip("192.168.8.33")] }), [{ name: "Wi-Fi", address: "192.168.8.33" }]);
  assert.deepEqual(lanAddresses({ "Wi-Fi": [ip("169.254.1.2")] }), []);
});

test("falls back to wired Ethernet when Wi-Fi is unavailable", () => {
  assert.deepEqual(lanAddresses({ Ethernet: [ip("10.0.0.5")] }), [{ name: "Ethernet", address: "10.0.0.5" }]);
});

test("routes npm run dev network and preserves ordinary dev arguments", () => {
  assert.deepEqual(devOptions(["network"]), { network: true, args: [], port: 3000, explicitPort: false });
  assert.deepEqual(devOptions(["network", "--port", "3010", "--hostname", "localhost", "--no-mangling"]), {
    network: true, args: ["--no-mangling"], port: 3010, explicitPort: true,
  });
  assert.deepEqual(devOptions(["--port", "3002"]), { network: false, args: ["--port", "3002"] });
  assert.equal(devOptions(["network"], "3005").port, 3005);
  assert.throws(() => devOptions(["network", "-p"]));
  assert.throws(() => devOptions(["network", "--port=invalid"]));
});

test("never advertises an occupied port and reports an explicit port conflict", async () => {
  const server = createServer();
  await new Promise((accept) => server.listen(0, "0.0.0.0", accept));
  const { port } = server.address();
  try {
    await assert.rejects(availablePort(port, true), /unavailable/);
    if (port < 65535) assert.notEqual(await availablePort(port), port);
  } finally {
    await new Promise((accept) => server.close(accept));
  }
});

test("also detects an occupied IPv6 port", async () => {
  const server = createServer();
  try {
    await new Promise((accept, reject) => {
      server.once("error", reject);
      server.listen({ port: 0, host: "::", ipv6Only: true }, accept);
    });
  } catch (error) {
    if (["EAFNOSUPPORT", "EADDRNOTAVAIL"].includes(error.code)) return;
    throw error;
  }
  try {
    await assert.rejects(availablePort(server.address().port, true), /unavailable/);
  } finally {
    await new Promise((accept) => server.close(accept));
  }
});

test("warm-up picks the first case study and blog post link from listing pages", () => {
  const html = '<a href="/work/clinuvel">a</a><a href="/work/native-ai-copilot">b</a><a href="/blog/smarter-ai-workflows">c</a><a href="/blog">d</a><a href="/about">e</a>';
  assert.deepEqual(dynamicRouteSamples(html), ["/work/clinuvel", "/blog/smarter-ai-workflows"]);
  assert.deepEqual(dynamicRouteSamples('<a href="/work">all</a>'), []);
});
