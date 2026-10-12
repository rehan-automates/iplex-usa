"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="py-0 px-[4px] rounded-[4px] bg-emerald-100 text-ink font-bold">{children}</span>
);

/** Reads an ISO start time some calendars append to their redirect (Calendly, Cal.com). */
function fromIso(value: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return {
    date: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

/**
 * "Your call is on [date] at [time]..." built from the booking redirect's query string
 * (?date=&time=&email=, or Calendly / Cal.com parameters). Also records the booking conversion.
 */
export function BookingConfirmation() {
  const params = useSearchParams();

  useEffect(() => {
    track("call_booked");
  }, []);

  const iso = fromIso(params.get("event_start_time") ?? params.get("startTime"));
  const date = params.get("date") ?? iso?.date;
  const time = params.get("time") ?? iso?.time;
  const email = params.get("email") ?? params.get("invitee_email");

  return (
    <p className="lead rise d2">
      {date && time ? (
        <>
          Your call is on <Highlight>{date}</Highlight> at <Highlight>{time}</Highlight>.{" "}
        </>
      ) : (
        <>Your call is booked. </>
      )}
      {email ? (
        <>
          A calendar invite is on its way to <Highlight>{email}</Highlight>.
        </>
      ) : (
        <>A calendar invite is on its way to your inbox.</>
      )}
    </p>
  );
}

export function BookingConfirmationFallback() {
  return <p className="lead rise d2">Your call is booked. A calendar invite is on its way to your inbox.</p>;
}
