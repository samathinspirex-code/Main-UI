import type { Metadata } from "next";
import Home from "@/components/design/Home";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { fetchPrograms } from "@/data/programs";
import { fetchNewsEvents } from "@/data/news";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Inspire College | Your Online University" };

export default async function Page() {
  const [programs, news] = await Promise.all([fetchPrograms(), fetchNewsEvents()]);
  return <><Navbar /><Home programs={programs} news={news} /><Footer /></>;
}
