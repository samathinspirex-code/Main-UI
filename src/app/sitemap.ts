// Serves /sitemap.xml. Fixed pages come from lib/seo.ts; programme and news
// pages come live from the CMS, so new ones appear without a code change.
import type { MetadataRoute } from "next";
import { fetchPrograms } from "@/data/programs";
import { fetchNewsEvents } from "@/data/news";
import { PAGES, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

const SECTIONS = ["/programs", "/admissions", "/about", "/contact", "/news"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [programs, news] = await Promise.all([fetchPrograms(), fetchNewsEvents()]);

  const fixed: MetadataRoute.Sitemap = Object.keys(PAGES).map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/news" ? "weekly" : SECTIONS.includes(path) ? "monthly" : "yearly",
    priority: path === "/" ? 1 : SECTIONS.includes(path) ? 0.9 : 0.3,
  }));

  const programPages: MetadataRoute.Sitemap = [...new Set(programs.map((p) => p.slug))].map((slug) => ({
    url: `${SITE_URL}/programs/${encodeURIComponent(slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const newsPages: MetadataRoute.Sitemap = news.map((item) => {
    const date = new Date(item.date);
    return {
      url: `${SITE_URL}/news/${encodeURIComponent(item.slug)}`,
      lastModified: Number.isNaN(date.getTime()) ? now : date,
      changeFrequency: "yearly",
      priority: 0.6,
    };
  });

  return [...fixed, ...programPages, ...newsPages];
}
