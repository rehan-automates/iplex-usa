import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/trust");

export default function TrustPage() {
  return (
    <>
      <JsonLd data={pageSchema("/trust")} />
      <Glows />
      <Hero />
      <ShortVersionSection />
      <AiToolsUseTheySection />
      <CtaBand
        title="Need this for your IT or legal team?"
        description="Request our security overview, a short document that answers the usual vendor questions."
        actions={[{ label: "Request our security overview", href: "/contact" }]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(32px,5vw,64px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[clamp(40px,6vw,80px)] items-center">
        <div className="flex flex-col gap-[24px]">
          <span className="eyebrow rise">Trust &amp; Security</span>
          <h1 className="h1 rise d1">
            How we protect <span className="acc">your data.</span>
          </h1>
          <p className="lead rise d2 max-w-[520px]">
            Your client data is the most valuable thing you&apos;ll share with us. Here&apos;s exactly how we handle it.
          </p>
          <div className="rise d3">
            <Link className="pill pill-primary" href="/contact">
              Request our security overview
            </Link>
          </div>
        </div>
        <div
          className="rise d2 glass rounded-[28px] p-[28px] flex flex-col gap-[14px] [background:radial-gradient(110%_100%_at_100%_0%,rgba(191,219,254,0.6),rgba(255,255,255,0.7)_60%)]"
          role="img"
          aria-label="Project security summary: data processing agreement signed, model training off, named people only, access removed at handover"
        >
          <div className="flex items-center gap-[14px] pb-[6px]">
            <span className="w-[52px] h-[52px] rounded-[16px] [background:linear-gradient(180deg,#2563EB,#1E3A8A)] text-white flex items-center justify-center">
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
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <span className="flex flex-col">
              <strong className="text-[16px]">Every project, before work starts</strong>
              <span className="text-[13px] text-subtle">Example project checklist</span>
            </span>
          </div>
          <div className="flex justify-between items-center gap-[12px] py-[14px] px-[16px] rounded-[14px] bg-[rgba(255,255,255,0.88)]">
            <span className="text-[15px] font-semibold">Data processing agreement</span>
            <span className="text-[12.5px] font-bold py-[3px] px-[10px] rounded-full bg-emerald-100 text-emerald-800">
              Signed
            </span>
          </div>
          <div className="flex justify-between items-center gap-[12px] py-[14px] px-[16px] rounded-[14px] bg-[rgba(255,255,255,0.88)]">
            <span className="text-[15px] font-semibold">Inputs used for model training</span>
            <span className="text-[12.5px] font-bold py-[3px] px-[10px] rounded-full bg-emerald-100 text-emerald-800">
              Off
            </span>
          </div>
          <div className="flex justify-between items-center gap-[12px] py-[14px] px-[16px] rounded-[14px] bg-[rgba(255,255,255,0.88)]">
            <span className="text-[15px] font-semibold">Who can access</span>
            <span className="text-[12.5px] font-bold py-[3px] px-[10px] rounded-full bg-blue-100 text-blue-800">
              Named people only
            </span>
          </div>
          <div className="flex justify-between items-center gap-[12px] py-[14px] px-[16px] rounded-[14px] bg-[rgba(255,255,255,0.88)]">
            <span className="text-[15px] font-semibold">Our access after handover</span>
            <span className="text-[12.5px] font-bold py-[3px] px-[10px] rounded-full bg-amber-100 text-yellow-800">
              Removed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShortVersionSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[36px] max-[640px]:gap-[24px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">The short version</span>
          <h2 className="h2">
            The short <span className="acc">version</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-[14px]">
            <div className="glass flex items-start gap-[16px] py-[24px] px-[26px] rounded-[22px]">
              <span className="flex-none w-[32px] h-[32px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <svg
                  width="15"
                  height="15"
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
              <span className="text-[17px] leading-[1.5] font-semibold">
                We use business-grade AI tools, set so your data isn&apos;t used to train their models.
              </span>
            </div>
            <div className="glass flex items-start gap-[16px] py-[24px] px-[26px] rounded-[22px]">
              <span className="flex-none w-[32px] h-[32px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <svg
                  width="15"
                  height="15"
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
              <span className="text-[17px] leading-[1.5] font-semibold">
                We sign a data processing agreement before we touch any data.
              </span>
            </div>
            <div className="glass flex items-start gap-[16px] py-[24px] px-[26px] rounded-[22px]">
              <span className="flex-none w-[32px] h-[32px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <svg
                  width="15"
                  height="15"
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
              <span className="text-[17px] leading-[1.5] font-semibold">
                We access only what a project needs, and remove access when it ends.
              </span>
            </div>
            <div className="glass flex items-start gap-[16px] py-[24px] px-[26px] rounded-[22px]">
              <span className="flex-none w-[32px] h-[32px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <svg
                  width="15"
                  height="15"
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
              <span className="text-[17px] leading-[1.5] font-semibold">
                Your team approves every AI output before it reaches a client.
              </span>
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

function AiToolsUseTheySection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] py-[clamp(12px,3vw,24px)] px-[clamp(24px,4vw,56px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-y-[16px] gap-x-[48px] py-[clamp(28px,4vw,44px)] px-0 [border-bottom:1px_solid_#DCE8E1]">
            <div className="flex gap-[16px] items-start">
              <span className="flex-none w-[48px] h-[48px] rounded-[14px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
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
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <rect width="6" height="6" x="9" y="9" rx="1" />
                  <path d="M15 2v2" />
                  <path d="M15 20v2" />
                  <path d="M2 15h2" />
                  <path d="M2 9h2" />
                  <path d="M20 15h2" />
                  <path d="M20 9h2" />
                  <path d="M9 2v2" />
                  <path d="M9 20v2" />
                </svg>
              </span>
              <h2 className="m-0 text-[length:clamp(22px,2.2vw,28px)] leading-[1.2] tracking-[-0.025em] font-extrabold">
                The AI tools we use, and how they&apos;re set up
              </h2>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="m-0 text-[16.5px] leading-[1.65] text-muted">
                We use business or enterprise versions of AI tools, with settings that keep your inputs out of model
                training. Every vendor is listed in your proposal.
              </p>
              <div className="flex flex-col rounded-[16px] bg-[rgba(255,255,255,0.85)] py-[6px] px-[18px]">
                <div className="flex justify-between gap-[12px] py-[12px] px-0 text-[12.5px] font-bold tracking-[.06em] uppercase text-subtle [border-bottom:1px_solid_#E6EEEA]">
                  <span>Vendor</span>
                  <span>Data setting</span>
                </div>
                <div className="flex justify-between gap-[12px] py-[12px] px-0 text-[15px] [border-bottom:1px_solid_#E6EEEA]">
                  <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 font-bold">[AI vendor]</span>
                  <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 font-bold">
                    [Training off · business tier]
                  </span>
                </div>
                <div className="flex justify-between gap-[12px] py-[12px] px-0 text-[15px]">
                  <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 font-bold">[AI vendor]</span>
                  <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 font-bold">[Data setting]</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-y-[16px] gap-x-[48px] py-[clamp(28px,4vw,44px)] px-0 [border-bottom:1px_solid_#DCE8E1]">
            <div className="flex gap-[16px] items-start">
              <span className="flex-none w-[48px] h-[48px] rounded-[14px] bg-blue-100 text-blue-600 flex items-center justify-center">
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
                  <circle cx="6" cy="19" r="3" />
                  <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                  <circle cx="18" cy="5" r="3" />
                </svg>
              </span>
              <h2 className="m-0 text-[length:clamp(22px,2.2vw,28px)] leading-[1.2] tracking-[-0.025em] font-extrabold">
                Where your data goes
              </h2>
            </div>
            <p className="m-0 text-[16.5px] leading-[1.65] text-muted">
              For every project, we document each data flow: what data, which tools, where it&apos;s stored, and who can
              see it. You get a copy.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-y-[16px] gap-x-[48px] py-[clamp(28px,4vw,44px)] px-0 [border-bottom:1px_solid_#DCE8E1]">
            <div className="flex gap-[16px] items-start">
              <span className="flex-none w-[48px] h-[48px] rounded-[14px] bg-amber-100 text-yellow-600 flex items-center justify-center">
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
              <h2 className="m-0 text-[length:clamp(22px,2.2vw,28px)] leading-[1.2] tracking-[-0.025em] font-extrabold">
                Who can access what
              </h2>
            </div>
            <p className="m-0 text-[16.5px] leading-[1.65] text-muted">
              Named team members only, limited to each project. We use your accounts where possible and remove our
              access at handover.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-y-[16px] gap-x-[48px] py-[clamp(28px,4vw,44px)] px-0 [border-bottom:1px_solid_#DCE8E1]">
            <div className="flex gap-[16px] items-start">
              <span className="flex-none w-[48px] h-[48px] rounded-[14px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
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
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="m9 15 2 2 4-4" />
                </svg>
              </span>
              <h2 className="m-0 text-[length:clamp(22px,2.2vw,28px)] leading-[1.2] tracking-[-0.025em] font-extrabold">
                Agreements and regulated industries
              </h2>
            </div>
            <p className="m-0 text-[16.5px] leading-[1.65] text-muted">
              Every project includes a data processing agreement. For healthcare clients, we sign a Business Associate
              Agreement and use only vendors that will sign one too. For law and accounting firms, we work within your
              confidentiality rules.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-y-[16px] gap-x-[48px] py-[clamp(28px,4vw,44px)] px-0">
            <div className="flex gap-[16px] items-start">
              <span className="flex-none w-[48px] h-[48px] rounded-[14px] bg-blue-100 text-blue-600 flex items-center justify-center">
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
              <h2 className="m-0 text-[length:clamp(22px,2.2vw,28px)] leading-[1.2] tracking-[-0.025em] font-extrabold">
                An AI usage policy for your team
              </h2>
            </div>
            <p className="m-0 text-[16.5px] leading-[1.65] text-muted">
              Every audit and training engagement includes a draft AI usage policy: which tools are approved, what data
              can go into them, and who reviews outputs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
