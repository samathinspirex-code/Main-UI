import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import News from "@/components/design/News";
import { fetchNewsEvents } from "@/data/news";

export const metadata: Metadata = pageMetadata("/news");
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const items = await fetchNewsEvents();
  return <News items={items} />;
}
