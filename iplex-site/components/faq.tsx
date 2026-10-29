"use client";

import { useId, useState, type ReactNode } from "react";

export type FaqItem = {
  question: string;
  answer: ReactNode;
  /** Plain-text answer for structured data, when `answer` contains markup. */
  answerText?: string;
};

/**
 * FAQ accordion. Every answer is rendered into the HTML (hidden until opened),
 * so search engines and the FAQPage structured data see the full text.
 */
export function Faq({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question} className="glass rounded-[22px] overflow-hidden">
            <h3 className="m-0">
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.question}
                <span
                  className="flex-none w-[36px] h-[36px] rounded-full flex items-center justify-center [transition:transform_.25s_ease,background-color_.25s_ease]"
                  style={{
                    background: isOpen ? "#059669" : "#FFFFFF",
                    color: isOpen ? "#FFFFFF" : "#101814",
                    transform: `rotate(${isOpen ? 45 : 0}deg)`,
                  }}
                >
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
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-label={item.question} hidden={!isOpen}>
              <p className="m-0 pt-0 px-[26px] pb-[22px] text-[16px] leading-[1.65] text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
