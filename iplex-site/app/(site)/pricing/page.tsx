import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/pricing");

const FAQ_0: FaqItem[] = [
  {
    question: "Why not charge by the hour?",
    answer: "You're buying results, not our time. A fixed price means you know the cost up front.",
  },
  {
    question: "Can we skip the audit?",
    answer: "Yes, if you already know what to build. We'll scope a sprint on a free call.",
  },
  {
    question: "How do payments work?",
    answer: (
      <>
        <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">
          [Decide, for example: half up front, half at handover.]
        </span>
      </>
    ),
    answerText: "[Decide, for example: half up front, half at handover.]",
  },
  {
    question: "Can we cancel the retainer?",
    answer: "Yes. It's month to month.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pageSchema("/pricing", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <AiOpportunityAuditSection />
      <ChangesPriceSection />
      <SoftwareAiUsageCostsSection />
      <OurGuaranteesSection />
      <PricingQuestionsSection />
      <CtaBand
        title="Not sure where to start?"
        description="Take the free scorecard, or book a call and we'll recommend the right first step."
        actions={[
          { label: "Get your AI score", href: "/scorecard" },
          { label: "or book a free call", href: "/book" },
        ]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(40px,6vw,80px)]">
      <div className="wrap flex flex-col items-center text-center gap-[22px] max-w-[900px] m-head">
        <span className="eyebrow rise self-center">Pricing</span>
        <h1 className="h1 rise d1">
          Clear prices for <span className="acc">every step.</span>
        </h1>
        <p className="lead rise d2 max-w-[600px]">
          Every engagement has a fixed price, agreed before we start. No hourly billing, no surprises.
        </p>
      </div>
    </section>
  );
}

function AiOpportunityAuditSection() {
  return (
    <section className="sec pt-0">
      <div className="wrap flex flex-col gap-[22px]">
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[16px] items-stretch">
            <div className="glass relative flex flex-col gap-[14px] py-[30px] px-[26px] rounded-[28px] [border:2px_solid_#059669] [background:radial-gradient(120%_80%_at_50%_0%,rgba(167,243,208,0.65),rgba(255,255,255,0.75)_60%)]">
              <span className="absolute top-[-14px] left-[24px] py-[5px] px-[12px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[12.5px] font-extrabold">
                Start here
              </span>
              <span className="text-[13px] font-bold tracking-[.06em] uppercase text-emerald-700">Step 1</span>
              <h2 className="m-0 text-[21px] font-extrabold tracking-[-0.02em]">AI Opportunity Audit</h2>
              <span className="text-[34px] font-extrabold tracking-[-0.04em] leading-[1]">From $2,500</span>
              <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
                Two to three weeks. A ranked map of where AI saves your team time, a 90-day roadmap, a draft AI usage
                policy, and a leadership readout. Credited in full toward implementation within 30 days.
              </p>
              <Link className="pill pill-primary pill-sm mt-auto" href="/book">
                Book a free call
              </Link>
            </div>
            <div className="glass flex flex-col gap-[14px] py-[30px] px-[26px] rounded-[28px]">
              <span className="text-[13px] font-bold tracking-[.06em] uppercase text-emerald-700">Step 2</span>
              <h2 className="m-0 text-[21px] font-extrabold tracking-[-0.02em]">Implementation sprint</h2>
              <span className="text-[34px] font-extrabold tracking-[-0.04em] leading-[1]">
                From $7,500 <span className="text-[14px] font-semibold tracking-[0] text-muted">per sprint</span>
              </span>
              <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
                Four to six weeks. Two to four working AI systems, tested with your team, documented, and supported for
                30 days.
              </p>
              <Link className="pill pill-outline pill-sm mt-auto" href="/book">
                Book a free call
              </Link>
            </div>
            <div className="glass flex flex-col gap-[14px] py-[30px] px-[26px] rounded-[28px]">
              <span className="text-[13px] font-bold tracking-[.06em] uppercase text-emerald-700">Step 3</span>
              <h2 className="m-0 text-[21px] font-extrabold tracking-[-0.02em]">AI team training</h2>
              <span className="text-[34px] font-extrabold tracking-[-0.04em] leading-[1]">From $2,500</span>
              <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
                Leadership sessions from $2,500. Role-based team programs from $5,000 per cohort, with playbooks and a
                usage policy.
              </p>
              <Link className="pill pill-outline pill-sm mt-auto" href="/book">
                Plan your training
              </Link>
            </div>
            <div className="glass flex flex-col gap-[14px] py-[30px] px-[26px] rounded-[28px] [background:radial-gradient(120%_80%_at_50%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.7)_60%)]">
              <span className="text-[13px] font-bold tracking-[.06em] uppercase text-blue-700">Ongoing</span>
              <h2 className="m-0 text-[21px] font-extrabold tracking-[-0.02em]">AI Partner retainer</h2>
              <span className="text-[34px] font-extrabold tracking-[-0.04em] leading-[1]">
                From $2,000 <span className="text-[14px] font-semibold tracking-[0] text-muted">a month</span>
              </span>
              <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
                One new system or improvement each month, maintenance, office hours, and a quarterly roadmap review.
                Month to month.
              </p>
              <Link className="pill pill-outline pill-sm mt-auto" href="/book">
                Book a free call
              </Link>
            </div>
          </div>
          <div className="m-bar [--n:4]" aria-hidden="true">
            <span />
          </div>
        </div>
        <p className="m-0 text-center text-[15px] text-muted">
          Prices depend on company size and scope. Pay for a year of the retainer up front and save{" "}
          <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[15]</span>
          %.
        </p>
      </div>
    </section>
  );
}

function ChangesPriceSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <h2 className="h2 text-center max-[640px]:text-left">
          What changes <span className="acc">the price</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-y-[28px] gap-x-[40px]">
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[52px] h-[52px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[18px] font-extrabold">Company size</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">More people and tools mean more to map.</p>
            </div>
          </div>
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[52px] h-[52px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="7" height="7" x="3" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="14" rx="1.5" />
                <rect width="7" height="7" x="3" y="14" rx="1.5" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[18px] font-extrabold">Number of systems</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">Each sprint covers two to four.</p>
            </div>
          </div>
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[52px] h-[52px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 3h20" />
                <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                <path d="m7 21 5-5 5 5" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[18px] font-extrabold">Training group size</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">Priced per cohort.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SoftwareAiUsageCostsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-y-[24px] gap-x-[48px] items-center [background:radial-gradient(90%_140%_at_100%_50%,rgba(191,219,254,0.55),rgba(255,255,255,0.7)_60%)]">
          <h2 className="h2">
            Software and <span className="acc">AI usage costs</span>
          </h2>
          <p className="lead">
            Some systems need software or AI usage billed monthly. We pass these through at cost and list them in every
            proposal, so you know the full price before you start.
          </p>
        </div>
      </div>
    </section>
  );
}

function OurGuaranteesSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Guarantees</span>
          <h2 className="h2">
            Our <span className="acc">guarantees</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[18px]">
            <div className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="stagetag">Audit</span>
              <p className="m-0 text-[17px] leading-[1.55] font-semibold">
                If it doesn&apos;t find at least{" "}
                <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 font-extrabold">[X]</span> hours a week of
                work AI can take on, we refund the fee.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] [background:radial-gradient(120%_100%_at_50%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="stagetag text-blue-700">Implementation</span>
              <p className="m-0 text-[17px] leading-[1.55] font-semibold">
                If a system doesn&apos;t work as specified, we fix it free.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(253,230,138,0.55),rgba(255,255,255,0.65)_55%)]">
              <span className="stagetag text-yellow-800">Training</span>
              <p className="m-0 text-[17px] leading-[1.55] font-semibold">
                If your team&apos;s AI use hasn&apos;t grown 30 days after training, we run a follow-up session free.
              </p>
            </div>
          </div>
          <div className="m-bar [--n:3]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingQuestionsSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">FAQ</span>
          <h2 className="h2">Pricing questions</h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
