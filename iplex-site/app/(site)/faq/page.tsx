import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { Faq, type FaqItem } from "@/components/faq";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/faq");

const FAQ_0: FaqItem[] = [
  {
    question: "Will AI replace my team?",
    answer: "No. It takes the repetitive work, so your people can do more of the work only people can do.",
  },
  {
    question: "Will our clients know we use AI?",
    answer: "That's your decision. Either way, your team reviews everything before it reaches a client.",
  },
  {
    question: "We already pay for ChatGPT or Copilot. Why do we need you?",
    answer:
      "Licenses don't change how work gets done. We connect AI to your real processes and train your team to use it.",
  },
];

const FAQ_1: FaqItem[] = [
  {
    question: "What do we get?",
    answer:
      "A ranked map of every task AI can take on, a 90-day roadmap, a draft AI usage policy, and a leadership readout.",
  },
  {
    question: "How long does it take?",
    answer: "Two to three weeks.",
  },
  {
    question: "What if it finds little to automate?",
    answer: (
      <>
        If it doesn&apos;t find at least{" "}
        <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[X]</span> hours a week of work
        AI can take on, we refund the fee.
      </>
    ),
    answerText: "If it doesn't find at least [X] hours a week of work AI can take on, we refund the fee.",
  },
];

const FAQ_2: FaqItem[] = [
  {
    question: "Is this just Zapier or spreadsheet automation?",
    answer:
      "No. Simple automations move data between apps. We build AI systems that read, write, and summarize using your content and brand voice, with your team approving what goes out.",
  },
  {
    question: "Who owns what you build?",
    answer: "You do: the systems, the prompts, and the documentation.",
  },
  {
    question: "What happens after handover?",
    answer:
      "We support every system for 30 days. After that, you can add an AI Partner retainer for monthly improvements.",
  },
];

const FAQ_3: FaqItem[] = [
  {
    question: "Can we buy training on its own?",
    answer: "Yes. It's a good first step for teams not ready to automate.",
  },
  {
    question: "How do you know it worked?",
    answer: "We measure your team's AI use before training and 30 days after, and send you the numbers.",
  },
];

const FAQ_4: FaqItem[] = [
  {
    question: "Is our client data safe?",
    answer:
      "Yes. We use business-grade tools set to keep your data out of model training, sign a data processing agreement, and limit access to what each project needs.",
  },
  {
    question: "Do you sign a Business Associate Agreement?",
    answer: "Yes, for healthcare clients.",
  },
];

const FAQ_5: FaqItem[] = [
  {
    question: "How much does it cost?",
    answer:
      "Audits from $2,500, implementation sprints from $7,500, training from $2,500, and retainers from $2,000 a month.",
  },
  {
    question: "Why fixed prices?",
    answer: "So you know the full cost before you start.",
  },
  {
    question: "Can we cancel the retainer?",
    answer: "Yes. It's month to month.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={pageSchema("/faq", { faqs: [...FAQ_0, ...FAQ_1, ...FAQ_2, ...FAQ_3, ...FAQ_4, ...FAQ_5] })} />
      <Glows />
      <Hero />
      <QuestionsSection />
      <CtaBand
        title="Still have a question?"
        actions={[
          { label: "Book a free call", href: "/book" },
          { label: "or send us a message", href: "/contact" },
        ]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(40px,6vw,80px)] pb-[32px]">
      <div className="wrap flex flex-col items-center text-center gap-[22px] max-w-[900px] m-head">
        <span className="eyebrow rise self-center">FAQ</span>
        <h1 className="h1 rise d1">
          Questions, <span className="acc">answered.</span>
        </h1>
        <p className="lead rise d2">
          Can&apos;t find yours?{" "}
          <Link className="font-bold" href="/book">
            Ask us on a free call.
          </Link>
        </p>
        <nav className="rise d3 flex flex-wrap justify-center gap-[8px] mt-[6px]" aria-label="Topics">
          <a className="opt no-underline" href="#team">
            AI and your team
          </a>
          <a className="opt no-underline" href="#audit">
            The audit
          </a>
          <a className="opt no-underline" href="#implementation">
            Implementation
          </a>
          <a className="opt no-underline" href="#training">
            Training
          </a>
          <a className="opt no-underline" href="#data">
            Data and security
          </a>
          <a className="opt no-underline" href="#pricing-q">
            Pricing
          </a>
        </nav>
      </div>
    </section>
  );
}

function QuestionsSection() {
  return (
    <section className="sec pt-[24px]">
      <div className="wrap max-w-[900px] flex flex-col gap-[48px] max-[640px]:gap-[28px]">
        <div className="flex flex-col gap-[14px]" id="team">
          <h2 className="mt-0 mb-[4px] mx-0 flex items-center gap-[12px] text-[24px] font-extrabold tracking-[-0.02em]">
            <span className="w-[10px] h-[10px] rounded-full bg-emerald-500" />
            AI and your team
          </h2>
          <Faq items={FAQ_0} defaultOpen={0} />
        </div>
        <div className="flex flex-col gap-[14px]" id="audit">
          <h2 className="mt-0 mb-[4px] mx-0 flex items-center gap-[12px] text-[24px] font-extrabold tracking-[-0.02em]">
            <span className="w-[10px] h-[10px] rounded-full bg-emerald-500" />
            The audit
          </h2>
          <Faq items={FAQ_1} defaultOpen={-1} />
        </div>
        <div className="flex flex-col gap-[14px]" id="implementation">
          <h2 className="mt-0 mb-[4px] mx-0 flex items-center gap-[12px] text-[24px] font-extrabold tracking-[-0.02em]">
            <span className="w-[10px] h-[10px] rounded-full bg-emerald-500" />
            Implementation
          </h2>
          <Faq items={FAQ_2} defaultOpen={-1} />
        </div>
        <div className="flex flex-col gap-[14px]" id="training">
          <h2 className="mt-0 mb-[4px] mx-0 flex items-center gap-[12px] text-[24px] font-extrabold tracking-[-0.02em]">
            <span className="w-[10px] h-[10px] rounded-full bg-emerald-500" />
            Training
          </h2>
          <Faq items={FAQ_3} defaultOpen={-1} />
        </div>
        <div className="flex flex-col gap-[14px]" id="data">
          <h2 className="mt-0 mb-[4px] mx-0 flex items-center gap-[12px] text-[24px] font-extrabold tracking-[-0.02em]">
            <span className="w-[10px] h-[10px] rounded-full bg-blue-600" />
            Data and security
          </h2>
          <Faq items={FAQ_4} defaultOpen={-1} />
        </div>
        <div className="flex flex-col gap-[14px]" id="pricing-q">
          <h2 className="mt-0 mb-[4px] mx-0 flex items-center gap-[12px] text-[24px] font-extrabold tracking-[-0.02em]">
            <span className="w-[10px] h-[10px] rounded-full bg-[#EAB308]" />
            Pricing
          </h2>
          <Faq items={FAQ_5} defaultOpen={-1} />
        </div>
      </div>
    </section>
  );
}
