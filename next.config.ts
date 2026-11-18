import type { NextConfig } from "next";
import { routeAdvisories } from "./lib/advisoryRouting";
import { getAdvisories } from "./lib/asesorias";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Next infer the wrong root.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
  async redirects() {
    return routeAdvisories(getAdvisories()).redirects;
  },
};

export default nextConfig;
