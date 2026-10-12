import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { LegalPage, Ph, type LegalSection } from "@/components/legal-page";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/terms");

// Template for a B2B services website. Have a US attorney review it before launch.
const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: (
      <p>
        These terms apply to your use of this website, operated by iPlex (&quot;we&quot;, &quot;us&quot;). By using the
        site, you agree to them. If you use the site on behalf of a company, you confirm you can accept these terms for
        it.
      </p>
    ),
  },
  {
    id: "services",
    title: "Our services",
    body: (
      <>
        <p>
          The site describes our AI Opportunity Audits, implementation sprints, training and support. Any engagement is
          governed by a separate written proposal or statement of work and our services agreement. If those documents
          conflict with these terms, they take priority.
        </p>
        <p>
          Prices on the site are starting prices. Your fixed price is set in your proposal before work begins. The audit
          credit and the guarantees described on our <Link href="/pricing">Pricing</Link> page apply as set out in your
          proposal.
        </p>
      </>
    ),
  },
  {
    id: "free-resources",
    title: "Free resources",
    body: (
      <p>
        The AI Readiness Scorecard, sample audit, walkthroughs and Opportunity Calls are free and provided for general
        information. Scores, examples and estimates of hours saved are illustrations, not promises of a specific result
        for your business.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Using the site",
    body: (
      <>
        <p>Please don&apos;t:</p>
        <ul>
          <li>Submit false information or someone else&apos;s details without permission.</li>
          <li>Try to break, overload, scrape or gain unauthorized access to the site or our systems.</li>
          <li>Use the site to send spam or anything unlawful, harmful or infringing.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Our content",
    body: (
      <p>
        The site&apos;s text, design, graphics and materials belong to iPlex or our licensors. You may view and share
        pages for your own business purposes, but you may not copy, resell or republish them without our written
        permission.
      </p>
    ),
  },
  {
    id: "your-information",
    title: "What you send us",
    body: (
      <p>
        You keep ownership of what you submit. You allow us to use it to respond to you and provide our services, as
        described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party tools and links",
    body: (
      <p>
        The site links to and embeds third-party services, such as our booking calendar and video player. Their own
        terms and privacy policies apply, and we are not responsible for them.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <p>
        The site is provided &quot;as is&quot;. To the extent the law allows, we make no warranties about it, including
        that it will be uninterrupted or error-free, or that its general information suits your situation.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, iPlex is not liable for indirect, incidental or consequential losses arising from
        your use of the site, and our total liability for any claim about the site is limited to <Ph>US$100</Ph>.
        Liability for paid services is set by your services agreement.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of <Ph>governing law</Ph>, unless your services agreement says otherwise.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: <p>We may update these terms. The date at the top shows the latest version.</p>,
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms: <Ph>Business email</Ph>, or <Link href="/contact">send us a message</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={pageSchema("/terms")} />
      <Glows />
      <LegalPage
        title={
          <>
            Terms of <span className="acc">Service</span>
          </>
        }
        intro="The rules for using this website. Paid work is covered by your proposal and services agreement."
        updated={<Ph>Month day, year</Ph>}
        summary={[
          "Use the site and our free resources fairly and lawfully.",
          "Every paid engagement has its own written proposal with a fixed price.",
          "Scores and examples on the site are illustrations, not guaranteed results.",
          "Our content is ours; what you send us stays yours.",
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
