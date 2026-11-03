"use client";

// Site-wide tracking plan events that do not belong to one form. Rendered once
// from the root layout, so every WhatsApp and brochure link is covered.

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

const PROGRAMME_PATH = /^\/programs\/([^/]+)/;

export function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (/wa\.me|whatsapp\.com/i.test(href)) track("whatsapp_click");
      else if (/brochure/i.test(link.textContent || "") || /\.pdf($|\?)/i.test(href)) track("brochure_download");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (pathname === "/admissions") track("apply_start");
    const programme = pathname.match(PROGRAMME_PATH)?.[1];
    if (!programme) return;
    track("view_programme", { programme });
    function onScroll() {
      const page = document.documentElement;
      if (page.scrollHeight <= page.clientHeight) return;
      if ((window.scrollY + window.innerHeight) / page.scrollHeight < 0.75) return;
      window.removeEventListener("scroll", onScroll);
      track("scroll_75", { programme: programme as string });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
