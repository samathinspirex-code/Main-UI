// Shared body for the sitelink landing pages (/postgraduate-degrees, etc.):
// the normal programmes list with some filters already ticked, plus breadcrumbs.
import Programs, { type ProgramsInitialChecks } from "@/components/design/Programs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { fetchProgrammeNodes, fetchPrograms } from "@/data/programs";

export async function ProgramsLanding({ path, name, heading, intro, checks }: { path: string; name: string; heading: string; intro: string; checks: ProgramsInitialChecks }) {
  const [programs, programmeNodes] = await Promise.all([fetchPrograms(), fetchProgrammeNodes()]);
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name, path }]} />
      <Programs programs={programs} programmeNodes={programmeNodes} initialChecks={checks} heading={heading} intro={intro} crumb={name.toUpperCase()} />
    </>
  );
}
