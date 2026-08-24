import type { Metadata } from "next";
import News from "@/components/design/News";
import { fetchNewsEvents } from "@/data/news";

export const metadata: Metadata = { title: "News and events" };
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const items = await fetchNewsEvents();
  return <News items={items} />;
}
