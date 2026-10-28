"use client";

import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FAQProps = {
  items?: readonly FaqItem[];
};

export const defaultFaqItems: FaqItem[] = [
  {
    question: "What exactly does iPlex do?",
    answer:
      "We're a 200-engineer software and AI company. We build products from scratch, add AI capabilities to existing ones, and embed senior engineers directly into startup teams that need to move faster.",
  },
  {
    question: "How is iPlex different from a typical offshore dev shop?",
    answer:
      "We work as a senior product and engineering partner, not a ticket-taking vendor. The team owns outcomes, communicates directly, and stays accountable from product thinking through production.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most engagements can begin within one to two weeks. We use the first conversations to align on your goals, technical context, and the smallest team that can create momentum.",
  },
  {
    question: "Do you work with early-stage startups or only funded companies?",
    answer:
      "Both. We tailor the engagement to the stage of the product—from validating and shipping a first version to modernizing or scaling an established platform.",
  },
  {
    question: "What timezone do your engineers work in?",
    answer:
      "Our distributed teams arrange meaningful overlap with your working day and join the same planning, standups, reviews, and communication channels as your internal team.",
  },
  {
    question: "Can you work with our existing codebase and tech stack?",
    answer:
      "Yes. We regularly join existing products, learn the architecture, improve it safely, and work within your stack and delivery process before recommending any major change.",
  },
];

export function FAQ({ items = defaultFaqItems }: FAQProps) {
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
                {hasAnswer ? <div className="faq-answer" id={answerId} hidden={!isOpen}><p>{item.answer}</p></div> : null}
              </article>
            );
          })}
      </div>
    </div>
  );
}
