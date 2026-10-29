"use server";

/**
 * Receives every form on the site (contact, partner applications, scorecard, agency
 * landing page, bookings) and forwards it to your CRM.
 *
 * Set LEAD_WEBHOOK_URL to an inbound webhook (for example a GoHighLevel workflow
 * "Inbound Webhook" trigger, Zapier or Make). The payload is JSON:
 *   { form: "contact", fields: { ... }, page: "/contact", submittedAt: "ISO date" }
 */

export type LeadForm = "contact" | "partner" | "scorecard" | "agency" | "booking";
export type LeadResult = { ok: true } | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED: Record<LeadForm, string[]> = {
  contact: ["name", "email", "reason", "message"],
  partner: ["name", "email", "agency"],
  scorecard: ["name", "email"],
  agency: ["name", "email", "agency"],
  booking: [],
};

export async function submitLead(
  form: LeadForm,
  fields: Record<string, string | string[]>,
  page: string,
): Promise<LeadResult> {
  // Honeypot: real visitors never see or fill this field.
  if (typeof fields.website_url === "string" && fields.website_url.trim() !== "") return { ok: true };
  delete fields.website_url;

  for (const key of REQUIRED[form]) {
    const value = fields[key];
    if (typeof value !== "string" || value.trim() === "") {
      return { ok: false, error: "Please fill in every required field." };
    }
  }
  const emailRequired = REQUIRED[form].includes("email");
  if ((emailRequired || fields.email) && (typeof fields.email !== "string" || !EMAIL.test(fields.email.trim()))) {
    return { ok: false, error: "Please enter a valid work email." };
  }

  const payload = { form, fields, page, submittedAt: new Date().toISOString() };
  const url = process.env.LEAD_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] LEAD_WEBHOOK_URL is not set; received:", payload);
      return { ok: true };
    }
    console.error("[lead] LEAD_WEBHOOK_URL is not set; a submission could not be delivered.");
    return { ok: false, error: "We couldn't send that just now." };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { ok: true };
  } catch (error) {
    console.error("[lead] delivery failed", error);
    return { ok: false, error: "We couldn't send that just now." };
  }
}
