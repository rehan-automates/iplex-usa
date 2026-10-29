import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { AgencyLeadForm } from "@/components/forms/agency-lead-form";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/agencies");

const FAQ_0: FaqItem[] = [
  {
    question: "Is the call really free?",
    answer: "Yes. Thirty minutes, no obligation.",
  },
  {
    question: "Will you try to sell me something?",
    answer: "We'll tell you honestly whether an audit makes sense. If it doesn't, we'll say so.",
  },
  {
    question: "Do I need to prepare anything?",
    answer: "No. Knowing your three most time-consuming tasks helps.",
  },
];

export default function AgencyLandingPage() {
  return (
    <>
      <JsonLd data={pageSchema("/agencies", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <WatchClientReportComeSection />
      <HappensNextSection />
      <TrustStripSection />
      <BeforeBookSection />
      <CtaBand
        title="Take on more clients without adding headcount."
        actions={[{ label: "Book my Opportunity Call", href: "#form" }]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(24px,4vw,48px)]" id="form">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] gap-[clamp(40px,5vw,72px)] items-start">
        <div className="flex flex-col gap-[24px] pt-[clamp(8px,2vw,32px)]">
          <span className="eyebrow rise">For marketing agencies</span>
          <h1 className="h1 rise d1">
            Take on more clients <span className="acc">without adding headcount.</span>
          </h1>
          <p className="lead rise d2">
            We find where your agency&apos;s hours go, build AI systems for reporting, onboarding, and content, and
            train your team to run them.
          </p>
          <ul className="rise d3 list-none m-0 p-0 flex flex-col gap-[12px]">
            <li className="flex items-start gap-[12px] text-[17px] leading-[1.5] font-semibold">
              <span className="flex-none w-[28px] h-[28px] mt-[1px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              Monthly client reports with the commentary already drafted.
            </li>
            <li className="flex items-start gap-[12px] text-[17px] leading-[1.5] font-semibold">
              <span className="flex-none w-[28px] h-[28px] mt-[1px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              New clients onboarded without the chasing.
            </li>
            <li className="flex items-start gap-[12px] text-[17px] leading-[1.5] font-semibold">
              <span className="flex-none w-[28px] h-[28px] mt-[1px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              One piece of content turned into every channel, in each client&apos;s voice.
            </li>
          </ul>
          <p className="m-0 flex flex-wrap items-center gap-[8px] text-[15px] text-muted font-semibold">
            Proof:
            <Link className="font-bold" href="/results">
              see a sample audit
            </Link>
            , or
            <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">
              [founding-client result once you have one]
            </span>
            .
          </p>
        </div>
        <AgencyLeadForm />
      </div>
    </section>
  );
}

function WatchClientReportComeSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col items-center gap-[28px]">
        <h2 className="h2 text-center max-[640px]:text-left">
          Watch a client report come together <span className="acc">in two minutes</span>
        </h2>
        <a
          className="relative w-full max-w-[960px] aspect-[16/9] rounded-[28px] overflow-hidden [background:linear-gradient(150deg,#0F1A16,#134E3A)] flex items-center justify-center no-underline shadow-[0_40px_80px_-40px_rgba(6,95,70,0.6)]"
          href="#video"
          aria-label="Play: a client report coming together in two minutes"
        >
          <div
            className="absolute left-[6%] top-[10%] w-[46%] h-[72%] rounded-[14px] bg-[rgba(255,255,255,0.06)] [border:1px_solid_rgba(255,255,255,0.1)] p-[18px] box-border flex flex-col gap-[10px]"
            aria-hidden="true"
          >
            <span className="h-[8px] w-[40%] rounded-[4px] bg-[rgba(255,255,255,0.35)]" />
            <span className="h-[6px] w-[90%] rounded-[4px] bg-[rgba(255,255,255,0.15)]" />
            <span className="h-[6px] w-[78%] rounded-[4px] bg-[rgba(255,255,255,0.15)]" />
            <span className="h-[6px] w-[84%] rounded-[4px] bg-[rgba(110,231,183,0.45)]" />
            <span className="h-[6px] w-[60%] rounded-[4px] bg-[rgba(110,231,183,0.45)]" />
          </div>
          <span className="relative w-[84px] h-[84px] rounded-full bg-white flex items-center justify-center shadow-[0_16px_32px_-12px_rgba(0,0,0,0.6)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#047857" aria-hidden="true">
              <polygon points="7 4 20 12 7 20 7 4" />
            </svg>
          </span>
          <span className="absolute right-[18px] bottom-[16px] py-[5px] px-[12px] rounded-full bg-[rgba(0,0,0,0.55)] text-white text-[13px] font-bold">
            2 min
          </span>
        </a>
      </div>
    </section>
  );
}

function HappensNextSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <h2 className="h2 text-center max-[640px]:text-left">
          What happens <span className="acc">next</span>
        </h2>
        <div className="relative">
          <div className="hide-sm absolute top-[22px] left-[16%] right-[16%] h-[2px] bg-[#C6E6D5]" aria-hidden="true" />
          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[28px]">
            <div className="flex flex-col items-center text-center gap-[12px]">
              <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                1
              </span>
              <p className="m-0 text-[17px] leading-[1.5] font-semibold max-w-[280px]">
                Pick a time on the next screen.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-[12px]">
              <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                2
              </span>
              <p className="m-0 text-[17px] leading-[1.5] font-semibold max-w-[280px]">
                We review your answers before the call.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-[12px]">
              <span className="w-[44px] h-[44px] rounded-full bg-amber-200 text-yellow-800 font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                3
              </span>
              <p className="m-0 text-[17px] leading-[1.5] font-semibold max-w-[300px]">
                In 30 minutes, you&apos;ll know where AI would save your agency the most time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStripSection() {
  return (
    <section className="sec pt-0">
      <div className="wrap">
        <div className="glass flex flex-wrap items-center justify-center gap-y-[12px] gap-x-[16px] py-[22px] px-[28px] rounded-[22px] text-center [background:radial-gradient(100%_200%_at_0%_50%,rgba(253,230,138,0.5),rgba(255,255,255,0.7)_60%)]">
          <span className="text-[17px] font-bold">Want to offer AI to your own clients?</span>
          <span className="text-[16px] text-muted">Ask us about the Agency Partner Program on your call.</span>
        </div>
      </div>
    </section>
  );
}

function BeforeBookSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <h2 className="h2 text-center max-[640px]:text-left">Before you book</h2>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
