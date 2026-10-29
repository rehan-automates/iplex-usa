import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Bracketed text the business still needs to fill in, highlighted like the design placeholders. */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[{children}]</span>;
}

/**
 * Shared layout for the Privacy Policy, Terms of Service and Cookie notice:
 * hero, a plain-language summary, a table of contents and the full text.
 */
export function LegalPage({
  title,
  intro,
  updated,
  summary,
  sections,
  aside,
}: {
  title: ReactNode;
  intro: string;
  updated: ReactNode;
  summary: string[];
  sections: LegalSection[];
  aside?: ReactNode;
}) {
  return (
    <>
      <section className="sec pt-[clamp(40px,6vw,80px)] pb-[32px]">
        <div className="wrap flex flex-col items-center text-center gap-[22px] max-w-[900px] m-head">
          <span className="eyebrow rise self-center">Legal</span>
          <h1 className="h1 rise d1">{title}</h1>
          <p className="lead rise d2 max-w-[680px]">{intro}</p>
          <span className="rise d3 text-[14px] font-semibold text-subtle">Last updated {updated}</span>
        </div>
      </section>

      <section className="sec pt-[16px] pb-[clamp(64px,8vw,112px)]">
        <div className="wrap max-w-[1080px] grid grid-cols-1 min-[900px]:grid-cols-[260px_minmax(0,1fr)] gap-[22px] items-start">
          <aside className="hidden min-[900px]:flex flex-col gap-[18px] sticky top-[24px]">
            <nav className="glass flex flex-col gap-[2px] p-[18px] rounded-[24px]" aria-label="On this page">
              <span className="m-label">On this page</span>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="legal-toc">
                  {s.title}
                </a>
              ))}
            </nav>
            {aside}
          </aside>

          <div className="flex flex-col gap-[22px] min-w-0">
            <div className="glass flex flex-col gap-[14px] p-[clamp(24px,3.5vw,36px)] rounded-[28px] [background:radial-gradient(120%_100%_at_0%_0%,rgba(167,243,208,0.55),rgba(255,255,255,0.72)_55%)]">
              <h2 className="m-0 text-[21px] font-extrabold tracking-[-0.02em]">The short version</h2>
              <ul className="list-none m-0 p-0 flex flex-col gap-[10px]">
                {summary.map((item) => (
                  <li key={item} className="flex items-start gap-[12px] text-[16px] leading-[1.55] font-semibold">
                    <span className="flex-none w-[24px] h-[24px] mt-[1px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <article className="glass legal p-[clamp(24px,4vw,48px)] rounded-[28px]">
              {sections.map((s) => (
                <section key={s.id} id={s.id}>
                  <h2>{s.title}</h2>
                  {s.body}
                </section>
              ))}
            </article>

            <div className="glass flex flex-wrap items-center justify-between gap-[16px] py-[22px] px-[28px] rounded-[24px]">
              <span className="text-[16px] font-bold">Questions about this page?</span>
              <Link className="pill pill-outline pill-sm" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
