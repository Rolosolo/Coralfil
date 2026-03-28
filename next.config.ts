import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint runs locally via `npm run lint`. Skipping during Vercel build to avoid
    // flat-config compatibility issues with eslint-config-next on Node v24.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
