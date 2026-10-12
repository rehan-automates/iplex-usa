import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { Faq, type FaqItem } from "@/components/faq";
import { PartnerForm } from "@/components/forms/partner-form";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/partners");

const FAQ_0: FaqItem[] = [
  {
    question: "Do we need AI expertise?",
    answer: "No. We train your team to sell the offer, and we do the delivery.",
  },
  {
    question: "Can we use our own branding?",
    answer: "Yes, fully under your brand or co-branded.",
  },
  {
    question: "Who talks to the client during delivery?",
    answer: "You decide. We can stay behind the scenes or join calls as part of your team.",
  },
  {
    question: "Is there a minimum commitment?",
    answer: (
      <>
        <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">
          [Decide: none, or a minimum number of clients per year.]
        </span>
      </>
    ),
    answerText: "[Decide: none, or a minimum number of clients per year.]",
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={pageSchema("/partners", { faqs: [...FAQ_0] })} />
      <Glows />
      <Hero />
      <WhenClientsAskAboutSection />
      <ThreeServicesReadySellSection />
      <PartnershipWorksSection />
      <ClientsStayYoursSection />
      <PartnerQuestionsSection />
      <ApplyBecomePartnerSection />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(32px,5vw,64px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[clamp(40px,6vw,80px)] items-center">
        <div className="flex flex-col gap-[24px]">
          <span className="eyebrow rise bg-amber-100 border-amber-200 text-yellow-800">Agency Partner Program</span>
          <h1 className="h1 rise d1">
            Offer AI services to your clients <span className="acc">without building an AI team.</span>
          </h1>
          <p className="lead rise d2 max-w-[540px]">
            Resell our audits, implementation, and training under your brand. We deliver the work; you keep the client
            relationship and the margin.
          </p>
          <div className="rise d3 flex flex-wrap items-center gap-y-[14px] gap-x-[24px]">
            <a className="pill pill-primary" href="#apply">
              Apply to become a partner
            </a>
            <Link className="textlink" href="/book">
              or book a partner call
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
            aria-label="Photo placeholder: two people from different teams on a video call, one presenting a roadmap"
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
            <span className="text-[15px] font-bold">Photo: a partner video call</span>
            <span className="text-[13px] max-w-[260px] leading-[1.5]">
              Two people from different teams, one presenting a roadmap
            </span>
          </div>
          <div className="glass absolute bottom-[24px] left-[-16px] flex flex-col gap-[4px] py-[14px] px-[18px] rounded-[18px]">
            <span className="text-[11.5px] font-bold text-subtle">Delivered under</span>
            <span className="text-[15px] font-extrabold">Your agency&apos;s brand</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhenClientsAskAboutSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col items-center text-center gap-[18px] max-w-[820px] m-head">
        <span className="eyebrow self-center">Why partner</span>
        <h2 className="h2">
          When your clients ask about AI, <span className="acc">have an answer.</span>
        </h2>
        <p className="lead max-w-[680px]">
          You can tell clients you don&apos;t do AI and hope they don&apos;t find someone who does. Or you can offer it
          now, with a team that delivers it for you.
        </p>
      </div>
    </section>
  );
}

function ThreeServicesReadySellSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">What you can offer</span>
          <h2 className="h2">
            Three services, <span className="acc">ready to sell</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[18px]">
            <Link
              className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] no-underline text-ink [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]"
              href="/ai-audit"
            >
              <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center">
                1
              </span>
              <h3 className="m-0 text-[20px] font-extrabold">AI Opportunity Audits</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">
                Covering your client&apos;s whole lifecycle, from first lead to renewal.
              </p>
            </Link>
            <Link
              className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] no-underline text-ink [background:radial-gradient(120%_100%_at_50%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.65)_55%)]"
              href="/ai-implementation"
            >
              <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center">
                2
              </span>
              <h3 className="m-0 text-[20px] font-extrabold">Implementation sprints</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">That build working AI systems.</p>
            </Link>
            <Link
              className="glass lift flex flex-col gap-[12px] p-[30px] rounded-[26px] no-underline text-ink [background:radial-gradient(120%_100%_at_100%_0%,rgba(253,230,138,0.55),rgba(255,255,255,0.65)_55%)]"
              href="/ai-training"
            >
              <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center">
                3
              </span>
              <h3 className="m-0 text-[20px] font-extrabold">AI team training</h3>
              <p className="m-0 text-[15.5px] leading-[1.6] text-muted">For your client&apos;s people.</p>
            </Link>
          </div>
          <div className="m-bar [--n:3]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnershipWorksSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[48px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">How it works</span>
          <h2 className="h2">
            How the <span className="acc">partnership works</span>
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
                <h3 className="m-0 text-[19px] font-extrabold">Apply</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">Tell us about your agency and your clients.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  2
                </span>
                <h3 className="m-0 text-[19px] font-extrabold">Learn the offer</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  A short onboarding, so your team can explain it with confidence.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  3
                </span>
                <h3 className="m-0 text-[19px] font-extrabold">Introduce clients</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">
                  Bring us into a call, or lead the first conversation yourself.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  4
                </span>
                <h3 className="m-0 text-[19px] font-extrabold">We deliver</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">Under your brand, or co-branded.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-[10px]">
                <span className="w-[44px] h-[44px] rounded-full bg-amber-200 text-yellow-800 font-extrabold flex items-center justify-center shadow-[0_0_0_6px_#F3FAF5]">
                  5
                </span>
                <h3 className="m-0 text-[19px] font-extrabold">You earn</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-muted">A margin on every engagement.</p>
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

