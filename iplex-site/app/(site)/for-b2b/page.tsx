import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/for-b2b");

const FAQ_0: FaqItem[] = [
  {
    question: "Do we need a technical team?",
    answer: "No. We build, document, and train your people to run it.",
  },
  {
    question: "Which tools do you work with?",
    answer: "Google Workspace or Microsoft 365, your CRM, project tools, and Slack or Teams.",
  },
  {
    question: "Where do we start?",
    answer: "Take the scorecard, or book a call. We usually recommend starting with the audit.",
  },
  {
    question: "What does it cost?",
    answer: "Audits start at $2,500, credited toward implementation.",
  },
];

export default function ForB2bPage() {
  return (
    <>
      <JsonLd data={pageSchema("/for-b2b", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <WhereB2bTeamsLoseSection />
      <AiSystemsEveryStageSection />
      <BuiltProfessionalServicesTooSection />
      <ConfidentialWorkStaysConfidentialSection />
      <QuestionsB2bTeamsAskSection />
      <CtaBand
        title="Find out where AI fits in your company."
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
    <section className="sec pt-[clamp(32px,5vw,64px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[clamp(40px,6vw,80px)] items-center">
        <div className="flex flex-col gap-[24px]">
          <span className="eyebrow rise">For B2B companies</span>
          <h1 className="h1 rise d1">
            Give your team <span className="acc">hours back</span> every week.
          </h1>
          <p className="lead rise d2 max-w-[520px]">
            We build AI systems for B2B service companies and professional services firms, from first lead to renewal,
            and train your people to run them.
          </p>
          <div className="rise d3 flex flex-wrap items-center gap-y-[14px] gap-x-[24px]">
            <Link className="pill pill-primary" href="/scorecard">
              Get your AI score
            </Link>
            <Link className="textlink" href="/book">
              or book a free call
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="rise d2 relative">
          <div
            className="photo aspect-[5/4]"
            role="img"
            aria-label="Photo placeholder: a small team reviewing a proposal together at a table"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span className="text-[15px] font-bold">Photo: a small team at a table</span>
            <span className="text-[13px] max-w-[260px] leading-[1.5]">Reviewing a proposal together</span>
          </div>
          <div className="glass absolute top-[28px] left-[-16px] flex items-center gap-[10px] py-[10px] pr-[16px] pl-[10px] rounded-full text-[13.5px] font-bold">
            <span className="w-[28px] h-[28px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
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
            Proposal first draft ready
          </div>
          <div className="glass absolute bottom-[28px] right-[-16px] flex items-center gap-[10px] py-[10px] pr-[16px] pl-[10px] rounded-full text-[13.5px] font-bold">
            <span className="w-[28px] h-[28px] rounded-full bg-amber-200 text-yellow-800 flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </span>
            Your team reviews it
          </div>
        </div>
      </div>
    </section>
  );
}

function WhereB2bTeamsLoseSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Where time goes</span>
          <h2 className="h2">
            Where B2B teams <span className="acc">lose time</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-y-0 gap-x-[48px]">
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:2px_solid_#101814]">
              <span className="stagetag">Sales</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                Proposals and RFP answers rewritten from scratch.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:2px_solid_#101814]">
              <span className="stagetag">Onboarding</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                New customers wait while your team gathers information by email.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:1px_solid_#C9DCD2]">
              <span className="stagetag">Retention</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                Leadership updates and customer reports assembled by hand every week.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:1px_solid_#C9DCD2]">
              <span className="stagetag text-blue-700">Operations</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                The answer exists somewhere, but nobody can find it.
              </p>
            </div>
          </div>
          <div className="m-bar [--n:4]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function AiSystemsEveryStageSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Systems for B2B teams</span>
          <h2 className="h2">
            AI systems for every stage of <span className="acc">your client lifecycle</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="glass m-slide m-table rounded-[28px] py-[8px] px-[clamp(20px,3vw,36px)]">
            <div className="row-t pt-[18px] pb-[14px] text-[12.5px] font-bold tracking-[.06em] uppercase text-subtle">
              <span>Stage</span>
              <span>What we build for B2B teams</span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Lead acquisition</span>
              <span className="text-[16px] leading-[1.55]">
                Talks, articles, and case studies turned into posts and sales emails
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Sales</span>
              <span className="text-[16px] leading-[1.55]">
                Proposals and RFP answers drafted from your library of past work
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Onboarding</span>
              <span className="text-[16px] leading-[1.55]">
                Welcome steps, setup, and a clean handoff from sales to delivery
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Delivery</span>
              <span className="text-[16px] leading-[1.55]">
                First drafts of the documents your team produces every week
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Retention</span>
              <span className="text-[16px] leading-[1.55]">
                Customer reports that explain results, and alerts when an account goes quiet
              </span>
            </div>
            <div className="row-t items-center border-b-0">
              <span className="stagetag text-blue-700">Operations</span>
              <span className="text-[16px] leading-[1.55]">
                An internal assistant that answers from your own documents
              </span>
            </div>
          </div>
          <div className="m-bar [--n:6]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function BuiltProfessionalServicesTooSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Professional services</span>
          <h2 className="h2">
            Built for professional services, <span className="acc">too</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[18px]">
            <div className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[46px] h-[46px] rounded-[14px] bg-white text-emerald-600 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="16" height="20" x="4" y="2" rx="2" />
                  <path d="M8 6h8" />
                  <path d="M16 14v4" />
                  <path d="M16 10h.01" />
                  <path d="M12 10h.01" />
                  <path d="M8 10h.01" />
                  <path d="M12 14h.01" />
                  <path d="M8 14h.01" />
                  <path d="M12 18h.01" />
                  <path d="M8 18h.01" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Accounting firms</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Document intake, summaries, and routine client correspondence.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] [background:radial-gradient(120%_100%_at_50%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[46px] h-[46px] rounded-[14px] bg-white text-blue-600 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="M7 21h10" />
                  <path d="M12 3v18" />
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Law firms</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Intake, first drafts of routine documents, and matter summaries, always reviewed by your lawyers.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(253,230,138,0.55),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[46px] h-[46px] rounded-[14px] bg-white text-yellow-600 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Consultancies and recruiters</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Proposals, research summaries, and client or candidate updates.
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

function ConfidentialWorkStaysConfidentialSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[40px] items-center [background:radial-gradient(90%_120%_at_0%_50%,rgba(191,219,254,0.6),rgba(255,255,255,0.7)_60%)]">
          <div className="flex flex-col gap-[18px]">
            <span className="w-[60px] h-[60px] rounded-[18px] bg-white text-blue-600 flex items-center justify-center shadow-[0_12px_24px_-14px_rgba(37,99,235,0.5)]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <h2 className="h2">
              Confidential work <span className="acc">stays confidential.</span>
            </h2>
            <p className="lead">
              We use business-grade AI tools set so your data isn&apos;t used for training, sign a data processing
              agreement, and limit access to what each project needs. For regulated work, we sign the agreements your
              industry requires, such as a Business Associate Agreement for healthcare.
            </p>
            <Link className="textlink" href="/trust">
              How we protect your data
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[14px] py-[18px] px-[20px] rounded-[18px] bg-[rgba(255,255,255,0.85)]">
              <span className="flex-none w-[30px] h-[30px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
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
              <span className="text-[16px] font-bold">Your data isn&apos;t used to train models</span>
            </div>
            <div className="flex items-center gap-[14px] py-[18px] px-[20px] rounded-[18px] bg-[rgba(255,255,255,0.85)]">
              <span className="flex-none w-[30px] h-[30px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
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
              <span className="text-[16px] font-bold">A signed data processing agreement</span>
            </div>
            <div className="flex items-center gap-[14px] py-[18px] px-[20px] rounded-[18px] bg-[rgba(255,255,255,0.85)]">
              <span className="flex-none w-[30px] h-[30px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
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
              <span className="text-[16px] font-bold">Access limited to what each project needs</span>
            </div>
            <div className="flex items-center gap-[14px] py-[18px] px-[20px] rounded-[18px] bg-[rgba(255,255,255,0.85)]">
              <span className="flex-none w-[30px] h-[30px] rounded-full bg-blue-600 text-white flex items-center justify-center">
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
              <span className="text-[16px] font-bold">Industry agreements, such as a BAA for healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionsB2bTeamsAskSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">FAQ</span>
          <h2 className="h2">Questions B2B teams ask</h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
