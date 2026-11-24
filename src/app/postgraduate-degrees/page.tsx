import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
export const metadata = pageMetadata("/postgraduate-degrees");

export default function PostgraduateDegreesPage() {
  return (
    <ProgramsLanding
      path="/postgraduate-degrees"
      name="Postgraduate Degrees"
      heading="Postgraduate Degrees"
      intro="Master's-level study for working graduates – online MBA, MCA, MSc and Level 7 diplomas you can fit around your job."
      checks={{ programmes: ["Postgraduate", "MBA", "MCA"] }}
    />
  );
}
