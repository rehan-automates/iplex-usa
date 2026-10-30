import type { Metadata } from "next";

import { InformationPage } from "@/components/InformationPage";
import { siteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Contact iPlex for privacy information and enquiries.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InformationPage title="Privacy Policy">
      <p>For the privacy policy applicable to your enquiry or engagement, please contact our team.</p>
      <p>Send privacy questions to <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>.</p>
    </InformationPage>
  );
}
