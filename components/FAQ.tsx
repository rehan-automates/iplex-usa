"use client";

import { useState } from "react";

import type { FaqItem } from "@/lib/content";

export type FAQProps = {
  items: readonly FaqItem[];
};

export function FAQ({ items }: FAQProps) {
  const [openItem, setOpenItem] = useState<number | null>(0);

  return (
    <div className="site-faq" id="faq">
      <div className="faq-list">
        {items.map((item, index) => {
          const isOpen = index === openItem;
          const hasAnswer = Boolean(item.answer);
          const answerId = `faq-answer-${index}`;

          return (
            <article className="faq-item" data-open={isOpen ? "true" : "false"} key={item.question}>
              <h3 className="faq-question-heading">
                <button
                  aria-controls={hasAnswer ? answerId : undefined}
                  aria-expanded={hasAnswer ? isOpen : false}
                  className="faq-question"
                  onClick={() => hasAnswer && setOpenItem(isOpen ? null : index)}
                  type="button"
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    <span className="faq-toggle-horizontal" />
                    <span className="faq-toggle-vertical" />
                  </span>
                </button>
              </h3>
              {hasAnswer ? (
                <div className="faq-answer" id={answerId} hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
