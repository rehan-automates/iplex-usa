"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { Honeypot, formFields } from "@/components/forms/field-error";
import { OptionChips } from "@/components/forms/option-chips";
import { submitLead } from "@/lib/leads";
import { parseContact, readContactRaw, rememberContact, subscribeContact, type Contact } from "@/lib/visitor";

const SIZES = ["1 to 10", "11 to 50", "51 to 200", "More than 200"];
const FIXES = ["Lead acquisition", "Sales", "Onboarding", "Delivery", "Retention", "Operations", "Not sure yet"];
const TIMES = ["9:00 AM", "9:30 AM", "10:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "3:00 PM", "4:30 PM"];

/**
 * Your booking calendar (GoHighLevel, Calendly or Cal.com booking-page URL). When set, the calendar is
 * embedded on /book, pre-filled with the visitor's name, email and answers; set the calendar's
 * "redirect after booking" to https://your-site/thank-you. When not set, the designed time picker is
 * shown and requests are sent to LEAD_WEBHOOK_URL for your team to confirm by email.
 */
const CALENDAR_URL = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

type Day = { dow: string; num: string; iso: string; label: string };

/** The next five weekdays, starting tomorrow. */
function nextWeekdays(from: Date): Day[] {
  const days: Day[] = [];
  const d = new Date(from);
  while (days.length < 5) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    days.push({
      dow: d.toLocaleDateString("en-US", { weekday: "short" }),
      num: String(d.getDate()),
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    });
  }
  return days;
}

// Shown until the browser computes the real dates (keeps the static HTML stable).
const PLACEHOLDER_DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"].map((dow, i) => ({
  dow,
  num: String(12 + i),
  iso: "",
  label: "",
}));

function calendarSrc(base: string, contact: Contact, answers: Record<string, string>) {
  const url = new URL(base);
  const params: Record<string, string | undefined> = {
    name: contact.name,
    email: contact.email,
    team_size: answers.teamSize,
    focus: answers.focus,
    tools: answers.tools,
  };
  for (const [k, v] of Object.entries(params)) if (v) url.searchParams.set(k, v);
  return url.toString();
}

