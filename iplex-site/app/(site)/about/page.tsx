import type { Metadata } from "next";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/cta-band";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageSchema("/about")} />
      <Glows />
      <Hero />
      <WhyStartedIplexSection />
      <PeopleBehindWorkSection />
      <HowWeWorkSection />
      <WorkingUsBusinessesSection />
      <CtaBand
        title="Let's find where AI fits in your business."
        actions={[
          { label: "Book a free call", href: "/book" },
          { label: "or get your AI score", href: "/scorecard" },
        ]}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="sec pt-[clamp(40px,6vw,80px)]">
      <div className="wrap flex flex-col gap-[48px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[22px] max-w-[900px] my-0 mx-auto m-head">
          <span className="eyebrow rise self-center">About iPlex</span>
          <h1 className="h1 rise d1">
            We help teams do more with AI, <span className="acc">not do without people.</span>
          </h1>
          <p className="lead rise d2 max-w-[620px]">
            iPlex builds AI systems for agencies and B2B companies, then trains the people who run them.
          </p>
        </div>
        <div
          className="photo rise d3 aspect-[21/9] min-h-[280px]"
          role="img"
          aria-label="Photo placeholder: a natural team photo, taken where you actually work"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <span className="text-[16px] font-bold">Photo: the iPlex team</span>
          <span className="text-[13.5px] max-w-[320px] leading-[1.5]">
            Taken where you actually work. Natural, not posed.
          </span>
        </div>
      </div>
    </section>
  );
}

function WhyStartedIplexSection() {
  return (
    <section className="sec">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-y-[24px] gap-x-[64px] items-start">
        <div className="flex flex-col gap-[16px]">
          <span className="eyebrow">Our story</span>
          <h2 className="h2">
            Why we started <span className="acc">iPlex</span>
          </h2>
        </div>
        <p className="m-0 text-[length:clamp(18px,1.8vw,21px)] leading-[1.7] text-ink-soft">
          We spent <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 font-bold">[X years]</span> inside{" "}
          <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 font-bold">[agencies and B2B teams]</span> watching
          talented people lose their weeks to work that never needed them: report summaries, proposal rewrites,
          onboarding emails. When AI got good enough to take that work, most companies bought tools and hoped. We
          started iPlex to do it properly: find the work, build the systems, and train the people.
        </p>
      </div>
    </section>
  );
}

function PeopleBehindWorkSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">The team</span>
          <h2 className="h2">
            The people <span className="acc">behind the work</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[18px]">
            <div className="glass flex flex-col items-center text-center gap-[12px] py-[32px] px-[26px] rounded-[28px]">
              <span className="w-[112px] h-[112px] rounded-full [background:linear-gradient(160deg,#E3F3EA,#C6E6D5)] flex items-center justify-center text-[#3D5248]">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </span>
              <strong className="text-[19px]">[Name]</strong>
              <span className="text-[14px] font-bold text-emerald-700">[Role]</span>
              <span className="text-[15px] leading-[1.55] text-muted">[One line on their background]</span>
              <a className="textlink text-[14px]" href="#linkedin">
                LinkedIn
              </a>
            </div>
            <div className="glass flex flex-col items-center text-center gap-[12px] py-[32px] px-[26px] rounded-[28px]">
              <span className="w-[112px] h-[112px] rounded-full [background:linear-gradient(160deg,#E8F0FE,#C9DCFB)] flex items-center justify-center text-[#34507A]">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </span>
              <strong className="text-[19px]">[Name]</strong>
              <span className="text-[14px] font-bold text-emerald-700">[Role]</span>
              <span className="text-[15px] leading-[1.55] text-muted">[One line on their background]</span>
              <a className="textlink text-[14px]" href="#linkedin">
                LinkedIn
              </a>
            </div>
            <div className="glass flex flex-col items-center text-center gap-[12px] py-[32px] px-[26px] rounded-[28px]">
              <span className="w-[112px] h-[112px] rounded-full [background:linear-gradient(160deg,#FEF6DB,#FBE7A9)] flex items-center justify-center text-[#6B5320]">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </span>
              <strong className="text-[19px]">[Name]</strong>
              <span className="text-[14px] font-bold text-emerald-700">[Role]</span>
              <span className="text-[15px] leading-[1.55] text-muted">[One line on their background]</span>
              <a className="textlink text-[14px]" href="#linkedin">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="m-bar [--n:3]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  return (
    <section className="sec">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-col items-center text-center gap-[14px] m-head">
          <span className="eyebrow self-center">How we work</span>
          <h2 className="h2">
            How <span className="acc">we work</span>
          </h2>
        </div>
        <div className="m-sw">
          <div className="m-slide grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[18px]">
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(253,230,138,0.55),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[46px] h-[46px] rounded-[14px] bg-white text-yellow-600 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                  <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" />
                </svg>
              </span>
              <h3 className="m-0 text-[18px] font-extrabold">Fixed scope, fixed price.</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                You know what you&apos;re getting and what it costs before we start.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_50%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[46px] h-[46px] rounded-[14px] bg-white text-emerald-600 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <h3 className="m-0 text-[18px] font-extrabold">Your team first.</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                We build systems people want to use, then train them to use them.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_100%_0%,rgba(167,243,208,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[46px] h-[46px] rounded-[14px] bg-white text-emerald-600 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>
              </span>
              <h3 className="m-0 text-[18px] font-extrabold">Measured results.</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                We report hours saved and adoption, not activity.
              </p>
            </div>
            <div className="glass lift flex flex-col gap-[12px] p-[28px] rounded-[26px] [background:radial-gradient(120%_100%_at_100%_100%,rgba(191,219,254,0.6),rgba(255,255,255,0.65)_55%)]">
              <span className="w-[46px] h-[46px] rounded-[14px] bg-white text-blue-600 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <h3 className="m-0 text-[18px] font-extrabold">Your data, protected.</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                Business-grade tools and a signed agreement on every project.
              </p>
            </div>
          </div>
          <div className="m-bar [--n:4]" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkingUsBusinessesSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="glass rounded-[36px] p-[clamp(28px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-y-[24px] gap-x-[48px] items-center [background:radial-gradient(90%_140%_at_0%_50%,rgba(191,219,254,0.55),rgba(255,255,255,0.7)_60%)]">
          <div className="flex flex-col gap-[14px]">
            <span className="eyebrow">Where we work</span>
            <h2 className="h2">
              Working with <span className="acc">US businesses</span>
            </h2>
          </div>
          <div className="flex flex-col gap-[14px]">
            <p className="lead">
              We work with agencies and B2B companies across the United States, with support during US business hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
