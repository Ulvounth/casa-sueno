import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modern optimizations for Next.js 15
  experimental: {
    optimizePackageImports: ["@heroicons/react", "date-fns"],
  },
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
