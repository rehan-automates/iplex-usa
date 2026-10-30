import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localAddresses = Object.values(networkInterfaces()).flatMap((addresses) =>
  (addresses ?? []).filter((address) => address.family === "IPv4" && !address.internal).map((address) => address.address),
);

const nextConfig: NextConfig = {
  distDir: process.env.IPLEX_NETWORK_DEV === "1" ? ".next-network" : ".next",
  allowedDevOrigins: ["127.0.0.1", ...localAddresses],
  async headers() {
    return [
      {
        // Files in public/ are served with max-age=0 by default, so every visit re-validates every image.
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        // Content-hash filenames (40 hex chars) never change in place, so they can be cached for a year.
        source: "/assets/:file([0-9a-f]{40}\\.[a-z0-9]+)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
