import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// This machine's own local-network addresses. `npm run dev:host` serves the
// site to phones on the same Wi-Fi, and the dev server only accepts its live
// reload and scripts from origins it knows.
const localAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  // `npm run build` writes the whole site as plain HTML, CSS and JavaScript into
  // out/, ready for any web host. No Node.js server is needed to run it.
  output: "export",
  // A stray package-lock.json in the home folder otherwise confuses root detection.
  turbopack: { root: import.meta.dirname },
  allowedDevOrigins: localAddresses,
};

export default nextConfig;
