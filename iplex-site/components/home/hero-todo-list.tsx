"use client";

import { useState } from "react";

const TASKS = [
  { task: "Turn last week's webinar into posts", stage: "Lead acquisition", delay: "1s" },
  { task: "Follow up with every new lead", stage: "Sales", delay: "1.6s" },
  { task: "Chase the new client for logins", stage: "Onboarding", delay: "2.2s" },
  { task: "Write first drafts in the client's voice", stage: "Delivery", delay: "2.8s" },
  { task: "Build the monthly client reports", stage: "Retention", delay: "3.4s" },
];

function Check({ size = 13, width = 3.5 }: { size?: number; width?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Hero visual: this week's repeat work, ticked off one job at a time by AI systems.
 * Clicking replays the sequence (the list remounts, restarting its CSS animations).
 */
export function HeroTodoList() {
  const [plays, setPlays] = useState(0);

  return (
    <button
      type="button"
      className="phone-btn relative w-full max-w-[540px]"
      onClick={() => setPlays((n) => n + 1)}
      aria-label="Replay: your weekly repeat work, handed to AI systems one job at a time"
    >
      <div
        key={plays}
        className="glass flex flex-col gap-[10px] p-[22px] rounded-[28px] shadow-[0_50px_90px_-50px_rgba(6,95,70,0.55),inset_0_1px_0_rgba(255,255,255,0.9)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-[8px] gap-x-[12px] pt-0 pb-[6px] px-[4px]">
          <div className="flex flex-col gap-[2px]">
            <span className="text-[17px] font-extrabold tracking-[-0.01em]">This week&apos;s to-do list</span>
            <span className="text-[12.5px] text-subtle font-semibold">Example agency · Mon to Fri</span>
          </div>
          <span className="inline-flex items-center gap-[6px] py-[5px] px-[11px] rounded-full bg-amber-100 text-yellow-800 text-[12.5px] font-bold">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            Same list as last week
          </span>
        </div>

        {TASKS.map(({ task, stage, delay }) => (
          <div
            key={task}
            className="todo-done todo-row flex items-center gap-[12px] py-[12px] px-[14px] rounded-[14px] bg-[rgba(255,255,255,0.88)] [border:1px_solid_#E6EEEA]"
            style={{ animationDelay: delay }}
          >
            <span className="stack flex-none w-[26px] h-[26px]">
              <span className="w-[26px] h-[26px] box-border rounded-full [border:2px_solid_#C9D6D0]" />
              <span
                className="todo-in w-[26px] h-[26px] rounded-full bg-emerald-500 text-white flex items-center justify-center"
                style={{ animationDelay: delay }}
              >
                <Check />
              </span>
            </span>
            <span className="flex-1 min-w-0 flex flex-col gap-[2px]">
              <span className="text-[14.5px] font-bold">{task}</span>
              <span className="text-[12px] text-subtle font-semibold">{stage}</span>
            </span>
            <span className="stack flex-none justify-items-end">
              <span
                className="todo-out py-[4px] px-[10px] rounded-full bg-[#F3F4F1] text-subtle text-[12px] font-bold whitespace-nowrap"
                style={{ animationDelay: delay }}
              >
                Again
              </span>
              <span
                className="todo-in py-[4px] px-[10px] rounded-full bg-emerald-100 text-emerald-800 text-[12px] font-bold whitespace-nowrap"
                style={{ animationDelay: delay }}
              >
                Done by AI
              </span>
            </span>
          </div>
        ))}

        <div
          className="todo-in mt-[4px] flex items-center gap-[12px] py-[14px] px-[16px] rounded-[16px] [background:linear-gradient(135deg,#059669,#065F46)] text-white"
          style={{ animationDelay: "4.1s" }}
        >
          <span className="flex-none w-[32px] h-[32px] rounded-full bg-amber-200 text-yellow-800 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </span>
          <span className="flex flex-col gap-[2px]">
            <span className="text-[14.5px] font-extrabold">Your team approves. Then gets back to clients.</span>
            <span className="text-[12.5px] text-emerald-100">Same team. More done.</span>
          </span>
        </div>
      </div>
    </button>
  );
}
