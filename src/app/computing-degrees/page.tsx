import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
export const metadata = pageMetadata("/computing-degrees");

export default function ComputingDegreesPage() {
  return (
    <ProgramsLanding
      path="/computing-degrees"
      name="Computing & IT Degrees"
      heading="Computing & IT Degrees"
      intro="Start a tech career in software engineering, AI, cyber security or data – from Foundation to Master's, with hands-on industry projects."
      checks={{ schools: ["School of Computing"] }}
    />
  );
}
