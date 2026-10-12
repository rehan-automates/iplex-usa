"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Honeypot, formFields } from "@/components/forms/field-error";
import { submitLead } from "@/lib/leads";
import { SCALE, STAGES, encodeScores, stageScores } from "@/lib/scorecard";
import { rememberContact } from "@/lib/visitor";
import { track } from "@/lib/track";

const TOTAL_STEPS = 7;

function Progress({ step, label }: { step: number; label: string }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-between items-center gap-[12px] text-[13.5px] font-bold">
        <span className="stagetag">{label}</span>
        <span className="text-subtle">
          Step {step} of {TOTAL_STEPS}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={step}
        aria-label="Scorecard progress"
        className="h-[8px] rounded-full bg-[#E1EDE6] overflow-hidden"
      >
        <div
          className="h-full rounded-full [background:linear-gradient(90deg,#10B981,#059669)] [transition:width_.4s_ease]"
          style={{ width: `${Math.round((step / TOTAL_STEPS) * 100)}%` }}
        />
      </div>
    </div>
  );
}

/** AI Readiness Scorecard: intro, six question steps (one per stage), then contact details. */
export function Scorecard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  const go = (next: number) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const fields = formFields(event.currentTarget);
    const scores = stageScores(answers);
    STAGES.forEach((stage, i) => {
      fields[`score: ${stage.name}`] = String(scores[i]);
    });
    const result = await submitLead("scorecard", fields, "/scorecard");
    if (!result.ok) {
      setStatus("failed");
      return;
    }
    rememberContact(fields);
    track("scorecard_complete");
    router.push(`/scorecard/results?s=${encodeScores(scores)}`);
  }

  if (step === 0) {
    return (
      <div className="flex flex-col items-center text-center gap-[24px] pt-[clamp(16px,4vw,48px)] m-head">
        <span className="eyebrow rise self-center">AI Readiness Scorecard</span>
        <h1 className="h1 rise d1">
          How ready is your business for AI? <span className="acc">Find out in five minutes.</span>
        </h1>
        <p className="lead rise d2 max-w-[620px]">
          Answer 18 quick questions about how your team finds, wins, onboards, serves, and keeps clients. You&apos;ll
          get a score for each stage and your three biggest opportunities.
        </p>
        <div className="rise d3 flex flex-col items-center gap-[14px]">
          <button type="button" className="pill pill-primary min-w-[260px]" onClick={() => go(1)}>
            Start my scorecard
          </button>
          <span className="text-[14px] text-muted font-semibold">Free. Five minutes. Instant results.</span>
        </div>
        <div className="rise d3 flex flex-wrap justify-center gap-[8px] mt-[12px]">
          {STAGES.map((s) => (
            <span
              key={s.name}
              className={`glass py-[8px] px-[14px] rounded-full text-[13.5px] font-bold ${s.name === "Operations" ? "bg-blue-100" : ""}`}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (step <= STAGES.length) {
    const s = step - 1;
    const stage = STAGES[s];
    return (
      <div className="glass flex flex-col gap-[26px] p-[clamp(24px,4vw,44px)] rounded-[32px] bg-[rgba(255,255,255,0.78)]">
        <Progress step={step} label={stage.name} />
        <h1 className="quiz-title m-0 text-[length:clamp(24px,2.6vw,32px)] leading-[1.2] tracking-[-0.03em] font-extrabold">
          How true is this for your team today?
        </h1>
        {stage.questions.map((question, q) => {
          const key = `${s}-${q}`;
          return (
            <fieldset
              key={key}
              className="m-0 pt-0 px-0 pb-[22px] border-0 [border-bottom:1px_solid_#DCE8E1] flex flex-col gap-[12px]"
            >
              <legend className="pt-0 px-0 pb-[12px] text-[17px] leading-[1.45] font-bold">{question}</legend>
              <div className="m-options flex flex-wrap gap-[8px]">
                {SCALE.map((label) => {
                  const on = answers[key] === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      className={`opt ${on ? "bg-emerald-50 border-emerald-600 text-emerald-800" : "bg-white border-line text-ink-soft"}`}
                      aria-pressed={on}
                      onClick={() => setAnswers((a) => ({ ...a, [key]: label }))}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
        <div className="flex justify-between items-center gap-[12px]">
          <button type="button" className="pill pill-outline pill-sm" onClick={() => go(step - 1)}>
            Back
          </button>
          <button type="button" className="pill pill-primary pill-sm" onClick={() => go(step + 1)}>
            {step === STAGES.length ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="glass relative flex flex-col gap-[22px] p-[clamp(24px,4vw,44px)] rounded-[32px] bg-[rgba(255,255,255,0.78)]"
      onSubmit={onSubmit}
    >
      <Honeypot />
      <Progress step={TOTAL_STEPS} label="Almost done" />
      <h1 className="quiz-title m-0 text-[length:clamp(24px,2.6vw,32px)] leading-[1.2] tracking-[-0.03em] font-extrabold">
        Where should we send your results?
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[14px]">
        <label className="field">
          Name
          <input className="input" type="text" name="name" autoComplete="name" required />
        </label>
        <label className="field">
          Work email
          <input
            className="input"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@company.com"
            required
          />
        </label>
        <label className="field">
          Company
          <input className="input" type="text" name="company" autoComplete="organization" />
        </label>
        <label className="field">
          Role
          <input className="input" type="text" name="role" autoComplete="organization-title" />
        </label>
        <label className="field">
          Company size
          <select className="input" name="companySize" defaultValue="1 to 10">
            <option>1 to 10</option>
            <option>11 to 50</option>
            <option>51 to 200</option>
            <option>More than 200</option>
          </select>
        </label>
      </div>
      <span className="text-[13.5px] leading-[1.55] text-subtle">
        We&apos;ll email your results and a few short follow-ups with ideas for your team. Unsubscribe any time. Read
        our <Link href="/privacy">privacy policy</Link>.
      </span>
      {status === "failed" ? (
        <div
          role="alert"
          className="py-[14px] px-[16px] rounded-[14px] bg-[#FEF3F2] [border:1px_solid_#FECDCA] text-[14.5px] leading-[1.5] text-[#7A271A]"
        >
          Something went wrong. Please try again.
        </div>
      ) : null}
      <div className="flex justify-between items-center gap-[12px]">
        <button type="button" className="pill pill-outline pill-sm" onClick={() => go(step - 1)}>
          Back
        </button>
        <button type="submit" className="pill pill-primary" disabled={status === "sending"}>
          {status === "sending" ? "Saving…" : "See my results"}
        </button>
      </div>
    </form>
  );
}
