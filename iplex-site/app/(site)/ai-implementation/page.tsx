import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/ai-implementation");

const FAQ_0: FaqItem[] = [
  {
    question: "Do we need an audit first?",
    answer:
      "It's the best start, because it shows what to build first. If you already know, we can scope a sprint on a free call.",
  },
  {
    question: "Who owns what you build?",
    answer: "You do: the systems, the prompts, and the documentation.",
  },
  {
    question: "What happens after the sprint?",
    answer: "Your team runs it. You can add an AI Partner retainer for monthly improvements and support.",
  },
  {
    question: "Will it meet our data rules?",
    answer: "Yes. Business-grade tools, a signed data processing agreement, and access only where it's needed.",
  },
];

export default function AiImplementationPage() {
  return (
    <>
      <JsonLd data={pageSchema("/ai-implementation", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <SystemsEveryStageClientSection />
      <MoreThanMovingDataSection />
      <SixWeeksFromScopeSection />
      <WorksToolsAlreadyUseSection />
      <FixedPriceFixedTimelineSection />
      <QuestionsAboutSprintsSection />
      <CtaBand
        title="Turn your roadmap into working systems."
        description="Book a free call, and we'll scope your first sprint together."
        actions={[{ label: "Book a free call", href: "/book" }]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(32px,5vw,64px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[clamp(40px,6vw,80px)] items-center">
        <div className="flex flex-col gap-[24px]">
          <span className="eyebrow rise">AI Implementation</span>
          <h1 className="h1 rise d1">
            AI systems, built around <span className="acc">your clients and your content.</span>
          </h1>
          <p className="lead rise d2 max-w-[520px]">
            Fixed-scope sprints of four to six weeks. Each one delivers two to four working AI systems, tested with your
            team and fully documented.
          </p>
          <div className="rise d3 flex flex-wrap items-center gap-y-[14px] gap-x-[24px]">
            <Link className="pill pill-primary" href="/book">
              Book a free call
            </Link>
            <Link className="textlink" href="/results">
              <span className="w-[40px] h-[40px] rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-[0_8px_18px_-10px_rgba(6,95,70,0.5)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="7 4 20 12 7 20 7 4" />
                </svg>
              </span>
              Watch a two-minute walkthrough
            </Link>
          </div>
        </div>
        <div
          className="rise d2 glass relative rounded-[28px] p-[22px] flex flex-col gap-[14px]"
          role="img"
          aria-label="Still from a screen recording: a webinar turning into a week of drafted posts"
        >
          <div className="flex justify-between items-center gap-[12px]">
            <span className="text-[15px] font-extrabold">Content repurposing</span>
            <span className="inline-flex items-center gap-[6px] py-[4px] px-[10px] rounded-full bg-emerald-100 text-emerald-800 text-[12px] font-bold">
              <span className="w-[7px] h-[7px] rounded-full bg-emerald-500" />
              Running
            </span>
          </div>
          <div className="flex items-center gap-[12px] p-[14px] rounded-[16px] bg-charcoal text-white">
            <span className="flex-none w-[44px] h-[44px] rounded-[12px] bg-[rgba(255,255,255,0.12)] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                <polygon points="7 4 20 12 7 20 7 4" />
              </svg>
            </span>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[14px] font-bold">Webinar recording</span>
              <span className="text-[12px] text-[#A9BDB4]">Source · uploaded Monday</span>
            </div>
          </div>
          <div className="flex items-center gap-[8px] text-[12.5px] font-bold text-emerald-700">
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
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
            Drafted in your brand voice
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-[10px]">
            <div className="flex flex-col gap-[6px] p-[12px] rounded-[14px] bg-white [border:1px_solid_#E6EEEA]">
              <span className="text-[11.5px] font-bold text-blue-700">Mon · LinkedIn</span>
              <span className="text-[13px] font-bold leading-[1.35]">Three lessons from the webinar</span>
              <span className="self-start text-[11px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Ready for review
              </span>
            </div>
            <div className="flex flex-col gap-[6px] p-[12px] rounded-[14px] bg-white [border:1px_solid_#E6EEEA]">
              <span className="text-[11.5px] font-bold text-blue-700">Tue · Blog</span>
              <span className="text-[13px] font-bold leading-[1.35]">Full write-up with key takeaways</span>
              <span className="self-start text-[11px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Ready for review
              </span>
            </div>
            <div className="flex flex-col gap-[6px] p-[12px] rounded-[14px] bg-white [border:1px_solid_#E6EEEA]">
              <span className="text-[11.5px] font-bold text-blue-700">Wed · Newsletter</span>
              <span className="text-[13px] font-bold leading-[1.35]">This week&apos;s issue, first draft</span>
              <span className="self-start text-[11px] font-bold py-[2px] px-[8px] rounded-full bg-emerald-100 text-emerald-800">
                Approved
              </span>
            </div>
            <div className="flex flex-col gap-[6px] p-[12px] rounded-[14px] bg-white [border:1px_solid_#E6EEEA]">
              <span className="text-[11.5px] font-bold text-blue-700">Thu · Short clips</span>
              <span className="text-[13px] font-bold leading-[1.35]">Three moments, captioned</span>
              <span className="self-start text-[11px] font-bold py-[2px] px-[8px] rounded-full bg-emerald-100 text-emerald-800">
                Approved
              </span>
            </div>
          </div>
          <span className="text-[12px] text-subtle font-semibold">
            Still from a walkthrough recording · example content
          </span>
        </div>
      </div>
    </section>
  );
}

function SystemsEveryStageClientSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">What we build</span>
          <h2 className="h2">
            Systems for every stage of <span className="acc">your client lifecycle</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="glass m-slide m-table rounded-[28px] py-[8px] px-[clamp(20px,3vw,36px)]">
            <div className="row-t pt-[18px] pb-[14px] text-[12.5px] font-bold tracking-[.06em] uppercase text-subtle">
              <span>Stage</span>
              <span>System</span>
              <span>What it does</span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Lead acquisition</span>
              <strong className="text-[17px]">Content repurposing</strong>
              <span className="text-[15.5px] leading-[1.55] text-muted">
                One webinar, podcast, or article becomes posts, emails, and clips in your voice.
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Lead acquisition</span>
              <strong className="text-[17px]">Instant lead follow-up</strong>
              <span className="text-[15.5px] leading-[1.55] text-muted">
                New leads are qualified, answered, and routed within minutes.
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Sales</span>
              <strong className="text-[17px]">Proposal builder</strong>
              <span className="text-[15.5px] leading-[1.55] text-muted">
                Proposals drafted from your best past work, ready for your edits.
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Onboarding</span>
              <strong className="text-[17px]">Onboarding flow</strong>
              <span className="text-[15.5px] leading-[1.55] text-muted">
                Intake answers become a first brief, and access requests go out with reminders.
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Delivery</span>
              <strong className="text-[17px]">Content hub</strong>
              <span className="text-[15.5px] leading-[1.55] text-muted">
                Brand voice, guidelines, and client knowledge in one place every system draws from.
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Retention</span>
              <strong className="text-[17px]">Reporting with insights</strong>
              <span className="text-[15.5px] leading-[1.55] text-muted">
                Reports that explain what changed and why, plus alerts when a client goes quiet.
              </span>
            </div>
            <div className="row-t items-center border-b-0">
              <span className="stagetag text-blue-700">Operations</span>
              <strong className="text-[17px]">Internal assistant</strong>
              <span className="text-[15.5px] leading-[1.55] text-muted">
                Answers from your own documents, and meeting notes turned into tasks.
              </span>
            </div>
          </div>
          <div className="m-bar [--n:7]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function MoreThanMovingDataSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[48px] items-center [background:radial-gradient(90%_120%_at_100%_50%,rgba(191,219,254,0.55),rgba(255,255,255,0.7)_60%)]">
          <div className="flex flex-col gap-[18px]">
            <span className="eyebrow">Not just moving data</span>
            <h2 className="h2">
              More than moving data <span className="acc">between apps</span>
            </h2>
            <p className="lead">
              Simple automations copy information from one tool to another. Our systems read, write, and summarize using
              your content and brand voice. Nothing reaches a client until someone on your team signs it off.
            </p>
          </div>
          <div
            className="flex flex-col items-center gap-[6px]"
            role="img"
            aria-label="A content system: webinar recording, transcript, brand voice check, drafts for every channel, and your team approves"
          >
            <span className="inline-flex items-center gap-[8px] py-[12px] px-[18px] rounded-[14px] bg-white [border:1px_solid_#DBEAFE] text-[15px] font-bold">
              Webinar recording
            </span>
            <svg
              width="16"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v16" />
              <path d="m6 14 6 6 6-6" />
            </svg>
            <span className="inline-flex py-[12px] px-[18px] rounded-[14px] bg-white [border:1px_solid_#DBEAFE] text-[15px] font-bold">
              Transcript
            </span>
            <svg
              width="16"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v16" />
              <path d="m6 14 6 6 6-6" />
            </svg>
            <span className="inline-flex gap-[6px] py-[12px] px-[18px] rounded-[14px] bg-blue-600 text-white text-[15px] font-bold">
              Brand voice check<span className="font-medium text-blue-100">· content hub</span>
            </span>
            <svg
              width="16"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v16" />
              <path d="m6 14 6 6 6-6" />
            </svg>
            <div className="flex flex-wrap justify-center gap-[8px]">
              <span className="py-[8px] px-[12px] rounded-[10px] bg-white [border:1px_solid_#DBEAFE] text-[13.5px] font-semibold">
                Blog post
              </span>
              <span className="py-[8px] px-[12px] rounded-[10px] bg-white [border:1px_solid_#DBEAFE] text-[13.5px] font-semibold">
                LinkedIn posts
              </span>
              <span className="py-[8px] px-[12px] rounded-[10px] bg-white [border:1px_solid_#DBEAFE] text-[13.5px] font-semibold">
                Newsletter
              </span>
              <span className="py-[8px] px-[12px] rounded-[10px] bg-white [border:1px_solid_#DBEAFE] text-[13.5px] font-semibold">
                Short clips
              </span>
            </div>
            <svg
              width="16"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v16" />
              <path d="m6 14 6 6 6-6" />
            </svg>
            <span className="inline-flex items-center gap-[8px] py-[12px] px-[18px] rounded-[14px] [background:linear-gradient(180deg,#059669,#065F46)] text-white text-[15px] font-bold">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Your team approves
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SixWeeksFromScopeSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[48px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">How a sprint works</span>
          <h2 className="h2">
            Six weeks from <span className="acc">scope to handover</span>
          </h2>
        </div>
        <div className="relative">
          <div className="hide-sm absolute top-[22px] left-[10%] right-[10%] h-[2px] bg-[#C6E6D5]" aria-hidden="true" />
          <div className="m-sw">
            <div className="m-slide m-plain relative grid grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))] gap-y-[28px] gap-x-[20px]">
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  1
                </span>
                <span className="text-[12.5px] font-bold tracking-[.06em] uppercase text-emerald-700">Week 1</span>
                <h3 className="m-0 text-[19px] font-extrabold">Scope</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  We pick two to four systems from your roadmap and agree what &quot;done&quot; looks like.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  2
                </span>
                <span className="text-[12.5px] font-bold tracking-[.06em] uppercase text-emerald-700">
                  Weeks 2 to 4
                </span>
                <h3 className="m-0 text-[19px] font-extrabold">Build</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  We build inside your tools, using your real content.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  3
                </span>
                <span className="text-[12.5px] font-bold tracking-[.06em] uppercase text-emerald-700">Week 5</span>
                <h3 className="m-0 text-[19px] font-extrabold">Test</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  Your team uses each system on live work, and we adjust.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  4
                </span>
                <span className="text-[12.5px] font-bold tracking-[.06em] uppercase text-emerald-700">Week 6</span>
                <h3 className="m-0 text-[19px] font-extrabold">Hand over</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  Documentation, a recorded walkthrough, and training for the people who&apos;ll run it.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full bg-amber-200 text-yellow-800 font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  5
                </span>
                <span className="text-[12.5px] font-bold tracking-[.06em] uppercase text-yellow-800">30 days</span>
                <h3 className="m-0 text-[19px] font-extrabold">Support</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  We fix anything that doesn&apos;t work as agreed.
                </p>
              </div>
            </div>
            <div className="m-bar [--n:5]" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorksToolsAlreadyUseSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col items-center text-center gap-[20px] max-w-[900px] m-head">
        <span className="eyebrow self-center">Your tools</span>
        <h2 className="h2">
          Works with the tools <span className="acc">you already use</span>
        </h2>
        <p className="lead max-w-[640px]">
          Google Workspace or Microsoft 365, your CRM, your project tool, Slack or Teams, and the AI models that fit
          each job. No need to replace what already works.
        </p>
        <div className="flex flex-wrap justify-center gap-[10px] mt-[8px]">
          <span className="glass py-[12px] px-[18px] rounded-full text-[15px] font-bold">Google Workspace</span>
          <span className="glass py-[12px] px-[18px] rounded-full text-[15px] font-bold">Microsoft 365</span>
          <span className="glass py-[12px] px-[18px] rounded-full text-[15px] font-bold">Your CRM</span>
          <span className="glass py-[12px] px-[18px] rounded-full text-[15px] font-bold">Your project tool</span>
          <span className="glass py-[12px] px-[18px] rounded-full text-[15px] font-bold">Slack or Teams</span>
          <span className="glass py-[12px] px-[18px] rounded-full text-[15px] font-bold text-emerald-800 bg-emerald-100">
            The right AI model for each job
          </span>
        </div>
      </div>
    </section>
  );
}

function FixedPriceFixedTimelineSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <h2 className="h2 text-center max-[640px]:text-left">
          Fixed price, <span className="acc">fixed timeline</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[22px]">
          <div className="glass flex flex-col gap-[14px] p-[36px] rounded-[28px] [background:radial-gradient(110%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.7)_60%)]">
            <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">Price</span>
            <div className="flex flex-wrap items-baseline gap-[10px]">
              <span className="text-[length:clamp(40px,4.4vw,56px)] font-extrabold tracking-[-0.04em] leading-[1]">
                From $7,500
              </span>
              <span className="text-[17px] font-semibold text-muted">per sprint</span>
            </div>
            <p className="m-0 text-[16px] leading-[1.6] text-muted">
              Software and AI usage costs are passed through at cost and listed in every proposal.
            </p>
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
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            <p className="m-0 text-[19px] leading-[1.5] font-semibold">
              If a system doesn&apos;t work as specified, we fix it free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionsAboutSprintsSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">FAQ</span>
          <h2 className="h2">Questions about sprints</h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