function ClientsStayYoursSection() {
  return (
    <section className="sec">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-[22px]">
        <div className="glass flex flex-col gap-[14px] p-[38px] rounded-[28px] [background:radial-gradient(110%_100%_at_0%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.7)_60%)]">
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
          <h2 className="h2 text-[length:clamp(28px,3vw,36px)]">
            Your clients <span className="acc">stay yours.</span>
          </h2>
          <p className="m-0 text-[16.5px] leading-[1.65] text-muted">
            A written non-solicit agreement means we never sell to your clients directly. We deliver, report to you, and
            step back.
          </p>
        </div>
        <div className="glass flex flex-col gap-[14px] p-[38px] rounded-[28px] [background:radial-gradient(110%_100%_at_100%_0%,rgba(253,230,138,0.55),rgba(255,255,255,0.7)_60%)]">
          <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-yellow-800">Partner pricing</span>
          <span className="text-[length:clamp(40px,4.4vw,56px)] font-extrabold tracking-[-0.04em] leading-[1]">
            20 to 30% <span className="text-[18px] font-semibold tracking-[0] text-muted">below list</span>
          </span>
          <p className="m-0 text-[16.5px] leading-[1.65] text-muted">
            Partners buy at 20 to 30% below our list prices, or take a revenue share. You set what your clients pay.
          </p>
        </div>
      </div>
    </section>
  );
}

function PartnerQuestionsSection() {
  return (
    <section className="sec">
      <div className="wrap max-w-[840px] flex flex-col gap-[32px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">FAQ</span>
          <h2 className="h2">Partner questions</h2>
        </div>
        <div className="flex flex-col gap-[12px]">
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}

function ApplyBecomePartnerSection() {
  return (
    <section className="sec pb-[clamp(64px,8vw,112px)]" id="apply">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-y-[40px] gap-x-[56px] items-start [background:radial-gradient(80%_100%_at_0%_0%,rgba(167,243,208,0.5),rgba(255,255,255,0.75)_60%)]">
          <div className="flex flex-col gap-[18px]">
            <span className="eyebrow">Application</span>
            <h2 className="h2">
              Apply to become <span className="acc">a partner</span>
            </h2>
            <p className="lead">Tell us about your agency and your clients. We review every application ourselves.</p>
          </div>
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}
