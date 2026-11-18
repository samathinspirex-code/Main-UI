import type { Metadata } from "next";
import OfferDocuments from "@/components/admissions/OfferDocuments";

export const metadata: Metadata = {
  title: "Submit Your Documents",
  description: "Upload the documents for your Conditional Offer of Admission.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function OfferDocumentsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <OfferDocuments token={token} />;
}
