// Returns "410 Gone" for leftover WordPress / LMS-theme URLs that have no
// equivalent on the new site. 410 tells Google the page was removed on
// purpose, so it drops out of the index faster than a 404.
// Redirects in next.config.ts run before this, so old URLs that do have a new
// page (e.g. /courses, /courses/business-english-essentials) still redirect.
import { NextResponse, type NextRequest } from "next/server";

const GONE = [
  /^\/dtlms_/, // old LMS demo lessons, quizzes, questions, assignments, packages
  /^\/classes\//,
  /^\/category\//,
  /^\/tag\//,
  /^\/author\//,
  /^\/courses(\/|$)/, // old demo courses (day trading, photoshop, etc.)
  /^\/wp-content\//,
  /^\/wp-admin/,
  /^\/wp-json/,
  /^\/wp-login\.php/,
  /^\/xmlrpc\.php/,
  /\/feed\/?$/,
  /^\/shop\/?$/,
  /^\/my-account/,
  /^\/cart\/?$/,
  /^\/checkout/,
];

export function proxy(request: NextRequest) {
  if (GONE.some((pattern) => pattern.test(request.nextUrl.pathname))) {
    return new NextResponse("This page has been permanently removed.", {
      status: 410,
      headers: { "X-Robots-Tag": "noindex", "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = {
  // Only the old WordPress paths; real site pages, API routes and assets never reach this.
  matcher: [
    "/(dtlms_.*)",
    "/classes/:path*",
    "/category/:path*",
    "/tag/:path*",
    "/author/:path*",
    "/courses/:path*",
    "/wp-content/:path*",
    "/wp-admin/:path*",
    "/wp-json/:path*",
    "/wp-login.php",
    "/xmlrpc.php",
    "/feed",
    "/:path*/feed",
    "/shop",
    "/my-account/:path*",
    "/cart",
    "/checkout/:path*",
  ],
};
