import type { NextConfig } from "next";
import { oldSiteRedirects } from "./redirects";
import { currentProgramPath, LEGACY_PROGRAM_SLUGS } from "./src/lib/legacySlugs";

// Files in /public (images, logos, banners) rarely change: let browsers keep them
// for a day and Vercel's CDN for a week, refreshing in the background.
const PUBLIC_ASSET_CACHE = "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // "Free Counselling Session" sitelink goes to the contact form.
      { source: "/free-counselling", destination: "/contact#contact-form", permanent: false },
      // Course links from before the database rebuild go straight to the current page.
      ...Object.entries(LEGACY_PROGRAM_SLUGS).map(([from, to]) => ({ source: `/programs/${from}`, destination: `/programs/${to}`, permanent: true })),
      // Old WordPress URLs from Search Console's "Not found (404)" report, in one hop.
      ...oldSiteRedirects.map((r) => ({ ...r, destination: currentProgramPath(r.destination) })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'self';" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/:file*\\.(png|jpg|jpeg|webp|avif|gif|svg|ico|woff2|ttf|mp4)",
        headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE }],
      },
    ];
  },
  images: {
    // Serve modern formats and keep resized images on the CDN for a month.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    // Add a hostname here whenever a converted page pulls images from a new
    // remote source (see design-reference/*.jsx for the full asset list).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
