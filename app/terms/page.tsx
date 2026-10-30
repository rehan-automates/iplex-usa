import type { Metadata } from "next";

import { InformationPage } from "@/components/InformationPage";
import { siteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Contact iPlex for terms applicable to your engagement.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InformationPage title="Terms and Conditions">
      <p>For terms applicable to a proposed project or service engagement, please contact our team.</p>
      <p>Discuss your requirements with us at <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>.</p>
    </InformationPage>
  );
}
