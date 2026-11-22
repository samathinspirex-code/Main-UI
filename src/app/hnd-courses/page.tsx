import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
export const metadata = pageMetadata("/hnd-courses");

export default function HndCoursesPage() {
  return (
    <ProgramsLanding
      path="/hnd-courses"
      name="HND Courses"
      heading="HND Courses (Level 4 & 5)"
      intro="Two-year UK HND-level diplomas in AI, Software Engineering, Cyber Security, Data Analytics, Business, Accounting, Law and Health – then top up to a degree."
      checks={{ programmes: ["HND"] }}
    />
  );
}
