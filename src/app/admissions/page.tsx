import type { Metadata } from "next";
import AcademicAdmissions from "@/components/admissions/AcademicAdmissions";
import { fetchPrograms, fetchProgrammeNodes } from "@/data/programs";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admissions" };

export default async function AdmissionsPage({ searchParams }: { searchParams: Promise<{ program?: string }> }) {
  const [params, programs, programmes] = await Promise.all([searchParams, fetchPrograms(), fetchProgrammeNodes()]);
  return <AcademicAdmissions programs={programs} programmes={programmes} initialProgramSlug={params.program ?? ""} />;
}
