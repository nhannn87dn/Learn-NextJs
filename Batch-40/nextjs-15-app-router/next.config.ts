import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnv2.tgdd.vn',
      },
    ],
  },
};

export default nextConfig;
