import type { Metadata } from "next";
import Programs from "@/components/design/Programs";
import { fetchProgrammeNodes, fetchPrograms } from "@/data/programs";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Find your program" };

export default async function ProgramsPage({ searchParams }: { searchParams: Promise<{ q?: string; body?: string; school?: string; programme?: string; level?: string }> }) {
  const [params, programs, programmeNodes] = await Promise.all([searchParams, fetchPrograms(), fetchProgrammeNodes()]);
  return <Programs programs={programs} programmeNodes={programmeNodes} initialQuery={params.q ?? ""} initialBody={params.body ?? ""} initialSchool={params.school ?? ""} initialProgramme={params.programme ?? ""} initialLevel={params.level ?? ""} />;
}
