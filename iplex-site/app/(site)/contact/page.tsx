import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/forms/contact-form";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageSchema("/contact")} />
      <Glows />
      <Hero />
      <ContactOptionsSection />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(40px,6vw,80px)] pb-[40px]">
      <div className="wrap flex flex-col items-center text-center gap-[22px] max-w-[900px] m-head">
        <span className="eyebrow rise self-center">Contact</span>
        <h1 className="h1 rise d1">
          Get <span className="acc">in touch.</span>
        </h1>
        <p className="lead rise d2 max-w-[640px]">
          Want to work with us? The fastest way is a free call. For anything else, send a message and we&apos;ll reply
          within{" "}
          <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[one business day]</span>.
        </p>
      </div>
    </section>
  );
}

function ContactOptionsSection() {
  return (
    <section className="sec pt-[16px] pb-[clamp(64px,8vw,112px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-[22px] items-start">
        <div className="flex flex-col gap-[22px]">
          <div className="relative overflow-hidden flex flex-col gap-[16px] p-[36px] rounded-[28px] [background:linear-gradient(150deg,#059669,#065F46)] text-white shadow-[0_30px_60px_-36px_rgba(6,95,70,0.7)]">
            <div
              className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] rounded-full [background:radial-gradient(circle,rgba(167,243,208,0.35),rgba(167,243,208,0)_65%)]"
              aria-hidden="true"
            />
            <h2 className="relative m-0 text-[length:clamp(26px,2.6vw,32px)] leading-[1.15] tracking-[-0.03em] font-extrabold">
              Want to work with us?
            </h2>
            <p className="relative m-0 text-[16.5px] leading-[1.6] text-[#E3F7EE]">
              Book a free 30-minute call, and we&apos;ll talk about where AI fits in your business.
            </p>
            <Link className="pill relative self-start bg-white text-emerald-800" href="/book">
              Book a free call
            </Link>
          </div>
          <div className="glass flex flex-col py-[10px] px-[28px] rounded-[28px]">
            <div className="flex items-center gap-[14px] py-[16px] px-0 [border-bottom:1px_solid_#DCE8E1]">
              <span className="flex-none w-[40px] h-[40px] rounded-[12px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-[12.5px] font-bold text-subtle">Email</span>
                <span className="text-[15.5px] font-bold">[email address]</span>
              </span>
            </div>
            <div className="flex items-center gap-[14px] py-[16px] px-0 [border-bottom:1px_solid_#DCE8E1]">
              <span className="flex-none w-[40px] h-[40px] rounded-[12px] bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-[12.5px] font-bold text-subtle">Phone</span>
                <span className="text-[15.5px] font-bold">[phone number]</span>
              </span>
            </div>
            <div className="flex items-center gap-[14px] py-[16px] px-0">
              <span className="flex-none w-[40px] h-[40px] rounded-[12px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-[12.5px] font-bold text-subtle">Hours</span>
                <span className="text-[15.5px] font-bold">Monday to Friday, [hours] [US time zone]</span>
              </span>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
