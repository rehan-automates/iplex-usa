/**
 * Conversion events (scorecard completion, booking, thank-you). Safe to call when
 * analytics is not configured.
 */
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;
type Fbq = (command: "track" | "trackCustom", name: string, params?: Record<string, unknown>) => void;

export function track(
  event: "scorecard_complete" | "lead_submitted" | "call_booked" | "contact_submitted" | "partner_applied",
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; fbq?: Fbq };
  w.gtag?.("event", event, params);
  const metaEvent = event === "call_booked" ? "Schedule" : event === "contact_submitted" ? "Contact" : "Lead";
  w.fbq?.("track", metaEvent, params);
}
