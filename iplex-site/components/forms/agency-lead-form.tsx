"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Honeypot, formFields } from "@/components/forms/field-error";
import { OptionChips } from "@/components/forms/option-chips";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/track";
import { rememberContact } from "@/lib/visitor";

const SERVICES = ["SEO", "Paid media", "Content", "Social", "Creative", "Other"];

/** Agency landing page form: saves the lead, then sends the visitor to the booking page. */
export function AgencyLeadForm() {
  const router = useRouter();
  const [services, setServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const fields = formFields(event.currentTarget);
    const result = await submitLead("agency", fields, "/agencies");
    if (!result.ok) {
      setStatus("failed");
      return;
    }
    rememberContact(fields);
    track("lead_submitted", { form: "agency" });
    router.push("/book");
  }

  return (
    <form
      className="glass rise d2 relative flex flex-col gap-[16px] p-[clamp(24px,3vw,36px)] rounded-[28px] bg-[rgba(255,255,255,0.78)]"
      onSubmit={onSubmit}
    >
      <Honeypot />
      <h2 className="m-0 text-[24px] font-extrabold tracking-[-0.02em]">Tell us about your agency</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-[14px]">
        <label className="field">
          Your name
          <input className="input" type="text" name="name" autoComplete="name" required />
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
          Team size
          <select className="input" name="teamSize" defaultValue="1 to 10">
            <option>1 to 10</option>
            <option>11 to 50</option>
            <option>51 to 200</option>
            <option>More than 200</option>
          </select>
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
        Your biggest time drain <span className="font-medium text-subtle">(optional)</span>
        <textarea className="input min-h-[90px]" name="timeDrain" />
      </label>
      {status === "failed" ? (
        <div
          role="alert"
          className="py-[14px] px-[16px] rounded-[14px] bg-[#FEF3F2] [border:1px_solid_#FECDCA] text-[14.5px] leading-[1.5] text-[#7A271A]"
        >
          Something went wrong. Please try again.
        </div>
      ) : null}
      <button type="submit" className="pill pill-primary self-stretch" disabled={status === "sending"}>
        {status === "sending" ? "Saving…" : "Book my Opportunity Call"}
      </button>
      <span className="text-[13px] leading-[1.5] text-subtle text-center">
        Free, 30 minutes, no obligation. We&apos;ll only use your details to arrange your call.{" "}
        <Link href="/privacy">Privacy policy</Link>.
      </span>
    </form>
  );
}
