import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { Faq, type FaqItem } from "@/components/faq";
import { HeroTodoList } from "@/components/home/hero-todo-list";
import { LifecycleExplorer } from "@/components/home/lifecycle-explorer";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/");

const FAQ_0: FaqItem[] = [
  {
    question: "Will AI replace my team?",
    answer: "No. It takes the repetitive work, so your people can do more of the work only people can do.",
  },
  {
    question: "Is our client data safe?",
    answer:
      "Yes. We use business-grade tools, sign a data processing agreement, and give access only where it's needed.",
  },
  {
    question: "We already pay for ChatGPT or Copilot. Why do we need you?",
    answer:
      "Licenses don't change how work gets done. We connect AI to your real processes and train your team to use it.",
  },
  {
    question: "Is this just Zapier or spreadsheet automation?",
    answer:
      "No. Simple automations move data between apps. We build AI systems that read, write, and summarize using your content and brand voice, with your team approving what goes out.",
  },
];

const GLOWS = [
  {
    top: -220,
    left: -200,
    size: 720,
    color: "rgba(110,231,183,0.45)",
  },
  {
    top: 80,
    right: -260,
    size: 820,
    color: "rgba(167,243,208,0.55)",
  },
  {
    top: 1500,
    left: -300,
    size: 760,
    color: "rgba(191,219,254,0.45)",
  },
  {
    top: 3100,
    right: -280,
    size: 760,
    color: "rgba(253,230,138,0.4)",
  },
  {
    top: 4700,
    left: -260,
    size: 760,
    color: "rgba(110,231,183,0.35)",
  },
  {
    top: 6000,
    right: -260,
    size: 760,
    color: "rgba(191,219,254,0.4)",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={pageSchema("/", { faqs: [...FAQ_0] })} />
      <Glows spots={GLOWS} />
      <Hero />
      <SoundFamiliarSection />
      <WhatWeBuildSection />
      <HowItWorksSection />
      <ProofSection />
      <SameTeamMoreDoneSection />
      <NoSurprisesSection />
      <FaqSection />
      <ScorecardCtaSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative z-[1] pt-[clamp(32px,5vw,64px)] pb-[clamp(64px,8vw,112px)] px-0" id="top">
      <div className="max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)] grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[clamp(48px,6vw,80px)] items-center">
        <div className="flex flex-col gap-[26px] min-w-0">
          <span className="eyebrow rise self-start">
            <span className="w-[7px] h-[7px] rounded-full bg-emerald-500" aria-hidden="true" />
            AI systems for agencies and B2B teams
          </span>
          <h1 className="rise d1 m-0 text-[length:clamp(44px,5.6vw,74px)] leading-[1.06] tracking-[-0.04em] font-extrabold text-balance">
            Stop rebuilding the <em className="italic text-emerald-600">same work</em> every week.
          </h1>
          <p className="rise d2 m-0 max-w-[500px] text-[17px] leading-[1.7] text-muted">
            We build AI systems that help you find, win, onboard, serve, and keep clients, then train your team to run
            them. Same team. More done.
          </p>
          <div className="rise d3 flex flex-wrap items-center gap-y-[16px] gap-x-[24px]">
            <Link className="pill pill-primary" href="/scorecard">
              Get your AI score
            </Link>
            <a className="playlink" href="#how">
              <span className="w-[48px] h-[48px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(5,150,105,0.7)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="7 4 20 12 7 20 7 4" />
                </svg>
              </span>
              See how it works
            </a>
          </div>
          <div className="rise d4 flex flex-wrap items-center gap-y-[8px] gap-x-[16px] text-[14px] text-muted font-semibold">
            <span className="inline-flex items-center gap-[6px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Free scorecard
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Five minutes
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Instant results
            </span>
          </div>
        </div>
        <div className="rise d2 relative min-w-0 flex justify-center py-[24px] px-0">
          <HeroTodoList />
          <div className="b1 glass absolute top-0 left-[-18px] flex items-center gap-[8px] py-[8px] pr-[14px] pl-[8px] rounded-full text-[13px] font-bold whitespace-nowrap pointer-events-none">
            <span className="w-[24px] h-[24px] rounded-full bg-amber-200 text-yellow-800 flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            Rebuilt by hand, every week
          </div>
          <span className="absolute right-[8px] bottom-0 text-[12px] text-subtle font-semibold pointer-events-none">
            <span className="max-[640px]:hidden">Click</span>
            <span className="hidden max-[640px]:inline">Tap</span> to replay
          </span>
        </div>
      </div>
    </section>
  );
}

