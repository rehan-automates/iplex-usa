"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent, trackingConfigured, writeConsent, type Consent } from "@/lib/consent";

/** Current consent; "unknown" on the server and during hydration, so nothing flashes. */
export function useConsent(): Consent | "unknown" {
  return useSyncExternalStore<Consent | "unknown">(subscribeConsent, readConsent, () => "unknown");
}

/** Cookie banner. Only appears when analytics or ad tags are configured and no choice has been made. */
export function CookieBanner() {
  const consent = useConsent();
  if (!trackingConfigured || consent !== "unset") return null;

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      className="glass fixed z-[70] left-[16px] right-[16px] bottom-[16px] min-[641px]:right-auto min-[641px]:left-[24px] min-[641px]:bottom-[24px] min-[641px]:max-w-[420px] flex flex-col gap-[14px] p-[20px] rounded-[22px] bg-[rgba(255,255,255,0.94)] shadow-[0_30px_60px_-30px_rgba(6,95,70,0.5)]"
    >
      <p className="m-0 text-[14.5px] leading-[1.55] text-graphite">
        We use cookies to see which pages help and to measure our ads. You can accept or decline.{" "}
        <Link href="/cookies" className="font-bold">
          Cookie notice
        </Link>
      </p>
      <div className="flex gap-[10px]">
        <button type="button" className="pill pill-primary pill-sm" onClick={() => writeConsent("granted")}>
          Accept
        </button>
        <button type="button" className="pill pill-outline pill-sm" onClick={() => writeConsent("denied")}>
          Decline
        </button>
      </div>
    </div>
  );
}

/** "Change cookie settings": clears the saved choice so the banner asks again. */
export function CookieSettingsButton() {
  const consent = useConsent();
  if (!trackingConfigured) {
    return <span className="font-semibold text-ink">No optional cookies are in use right now.</span>;
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-[12px]">
      <button type="button" className="pill pill-outline pill-sm" onClick={() => writeConsent("unset")}>
        Change cookie settings
      </button>
      {consent === "granted" || consent === "denied" ? (
        <span className="text-[14.5px] font-semibold text-subtle">
          Current choice: {consent === "granted" ? "accepted" : "declined"}
        </span>
      ) : null}
    </span>
  );
}
