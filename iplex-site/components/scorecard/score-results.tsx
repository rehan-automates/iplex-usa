"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EXAMPLE_SCORES, STAGES, decodeScores, topOpportunities } from "@/lib/scorecard";

const OPPORTUNITY_TINTS = [
  "[background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.55),rgba(255,255,255,0.7)_55%)]",
  "[background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.45),rgba(255,255,255,0.7)_55%)]",
  "[background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.4),rgba(255,255,255,0.7)_55%)]",
];
const OPERATIONS_TINT =
  "[background:radial-gradient(120%_100%_at_0%_0%,rgba(191,219,254,0.5),rgba(255,255,255,0.7)_55%)]";

/** Results grid: score bars for every stage, and the three lowest stages as opportunities. */
function ResultsView({ scores, example }: { scores: number[] | null; example?: boolean }) {
  const top = scores ? topOpportunities(scores) : [];
  const label = scores
    ? `Score for each lifecycle stage: ${STAGES.map((s, i) => `${s.name} ${scores[i]}`).join(", ")}`
    : "Loading your scores";

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-[22px] items-stretch">
      <div
        className="glass rise d2 flex flex-col gap-[18px] p-[clamp(24px,3.5vw,40px)] rounded-[30px] bg-[rgba(255,255,255,0.78)]"
        role="img"
        aria-label={label}
      >
        <div className="flex justify-between items-center">
          <h2 className="m-0 text-[22px] font-extrabold">Score by stage</h2>
          {example ? (
            <span className="text-[11.5px] font-bold py-[3px] px-[9px] rounded-full bg-amber-100 text-yellow-800">
              Example
            </span>
          ) : null}
        </div>
        {STAGES.map((stage, i) => {
          const score = scores?.[i];
          const highlight = top.includes(i);
          return highlight ? (
            <div
              key={stage.name}
              className="flex flex-col gap-[7px] py-[10px] px-[12px] my-0 mx-[-12px] rounded-[14px] bg-emerald-50"
            >
              <div className="flex justify-between text-[15px] font-extrabold text-emerald-800">
                <span>{stage.name}</span>
                <span>{score}</span>
              </div>
              <div className="h-[10px] rounded-full bg-emerald-100">
                <div className="h-full rounded-full bg-emerald-600" style={{ width: `${score}%` }} />
              </div>
            </div>
          ) : (
            <div key={stage.name} className="flex flex-col gap-[7px]">
              <div className="flex justify-between text-[15px] font-semibold">
                <span>{stage.name}</span>
                <span>{score ?? "–"}</span>
              </div>
              <div className="h-[10px] rounded-full bg-track">
                <div className="h-full rounded-full bg-stone" style={{ width: `${score ?? 0}%` }} />
              </div>
            </div>
          );
        })}
        <span className="flex items-center gap-[8px] text-[13.5px] font-semibold text-emerald-800">
          <span className="w-[10px] h-[10px] rounded-[3px] bg-emerald-600" />
          Lower scores mean more time AI can give back
        </span>
      </div>

      <div className="rise d3 flex flex-col gap-[14px]">
        <h2 className="mt-0 mb-[4px] mx-0 text-[22px] font-extrabold">Your three biggest opportunities</h2>
        {(scores ? top : [0, 1, 2]).map((stageIndex, rank) => {
          const stage = STAGES[stageIndex];
          const isOps = stage.name === "Operations";
          return (
            <div
              key={scores ? stage.name : rank}
              className={`glass flex gap-[16px] p-[24px] rounded-[24px] ${scores && isOps ? OPERATIONS_TINT : OPPORTUNITY_TINTS[rank]}`}
            >
              <span className="flex-none w-[40px] h-[40px] rounded-full [background:linear-gradient(180deg,#059669,#065F46)] text-white font-extrabold flex items-center justify-center">
                {rank + 1}
              </span>
              {scores ? (
                <div className="flex flex-col gap-[6px]">
                  <span className={`stagetag ${isOps ? "text-blue-700" : ""}`}>{stage.name}</span>
                  <p className="m-0 text-[16px] leading-[1.55] font-semibold">{stage.opportunity}</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-[10px] pt-[4px]" aria-hidden="true">
                  <span className="h-[12px] w-[110px] rounded-full bg-[#E1EDE6]" />
                  <span className="h-[12px] w-[90%] rounded-full bg-[#E1EDE6]" />
                </div>
              )}
            </div>
          );
        })}
        {example ? (
          <p className="m-0 text-[14.5px] text-muted font-semibold">
            These are example results.{" "}
            <Link href="/scorecard" className="font-bold">
              Take the five-minute scorecard
            </Link>{" "}
            to see yours.
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Reads the visitor's scores from the URL (?s=68-54-31-57-26-39); shows the example without them. */
export function ScoreResults() {
  const scores = decodeScores(useSearchParams().get("s"));
  return scores ? <ResultsView scores={scores} /> : <ResultsView scores={EXAMPLE_SCORES} example />;
}

/** Shown in the static HTML until the browser has read the scores. */
export function ScoreResultsPlaceholder() {
  return <ResultsView scores={null} />;
}
