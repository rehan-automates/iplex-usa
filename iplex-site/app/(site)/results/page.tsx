import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/results");

export default function ResultsPage() {
  return (
    <>
      <JsonLd data={pageSchema("/results")} />
      <Glows />
      <Hero />
      <InsideSampleAiOpportunitySection />
      <WatchSystemsAtWorkSection />
      <ClientResultsSection />
      <CtaBand
        title="See what an audit would find for you."
        actions={[
          { label: "Book a free call", href: "/book" },
          { label: "or get your AI score", href: "/scorecard" },
        ]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(40px,6vw,80px)]">
      <div className="wrap flex flex-col items-center text-center gap-[22px] max-w-[900px] m-head">
        <span className="eyebrow rise self-center">Results</span>
        <h1 className="h1 rise d1">
          See the work <span className="acc">before you buy it.</span>
        </h1>
        <p className="lead rise d2 max-w-[640px]">
          A sample audit, walkthroughs of real systems, and client results as we publish them, always with permission.
        </p>
      </div>
    </section>
  );
}

function InsideSampleAiOpportunitySection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-[48px] items-center [background:radial-gradient(90%_120%_at_100%_50%,rgba(167,243,208,0.55),rgba(255,255,255,0.7)_60%)]">
          <div className="flex flex-col gap-[20px] items-start">
            <span className="eyebrow">Sample audit</span>
            <h2 className="h2">
              Inside a sample <span className="acc">AI Opportunity Map</span>
            </h2>
            <p className="lead">
              This sample uses an example business. It shows exactly what you&apos;ll get: every opportunity ranked by
              hours saved, a 90-day roadmap, and a draft AI usage policy.
            </p>
            <a className="pill pill-primary" href="#sample">
              View the sample
            </a>
          </div>
          <div className="relative h-[440px] m-mockup" role="img" aria-label="The printed sample audit, open on a desk">
            <div className="absolute top-[40px] left-[2%] w-[46%] h-[340px] box-border [transform:rotate(-7deg)] bg-white rounded-[16px] shadow-[0_24px_50px_-28px_rgba(6,95,70,0.5)] p-[22px] flex flex-col gap-[10px]">
              <span className="text-[13px] font-extrabold tracking-[-0.03em]">
                <span className="text-emerald-600">i</span>Plex
              </span>
              <div className="flex-1" />
              <span className="self-start text-[10.5px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Sample
              </span>
              <span className="text-[21px] leading-[1.1] font-extrabold tracking-[-0.03em]">AI Opportunity Map</span>
              <span className="text-[11.5px] text-subtle font-semibold">Prepared for Example Co.</span>
            </div>
            <div className="absolute top-[10px] left-[27%] w-[46%] h-[370px] box-border [transform:rotate(1deg)] bg-white rounded-[16px] shadow-[0_30px_60px_-28px_rgba(6,95,70,0.55)] p-[22px] flex flex-col gap-[12px] z-[2]">
              <span className="text-[13.5px] font-extrabold">Ranked opportunities</span>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Client reports</span>
                  <span>12 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-full" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Proposal drafts</span>
                  <span>9 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-[75%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Onboarding chasers</span>
                  <span>7 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-emerald-500 w-[58%]" />
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex justify-between text-[11.5px] font-semibold">
                  <span>Meeting notes to tasks</span>
                  <span>5 h</span>
                </div>
                <span className="h-[8px] rounded-full bg-blue-300 w-[42%]" />
              </div>
              <span className="mt-auto self-start text-[10.5px] font-bold py-[2px] px-[8px] rounded-full bg-amber-100 text-yellow-800">
                Example figures
              </span>
            </div>
            <div className="absolute top-[50px] right-0 w-[42%] h-[330px] box-border [transform:rotate(7deg)] bg-white rounded-[16px] shadow-[0_24px_50px_-28px_rgba(6,95,70,0.5)] p-[22px] flex flex-col gap-[12px]">
              <span className="text-[13px] font-extrabold">AI usage policy</span>
              <div className="flex flex-col gap-[8px]">
                <span className="h-[6px] w-[92%] rounded-[4px] bg-track" />
                <span className="h-[6px] w-[80%] rounded-[4px] bg-track" />
                <span className="h-[6px] w-[86%] rounded-[4px] bg-track" />
                <span className="h-[6px] w-[60%] rounded-[4px] bg-track" />
              </div>
              <span className="mt-[8px] text-[11.5px] font-bold text-emerald-700">Approved tools</span>
              <div className="flex flex-col gap-[8px]">
                <span className="h-[6px] w-[74%] rounded-[4px] bg-emerald-100" />
                <span className="h-[6px] w-[66%] rounded-[4px] bg-emerald-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WatchSystemsAtWorkSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Walkthroughs</span>
          <h2 className="h2">
            Watch the systems <span className="acc">at work</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-[22px]">
            <a
              className="glass lift flex flex-col gap-[16px] pt-[14px] pb-[26px] px-[14px] rounded-[28px] no-underline text-ink"
              href="#video-content"
            >
              <span className="relative aspect-[16/10] rounded-[18px] [background:linear-gradient(150deg,#0F1A16,#134E3A)] flex items-center justify-center">
                <span className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-[0_12px_24px_-10px_rgba(0,0,0,0.5)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#047857" aria-hidden="true">
                    <polygon points="7 4 20 12 7 20 7 4" />
                  </svg>
                </span>
                <span className="absolute right-[12px] bottom-[12px] py-[4px] px-[10px] rounded-full bg-[rgba(0,0,0,0.55)] text-white text-[12px] font-bold">
                  2 min
                </span>
              </span>
              <span className="py-0 px-[12px] flex flex-col gap-[6px]">
                <span className="stagetag">Lead acquisition</span>
                <strong className="text-[19px]">Content repurposing</strong>
                <span className="text-[15px] leading-[1.55] text-muted">
                  One webinar becomes a week of posts and a newsletter.
                </span>
              </span>
            </a>
            <a
              className="glass lift flex flex-col gap-[16px] pt-[14px] pb-[26px] px-[14px] rounded-[28px] no-underline text-ink"
              href="#video-onboarding"
            >
              <span className="relative aspect-[16/10] rounded-[18px] [background:linear-gradient(150deg,#0F1A16,#1E3A8A)] flex items-center justify-center">
                <span className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-[0_12px_24px_-10px_rgba(0,0,0,0.5)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#047857" aria-hidden="true">
                    <polygon points="7 4 20 12 7 20 7 4" />
                  </svg>
                </span>
                <span className="absolute right-[12px] bottom-[12px] py-[4px] px-[10px] rounded-full bg-[rgba(0,0,0,0.55)] text-white text-[12px] font-bold">
                  2 min
                </span>
              </span>
              <span className="py-0 px-[12px] flex flex-col gap-[6px]">
                <span className="stagetag">Onboarding</span>
                <strong className="text-[19px]">Onboarding</strong>
                <span className="text-[15px] leading-[1.55] text-muted">
                  From signed contract to first brief, without the chasing.
                </span>
              </span>
            </a>
            <a
              className="glass lift flex flex-col gap-[16px] pt-[14px] pb-[26px] px-[14px] rounded-[28px] no-underline text-ink"
              href="#video-reporting"
            >
              <span className="relative aspect-[16/10] rounded-[18px] [background:linear-gradient(150deg,#0F1A16,#713F12)] flex items-center justify-center">
                <span className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-[0_12px_24px_-10px_rgba(0,0,0,0.5)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#047857" aria-hidden="true">
                    <polygon points="7 4 20 12 7 20 7 4" />
                  </svg>
                </span>
                <span className="absolute right-[12px] bottom-[12px] py-[4px] px-[10px] rounded-full bg-[rgba(0,0,0,0.55)] text-white text-[12px] font-bold">
                  2 min
                </span>
              </span>
              <span className="py-0 px-[12px] flex flex-col gap-[6px]">
                <span className="stagetag">Retention</span>
                <strong className="text-[19px]">Reporting</strong>
                <span className="text-[15px] leading-[1.55] text-muted">
                  A monthly client report with the analysis already drafted.
                </span>
              </span>
            </a>
          </div>
          <div className="m-bar [--n:3]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientResultsSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">Client results</span>
          <h2 className="h2">Client results</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-[22px] items-stretch">
          <div className="glass flex flex-col justify-center gap-[18px] p-[40px] rounded-[28px] [background:radial-gradient(110%_100%_at_0%_0%,rgba(253,230,138,0.55),rgba(255,255,255,0.7)_60%)]">
            <span className="text-[13px] font-bold tracking-[0.06em] uppercase text-yellow-800">Coming soon</span>
            <p className="m-0 text-[length:clamp(22px,2.2vw,28px)] leading-[1.3] tracking-[-0.02em] font-extrabold">
              Founding client results are on their way.
            </p>
            <p className="m-0 text-[16.5px] leading-[1.6] text-muted">
              Want to be one of the first? Ask about founding-client pricing on a free call.
            </p>
            <Link className="pill pill-primary self-start" href="/book">
              Ask about founding-client pricing
            </Link>
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="text-[12.5px] font-bold tracking-[.06em] uppercase text-subtle">
              Card layout, once results are in
            </span>
            <div className="flex-1 flex flex-col gap-[16px] p-[32px] rounded-[28px] [border:2px_dashed_#B8D3C5] bg-[rgba(255,255,255,0.5)]">
              <div className="flex justify-between items-center gap-[12px]">
                <span className="text-[15px] font-extrabold">
                  [Client name, or &quot;Content agency, 18 people&quot;]
                </span>
                <span className="stagetag">[Stage]</span>
              </div>
              <div className="flex items-baseline gap-[10px]">
                <span className="text-[44px] font-extrabold tracking-[-0.04em] text-emerald-700">[Number]</span>
                <span className="text-[15px] font-semibold text-muted">
                  [such as hours saved per week, and how it was measured]
                </span>
              </div>
              <p className="m-0 text-[17px] leading-[1.55] italic">
                &quot;[One or two sentences from the client, in their words.]&quot;
              </p>
              <div className="flex items-center gap-[12px]">
                <span className="w-[44px] h-[44px] rounded-full bg-[#D2E9DC]" />
                <span className="flex flex-col">
                  <strong className="text-[15px]">[Name]</strong>
                  <span className="text-[13.5px] text-subtle">[Role, company]</span>
                </span>
              </div>
              <span className="pt-[14px] [border-top:1px_solid_#DCE8E1] text-[13px] leading-[1.5] text-subtle">
                [Client] received a founding-client discount in exchange for sharing these results.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
