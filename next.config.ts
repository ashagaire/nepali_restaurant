import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wolt.com',
      },
      {
        protocol: 'https',
        hostname: 'www.foodora.fi',
      },
    ],
  },
};

export default nextConfig;
