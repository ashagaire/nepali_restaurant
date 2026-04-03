import type { NextConfig } from "next";

const nextConfig: any = {
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
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // This prevents the build from failing due to linting warnings/errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
