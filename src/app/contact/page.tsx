import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Contact from "@/components/design/Contact";

export const metadata: Metadata = pageMetadata("/contact");
export default function ContactPage() { return <Contact />; }
