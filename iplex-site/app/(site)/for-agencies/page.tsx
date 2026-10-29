import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/for-agencies");

const FAQ_0: FaqItem[] = [
  {
    question: "Will my clients know we use AI?",
    answer: "That's your call. Either way, your team reviews everything before it goes out.",
  },
  {
    question: "Can it handle many client voices?",
    answer: "Yes. Each client gets its own space in the content hub.",
  },
  {
    question: "Is each client's data kept separate?",
    answer: "Yes. Access and data are separated client by client.",
  },
  {
    question: "Are we too small for this?",
    answer: "If you have five or more people, there's usually enough repeat work to make it worth a look.",
  },
];

export default function ForAgenciesPage() {
  return (
    <>
      <JsonLd data={pageSchema("/for-agencies", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <NoneThisWorkClientsSection />
      <AiSystemsBuiltAgenciesSection />
      <WhateverKindAgencyRunSection />
      <ChangesAgencySection />
      <WantOfferAiOwnSection />
      <QuestionsAgenciesAskSection />
      <CtaBand
        title="See where your agency's hours go."
        actions={[
          { label: "Get your agency's AI score", href: "/scorecard" },
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
          <span className="eyebrow rise">For marketing agencies</span>
          <h1 className="h1 rise d1">
            Take on more clients <span className="acc">without adding headcount.</span>
          </h1>
          <p className="lead rise d2 max-w-[520px]">
            We build AI systems for SEO, content, paid media, social, and creative agencies, from first lead to renewal,
            and train your team to run them.
          </p>
          <div className="rise d3 flex flex-wrap items-center gap-y-[14px] gap-x-[24px]">
            <Link className="pill pill-primary" href="/scorecard">
              Get your agency&apos;s AI score
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
            aria-label="Photo placeholder: an agency strategist reviewing a client dashboard with a colleague"
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
            <span className="text-[15px] font-bold">Photo: an agency strategist and a colleague</span>
            <span className="text-[13px] max-w-[260px] leading-[1.5]">Reviewing a client dashboard together</span>
          </div>
          <div className="glass absolute top-[28px] right-[-16px] flex items-center gap-[10px] py-[10px] pr-[16px] pl-[10px] rounded-full text-[13.5px] font-bold">
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
            Report commentary drafted
          </div>
          <div className="glass absolute bottom-[28px] left-[-16px] flex items-center gap-[10px] py-[10px] pr-[16px] pl-[10px] rounded-full text-[13.5px] font-bold">
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
            New client: kickoff-ready
          </div>
        </div>
      </div>
    </section>
  );
}

function NoneThisWorkClientsSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Where agency hours go</span>
          <h2 className="h2 max-w-[760px]">
            None of this is the work <span className="acc">clients pay you for.</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-y-0 gap-x-[48px]">
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:2px_solid_#101814]">
              <span className="stagetag">Retention</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                Every month, your strategists write the same report commentary for every client.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:2px_solid_#101814]">
              <span className="stagetag">Onboarding</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                Every new client means a week of chasing logins, brand files, and briefs.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:1px_solid_#C9DCD2]">
              <span className="stagetag">Delivery</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                Every piece of content gets made once, for one channel, from scratch.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] py-[28px] px-0 [border-top:1px_solid_#C9DCD2]">
              <span className="stagetag">Sales</span>
              <p className="m-0 text-[length:clamp(20px,2vw,25px)] leading-[1.35] tracking-[-0.02em] font-bold">
                Every pitch starts from a blank deck.
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

function AiSystemsBuiltAgenciesSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Systems for agencies</span>
          <h2 className="h2">
            AI systems built for <span className="acc">how agencies work</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="glass m-slide m-table rounded-[28px] py-[8px] px-[clamp(20px,3vw,36px)]">
            <div className="row-t pt-[18px] pb-[14px] text-[12.5px] font-bold tracking-[.06em] uppercase text-subtle">
              <span>Stage</span>
              <span>What we build for agencies</span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Lead acquisition</span>
              <span className="text-[16px] leading-[1.55]">
                Your own webinars and case studies turned into a steady stream of posts and emails
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Sales</span>
              <span className="text-[16px] leading-[1.55]">Pitches and proposals drafted from your best past wins</span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Onboarding</span>
              <span className="text-[16px] leading-[1.55]">
                Intake, access requests, and the first brief, handled automatically
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Delivery</span>
              <span className="text-[16px] leading-[1.55]">
                A content hub for every client&apos;s voice and guidelines, so first drafts come out on-brand
              </span>
            </div>
            <div className="row-t items-center">
              <span className="stagetag">Retention</span>
              <span className="text-[16px] leading-[1.55]">
                Monthly SEO, ad, and social reports with the commentary already drafted
              </span>
            </div>
            <div className="row-t items-center border-b-0">
              <span className="stagetag text-blue-700">Operations</span>
              <span className="text-[16px] leading-[1.55]">
                Meeting notes into tasks, and a clear view of capacity across accounts
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

function WhateverKindAgencyRunSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">By agency type</span>
          <h2 className="h2">
            Whatever kind of agency <span className="acc">you run</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-[18px]">
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">SEO agencies</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Content briefs, on-page drafts, and ranking reports with written analysis.
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
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Paid media agencies</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Ad copy variations, performance summaries, and budget alerts.
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Content and social agencies</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                One source, every channel, in each client&apos;s voice.
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
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </span>
              <h3 className="m-0 text-[19px] font-extrabold">Creative agencies</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Briefs, concept write-ups, and feedback rounds that stay organized.
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

function ChangesAgencySection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[44px] max-[640px]:gap-[28px]">
        <h2 className="h2 text-center max-[640px]:text-left">
          What changes <span className="acc">for your agency</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-y-[32px] gap-x-[48px]">
          <div className="flex flex-col items-center text-center gap-[12px]">
            <span className="w-[64px] h-[64px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white flex items-center justify-center shadow-[0_14px_26px_-12px_rgba(5,150,105,0.7)]">
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 8v6" />
                <path d="M22 11h-6" />
              </svg>
            </span>
            <h3 className="m-0 text-[22px] font-extrabold">More capacity</h3>
            <p className="m-0 text-[16px] leading-[1.6] text-muted max-w-[300px]">
              Your team handles more accounts without longer hours.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-[12px]">
            <span className="w-[64px] h-[64px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white flex items-center justify-center shadow-[0_14px_26px_-12px_rgba(5,150,105,0.7)]">
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
                <path d="M16 7h6v6" />
                <path d="m22 7-8.5 8.5-5-5L2 17" />
              </svg>
            </span>
            <h3 className="m-0 text-[22px] font-extrabold">Healthier margins</h3>
            <p className="m-0 text-[16px] leading-[1.6] text-muted max-w-[300px]">
              Retainers stop eating hours you can&apos;t bill.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-[12px]">
            <span className="w-[64px] h-[64px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white flex items-center justify-center shadow-[0_14px_26px_-12px_rgba(5,150,105,0.7)]">
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
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </span>
            <h3 className="m-0 text-[22px] font-extrabold">Faster turnaround</h3>
            <p className="m-0 text-[16px] leading-[1.6] text-muted max-w-[300px]">
              Clients get drafts and reports sooner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WantOfferAiOwnSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,56px)] flex flex-wrap items-center justify-between gap-y-[24px] gap-x-[40px] [background:radial-gradient(90%_140%_at_0%_50%,rgba(253,230,138,0.55),rgba(255,255,255,0.7)_60%)]">
          <div className="flex flex-col gap-[12px] max-w-[640px]">
            <span className="eyebrow bg-amber-100 border-amber-200 text-yellow-800">Agency Partner Program</span>
            <h2 className="h2 text-[length:clamp(28px,3.2vw,38px)]">Want to offer AI to your own clients?</h2>
            <p className="lead">
              Resell our audits, implementation, and training under your brand. You keep the client and the margin.
            </p>
          </div>
          <Link className="pill pill-outline" href="/partners">
            Learn about the Agency Partner Program
          </Link>
        </div>
      </div>
    </section>
  );
}

function QuestionsAgenciesAskSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">FAQ</span>
          <h2 className="h2">Questions agencies ask</h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
