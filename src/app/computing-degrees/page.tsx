import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata("/computing-degrees");

export default function ComputingDegreesPage() {
  return (
    <ProgramsLanding
      path="/computing-degrees"
      name="Computing & IT Degrees"
      heading="Computing & IT Degrees"
      intro="Software Engineering, AI, Cyber Security and Data Analytics – Foundation to Master's, 100% online."
      checks={{ schools: ["School of Computing"] }}
    />
  );
}
