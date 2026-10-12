/**
 * Remembers who the visitor is for the rest of their visit (this browser tab only), so the
 * booking calendar can be pre-filled after the scorecard or agency form. Never leaves the browser.
 */
const KEY = "iplex:contact";
const EVENT = "iplex:contact-change";

export type Contact = { name?: string; email?: string; company?: string };

export function rememberContact(fields: Record<string, string | string[]>) {
  const pick = (k: string) => (typeof fields[k] === "string" ? (fields[k] as string).trim() : undefined);
  const contact: Contact = { name: pick("name"), email: pick("email"), company: pick("company") ?? pick("agency") };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(contact));
  } catch {
    // Storage can be unavailable (private mode); pre-filling is a nicety only.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Lets components that are already on screen (or kept alive by the router) pick up a new contact. */
export function subscribeContact(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/** Raw stored value (a stable string, so it can back useSyncExternalStore). */
export function readContactRaw(): string {
  try {
    return sessionStorage.getItem(KEY) ?? "{}";
  } catch {
    return "{}";
  }
}

export function parseContact(raw: string): Contact {
  try {
    return JSON.parse(raw) as Contact;
  } catch {
    return {};
  }
}
