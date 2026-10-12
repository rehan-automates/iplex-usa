import type { Metadata } from "next";
import Link from "next/link";
import { Glows } from "@/components/glows";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-mint text-ink">
      <SiteHeader />
      <main id="main">
        <Glows />
        <section className="sec pt-[clamp(40px,7vw,96px)] pb-[clamp(64px,9vw,120px)]">
          <div className="wrap flex flex-col items-center text-center gap-[22px] max-w-[820px]">
            <span className="rise text-[length:clamp(88px,12vw,150px)] font-extrabold tracking-[-0.06em] leading-[0.9] [background-image:linear-gradient(180deg,#10B981,#065F46)] bg-clip-text text-transparent">
              404
            </span>
            <h1 className="h1 rise d1 text-[length:clamp(34px,4.2vw,54px)]">
              We couldn&apos;t find <span className="acc">that page.</span>
            </h1>
            <p className="lead rise d2 max-w-[560px]">
              The link may be old or mistyped. Here are three good places to go instead.
            </p>
            <div className="rise d3 flex flex-wrap justify-center gap-[12px] mt-[6px]">
              <Link className="pill pill-primary" href="/">
                Go to the homepage
              </Link>
              <Link className="pill pill-outline" href="/scorecard">
                Get your AI score
              </Link>
              <Link className="pill pill-outline" href="/book">
                Book a free call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
