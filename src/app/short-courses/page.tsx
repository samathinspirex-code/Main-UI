import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata("/short-courses");

export default function ShortCoursesPage() {
  return (
    <ProgramsLanding
      path="/short-courses"
      name="Short Courses"
      heading="Short Courses (CPD)"
      intro="CPD-certified short courses in AI, digital marketing, data and finance – learn practical skills in weeks."
      checks={{ programmes: ["Short Course"] }}
    />
  );
}
