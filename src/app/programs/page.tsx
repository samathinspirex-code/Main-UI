import type { Metadata } from "next";
import Programs from "@/components/design/Programs";
import { fetchPrograms } from "@/data/programs";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Find your program" };

export default async function ProgramsPage({ searchParams }: { searchParams: Promise<{ q?: string; body?: string; school?: string; programme?: string }> }) {
  const [params, programs] = await Promise.all([searchParams, fetchPrograms()]);
  return <Programs programs={programs} initialQuery={params.q ?? ""} initialBody={params.body ?? ""} initialSchool={params.school ?? ""} initialProgramme={params.programme ?? ""} />;
}