export function BookingPicker() {
  const router = useRouter();
  const [size, setSize] = useState<string[]>([]);
  const [fix, setFix] = useState<string[]>([]);
  const [tools, setTools] = useState("");
  const [day, setDay] = useState(1);
  const [time, setTime] = useState<string[]>([]);
  const [days, setDays] = useState<Day[]>(PLACEHOLDER_DAYS);
  const [calendar, setCalendar] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "failed" | "pick-time">("idle");

  useEffect(() => {
    // "Today" and the remembered visitor only exist in the browser, so they are read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(nextWeekdays(new Date()));
  }, []);

  // Who the visitor is, if they filled in the scorecard or agency form earlier in this visit.
  const contactRaw = useSyncExternalStore(subscribeContact, readContactRaw, () => "{}");
  const contact: Contact = useMemo(() => parseContact(contactRaw), [contactRaw]);

  const answers = { teamSize: size[0] ?? "", focus: fix[0] ?? "", tools: tools.trim() };

  async function sendAnswers(extra: Record<string, string | string[]>) {
    return submitLead("booking", { ...answers, ...extra }, "/book");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = formFields(event.currentTarget);

    if (CALENDAR_URL) {
      // Record the answers, then show the calendar pre-filled with them.
      void sendAnswers({ ...fields, name: contact.name ?? "", email: contact.email ?? "" });
      setCalendar(calendarSrc(CALENDAR_URL, contact, answers));
      return;
    }

    if (!time.length) {
      setStatus("pick-time");
      return;
    }
    const slot = days[day];
    const person = {
      name: (fields.name as string) ?? contact.name ?? "",
      email: (fields.email as string) ?? contact.email ?? "",
    };
    setStatus("sending");
    const result = await sendAnswers({ ...fields, ...person, date: slot.iso, time: time[0] });
    if (!result.ok) {
      setStatus("failed");
      return;
    }
    rememberContact(person);
    const query = new URLSearchParams({
      date: slot.label,
      time: time[0],
      ...(person.email ? { email: person.email } : {}),
    });
    router.push(`/thank-you?${query}`);
  }

  const needsContact = !CALENDAR_URL && !contact.email;

  return (
    <form
      className="glass rise d2 relative flex-[999_1_560px] min-w-0 flex flex-col gap-[24px] p-[clamp(24px,3.5vw,40px)] rounded-[30px] bg-[rgba(255,255,255,0.8)]"
      onSubmit={onSubmit}
    >
      <Honeypot />
      <fieldset className="m-0 p-0 border-0 flex flex-col gap-[10px]">
        <legend className="pt-0 px-0 pb-[10px] text-[15px] font-extrabold">Team size</legend>
        <OptionChips name="teamSize" options={SIZES} value={size} onChange={setSize} label="Team size" />
      </fieldset>
      <fieldset className="m-0 p-0 border-0 flex flex-col gap-[10px]">
        <legend className="pt-0 px-0 pb-[10px] text-[15px] font-extrabold">What would you most like to fix?</legend>
        <OptionChips
          name="focus"
          options={FIXES}
          value={fix}
          onChange={setFix}
          label="What would you most like to fix?"
        />
      </fieldset>
      <label className="field text-[15px] font-extrabold">
        Which tools does your team use most? <span className="font-medium text-subtle">(optional)</span>
        <input
          className="input"
          type="text"
          name="tools"
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          placeholder="For example: Google Workspace, HubSpot, Slack"
        />
      </label>

      <div className="flex flex-col gap-[14px] pt-[22px] [border-top:1px_solid_#DCE8E1]">
        <div className="flex flex-wrap justify-between items-baseline gap-y-[6px] gap-x-[16px]">
          <span className="text-[15px] font-extrabold">Pick a time that works for you.</span>
          <span className="text-[13.5px] text-subtle">Times are shown in your time zone.</span>
        </div>

        {CALENDAR_URL ? (
          calendar ? (
            <iframe
              src={calendar}
              title="Book your Opportunity Call"
              loading="lazy"
              className="w-full h-[700px] border-0 rounded-[18px] bg-white"
            />
          ) : (
            <span className="text-[14.5px] text-muted">
              Answer the questions above, then choose a time on the next step.
            </span>
          )
        ) : (
          <>
            <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[8px]" role="group" aria-label="Day">
              {days.map((d, i) => {
                const on = i === day;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    aria-label={d.label || undefined}
                    onClick={() => {
                      setDay(i);
                      setTime([]);
                    }}
                    className={`flex flex-col items-center gap-[2px] py-[12px] px-[4px] rounded-[16px] [font:inherit] cursor-pointer border-[1.5px] border-solid ${
                      on ? "border-emerald-600 bg-emerald-600 text-white" : "border-line bg-white text-ink"
                    }`}
                  >
                    <span className="text-[12.5px] font-bold">{d.dow}</span>
                    <span className="text-[22px] font-extrabold">{d.num}</span>
                  </button>
                );
              })}
            </div>
            <div
              className="grid grid-cols-[repeat(auto-fit,minmax(min(110px,100%),1fr))] gap-[8px]"
              role="group"
              aria-label="Time"
            >
              {TIMES.map((t) => {
                const on = time.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setTime([t]);
                      setStatus("idle");
                    }}
                    className={`opt justify-center ${on ? "bg-emerald-50 border-emerald-600 text-emerald-800" : "bg-white border-line text-ink-soft"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <span className="text-[12.5px] text-subtle">
              Example availability. Replace with your Cal.com or Calendly embed.
            </span>
          </>
        )}
      </div>

      {needsContact ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-[14px]">
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
              placeholder="name@company.com"
              required
            />
          </label>
        </div>
      ) : null}

      {status === "pick-time" ? (
        <span role="alert" className="text-[13.5px] font-semibold text-[#B42318]">
          Choose a time first.
        </span>
      ) : null}
      {status === "failed" ? (
        <div
          role="alert"
          className="py-[14px] px-[16px] rounded-[14px] bg-[#FEF3F2] [border:1px_solid_#FECDCA] text-[14.5px] leading-[1.5] text-[#7A271A]"
        >
          Something went wrong and your booking wasn&apos;t sent. Please try again.
        </div>
      ) : null}

      {CALENDAR_URL && calendar ? null : (
        <button type="submit" className="pill pill-primary self-stretch" disabled={status === "sending"}>
          {CALENDAR_URL ? "Show available times" : status === "sending" ? "Booking…" : "Confirm booking"}
        </button>
      )}
    </form>
  );
}
