import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CSP is now handled in middleware.ts
  experimental: {
    // Modern optimizations for Next.js 15
    optimizePackageImports: ["@heroicons/react", "date-fns"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  // Disable problematic preloading
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
