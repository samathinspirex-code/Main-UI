import { ProgramsLanding } from "@/components/programs/ProgramsLanding";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata("/postgraduate-degrees");

export default function PostgraduateDegreesPage() {
  return (
    <ProgramsLanding
      path="/postgraduate-degrees"
      name="Postgraduate Degrees"
      heading="Postgraduate Degrees"
      intro="Postgraduate study designed for global careers – online MBA, MCA and Level 7 diplomas."
      checks={{ programmes: ["Postgraduate", "MBA", "MCA"] }}
    />
  );
}
