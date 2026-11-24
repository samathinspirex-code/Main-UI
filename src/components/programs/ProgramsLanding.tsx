// Shared body for the sitelink landing pages (/postgraduate-degrees, etc.):
// the normal programmes list with some filters already ticked, plus breadcrumbs.
// `include` narrows the list on the server for pages whose courses can't be
// described by the sidebar ticks alone (which must all match at once).
import Programs, { type ProgramsInitialChecks } from "@/components/design/Programs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { fetchProgrammeNodes, fetchPrograms, type Program } from "@/data/programs";

export async function ProgramsLanding({ path, name, heading, intro, checks, include }: { path: string; name: string; heading: string; intro: string; checks?: ProgramsInitialChecks; include?: (program: Program) => boolean }) {
  const [allPrograms, programmeNodes] = await Promise.all([fetchPrograms(), fetchProgrammeNodes()]);
  const programs = include ? allPrograms.filter(include) : allPrograms;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name, path }]} />
      <Programs programs={programs} programmeNodes={programmeNodes} initialChecks={checks} heading={heading} intro={intro} crumb={name.toUpperCase()} />
    </>
  );
}
