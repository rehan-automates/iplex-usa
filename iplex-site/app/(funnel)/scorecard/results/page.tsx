import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { ScoreResults, ScoreResultsPlaceholder } from "@/components/scorecard/score-results";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/scorecard/results");

export default function ScorecardResultsPage() {
  return (
    <>
      <JsonLd data={pageSchema("/scorecard/results")} />
      <Glows />
      <Hero />
      <TalkThroughResultsSection />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(24px,4vw,48px)]">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[18px] max-w-[860px] my-0 mx-auto m-head">
          <span className="eyebrow rise self-center">Your AI Readiness results</span>
          <h1 className="h1 rise d1 text-[length:clamp(36px,4.6vw,60px)]">
            Here&apos;s where AI would save <span className="acc">your team the most time.</span>
          </h1>
          <p className="lead rise d2">
            We&apos;ve also emailed these results to you, so you can share them with your team.
          </p>
        </div>
        <Suspense fallback={<ScoreResultsPlaceholder />}>
          <ScoreResults />
        </Suspense>
      </div>
    </section>
  );
}

function TalkThroughResultsSection() {
  return (
    <section className="sec pt-0 pb-[clamp(56px,7vw,96px)]">
      <div className="wrap">
        <div className="relative overflow-hidden flex flex-wrap items-center justify-between gap-y-[24px] gap-x-[40px] p-[clamp(28px,4.5vw,56px)] rounded-[32px] bg-night text-white">
          <div
            className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1.2px,transparent_1.2px)] [background-size:22px_22px]"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-[12px] max-w-[600px]">
            <h2 className="m-0 text-[length:clamp(28px,3.4vw,42px)] leading-[1.1] tracking-[-0.035em] font-extrabold">
              Talk through your results in 30 minutes.
            </h2>
            <p className="m-0 text-[17px] leading-[1.6] text-fog">
              A free Opportunity Call. We&apos;ll go through your scores and tell you where to start.
            </p>
          </div>
          <div className="relative flex flex-wrap items-center gap-y-[12px] gap-x-[20px]">
            <Link className="pill pill-mint" href="/book">
              Book my Opportunity Call
            </Link>
            <Link className="text-emerald-200 font-bold no-underline" href="/results">
              See a sample audit →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
