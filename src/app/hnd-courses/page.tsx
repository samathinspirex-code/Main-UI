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
      intro="A two-year UK Higher National Diploma after your A/Ls – choose AI, software, cyber security, business, accounting, law or health, then top up to a degree."
      checks={{ programmes: ["HND"] }}
    />
  );
}
