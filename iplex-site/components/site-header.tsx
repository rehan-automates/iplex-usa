import Link from "next/link";
import { HeaderShell } from "@/components/header-shell";
import { MainNav } from "@/components/main-nav";
import { MobileMenu } from "@/components/mobile-menu";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="wrap min-h-[84px] flex items-center justify-between gap-[20px]">
        <Wordmark />
        <MainNav />
        <div className="flex items-center gap-[10px]">
          <Link className="pill pill-outline pill-sm hide-sm" href="/scorecard">
            Get your AI score
          </Link>
          <Link className="pill pill-primary pill-sm" href="/book">
            Book a call
          </Link>
          <MobileMenu />
        </div>
      </div>
    </HeaderShell>
  );
}
