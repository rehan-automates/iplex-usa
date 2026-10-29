import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/ai-training");

const FAQ_0: FaqItem[] = [
  {
    question: "Do you train on our tools?",
    answer: "Yes, on the tools you already use, plus any we recommend.",
  },
  {
    question: "Can we buy training without implementation?",
    answer: "Yes. Training on its own is a good first step.",
  },
  {
    question: "Remote or in person?",
    answer: "Remote, over live video, so your whole team can join from wherever they work.",
  },
  {
    question: "How big can a group be?",
    answer: (
      <>
        Up to <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[N]</span> people per
        workshop, so everyone gets hands-on time.
      </>
    ),
    answerText: "Up to [N] people per workshop, so everyone gets hands-on time.",
  },
];

export default function AiTrainingPage() {
  return (
    <>
      <JsonLd data={pageSchema("/ai-training", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <LicensesSection />
      <TrainingThatFitsTeamSection />
      <TrainingEveryRoleSection />
      <MeasureAdoptionNotAttendanceSection />
      <SimplePricingRealFollowSection />
      <QuestionsAboutTrainingSection />
      <CtaBand
        title="Make AI part of how your team works."
        actions={[{ label: "Plan your team's training", href: "/book" }]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(32px,5vw,64px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[clamp(40px,6vw,80px)] items-center">
        <div className="flex flex-col gap-[24px]">
          <span className="eyebrow rise">AI Training</span>
          <h1 className="h1 rise d1">
            Your team has AI tools. <span className="acc">Now teach them to use them.</span>
          </h1>
          <p className="lead rise d2 max-w-[520px]">
            Leadership sessions, role-based workshops, and playbooks that turn AI from something a few people try into
            how your whole team works.
          </p>
          <div className="rise d3 flex flex-wrap items-center gap-y-[14px] gap-x-[24px]">
            <Link className="pill pill-primary" href="/book">
              Plan your team&apos;s training
            </Link>
            <a className="textlink" href="#formats">
              See what&apos;s covered
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
            </a>
          </div>
        </div>
        <div className="rise d2 relative">
          <div
            className="photo aspect-[5/4]"
            role="img"
            aria-label="Photo placeholder: a workshop, someone at a screen with the team following along on laptops"
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
            <span className="text-[15px] font-bold">Photo: one of your workshops</span>
            <span className="text-[13px] max-w-[260px] leading-[1.5]">
              Someone at a screen, with the team following along on their own laptops
            </span>
          </div>
          <div className="glass absolute bottom-[-18px] left-[-16px] flex items-center gap-[12px] py-[14px] px-[18px] rounded-[18px]">
            <span className="w-[38px] h-[38px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 3h20" />
                <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                <path d="m7 21 5-5 5 5" />
              </svg>
            </span>
            <span className="flex flex-col">
              <strong className="text-[14.5px]">Hands-on, on your real work</strong>
              <span className="text-[12.5px] text-subtle">Role-based workshops</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LicensesSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col items-center text-center gap-[18px] max-w-[820px] m-head">
        <h2 className="h2">
          Licenses don&apos;t <span className="acc">change habits.</span>
        </h2>
        <p className="lead max-w-[680px]">
          Many teams pay for AI seats while only a few people use them well. Without shared playbooks and clear rules,
          everyone else either avoids AI or uses it in ways that put client data at risk.
        </p>
      </div>
    </section>
  );
}

function TrainingThatFitsTeamSection() {
  return (
    <section className="sec" id="formats">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Formats</span>
          <h2 className="h2">
            Training that fits <span className="acc">how your team works</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-[18px]">
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
              <div className="flex justify-between items-center">
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
                <span className="text-[12px] font-bold py-[4px] px-[10px] rounded-full bg-white text-emerald-700">
                  Half day
                </span>
              </div>
              <h3 className="m-0 text-[19px] font-extrabold">Leadership AI session</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Strategy, risks, policy, and where to invest first.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_50%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.65)_55%)]">
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Role-based workshops</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Hands-on sessions for each team, using your real work.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(253,230,138,0.55),rgba(255,255,255,0.65)_55%)]">
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
                  <path d="M12 7v14" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Playbooks and prompt libraries</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Step-by-step guides for every AI system you run.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_0%_100%,rgba(191,219,254,0.55),rgba(255,255,255,0.65)_55%)]">
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
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">AI usage policy</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Clear rules on which tools and data are allowed.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_100%_100%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
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
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Monthly office hours</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">A standing slot for questions and new ideas.</p>
            </div>
          </div>
          <div className="m-bar [--n:5]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrainingEveryRoleSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">By role</span>
          <h2 className="h2">
            Training for <span className="acc">every role</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="glass m-slide m-table rounded-[28px] py-[8px] px-[clamp(20px,3vw,36px)]">
            <div className="row-t pt-[18px] pb-[14px] text-[12.5px] font-bold tracking-[.06em] uppercase text-subtle">
              <span>Role</span>
              <span>What they learn</span>
            </div>
            <div className="row-t items-center">
              <strong className="text-[17px]">Sales and new business</strong>
              <span className="text-[16px] leading-[1.55] text-muted">Research, outreach, and proposals with AI</span>
            </div>
            <div className="row-t items-center">
              <strong className="text-[17px]">Account managers</strong>
              <span className="text-[16px] leading-[1.55] text-muted">Onboarding, client updates, and renewals</span>
            </div>
            <div className="row-t items-center">
              <strong className="text-[17px]">Content and delivery teams</strong>
              <span className="text-[16px] leading-[1.55] text-muted">
                First drafts in each brand voice, and quality checks
              </span>
            </div>
            <div className="row-t items-center">
              <strong className="text-[17px]">Strategists and analysts</strong>
              <span className="text-[16px] leading-[1.55] text-muted">Reports and insights in less time</span>
            </div>
            <div className="row-t items-center">
              <strong className="text-[17px]">Operations and admin</strong>
              <span className="text-[16px] leading-[1.55] text-muted">
                Meeting notes, tasks, and internal knowledge
              </span>
            </div>
            <div className="row-t items-center border-b-0">
              <strong className="text-[17px] text-emerald-700">Everyone</strong>
              <span className="text-[16px] leading-[1.55] text-muted">
                AI basics, good judgment, and safe use of client data
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

function MeasureAdoptionNotAttendanceSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[48px] items-center [background:radial-gradient(90%_120%_at_100%_50%,rgba(167,243,208,0.55),rgba(255,255,255,0.7)_60%)]">
          <div className="flex flex-col gap-[18px]">
            <span className="eyebrow">How we measure it</span>
            <h2 className="h2">
              We measure adoption, <span className="acc">not attendance.</span>
            </h2>
            <p className="lead">
              Before training, we record how your team uses AI. Thirty days after, we measure again: how many people use
              AI each week, which workflows use it, and time saved on the tasks we trained. You get the numbers in a
              short report.
            </p>
          </div>
          <div
            className="bg-white rounded-[22px] p-[26px] shadow-[0_30px_60px_-36px_rgba(6,95,70,0.5)] flex flex-col gap-[18px]"
            role="img"
            aria-label="Example adoption report comparing AI use before training and 30 days after"
          >
            <div className="flex justify-between items-center">
              <span className="text-[15px] font-extrabold">Adoption report</span>
              <span className="text-[11px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Example
              </span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className="text-[13px] font-bold">People using AI each week</span>
              <div className="flex items-center gap-[10px]">
                <span className="w-[52px] text-[12px] text-subtle font-semibold">Before</span>
                <span className="flex-1 h-[10px] rounded-full bg-track">
                  <span className="block w-[30%] h-full rounded-full bg-stone" />
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <span className="w-[52px] text-[12px] text-emerald-700 font-bold">Day 30</span>
                <span className="flex-1 h-[10px] rounded-full bg-emerald-100">
                  <span className="block w-[78%] h-full rounded-full bg-emerald-600" />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className="text-[13px] font-bold">Workflows using AI</span>
              <div className="flex items-center gap-[10px]">
                <span className="w-[52px] text-[12px] text-subtle font-semibold">Before</span>
                <span className="flex-1 h-[10px] rounded-full bg-track">
                  <span className="block w-[22%] h-full rounded-full bg-stone" />
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <span className="w-[52px] text-[12px] text-emerald-700 font-bold">Day 30</span>
                <span className="flex-1 h-[10px] rounded-full bg-emerald-100">
                  <span className="block w-[64%] h-full rounded-full bg-emerald-600" />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className="text-[13px] font-bold">Time saved on trained tasks</span>
              <div className="flex items-center gap-[10px]">
                <span className="w-[52px] text-[12px] text-emerald-700 font-bold">Day 30</span>
                <span className="flex-1 h-[10px] rounded-full bg-blue-100">
                  <span className="block w-[55%] h-full rounded-full bg-blue-600" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SimplePricingRealFollowSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <h2 className="h2 text-center max-[640px]:text-left">
          Simple pricing, <span className="acc">real follow-through</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[22px]">
          <div className="glass flex flex-col gap-[18px] p-[36px] rounded-[28px] [background:radial-gradient(110%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.7)_60%)]">
            <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-emerald-700">Price</span>
            <div className="flex flex-col gap-[4px]">
              <span className="text-[15px] font-semibold text-muted">Leadership sessions</span>
              <span className="text-[length:clamp(34px,3.6vw,46px)] font-extrabold tracking-[-0.04em] leading-[1.05]">
                From $2,500
              </span>
            </div>
            <div className="flex flex-col gap-[4px] pt-[16px] [border-top:1px_solid_rgba(16,24,20,0.08)]">
              <span className="text-[15px] font-semibold text-muted">Team programs</span>
              <span className="text-[length:clamp(34px,3.6vw,46px)] font-extrabold tracking-[-0.04em] leading-[1.05]">
                From $5,000 <span className="text-[17px] font-semibold tracking-[0] text-muted">per cohort</span>
              </span>
            </div>
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
              If your team&apos;s AI use hasn&apos;t grown 30 days after training, we run a follow-up session free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionsAboutTrainingSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">FAQ</span>
          <h2 className="h2">Questions about training</h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
