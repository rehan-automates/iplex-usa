"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { EMAIL_RE, FieldError, Honeypot, formFields } from "@/components/forms/field-error";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/track";

type Status = "idle" | "sending" | "sent" | "failed";

const borderFor = (bad: boolean) => (bad ? "#D92D20" : undefined);

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", reason: "", message: "" });
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const nameBad = tried && !values.name.trim();
  const emailBad = tried && !EMAIL_RE.test(values.email.trim());
  const reasonBad = tried && !values.reason;
  const messageBad = tried && !values.message.trim();

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTried(true);
    const ok = values.name.trim() && EMAIL_RE.test(values.email.trim()) && values.reason && values.message.trim();
    if (!ok) return;
    setStatus("sending");
    const result = await submitLead("contact", formFields(event.currentTarget), "/contact");
    if (result.ok) {
      track("contact_submitted", { reason: values.reason });
      setStatus("sent");
    } else {
      setStatus("failed");
    }
  }

  const firstName = values.name.trim().split(" ")[0] || "there";

  return (
    <div className="glass flex flex-col gap-[20px] p-[clamp(26px,3.5vw,40px)] rounded-[28px]">
      <h2 className="m-0 text-[length:clamp(26px,2.6vw,32px)] tracking-[-0.03em] font-extrabold">Send us a message</h2>
      {status !== "sent" ? (
        <form className="relative flex flex-col gap-[16px]" onSubmit={onSubmit} noValidate>
          <Honeypot />
          <label className="field">
            Your name
            <input
              className="input"
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              aria-invalid={nameBad}
              aria-describedby={nameBad ? "contact-name-error" : undefined}
              style={{ borderColor: borderFor(nameBad) }}
            />
          </label>
          {nameBad ? <FieldError id="contact-name-error">Enter your name.</FieldError> : null}
          <label className="field">
            Work email
            <input
              className="input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={values.email}
              onChange={set("email")}
              aria-invalid={emailBad}
              aria-describedby={emailBad ? "contact-email-error" : undefined}
              style={{ borderColor: borderFor(emailBad) }}
            />
          </label>
          {emailBad ? (
            <FieldError id="contact-email-error">Enter an email address like name@company.com.</FieldError>
          ) : null}
          <label className="field">
            Company <span className="font-medium text-subtle">(optional)</span>
            <input className="input" type="text" name="company" autoComplete="organization" />
          </label>
          <label className="field">
            What&apos;s this about?
            <select
              className="input"
              name="reason"
              value={values.reason}
              onChange={set("reason")}
              aria-invalid={reasonBad}
              aria-describedby={reasonBad ? "contact-reason-error" : undefined}
              style={{ borderColor: borderFor(reasonBad) }}
            >
              <option value="">Choose a reason</option>
              <option>Agency partnership</option>
              <option>Security overview</option>
              <option>Existing project</option>
              <option>Press</option>
              <option>Careers</option>
              <option>Something else</option>
            </select>
          </label>
          {reasonBad ? <FieldError id="contact-reason-error">Choose a reason.</FieldError> : null}
          <label className="field">
            Your message
            <textarea
              className="input"
              name="message"
              value={values.message}
              onChange={set("message")}
              aria-invalid={messageBad}
              aria-describedby={messageBad ? "contact-message-error" : undefined}
              style={{ borderColor: borderFor(messageBad) }}
            />
          </label>
          {messageBad ? (
            <FieldError id="contact-message-error">Tell us a little about what you need.</FieldError>
          ) : null}
          <span className="text-[13.5px] text-subtle">
            We&apos;ll only use your details to reply. Read our <Link href="/privacy">privacy policy</Link>.
          </span>
          {status === "failed" ? (
            <div
              role="alert"
              className="py-[14px] px-[16px] rounded-[14px] bg-[#FEF3F2] [border:1px_solid_#FECDCA] text-[14.5px] leading-[1.5] text-[#7A271A]"
            >
              Something went wrong and your message wasn&apos;t sent. Please try again, or email us at [email address].
            </div>
          ) : null}
          <button type="submit" className="pill pill-primary self-start" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      ) : (
        <div role="status" className="flex flex-col gap-[14px] p-[28px] rounded-[22px] bg-white">
          <span className="w-[52px] h-[52px] rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="text-[22px] font-extrabold">Thanks, {firstName}.</span>
          <span className="text-[16px] leading-[1.6] text-muted">
            We&apos;ve got your message and will reply within{" "}
            <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[one business day]</span>.
          </span>
        </div>
      )}
    </div>
  );
}
