/** The visitor's choice about optional (analytics and advertising) cookies, kept in their browser. */
export type Consent = "granted" | "denied" | "unset";

const KEY = "iplex:cookie-consent";
const EVENT = "iplex:consent-change";

export const trackingConfigured = Boolean(
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
);

export function readConsent(): Consent {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function writeConsent(value: Consent) {
  try {
    if (value === "unset") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, value);
  } catch {
    // Storage unavailable: the choice lasts for this page view only.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