function SoundFamiliarSection() {
  return (
    <section className="relative z-[1] py-[clamp(48px,7vw,96px)] px-0" id="who">
      <div className="max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)] flex flex-col gap-[48px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <h2 className="m-0 max-w-[620px] text-[length:clamp(32px,3.8vw,46px)] leading-[1.15] tracking-[-0.035em] font-extrabold text-balance">
            Sound familiar?
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-muted">
            None of this needs more people. It needs better systems.
          </p>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
            <div className="glass lift flex flex-col items-center text-center gap-[14px] py-[36px] px-[28px] rounded-[28px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.6)_0%,rgba(255,255,255,0.65)_55%)]">
              <span className="w-[56px] h-[56px] rounded-[18px] bg-white text-emerald-600 flex items-center justify-center shadow-[0_10px_20px_-12px_rgba(5,150,105,0.5)]">
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
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                </svg>
              </span>
              <h3 className="m-0 text-[20px] font-extrabold tracking-[-0.02em]">One webinar, still one webinar</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">
                You recorded a great webinar in March. It&apos;s still just one webinar.
              </p>
            </div>
            <div className="glass lift flex flex-col items-center text-center gap-[14px] py-[36px] px-[28px] rounded-[28px] [background:radial-gradient(120%_100%_at_50%_0%,rgba(191,219,254,0.65)_0%,rgba(255,255,255,0.65)_55%)]">
              <span className="w-[56px] h-[56px] rounded-[18px] bg-white text-blue-600 flex items-center justify-center shadow-[0_10px_20px_-12px_rgba(37,99,235,0.5)]">
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
                  <circle cx="7.5" cy="15.5" r="5.5" />
                  <path d="m21 2-9.6 9.6" />
                  <path d="m15.5 7.5 3 3L22 7l-3-3" />
                </svg>
              </span>
              <h3 className="m-0 text-[20px] font-extrabold tracking-[-0.02em]">Still chasing logins</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">
                A new client signed on Monday. By Thursday, you&apos;re still chasing logins and brand files.
              </p>
            </div>
            <div className="glass lift flex flex-col items-center text-center gap-[14px] py-[36px] px-[28px] rounded-[28px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(253,230,138,0.6)_0%,rgba(255,255,255,0.65)_55%)]">
              <span className="w-[56px] h-[56px] rounded-[18px] bg-white text-yellow-600 flex items-center justify-center shadow-[0_10px_20px_-12px_rgba(202,138,4,0.5)]">
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
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <h3 className="m-0 text-[20px] font-extrabold tracking-[-0.02em]">Reports nobody opens</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">
                A client stopped opening your reports in March. You found out when they cancelled in June.
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

function WhatWeBuildSection() {
  return (
    <section className="relative z-[1] py-[clamp(48px,7vw,96px)] px-0" id="services">
      <div className="max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)]">
        <div className="flex flex-col items-center text-center gap-[16px] max-w-[720px] mt-0 mb-[48px] mx-auto m-head max-[640px]:mb-[28px]">
          <span className="eyebrow self-auto">What we build</span>
          <h2 className="m-0 text-[length:clamp(32px,3.8vw,46px)] leading-[1.15] tracking-[-0.035em] font-extrabold">
            From first lead to renewal
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-muted">
            We build AI systems for every stage of your client lifecycle, plus the operations that hold it together.
            Your audit shows where to start.
          </p>
        </div>
        <LifecycleExplorer />
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="relative z-[1] py-[clamp(48px,7vw,96px)] px-0" id="how">
      <div
        className="max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)] flex flex-col gap-[48px] max-[640px]:gap-[28px]"
        id="pricing"
      >
        <div className="flex flex-col items-center text-center gap-[16px] m-head">
          <span className="eyebrow self-auto">How it works</span>
          <h2 className="m-0 text-[length:clamp(32px,3.8vw,46px)] leading-[1.15] tracking-[-0.035em] font-extrabold">
            Find it. Build it. <em className="italic text-emerald-600">Make it stick.</em>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
            <div className="glass lift flex flex-col gap-[14px] py-[32px] px-[30px] rounded-[28px]">
              <div className="flex items-center gap-[12px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[17px] font-extrabold flex items-center justify-center">
                  1
                </span>
                <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">
                  AI Opportunity Audit
                </span>
              </div>
              <h3 className="mt-[4px] mb-0 mx-0 text-[28px] font-extrabold tracking-[-0.03em]">Find it</h3>
              <p className="m-0 text-[15.5px] leading-[1.65] text-muted">
                In two to three weeks, we map your client lifecycle, from first lead to renewal, and rank every task AI
                can take on, by hours saved.
              </p>
              <p className="m-0 text-[15px] leading-[1.5]">
                <strong>You get:</strong> a 90-day roadmap, quick wins first.
              </p>
              <div className="mt-auto pt-[16px] [border-top:1px_solid_rgba(16,24,20,0.08)] flex flex-wrap items-center gap-[10px]">
                <span className="text-[22px] font-extrabold">From $2,500</span>
                <span className="text-[12.5px] font-bold py-[4px] px-[10px] rounded-full bg-amber-100 text-yellow-800">
                  Credited toward step 2
                </span>
              </div>
            </div>
            <div className="glass lift flex flex-col gap-[14px] py-[32px] px-[30px] rounded-[28px]">
              <div className="flex items-center gap-[12px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[17px] font-extrabold flex items-center justify-center">
                  2
                </span>
                <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">
                  Implementation sprints
                </span>
              </div>
              <h3 className="mt-[4px] mb-0 mx-0 text-[28px] font-extrabold tracking-[-0.03em]">Build it</h3>
              <p className="m-0 text-[15.5px] leading-[1.65] text-muted">
                We build two to four AI systems at a time, test them with your team, and hand them over working.
              </p>
              <p className="m-0 text-[15px] leading-[1.5]">
                <strong>You get:</strong> working AI systems, fully documented.
              </p>
              <div className="mt-auto pt-[16px] [border-top:1px_solid_rgba(16,24,20,0.08)] flex flex-wrap items-baseline gap-[8px]">
                <span className="text-[22px] font-extrabold">From $7,500</span>
                <span className="text-[14px] text-muted font-semibold">per sprint</span>
              </div>
            </div>
            <div className="glass lift flex flex-col gap-[14px] py-[32px] px-[30px] rounded-[28px]">
              <div className="flex items-center gap-[12px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[17px] font-extrabold flex items-center justify-center">
                  3
                </span>
                <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">
                  AI team training
                </span>
              </div>
              <h3 className="mt-[4px] mb-0 mx-0 text-[28px] font-extrabold tracking-[-0.03em]">Make it stick</h3>
              <p className="m-0 text-[15.5px] leading-[1.65] text-muted">
                We train each role on the new workflows and on using AI in their daily work.
              </p>
              <p className="m-0 text-[15px] leading-[1.5]">
                <strong>You get:</strong> playbooks, an AI usage policy, and monthly office hours.
              </p>
              <div className="mt-auto pt-[16px] [border-top:1px_solid_rgba(16,24,20,0.08)] flex flex-wrap items-baseline gap-[8px]">
                <span className="text-[22px] font-extrabold">From $2,500</span>
              </div>
            </div>
          </div>
          <div className="m-bar [--n:3]" aria-hidden="true">
            <span />
          </div>
        </div>
        <div className="flex justify-center">
          <Link className="pill pill-primary" href="/book">
            Start with step 1: book a free call
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="relative z-[1] py-[clamp(48px,7vw,96px)] px-0" id="results">
      <div className="max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)]">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-[48px] items-center [background:radial-gradient(90%_120%_at_100%_50%,rgba(167,243,208,0.55),rgba(255,255,255,0.7)_60%)]">
          <div className="flex flex-col gap-[20px] items-start">
            <span className="eyebrow self-auto">Proof</span>
            <h2 className="m-0 text-[length:clamp(32px,3.8vw,46px)] leading-[1.12] tracking-[-0.035em] font-extrabold text-balance">
              See an audit <em className="italic text-emerald-600">before you buy one.</em>
            </h2>
            <p className="m-0 text-[17px] leading-[1.65] text-muted">
              This is a sample AI Opportunity Map for an example business. Yours will look like this, with your tasks,
              your hours, and your roadmap.
            </p>
            <div className="flex flex-wrap items-center gap-y-[16px] gap-x-[24px]">
              <Link className="pill pill-primary" href="/results">
                View the sample
              </Link>
              <a className="playlink" href="#walkthrough">
                <span className="w-[44px] h-[44px] rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-[0_8px_18px_-10px_rgba(6,95,70,0.5)]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="7 4 20 12 7 20 7 4" />
                  </svg>
                </span>
                Watch the two-minute walkthrough
              </a>
            </div>
            <span className="text-[13px] text-subtle">
              Sample using an example business. Client results will appear here as we publish them.
            </span>
          </div>
          <div
            className="relative h-[420px] m-mockup"
            role="img"
            aria-label="Three pages of a sample AI Opportunity Map"
          >
            <div className="absolute top-[30px] left-[6%] w-[52%] h-[340px] box-border [transform:rotate(-6deg)] bg-white rounded-[18px] shadow-[0_24px_50px_-28px_rgba(6,95,70,0.5)] p-[22px] flex flex-col gap-[10px]">
              <div className="flex items-center gap-[7px] text-[13px] font-extrabold tracking-[-0.03em]">
                <svg width="18" height="18" viewBox="0 0 40 40" aria-hidden="true">
                  <rect width="40" height="40" rx="11" fill="#047857" />
                  <path
                    d="M27.7 10.8A12 12 0 1 1 17.9 8.2"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.9 5.6 19.4 8 16.8 10.4"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="18.4" y="17.5" width="3.2" height="9" rx="1.6" fill="#FFFFFF" />
                  <circle cx="20" cy="13.6" r="2.4" fill="#FDE68A" />
                </svg>
                <span>
                  <span className="text-emerald-600">i</span>Plex
                </span>
              </div>
              <div className="flex-1" />
              <span className="self-start text-[10.5px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Sample
              </span>
              <span className="text-[22px] leading-[1.1] font-extrabold tracking-[-0.03em]">AI Opportunity Map</span>
              <span className="text-[11.5px] text-subtle font-semibold">Prepared for Example Co.</span>
            </div>
            <div className="absolute top-0 right-[4%] w-[56%] h-[380px] box-border [transform:rotate(3deg)] bg-white rounded-[18px] shadow-[0_30px_60px_-28px_rgba(6,95,70,0.55)] p-[22px] flex flex-col gap-[12px]">
              <span className="text-[13.5px] font-extrabold">Ranked opportunities</span>
              <span className="text-[11px] text-subtle font-semibold mt-[-6px]">Hours saved per week</span>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Client reports</span>
                  <span>12</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-full" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Proposal drafts</span>
                  <span>9</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-[75%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Onboarding chasers</span>
                  <span>7</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-[58%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Meeting notes to tasks</span>
                  <span>5</span>
                </div>
                <span className="h-[8px] rounded-full bg-blue-300 w-[42%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Content repurposing</span>
                  <span>4</span>
                </div>
                <span className="h-[8px] rounded-full bg-blue-300 w-[33%]" />
              </div>
              <span className="mt-auto self-start text-[10.5px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Example figures
              </span>
            </div>
            <a
              className="absolute left-[14%] bottom-0 w-[200px] aspect-[16/10] rounded-[18px] bg-charcoal [border:4px_solid_#FFFFFF] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center no-underline"
              id="walkthrough"
              href="#walkthrough"
              aria-label="Watch the two-minute walkthrough"
            >
              <span className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#047857"
                  stroke="#047857"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="7 4 20 12 7 20 7 4" />
                </svg>
              </span>
              <span className="absolute left-[12px] bottom-[9px] text-[11.5px] font-bold text-white">
                Walkthrough · 2 min
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SameTeamMoreDoneSection() {
  return (
    <section className="relative z-[1] py-[clamp(48px,7vw,96px)] px-0">
      <div className="max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-y-[16px] gap-x-[48px] items-end mb-[56px] max-[640px]:mb-[28px]">
          <div className="flex flex-col gap-[16px] items-start">
            <span className="eyebrow self-auto">Augment, not replace</span>
            <h2 className="m-0 text-[length:clamp(36px,4.6vw,60px)] leading-[1.02] tracking-[-0.045em] font-extrabold">
              Same team. <em className="italic text-emerald-600">More done.</em>
            </h2>
          </div>
          <p className="m-0 text-[18px] leading-[1.65] text-graphite">
            AI handles the follow-ups, the first drafts, and the report writing. Your people keep the strategy, the
            creative calls, and the client relationships.{" "}
            <strong className="text-charcoal">
              We don&apos;t sell headcount cuts. We give your team its hours back.
            </strong>
          </p>
        </div>
        <div className="m-sw">
          <div className="m-slide m-wide grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] gap-y-[40px] gap-x-[56px]">
            <div
              className="flex flex-col gap-[12px]"
              role="img"
              aria-label="A work week before: packed with lead follow-ups, proposal drafts, onboarding docs, and report writing"
            >
              <div className="flex justify-between items-baseline gap-[12px] pb-[10px] [border-bottom:1px_solid_#D9E6DF]">
                <span className="text-[18px] font-extrabold">Before</span>
                <span className="text-[13px] text-subtle font-semibold">One person&apos;s week</span>
              </div>
              <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[8px] text-[12px] font-bold text-subtle">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
              <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[8px] h-[280px]">
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_80px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Lead follow-ups
                  </div>
                  <div className="flex-[0_0_96px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Report writing
                  </div>
                  <div className="flex-[0_0_72px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Proposal drafts
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_104px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Proposal drafts
                  </div>
                  <div className="flex-[0_0_80px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Onboarding docs
                  </div>
                  <div className="flex-[0_0_64px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Lead follow-ups
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_120px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Report writing
                  </div>
                  <div className="flex-[0_0_64px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Lead follow-ups
                  </div>
                  <div className="flex-[0_0_64px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Onboarding docs
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_88px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Onboarding docs
                  </div>
                  <div className="flex-[0_0_88px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Proposal drafts
                  </div>
                  <div className="flex-[0_0_72px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Report writing
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_128px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Report writing
                  </div>
                  <div className="flex-[0_0_56px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Lead follow-ups
                  </div>
                  <div className="flex-[0_0_64px] rounded-[8px] bg-sage py-[6px] px-[8px] text-[11.5px] font-semibold leading-[1.25] text-graphite overflow-hidden">
                    Proposal drafts
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-[12px]"
              role="img"
              aria-label="The same week after: admin shrinks to slivers, while client strategy, creative work, and new business grow"
            >
              <div className="flex flex-wrap justify-between items-baseline gap-y-[8px] gap-x-[12px] pb-[10px] [border-bottom:1px_solid_#D9E6DF]">
                <span className="text-[18px] font-extrabold text-emerald-700">After</span>
                <span className="flex flex-wrap gap-y-[6px] gap-x-[12px] text-[12px] font-semibold text-graphite">
                  <span className="inline-flex items-center gap-[5px]">
                    <span className="w-[9px] h-[9px] rounded-[3px] bg-sage" />
                    Admin
                  </span>
                  <span className="inline-flex items-center gap-[5px]">
                    <span className="w-[9px] h-[9px] rounded-[3px] bg-emerald-300" />
                    Client strategy
                  </span>
                  <span className="inline-flex items-center gap-[5px]">
                    <span className="w-[9px] h-[9px] rounded-[3px] bg-blue-300" />
                    Creative
                  </span>
                  <span className="inline-flex items-center gap-[5px]">
                    <span className="w-[9px] h-[9px] rounded-[3px] bg-amber-300" />
                    New business
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[8px] text-[12px] font-bold text-subtle">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
              <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[8px] h-[280px]">
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                  <div className="flex-[0_0_100px] rounded-[8px] bg-emerald-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-emerald-800 overflow-hidden">
                    Client strategy
                  </div>
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                  <div className="flex-[0_0_92px] rounded-[8px] bg-blue-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-blue-800 overflow-hidden">
                    Creative work
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                  <div className="flex-[0_0_116px] rounded-[8px] bg-blue-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-blue-800 overflow-hidden">
                    Creative work
                  </div>
                  <div className="flex-[0_0_76px] rounded-[8px] bg-amber-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-yellow-800 overflow-hidden">
                    New business
                  </div>
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                  <div className="flex-[0_0_84px] rounded-[8px] bg-emerald-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-emerald-800 overflow-hidden">
                    Client strategy
                  </div>
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                  <div className="flex-[0_0_100px] rounded-[8px] bg-amber-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-yellow-800 overflow-hidden">
                    New business
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_108px] rounded-[8px] bg-blue-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-blue-800 overflow-hidden">
                    Creative work
                  </div>
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                  <div className="flex-[0_0_84px] rounded-[8px] bg-emerald-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-emerald-800 overflow-hidden">
                    Client strategy
                  </div>
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                  <div className="flex-[0_0_92px] rounded-[8px] bg-amber-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-yellow-800 overflow-hidden">
                    New business
                  </div>
                  <div className="flex-[0_0_76px] rounded-[8px] bg-blue-100 py-[6px] px-[8px] text-[11.5px] font-bold leading-[1.25] text-blue-800 overflow-hidden">
                    Creative work
                  </div>
                  <div className="flex-[0_0_10px] rounded-[4px] bg-sage" />
                </div>
              </div>
            </div>
          </div>
          <div className="m-bar [--n:2]" aria-hidden="true">
            <span />
          </div>
        </div>
        <p className="mt-[20px] mb-0 mx-0 text-[13.5px] text-subtle">Illustration, not a client result.</p>
      </div>
    </section>
  );
}

function NoSurprisesSection() {
  return (
    <section className="relative z-[1] py-[clamp(48px,7vw,96px)] px-0" id="trust">
      <div className="max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)] flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <h2 className="m-0 text-center max-[640px]:text-left text-[length:clamp(32px,3.8vw,46px)] leading-[1.15] tracking-[-0.035em] font-extrabold">
          No surprises.
        </h2>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
            <div className="glass lift flex flex-col items-center text-center gap-[14px] py-[36px] px-[28px] rounded-[28px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[56px] h-[56px] rounded-[18px] bg-white text-blue-600 flex items-center justify-center shadow-[0_10px_20px_-12px_rgba(37,99,235,0.5)]">
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
                  <rect width="18" height="11" x="3" y="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <h3 className="m-0 text-[20px] font-extrabold tracking-[-0.02em]">Your data stays yours</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">
                Business-grade AI tools set so your data isn&apos;t used to train models, and a signed data processing
                agreement.
              </p>
              <Link className="text-[15px] font-bold no-underline" href="/trust">
                How we protect your data →
              </Link>
            </div>
            <div className="glass lift flex flex-col items-center text-center gap-[14px] py-[36px] px-[28px] rounded-[28px] [background:radial-gradient(120%_100%_at_50%_0%,rgba(253,230,138,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[56px] h-[56px] rounded-[18px] bg-white text-yellow-600 flex items-center justify-center shadow-[0_10px_20px_-12px_rgba(202,138,4,0.5)]">
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
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                  <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" />
                </svg>
              </span>
              <h3 className="m-0 text-[20px] font-extrabold tracking-[-0.02em]">Prices up front</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">
                Every engagement has a fixed price, agreed before we start.
              </p>
              <Link className="text-[15px] font-bold no-underline" href="/pricing">
                See pricing →
              </Link>
            </div>
            <div className="glass lift flex flex-col items-center text-center gap-[14px] py-[36px] px-[28px] rounded-[28px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[56px] h-[56px] rounded-[18px] bg-white text-emerald-600 flex items-center justify-center shadow-[0_10px_20px_-12px_rgba(5,150,105,0.5)]">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h3 className="m-0 text-[20px] font-extrabold tracking-[-0.02em]">A guarantee that counts</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">
                If the audit doesn&apos;t find at least{" "}
                <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[X]</span> hours a week
                to save, you get your money back.
              </p>
              <Link className="text-[15px] font-bold no-underline" href="/pricing#guarantees">
                Read our guarantees →
              </Link>
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

function FaqSection() {
  return (
    <section className="relative z-[1] pt-[clamp(48px,7vw,96px)] pb-[clamp(64px,8vw,112px)] px-0" id="faq">
      <div className="max-w-[840px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)] flex flex-col gap-[36px] max-[640px]:gap-[24px]">
        <div className="flex flex-col items-center text-center gap-[16px] m-head">
          <span className="eyebrow self-auto">FAQ</span>
          <h2 className="m-0 text-[length:clamp(32px,3.8vw,46px)] leading-[1.15] tracking-[-0.035em] font-extrabold">
            Questions teams ask first
          </h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
        <Link className="self-center text-[15px] font-bold no-underline" href="/faq">
          See all questions →
        </Link>
      </div>
    </section>
  );
}

function ScorecardCtaSection() {
  return (
    <section
      className="relative z-[1] overflow-hidden bg-night text-white pt-[clamp(72px,9vw,120px)] pb-0 px-0"
      id="score"
    >
      <div
        className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1.2px,transparent_1.2px)] [background-size:22px_22px]"
        aria-hidden="true"
      />
      <div className="relative max-w-[1200px] my-0 mx-auto py-0 px-[clamp(20px,4vw,32px)] grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[clamp(40px,5vw,72px)] items-end">
        <div className="flex flex-col gap-[24px] pb-[clamp(72px,9vw,120px)]">
          <h2 className="m-0 text-[length:clamp(38px,4.8vw,62px)] leading-[1.03] tracking-[-0.045em] font-extrabold text-white text-balance">
            See where your team&apos;s hours go.
          </h2>
          <p className="m-0 text-[18px] leading-[1.6] text-fog max-w-[480px]">
            Take the free five-minute AI Readiness Scorecard. Or book a call, and we&apos;ll go through it together.
          </p>
          <div className="flex flex-wrap gap-[12px]" id="book">
            <Link className="pill pill-mint" href="/scorecard">
              Get your AI score
              <svg
                width="18"
                height="18"
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
            <Link className="pill pill-ghost" href="/book">
              Book a free call
            </Link>
          </div>
          <span className="text-[14px] text-[#A9BDB4] font-medium">Free. Five minutes. Instant results.</span>
        </div>
        <div className="flex justify-center">
          <div
            className="w-[300px] max-w-full box-border rounded-[46px_46px_0_0] bg-[#22332C] pt-[10px] pb-0 px-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
            role="img"
            aria-label="Phone showing AI Readiness Scorecard results for each lifecycle stage"
          >
            <div className="rounded-[37px_37px_0_0] bg-white text-charcoal pt-[30px] pb-[28px] px-[20px] flex flex-col gap-[14px]">
              <span className="text-[12px] font-bold text-subtle">AI Readiness Scorecard</span>
              <div className="flex justify-between items-center gap-[8px]">
                <span className="text-[21px] font-extrabold tracking-[-0.02em]">Your results</span>
                <span className="text-[11px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                  Example
                </span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex justify-between text-[12.5px] font-semibold">
                  <span>Lead acquisition</span>
                  <span>68</span>
                </div>
                <div className="h-[8px] rounded-full bg-track">
                  <div className="w-[68%] h-full rounded-full bg-stone" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex justify-between text-[12.5px] font-semibold">
                  <span>Sales</span>
                  <span>54</span>
                </div>
                <div className="h-[8px] rounded-full bg-track">
                  <div className="w-[54%] h-full rounded-full bg-stone" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex justify-between text-[12.5px] font-bold text-emerald-800">
                  <span>Onboarding</span>
                  <span>31</span>
                </div>
                <div className="h-[8px] rounded-full bg-emerald-100">
                  <div className="w-[31%] h-full rounded-full bg-emerald-700" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex justify-between text-[12.5px] font-semibold">
                  <span>Delivery</span>
                  <span>57</span>
                </div>
                <div className="h-[8px] rounded-full bg-track">
                  <div className="w-[57%] h-full rounded-full bg-stone" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex justify-between text-[12.5px] font-bold text-emerald-800">
                  <span>Retention</span>
                  <span>26</span>
                </div>
                <div className="h-[8px] rounded-full bg-emerald-100">
                  <div className="w-[26%] h-full rounded-full bg-emerald-700" />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex justify-between text-[12.5px] font-bold text-emerald-800">
                  <span>Operations</span>
                  <span>39</span>
                </div>
                <div className="h-[8px] rounded-full bg-emerald-100">
                  <div className="w-[39%] h-full rounded-full bg-emerald-700" />
                </div>
              </div>
              <div className="flex items-center gap-[6px] text-[11.5px] font-semibold text-emerald-800">
                <span className="w-[9px] h-[9px] rounded-[3px] bg-emerald-700" />
                Your three biggest opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
