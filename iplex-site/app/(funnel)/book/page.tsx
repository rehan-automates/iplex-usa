import type { Metadata } from "next";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { BookingPicker } from "@/components/forms/booking-picker";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/book");

export default function BookPage() {
  return (
    <>
      <JsonLd data={pageSchema("/book")} />
      <Glows />
      <Hero />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(24px,4vw,48px)] pb-[clamp(56px,7vw,96px)]">
      <div className="wrap flex flex-col gap-[36px] max-[640px]:gap-[24px]">
        <div className="flex flex-col items-center text-center gap-[16px] max-w-[820px] my-0 mx-auto m-head">
          <span className="eyebrow rise self-center">Free · 30 minutes · Video call</span>
          <h1 className="h1 rise d1 text-[length:clamp(36px,4.6vw,60px)]">
            Book your free <span className="acc">Opportunity Call.</span>
          </h1>
          <p className="lead rise d2">
            Thirty minutes on video. We&apos;ll look at how your team works and where AI would save the most time.
          </p>
        </div>
        <div className="flex flex-wrap gap-[22px] items-start">
          <BookingPicker />
          <aside className="rise d3 flex-[1_1_300px] flex flex-col gap-[18px]">
            <div className="glass flex flex-col gap-[16px] p-[30px] rounded-[28px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.55),rgba(255,255,255,0.7)_55%)]">
              <h2 className="m-0 text-[21px] font-extrabold">What we&apos;ll cover</h2>
              <div className="flex gap-[12px] items-start text-[16px] leading-[1.5] font-semibold">
                <span className="flex-none w-[26px] h-[26px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                Your biggest time drains
              </div>
              <div className="flex gap-[12px] items-start text-[16px] leading-[1.5] font-semibold">
                <span className="flex-none w-[26px] h-[26px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                Which stage of your client lifecycle to start with
              </div>
              <div className="flex gap-[12px] items-start text-[16px] leading-[1.5] font-semibold">
                <span className="flex-none w-[26px] h-[26px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                Whether an audit makes sense, and what it would cost
              </div>
            </div>
            <div className="glass flex flex-col gap-[12px] py-[24px] px-[30px] rounded-[24px]">
              <div className="flex items-center gap-[12px] text-[15px] font-semibold">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#047857"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                30 minutes
              </div>
              <div className="flex items-center gap-[12px] text-[15px] font-semibold">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#047857"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                </svg>
                Video call, link in your invite
              </div>
              <div className="flex items-center gap-[12px] text-[15px] font-semibold">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#047857"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                  <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" />
                </svg>
                Free, no obligation
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
