import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetail from "@/components/design/NewsDetail";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { fetchNewsEventBySlug, fetchNewsEvents } from "@/data/news";
import { buildMetadata, snippet } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchNewsEventBySlug(slug);
  if (!item) return { title: "News article not found", robots: { index: false } };
  const metadata = buildMetadata(`/news/${item.slug}`, { title: item.title, description: snippet(item.excerpt) }, { type: "article" });
  if (item.image) {
    metadata.openGraph = { ...metadata.openGraph, images: [{ url: item.image, alt: item.title }] };
    metadata.twitter = { ...metadata.twitter, images: [item.image] };
  }
  return metadata;
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [item, items] = await Promise.all([fetchNewsEventBySlug(slug), fetchNewsEvents()]);
  if (!item) notFound();
  return (
    <>
      <ArticleJsonLd slug={item.slug} title={item.title} description={snippet(item.excerpt)} image={item.image} date={item.date} />
      <NewsDetail item={item} others={items.filter((other) => other.slug !== item.slug).slice(0, 3)} />
    </>
  );
}
