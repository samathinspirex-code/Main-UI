import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add a hostname here whenever a converted page pulls images from a new
    // remote source (see design-reference/*.jsx for the full asset list).
    remotePatterns: [
      { protocol: "https", hostname: "inspirecollege.lk" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
