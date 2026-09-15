import type { Metadata } from "next";
import Home from "@/components/design/Home";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { fetchPrograms } from "@/data/programs";
import { fetchNewsEvents } from "@/data/news";
import { fetchTestimonials } from "@/data/testimonials";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Inspire College | Your Online University" };

export default async function Page() {
  const [programs, news, testimonials] = await Promise.all([fetchPrograms(), fetchNewsEvents(), fetchTestimonials()]);
  return <><Navbar /><Home programs={programs} news={news} testimonials={testimonials} /><Footer /></>;
}
