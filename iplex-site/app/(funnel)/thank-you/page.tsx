import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookingConfirmation, BookingConfirmationFallback } from "@/components/booking-confirmation";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/thank-you");

export default function ThankYouPage() {
  return (
    <>
      <JsonLd data={pageSchema("/thank-you")} />
      <Glows />
      <Hero />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(24px,4vw,48px)] pb-[clamp(56px,7vw,96px)]">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[18px] max-w-[860px] my-0 mx-auto">
          <span className="rise w-[68px] h-[68px] rounded-full [background:linear-gradient(180deg,#10B981,#047857)] text-white flex items-center justify-center shadow-[0_0_0_10px_rgba(16,185,129,0.15),0_18px_32px_-14px_rgba(5,150,105,0.7)]">
            <svg
              width="30"
              height="30"
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
          <h1 className="h1 rise d1 text-[length:clamp(36px,4.6vw,60px)]">
            You&apos;re booked. <span className="acc">Here&apos;s what happens next.</span>
          </h1>
          <Suspense fallback={<BookingConfirmationFallback />}>
            <BookingConfirmation />
          </Suspense>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-[22px] items-stretch">
          <div className="glass rise d2 flex flex-col gap-[16px] pt-[18px] pb-[26px] px-[18px] rounded-[30px]">
            <a
              className="relative aspect-[16/9] rounded-[20px] [background:linear-gradient(150deg,#0F1A16,#134E3A)] flex items-center justify-center no-underline"
              href="#video"
              aria-label="Play: what to expect on your call, 90 seconds"
            >
              <span className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#047857" aria-hidden="true">
                  <polygon points="7 4 20 12 7 20 7 4" />
                </svg>
              </span>
              <span className="absolute right-[14px] bottom-[12px] py-[4px] px-[10px] rounded-full bg-[rgba(0,0,0,0.55)] text-white text-[12.5px] font-bold">
                90 sec
              </span>
            </a>
            <h2 className="my-0 mx-[8px] text-[21px] font-extrabold tracking-[-0.02em]">
              Watch: what to expect on your call (90 seconds)
            </h2>
          </div>
          <div className="glass rise d3 flex flex-col gap-[18px] p-[clamp(26px,3.5vw,40px)] rounded-[30px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(167,243,208,0.55),rgba(255,255,255,0.72)_55%)]">
            <h2 className="m-0 text-[21px] font-extrabold tracking-[-0.02em]">Before the call, think about</h2>
            <div className="flex gap-[14px] items-center py-[16px] px-[18px] rounded-[16px] bg-[rgba(255,255,255,0.85)] text-[16px] font-semibold">
              <span className="flex-none w-[32px] h-[32px] rounded-full bg-amber-200 text-yellow-800 font-extrabold flex items-center justify-center">
                1
              </span>
              Your three most time-consuming tasks
            </div>
            <div className="flex gap-[14px] items-center py-[16px] px-[18px] rounded-[16px] bg-[rgba(255,255,255,0.85)] text-[16px] font-semibold">
              <span className="flex-none w-[32px] h-[32px] rounded-full bg-amber-200 text-yellow-800 font-extrabold flex items-center justify-center">
                2
              </span>
              The tools your team uses every day
            </div>
            <div className="flex gap-[14px] items-center py-[16px] px-[18px] rounded-[16px] bg-[rgba(255,255,255,0.85)] text-[16px] font-semibold">
              <span className="flex-none w-[32px] h-[32px] rounded-full bg-amber-200 text-yellow-800 font-extrabold flex items-center justify-center">
                3
              </span>
              How your team is split across roles
            </div>
            <Link className="textlink mt-[6px]" href="/results">
              See a sample AI Opportunity Map while you wait
              <svg
                width="16"
                height="16"
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
        </div>
        <p className="m-0 text-center text-[14px] text-subtle">
          Need to reschedule? Use the link in your calendar invite.
        </p>
      </div>
    </section>
  );
}
