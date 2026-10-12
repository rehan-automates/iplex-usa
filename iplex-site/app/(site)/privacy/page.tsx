import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { LegalPage, Ph, type LegalSection } from "@/components/legal-page";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/privacy");

// Template written for iPlex's actual data flows. Have a US attorney review it before launch.
const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This policy explains how iPlex (&quot;we&quot;, &quot;us&quot;) handles personal information collected through
          this website, our forms, the AI Readiness Scorecard and our booking calendar.
        </p>
        <p>
          It does not cover the data we process for clients while delivering a project. That work is governed by our
          contract and data processing agreement with each client; see <Link href="/trust">Trust &amp; Security</Link>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>Your name, work email, company, role and company or team size.</li>
          <li>Your answers to the AI Readiness Scorecard and the scores we calculate from them.</li>
          <li>Booking details: the time you choose and your answers to our booking questions.</li>
          <li>Anything you write in a message, partner application or form field.</li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            If you accept analytics and advertising cookies: pages you visit, how you arrived (for example, an ad you
            clicked), device and browser type, and an approximate location based on your IP address.
          </li>
          <li>Basic technical logs our hosting provider keeps to run and secure the site.</li>
        </ul>
        <h3>Information from others</h3>
        <p>
          Ad platforms and our calendar provider may share details with us when you book or respond to an ad, such as
          the campaign you came from.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: (
      <ul>
        <li>To reply to you, arrange and prepare for calls, and send your scorecard results.</li>
        <li>
          To send a few follow-up emails with ideas for your team. Every email has an unsubscribe link, and you can opt
          out at any time.
        </li>
        <li>To provide, manage and invoice the services you buy from us.</li>
        <li>To understand how the site is used and measure our advertising, if you allow cookies for that.</li>
        <li>To keep the site secure, prevent spam and meet our legal obligations.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>
          <strong>We do not sell your personal information.</strong> We share it only with service providers who help us
          run the business, under contracts that limit how they may use it:
        </p>
        <ul>
          <li>
            Our CRM and email platform (<Ph>CRM, for example GoHighLevel</Ph>), which stores form submissions and sends
            our emails.
          </li>
          <li>
            Our scheduling tool (<Ph>calendar provider</Ph>) and video-call provider (<Ph>video provider</Ph>).
          </li>
          <li>
            Our website host (<Ph>hosting provider</Ph>).
          </li>
          <li>
            Analytics and advertising partners (Google, Meta, LinkedIn), only if you accept those cookies. See the{" "}
            <Link href="/cookies">Cookie notice</Link>.
          </li>
          <li>Professional advisers, and authorities when the law requires it.</li>
          <li>A buyer or successor if our business is sold or merged, under this policy.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep contact and enquiry details for <Ph>24 months</Ph> after our last contact with you, and client records
        for as long as tax and contract law require. We then delete or anonymize them.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: (
      <>
        <p>
          You can ask us to show you, correct or delete the personal information we hold about you, or to stop sending
          you marketing emails. Depending on where you live (for example California, other US states, the UK or the EU),
          you may also have the right to opt out of targeted advertising, to object to or restrict certain uses, and to
          receive a copy of your data.
        </p>
        <p>
          To make a request, email <Ph>privacy email address</Ph>. We will verify your request and reply within the time
          the law requires. We will not treat you differently for using these rights. You can change your cookie choices
          at any time on the <Link href="/cookies">Cookie notice</Link> page.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        We use business-grade tools, limit access to the people who need it, and use encryption in transit. No system is
        perfectly secure, so please don&apos;t send sensitive information (such as health or payment details) through
        our forms.
      </p>
    ),
  },
  {
    id: "international",
    title: "Where it is stored",
    body: (
      <p>
        Our service providers may store and process data in the United States and other countries. Wherever it is
        stored, we protect it as this policy describes, with safeguards where the law requires them.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>Our website and services are for businesses and are not directed at children under 16.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this page when our practices change and revise the date at the top. If a change is significant,
        we will tell you by email or with a notice on the site.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions or requests: <Ph>privacy email address</Ph>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={pageSchema("/privacy")} />
      <Glows />
      <LegalPage
        title={
          <>
            Privacy <span className="acc">Policy</span>
          </>
        }
        intro="What we collect when you use our site and forms, why we collect it, and the choices you have."
        updated={<Ph>Month day, year</Ph>}
        summary={[
          "We collect what you tell us in our forms, plus site analytics only if you allow cookies.",
          "We use it to reply, arrange your call, send your results and a few useful follow-ups.",
          "We never sell your personal information.",
          "You can unsubscribe, or ask us to show, correct or delete your data, at any time.",
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
