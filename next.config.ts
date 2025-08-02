import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Completely disable CSP to allow Stripe to work
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: '',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
