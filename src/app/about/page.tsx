import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import About from "@/components/design/About";

export const metadata: Metadata = pageMetadata("/about");
export default function AboutPage() { return <About />; }
