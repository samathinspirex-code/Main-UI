import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import type { Program } from "@/data/programs";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
export const metadata = pageMetadata("/business-degrees");

const BUSINESS_PROGRAMMES = new Set(["BBA", "B.COM", "MBA"]);

/** School of Business (ATHE, WINC), Jain BBA / B.Com / MBA, and LSBF business diplomas. */
function isBusinessCourse(program: Program) {
  const school = program.schoolName ?? program.school;
  const programme = (program.programmeName ?? program.level).trim().toUpperCase();
  return school === "School of Business" || school === "Business" || BUSINESS_PROGRAMMES.has(programme) || program.awardingBody === "LSBF";
}

export default function BusinessDegreesPage() {
  return (
    <ProgramsLanding
      path="/business-degrees"
      name="Business Degrees"
      heading="Business Degrees & Diplomas"
      intro="From your first diploma to an MBA: business qualifications in management, accounting, finance, marketing and HR, studied 100% online."
      include={isBusinessCourse}
    />
  );
}
