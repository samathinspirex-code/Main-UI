import type { NextConfig } from "next";
import { oldSiteRedirects } from "./redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // "Free Counselling Session" sitelink goes to the contact form.
      { source: "/free-counselling", destination: "/contact#contact-form", permanent: false },
      // Old WordPress URLs from Search Console's "Not found (404)" report.
      ...oldSiteRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self';",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  images: {
    // Add a hostname here whenever a converted page pulls images from a new
    // remote source (see design-reference/*.jsx for the full asset list).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
