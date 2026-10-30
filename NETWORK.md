# Share the local site over Wi-Fi

From the project folder, run:

```powershell
npm run dev network
```

When the server is ready, the terminal prints `OPEN ON THIS COMPUTER` and `SHARE ON WI-FI` links using the selected port and your current Wi-Fi IPv4 address. Open the share link on another device connected to the same Wi-Fi. Nothing is hardcoded to a particular router or address.

`0.0.0.0` is a listening address, not a browser destination. The launcher replaces Next.js's displayed network address with your usable Wi-Fi address. On the host computer, you can also use the printed `localhost` link.

The launcher listens on `0.0.0.0`, prefers Wi-Fi over virtual adapters, and normally uses port 3000. If that port is occupied, it picks a free port and prints the correct URL. Switching networks while it runs updates the URL and restarts Next.js to refresh its allowed development origins. Press Ctrl+C to stop the server and its worker.

Network mode uses its own `.next-network` build directory so it can run alongside an existing local development server without sharing its cache.

An equivalent shortcut is `npm run dev:network`. To choose a port explicitly:

```powershell
npm run dev network -- --port 3010
```

`npm run dev` still starts the usual Webpack development server and accepts the existing Next.js options. Network mode shares the live development site, so edits update automatically.

To verify the launcher's address selection and argument handling, run `npm run test:network`.
