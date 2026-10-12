import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

/** Minimal header for ad landing pages: logo only, no exits. */
export function FunnelHeader() {
  return (
    <header className="relative z-[5]">
      <div className="wrap min-h-[84px] flex items-center justify-between gap-[20px]">
        <Wordmark />
      </div>
    </header>
  );
}

export function FunnelFooter() {
  return (
    <footer className="relative z-[1] pt-[24px] pb-[40px]">
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-y-[12px] gap-x-[32px] pt-[22px] [border-top:1px_solid_rgba(16,24,20,0.1)] text-[14px] text-subtle">
          <span>© 2026 iPlex</span>
          <span className="flex gap-[20px]">
            <Link className="footlink" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="footlink" href="/terms">
              Terms of Service
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
