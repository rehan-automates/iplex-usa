import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { LegalPage, Ph, type LegalSection } from "@/components/legal-page";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/cookies");

const COOKIES = [
  [
    "Your cookie choice",
    "iPlex",
    "Remembers whether you accepted or declined optional cookies (stored in your browser).",
    "Until you clear it",
  ],
  ["_ga, _ga_*", "Google Analytics", "Counts visits and shows which pages are useful.", "Up to 2 years"],
  ["_fbp", "Meta", "Measures our Facebook and Instagram ads.", "3 months"],
  ["li_sugr, bcookie, lidc, UserMatchHistory", "LinkedIn", "Measures our LinkedIn ads.", "Up to 1 year"],
] as const;

const SECTIONS: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies are",
    body: (
      <p>
        Cookies are small files a website stores in your browser. Similar tools, such as pixels and local storage, work
        the same way. In this notice we call them all cookies.
      </p>
    ),
  },
  {
    id: "how-we-use-them",
    title: "How we use them",
    body: (
      <>
        <p>
          <strong>Essential:</strong> the site works without any tracking cookies. We only store your cookie choice so
          we don&apos;t ask again on every page.
        </p>
        <p>
          <strong>Analytics and advertising (optional):</strong> if you select &quot;Accept&quot;, we load Google
          Analytics and our Meta and LinkedIn ad tags to understand how the site is used and to measure our ads. If you
          select &quot;Decline&quot;, they are not loaded.
        </p>
      </>
    ),
  },
  {
    id: "list",
    title: "Cookies we use",
    body: (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Kept for</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES.map(([name, provider, purpose, kept]) => (
              <tr key={name}>
                <td data-label="Cookie">
                  <strong>{name}</strong>
                </td>
                <td data-label="Provider">{provider}</td>
                <td data-label="Purpose">{purpose}</td>
                <td data-label="Kept for">{kept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: (
      <>
        <p>You can change your choice at any time:</p>
        <p>
          <CookieSettingsButton />
        </p>
        <p>
          You can also block or delete cookies in your browser settings, and manage ad preferences directly with{" "}
          <a href="https://www.facebook.com/adpreferences" rel="noopener noreferrer" target="_blank">
            Meta
          </a>
          ,{" "}
          <a href="https://www.linkedin.com/psettings/advertising" rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>{" "}
          and{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
            Google Analytics
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "more",
    title: "More information",
    body: (
      <p>
        See our <Link href="/privacy">Privacy Policy</Link> for how we handle personal information, or contact us at{" "}
        <Ph>privacy email address</Ph>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={pageSchema("/cookies")} />
      <Glows />
      <LegalPage
        title={
          <>
            Cookie <span className="acc">notice</span>
          </>
        }
        intro="Which cookies this site uses, why, and how to change your choice."
        updated={<Ph>Month day, year</Ph>}
        summary={[
          "The site works without tracking cookies.",
          "Analytics and ad measurement only load if you select Accept.",
          "You can change your choice at any time on this page.",
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
