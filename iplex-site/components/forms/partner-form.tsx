"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Honeypot, formFields } from "@/components/forms/field-error";
import { OptionChips } from "@/components/forms/option-chips";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/track";

const SERVICES = ["SEO", "Paid media", "Content", "Social", "Creative", "Other"];

export function PartnerForm() {
  const [name, setName] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const result = await submitLead("partner", formFields(event.currentTarget), "/partners");
    if (result.ok) {
      track("partner_applied");
      setStatus("sent");
    } else {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-[14px] p-[32px] rounded-[24px] bg-white">
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
        <span className="text-[22px] font-extrabold">Thanks, {name.trim().split(" ")[0] || "there"}.</span>
        <span className="text-[16px] leading-[1.6] text-muted">
          We&apos;ll review your application and reply within{" "}
          <span className="py-0 px-[4px] rounded-[4px] bg-yellow-200 text-ink font-bold">[two]</span> business days.
        </span>
      </div>
    );
  }

  return (
    <form className="relative flex flex-col gap-[16px]" onSubmit={onSubmit}>
      <Honeypot />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-[16px]">
        <label className="field">
          Your name
          <input
            className="input"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="field">
          Work email
          <input
            className="input"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@agency.com"
            required
          />
        </label>
        <label className="field">
          Agency name
          <input className="input" type="text" name="agency" autoComplete="organization" required />
        </label>
        <label className="field">
          Website
          <input className="input" type="url" name="website" placeholder="https://" />
        </label>
        <label className="field">
          Team size
          <select className="input" name="teamSize" defaultValue="1 to 10">
            <option>1 to 10</option>
            <option>11 to 50</option>
            <option>51 to 200</option>
            <option>More than 200</option>
          </select>
        </label>
        <label className="field">
          Number of active clients
          <input className="input" type="number" name="activeClients" min="0" inputMode="numeric" />
        </label>
      </div>
      <fieldset className="m-0 p-0 border-0 flex flex-col gap-[10px]">
        <legend className="pt-0 px-0 pb-[10px] text-[14px] font-bold">Services you offer</legend>
        <OptionChips
          name="services"
          options={SERVICES}
          value={services}
          onChange={setServices}
          multiple
          label="Services you offer"
        />
      </fieldset>
      <label className="field">
        What would you like to offer your clients? <span className="font-medium text-subtle">(optional)</span>
        <textarea className="input" name="goals" />
      </label>
      {status === "failed" ? (
        <div
          role="alert"
          className="py-[14px] px-[16px] rounded-[14px] bg-[#FEF3F2] [border:1px_solid_#FECDCA] text-[14.5px] leading-[1.5] text-[#7A271A]"
        >
          Something went wrong and your application wasn&apos;t sent. Please try again.
        </div>
      ) : null}
      <button type="submit" className="pill pill-primary self-start" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my application"}
      </button>
      <span className="text-[13px] text-subtle">
        We&apos;ll only use your details to review your application. Read our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </span>
    </form>
  );
}
