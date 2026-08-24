import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetail from "@/components/design/NewsDetail";
import { fetchNewsEventBySlug, fetchNewsEvents } from "@/data/news";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchNewsEventBySlug(slug);
  return { title: item?.title ?? "News article not found", description: item?.excerpt };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [item, items] = await Promise.all([fetchNewsEventBySlug(slug), fetchNewsEvents()]);
  if (!item) notFound();
  return <NewsDetail item={item} others={items.filter((other) => other.slug !== item.slug).slice(0, 3)} />;
}
