"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type StageId = "lead" | "sales" | "onboard" | "delivery" | "retention" | "ops";

type Stage = { num: string; name: string; promise: string; systems: string[]; icon: ReactNode };

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const STAGES: Record<StageId, Stage> = {
  lead: {
    num: "01",
    name: "Lead acquisition",
    promise: "More leads, better qualified.",
    systems: ["Content repurposing", "SEO and ad drafts", "Instant lead qualification and follow-up", "CRM updates"],
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  sales: {
    num: "02",
    name: "Sales",
    promise: "Win more of the leads you get.",
    systems: ["Proposals built from your best past work", "Call notes into your CRM", "Tailored follow-ups"],
    icon: (
      <svg {...iconProps}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="m9 10 2 2 4-4" />
      </svg>
    ),
  },
  onboard: {
    num: "03",
    name: "Onboarding",
    promise: "Signed to kickoff-ready, without the chasing.",
    systems: ["Intake to first brief", "Access requests", "Welcome sequences", "Workspace setup"],
    icon: (
      <svg {...iconProps}>
        <circle cx="7.5" cy="15.5" r="5.5" />
        <path d="m21 2-9.6 9.6" />
        <path d="m15.5 7.5 3 3L22 7l-3-3" />
      </svg>
    ),
  },
  delivery: {
    num: "04",
    name: "Delivery",
    promise: "Faster work that still sounds like the client.",
    systems: ["A content hub for brand voice and guidelines", "First drafts", "Quality checks"],
    icon: (
      <svg {...iconProps}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
  retention: {
    num: "05",
    name: "Retention",
    promise: "Clients who see the value and stay.",
    systems: [
      "Reports that explain what changed and why",
      "Early warnings when a client goes quiet",
      "Renewal prompts",
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  ops: {
    num: "06",
    name: "Operations",
    promise: "Less admin behind every stage.",
    systems: ["Meeting notes into tasks", "Capacity planning", "An internal knowledge assistant"],
    icon: (
      <svg {...iconProps}>
        <path d="M21 4h-7" />
        <path d="M10 4H3" />
        <path d="M21 12h-9" />
        <path d="M8 12H3" />
        <path d="M21 20h-5" />
        <path d="M12 20H3" />
        <path d="M14 2v4" />
        <path d="M8 10v4" />
        <path d="M16 18v4" />
      </svg>
    ),
  },
};

const LIFECYCLE: StageId[] = ["lead", "sales", "onboard", "delivery", "retention"];

/** "From first lead to renewal": pick a lifecycle stage to see what we build for it. */
export function LifecycleExplorer() {
  const [active, setActive] = useState<StageId>("lead");
  const current = STAGES[active];
  const opsOn = active === "ops";

  return (
    <div className="flex flex-col gap-[14px]">
      <div className="hide-sm relative h-[44px] my-0 mx-[10%]" aria-hidden="true">
        <div className="absolute left-0 right-0 bottom-0 h-[26px] [border:2px_dashed_#93C5FD] border-b-0 rounded-[18px_18px_0_0]" />
        <div className="absolute left-[-7px] bottom-[-8px] w-0 h-0 [border-left:8px_solid_transparent] [border-right:8px_solid_transparent] [border-top:10px_solid_#60A5FA]" />
        <div className="absolute left-1/2 top-[2px] [transform:translateX(-50%)] inline-flex items-center gap-[8px] py-[6px] px-[14px] bg-white [border:1px_solid_#BFDBFE] rounded-full text-blue-700 text-[13px] font-bold whitespace-nowrap">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
          Referrals and renewals
        </div>
      </div>

      <div className="m-chips grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-[12px]">
        {LIFECYCLE.map((id) => {
          const stage = STAGES[id];
          const on = id === active;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(id)}
              className={`stage flex flex-col items-start gap-[16px] p-[20px] rounded-[18px] cursor-pointer text-left [font:inherit] text-charcoal ${
                on
                  ? "bg-emerald-50 [border:2px_solid_#047857] shadow-[0_16px_32px_-18px_rgba(4,120,87,0.6)]"
                  : "bg-white [border:2px_solid_#E3E8E5] shadow-none"
              }`}
            >
              <span className="flex w-full justify-between items-center">
                <span
                  className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center ${
                    on ? "bg-emerald-700 text-white" : "bg-[#F2F5F3] text-graphite"
                  }`}
                >
                  {stage.icon}
                </span>
                <span className="text-[13px] font-bold text-subtle">{stage.num}</span>
              </span>
              <span className="text-[17px] font-extrabold tracking-[-0.01em]">{stage.name}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-pressed={opsOn}
        onClick={() => setActive("ops")}
        className={`stage flex items-center flex-wrap gap-y-[12px] gap-x-[16px] w-full py-[16px] px-[20px] rounded-[18px] cursor-pointer text-left [font:inherit] text-charcoal ${
          opsOn ? "bg-blue-100 [border:2px_solid_#2563EB]" : "bg-blue-50 [border:2px_solid_#DBEAFE]"
        }`}
      >
        <span
          className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center ${
            opsOn ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
        >
          {STAGES.ops.icon}
        </span>
        <span className="text-[17px] font-extrabold tracking-[-0.01em]">Operations</span>
        <span className="text-[15px] text-graphite">The base under every stage</span>
        <span className="ml-auto text-[13px] font-bold text-subtle">06</span>
      </button>

      <div
        key={active}
        aria-live="polite"
        className="fade-in mt-[6px] grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-[32px] p-[clamp(24px,3.5vw,44px)] rounded-[24px] bg-charcoal text-white"
      >
        <div className="flex flex-col justify-between gap-[28px]">
          <div className="flex flex-col gap-[14px]">
            <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-emerald-300">
              {current.num} · {current.name}
            </span>
            <h3 className="m-0 text-[length:clamp(28px,3.2vw,40px)] leading-[1.12] tracking-[-0.03em] font-extrabold text-balance">
              {current.promise}
            </h3>
          </div>
          <Link className="textlink-dark" href="/scorecard">
            See how ready each stage of your business is
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
        </div>
        <div className="flex flex-col gap-[14px]">
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-[#9FB3AA]">AI systems we build</span>
          <ul className="list-none m-0 p-0 flex flex-col gap-[10px]">
            {current.systems.map((label) => (
              <li
                key={label}
                className="flex items-center gap-[12px] py-[14px] px-[16px] rounded-[14px] bg-[rgba(255,255,255,0.06)] [border:1px_solid_rgba(255,255,255,0.1)] text-[16px] font-medium leading-[1.4]"
              >
                <span className="flex-none w-[26px] h-[26px] rounded-full bg-emerald-400 text-forest flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
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
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
