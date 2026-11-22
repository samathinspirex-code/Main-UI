import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Home from "@/components/design/Home";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { fetchPrograms } from "@/data/programs";
import { fetchNewsEvents } from "@/data/news";
import { fetchTestimonials } from "@/data/testimonials";
import { fetchSiteSettings } from "@/data/siteSettings";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata("/");

export default async function Page() {
  const [programs, news, testimonials, siteSettings] = await Promise.all([fetchPrograms(), fetchNewsEvents(), fetchTestimonials(), fetchSiteSettings()]);
  return <><Navbar /><Home programs={programs} news={news} testimonials={testimonials} heroSlides={siteSettings.heroSlides} promoBanner={siteSettings.promoBanner} /><Footer /></>;
}
