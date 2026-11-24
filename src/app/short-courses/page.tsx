import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
export const metadata = pageMetadata("/short-courses");

export default function ShortCoursesPage() {
  return (
    <ProgramsLanding
      path="/short-courses"
      name="Short Courses"
      heading="Short Courses (CPD)"
      intro="Learn one practical skill in 4 to 12 weeks – CPD-certified courses in AI tools, digital marketing, data and personal finance."
      checks={{ programmes: ["Short Courses"] }}
    />
  );
}
