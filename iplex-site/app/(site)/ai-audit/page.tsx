import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/ai-audit");

const FAQ_0: FaqItem[] = [
  {
    question: "Who needs to be involved?",
    answer: "Someone from leadership, plus three to five people who do the day-to-day work.",
  },
  {
    question: "Do we have to implement with you?",
    answer: "No. The roadmap is yours, whoever builds it.",
  },
  {
    question: "What do you need access to?",
    answer: "A look at your tools and examples of real work. We sign a data processing agreement first.",
  },
  {
    question: "How is this different from a free consultation?",
    answer: "A consultation tells you what's possible. The audit tells you what to build first, with your own numbers.",
  },
];

export default function AiAuditPage() {
  return (
    <>
      <JsonLd data={pageSchema("/ai-audit", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <MostAiProjectsStartSection />
      <AiOpportunityMapSection />
      <WholeClientLifecycleOneSection />
      <ThreeWeeksFewHoursSection />
      <OneFixedPriceOneSection />
      <QuestionsAboutAuditSection />
      <CtaBand
        title="Start with the map."
        description="Book a free 30-minute call. We'll tell you whether an audit makes sense for you, and what it would cost."
        actions={[
          { label: "Book a free call", href: "/book" },
          { label: "Get your AI score first", href: "/scorecard" },
        ]}
        textMaxWidth={640}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(32px,5vw,64px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[clamp(40px,6vw,80px)] items-center">
        <div className="flex flex-col gap-[24px]">
          <span className="eyebrow rise">AI Opportunity Audit</span>
          <h1 className="h1 rise d1">
            Know exactly where AI will <span className="acc">save your team time.</span>
          </h1>
          <p className="lead rise d2 max-w-[520px]">
            In two to three weeks, we map how you find, win, onboard, serve, and keep clients, then rank every task AI
            can take on by the hours it saves.
          </p>
          <div className="rise d3 flex flex-wrap items-center gap-y-[14px] gap-x-[24px]">
            <Link className="pill pill-primary" href="/book">
              Book a free call
            </Link>
            <Link className="textlink" href="/results">
              See a sample audit
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
          <p className="rise d3 m-0 flex items-center gap-[10px] text-[14.5px] text-muted font-semibold">
            <span className="py-[4px] px-[10px] rounded-full bg-amber-100 text-yellow-800 text-[12.5px] font-bold">
              From $2,500
            </span>
            Credited in full if you continue to implementation within 30 days.
          </p>
        </div>
        <div className="rise d2 relative">
          <div
            className="relative aspect-[5/4] rounded-[28px] overflow-hidden [background:linear-gradient(160deg,#E3F3EA,#D2E9DC)] flex flex-col items-center justify-center gap-[10px] text-[#3D5248] text-center p-[32px]"
            role="img"
            aria-label="Photo placeholder: your team at a whiteboard covered in sticky notes, grouped by lifecycle stage"
          >
            <div
              className="absolute inset-0 [background-image:radial-gradient(rgba(6,95,70,0.12)_1.2px,transparent_1.2px)] [background-size:22px_22px]"
              aria-hidden="true"
            />
            <svg
              className="relative"
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
            <span className="relative text-[15px] font-bold">Photo: a mapping session</span>
            <span className="relative text-[13px] max-w-[260px] leading-[1.5]">
              Your team at a whiteboard of sticky notes, grouped by lifecycle stage
            </span>
          </div>
          <span className="absolute top-[28px] left-[-14px] [transform:rotate(-4deg)] py-[10px] px-[14px] rounded-[6px] bg-amber-100 text-yellow-900 text-[13px] font-bold shadow-[0_12px_24px_-14px_rgba(0,0,0,0.35)]">
            Lead acquisition
          </span>{" "}
          <span className="absolute top-[44%] right-[-12px] [transform:rotate(3deg)] py-[10px] px-[14px] rounded-[6px] bg-emerald-100 text-emerald-800 text-[13px] font-bold shadow-[0_12px_24px_-14px_rgba(0,0,0,0.35)]">
            Onboarding
          </span>{" "}
          <span className="absolute bottom-[24px] left-[12%] [transform:rotate(-2deg)] py-[10px] px-[14px] rounded-[6px] bg-blue-100 text-blue-900 text-[13px] font-bold shadow-[0_12px_24px_-14px_rgba(0,0,0,0.35)]">
            Retention
          </span>
        </div>
      </div>
    </section>
  );
}

function MostAiProjectsStartSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col items-center text-center gap-[18px] max-w-[820px] m-head">
        <h2 className="h2">
          Most AI projects start with a tool. <span className="acc">Yours should start with a map.</span>
        </h2>
        <p className="lead max-w-[680px]">
          Buying licenses before you know where the hours go is how teams end up with AI tools nobody uses. The audit
          finds the work worth handing to AI first, so everything you spend after it goes somewhere measurable.
        </p>
      </div>
    </section>
  );
}

function AiOpportunityMapSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">What you get</span>
          <h2 className="h2">Your AI Opportunity Map</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))] gap-[28px] items-center">
          <div className="m-sw">
            <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-[16px]">
              <div className="glass lift flex flex-col gap-[12px] p-[26px] rounded-[24px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
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
                    <path d="M3 3v18h18" />
                    <path d="M7 16h4" />
                    <path d="M7 11h8" />
                    <path d="M7 6h12" />
                  </svg>
                </span>
                <h3 className="m-0 text-[18px] font-extrabold">Every opportunity, ranked.</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  Each task scored by hours saved per week, cost to build, and difficulty.
                </p>
              </div>
              <div className="glass lift flex flex-col gap-[12px] p-[26px] rounded-[24px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.65)_55%)]">
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
                    <path d="M4 22V4c4-2 8 2 12 0v10c-4 2-8-2-12 0" />
                  </svg>
                </span>
                <h3 className="m-0 text-[18px] font-extrabold">A 90-day roadmap.</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  Quick wins first, then the bigger systems, in the order that pays back fastest.
                </p>
              </div>
              <div className="glass lift flex flex-col gap-[12px] p-[26px] rounded-[24px] [background:radial-gradient(120%_100%_at_0%_100%,rgba(253,230,138,0.55),rgba(255,255,255,0.65)_55%)]">
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
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <h3 className="m-0 text-[18px] font-extrabold">A draft AI usage policy.</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  Which tools and data your team can use, written for your business.
                </p>
              </div>
              <div className="glass lift flex flex-col gap-[12px] p-[26px] rounded-[24px] [background:radial-gradient(120%_100%_at_100%_100%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
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
                    <path d="M2 3h20" />
                    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                    <path d="m7 21 5-5 5 5" />
                  </svg>
                </span>
                <h3 className="m-0 text-[18px] font-extrabold">A leadership readout.</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  A session walking through the findings and answering every question.
                </p>
              </div>
            </div>
            <div className="m-bar [--n:4]" aria-hidden="true">
              <span />
            </div>
          </div>
          <div
            className="relative h-[460px] m-mockup"
            role="img"
            aria-label="The sample audit, open to the ranked opportunities page"
          >
            <div className="absolute top-[30px] left-[4%] w-[48%] h-[380px] box-border [transform:rotate(-5deg)] bg-white rounded-[18px] shadow-[0_24px_50px_-28px_rgba(6,95,70,0.5)] p-[22px] flex flex-col gap-[10px]">
              <span className="text-[13px] font-extrabold tracking-[-0.03em]">
                <span className="text-emerald-600">i</span>Plex
              </span>
              <div className="flex-1" />
              <span className="self-start text-[10.5px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Sample
              </span>
              <span className="text-[22px] leading-[1.1] font-extrabold tracking-[-0.03em]">AI Opportunity Map</span>
              <span className="text-[11.5px] text-subtle font-semibold">Prepared for Example Co.</span>
            </div>
            <div className="absolute top-0 right-[2%] w-[58%] h-[420px] box-border [transform:rotate(3deg)] bg-white rounded-[18px] shadow-[0_30px_60px_-28px_rgba(6,95,70,0.55)] p-[24px] flex flex-col gap-[13px]">
              <span className="text-[14px] font-extrabold">Ranked opportunities</span>
              <span className="text-[11px] text-subtle font-semibold mt-[-6px]">
                Hours saved per week · cost · difficulty
              </span>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span>Client reports</span>
                  <span>12 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-full" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span>Proposal drafts</span>
                  <span>9 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-[75%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span>Onboarding chasers</span>
                  <span>7 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-[58%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span>Meeting notes to tasks</span>
                  <span>5 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-blue-300 w-[42%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[12px] font-semibold">
                  <span>Content repurposing</span>
                  <span>4 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-blue-300 w-[33%]" />
              </div>
              <span className="mt-auto self-start text-[10.5px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Example figures
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WholeClientLifecycleOneSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">What we look at</span>
          <h2 className="h2">
            Your whole client lifecycle, <span className="acc">in one map</span>
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-y-[32px] gap-x-[40px]">
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[48px] h-[48px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
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
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[17px] font-extrabold">Lead acquisition</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">
                How leads find you, and how fast they hear back.
              </p>
            </div>
          </div>
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[48px] h-[48px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="m9 10 2 2 4-4" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[17px] font-extrabold">Sales</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">
                Proposals, follow-ups, and how call notes reach your CRM.
              </p>
            </div>
          </div>
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[48px] h-[48px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
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
                <circle cx="7.5" cy="15.5" r="5.5" />
                <path d="m21 2-9.6 9.6" />
                <path d="m15.5 7.5 3 3L22 7l-3-3" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[17px] font-extrabold">Onboarding</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">Intake, access requests, and first briefs.</p>
            </div>
          </div>
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[48px] h-[48px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
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
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[17px] font-extrabold">Delivery</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">
                First drafts, brand voice, and quality checks.
              </p>
            </div>
          </div>
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[48px] h-[48px] rounded-full bg-white text-emerald-700 shadow-[0_0_0_1px_#D5E2DB] flex items-center justify-center">
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
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[17px] font-extrabold">Retention</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">
                Reports, check-ins, and early warning signs.
              </p>
            </div>
          </div>
          <div className="flex gap-[16px] items-start">
            <span className="flex-none w-[48px] h-[48px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
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
                <path d="M21 4h-7" />
                <path d="M10 4H3" />
                <path d="M21 12h-9" />
                <path d="M8 12H3" />
                <path d="M21 20h-5" />
                <path d="M12 20H3" />
                <path d="M14 2v4" />
                <path d="M8 10v4" />
                <path d="M16 18v4" />
              </svg>
            </span>
            <div className="flex flex-col gap-[4px]">
              <h3 className="m-0 text-[17px] font-extrabold">Operations</h3>
              <p className="m-0 text-[15.5px] leading-[1.55] text-muted">Meetings, internal knowledge, and admin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeWeeksFewHoursSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">How it works</span>
          <h2 className="h2">
            Three weeks, <span className="acc">a few hours of your team&apos;s time</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
            <div className="glass flex flex-col gap-[12px] p-[30px] rounded-[28px]">
              <div className="flex items-center gap-[12px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[17px] font-extrabold flex items-center justify-center">
                  1
                </span>
                <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">Week 1</span>
              </div>
              <h3 className="mt-[4px] mb-0 mx-0 text-[22px] font-extrabold tracking-[-0.02em]">
                Interviews and mapping
              </h3>
              <p className="m-0 text-[15.5px] leading-[1.65] text-muted">
                We talk to leadership and three to five people who do the daily work, and map how work really moves.
              </p>
            </div>
            <div className="glass flex flex-col gap-[12px] p-[30px] rounded-[28px]">
              <div className="flex items-center gap-[12px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[17px] font-extrabold flex items-center justify-center">
                  2
                </span>
                <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">Week 2</span>
              </div>
              <h3 className="mt-[4px] mb-0 mx-0 text-[22px] font-extrabold tracking-[-0.02em]">Tools and scoring</h3>
              <p className="m-0 text-[15.5px] leading-[1.65] text-muted">
                We review your tools and real examples of work, then score every opportunity.
              </p>
            </div>
            <div className="glass flex flex-col gap-[12px] p-[30px] rounded-[28px]">
              <div className="flex items-center gap-[12px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[17px] font-extrabold flex items-center justify-center">
                  3
                </span>
                <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">Week 3</span>
              </div>
              <h3 className="mt-[4px] mb-0 mx-0 text-[22px] font-extrabold tracking-[-0.02em]">Roadmap and readout</h3>
              <p className="m-0 text-[15.5px] leading-[1.65] text-muted">
                We present your Opportunity Map and agree on next steps.
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

function OneFixedPriceOneSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <h2 className="h2 text-center max-[640px]:text-left">
          One fixed price. <span className="acc">One guarantee.</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[22px]">
          <div className="glass flex flex-col gap-[14px] p-[36px] rounded-[28px] [background:radial-gradient(110%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.7)_60%)]">
            <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">Price</span>
            <span className="text-[length:clamp(40px,4.4vw,56px)] font-extrabold tracking-[-0.04em] leading-[1]">
              From $2,500
            </span>
            <p className="m-0 text-[16px] leading-[1.6] text-muted">
              Depending on company size. Credited in full toward implementation if you sign within 30 days.
            </p>
            <span className="self-start py-[5px] px-[12px] rounded-full bg-amber-100 text-yellow-800 text-[13px] font-bold">
              100% credited toward step 2
            </span>
          </div>
          <div className="glass flex flex-col gap-[14px] p-[36px] rounded-[28px] [background:radial-gradient(110%_100%_at_100%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.7)_60%)]">
            <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-blue-700">Guarantee</span>
            <span className="w-[56px] h-[56px] rounded-[18px] bg-white text-blue-600 flex items-center justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <p className="m-0 text-[19px] leading-[1.5] font-semibold">
              If the audit doesn&apos;t find at least{" "}
              <span className="py-0 px-[5px] rounded-[4px] bg-yellow-200 font-extrabold">[X]</span> hours a week of work
              AI can take on, we refund the fee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionsAboutAuditSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">FAQ</span>
          <h2 className="h2">Questions about the audit</h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
