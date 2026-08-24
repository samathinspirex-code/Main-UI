import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetail from "@/components/design/ProgramDetail";
import { fetchProgramBySlug, fetchPrograms } from "@/data/programs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await fetchProgramBySlug(slug);
  return { title: program?.title ?? "Program not found" };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [program, programs] = await Promise.all([fetchProgramBySlug(slug), fetchPrograms()]);
  if (!program) notFound();
  const related = programs.filter((item) => item.school === program.school && item.slug !== program.slug).slice(0, 3);
  return <ProgramDetail program={program} related={related} />;
}
