import type { Metadata } from "next";
import Admissions from "@/components/design/Admissions";
import { fetchPrograms } from "@/data/programs";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admissions" };

export default async function AdmissionsPage({ searchParams }: { searchParams: Promise<{ program?: string }> }) {
  const [params, programs] = await Promise.all([searchParams, fetchPrograms()]);
  return <Admissions programs={programs} initialProgramSlug={params.program ?? ""} />;
}
