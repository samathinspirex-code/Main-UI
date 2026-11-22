import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ProgramDetail from "@/components/design/ProgramDetail";
import { CourseJsonLd } from "@/components/seo/JsonLd";
import { fetchProgramBySlug, fetchPrograms, type Program } from "@/data/programs";
import { buildMetadata, PROGRAM_SEO, snippet } from "@/lib/seo";

export const revalidate = 300;

// Pre-build every course page; new courses render on first visit, then stay cached.
export async function generateStaticParams() {
  const programs = await fetchPrograms();
  return [...new Set(programs.map((p) => p.slug))].map((slug) => ({ slug }));
}

function programSeo(program: Program) {
  const custom = PROGRAM_SEO[program.slug];
  return {
    title: custom?.title ?? `${program.title} (Online)`,
    description: custom?.description ?? snippet(program.blurb) ?? `Study ${program.title} 100% online with Inspire College, Sri Lanka.`,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await fetchProgramBySlug(slug);
  if (!program) return { title: "Program not found", robots: { index: false } };
  return buildMetadata(`/programs/${program.slug}`, programSeo(program));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [program, programs] = await Promise.all([fetchProgramBySlug(slug), fetchPrograms()]);
  if (!program) {
    // An old CMS slug with a space ("level 7") is still in Google's index.
    if (decodeURIComponent(slug).trim().toLowerCase() === "level 7") permanentRedirect("/postgraduate-degrees");
    notFound();
  }
  const related = programs.filter((item) => item.school === program.school && item.slug !== program.slug).slice(0, 3);
  const seo = programSeo(program);
  return (
    <>
      <CourseJsonLd slug={program.slug} name={program.title} description={seo.description} duration={program.duration} />
      <ProgramDetail program={program} related={related} />
    </>
  );
}
