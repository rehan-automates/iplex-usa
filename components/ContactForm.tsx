"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "./ContactForm.module.css";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Enter your full name.";

  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^ @]+@[^ @]+[.][^ @]+$/.test(email)) errors.email = "Enter a valid email address, like name@company.com.";

  if (!String(data.get("message") ?? "").trim()) errors.message = "Tell us a little about what you need.";
  return errors;
}

export type ContactFormProps = {
  /** Link target for "Terms of Service" in the consent line. Leave out until that page is published. */
  termsHref?: string;
  /** Recipient for the visitor's prepared contact email. */
  recipient: string;
};

export function ContactForm({ termsHref, recipient }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const errorCount = Object.keys(errors).length;

  // Move focus to the first invalid field after a failed submit so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (errorCount) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors, errorCount]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;

    const message = [
      `Name: ${String(data.get("name") ?? "").trim()}`,
      `Email: ${String(data.get("email") ?? "").trim()}`,
      `Company: ${String(data.get("company") ?? "").trim() || "Not provided"}`,
      `Budget: ${String(data.get("budget") ?? "").trim() || "Not provided"}`,
      "",
      String(data.get("message") ?? "").trim(),
    ].join("\n");
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent("New website contact inquiry")}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    setSent(true);
  }

  function clearError(name: FieldName) {
    if (!errors[name]) return;
    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  const invalid = (name: FieldName) => (errors[name] ? true : undefined);
  const describedBy = (name: FieldName) => (errors[name] ? `contact-${name}-error` : undefined);

  return (
    <form className={styles.form} onSubmit={submit} noValidate ref={formRef}>
      <div className={styles.group} data-invalid={invalid("name")}>
        <label className={styles.field}>
          <span>FULL NAME</span>
          <input
            name="name"
            placeholder="Enter full name"
            autoComplete="name"
            required
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            onChange={() => clearError("name")}
          />
        </label>
        <p className={styles.error} id="contact-name-error">{errors.name}</p>
      </div>

      <div className={styles.group} data-invalid={invalid("email")}>
        <label className={styles.field}>
          <span>EMAIL</span>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            onChange={() => clearError("email")}
          />
        </label>
        <p className={styles.error} id="contact-email-error">{errors.email}</p>
      </div>

      <div className={styles.group}>
        <label className={styles.field}>
          <span>COMPANY NAME</span>
          <input name="company" placeholder="Enter company name" autoComplete="organization" />
        </label>
      </div>

      <div className={styles.group}>
        <label className={styles.field}>
          <span>BUDGET</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>Select budget range</option>
            <option>$10k – $25k</option>
            <option>$25k – $50k</option>
            <option>$50k – $100k</option>
            <option>$100k+</option>
          </select>
        </label>
      </div>

      <div className={styles.group} data-invalid={invalid("message")}>
        <label className={styles.field}>
          <span>MESSAGE</span>
          <textarea
            name="message"
            placeholder="Let us know what we can help..."
            required
            aria-invalid={invalid("message")}
            aria-describedby={describedBy("message")}
            onChange={() => clearError("message")}
          />
        </label>
        <p className={styles.error} id="contact-message-error">{errors.message}</p>
      </div>

      <div className={styles.footerRow}>
        <p className={styles.consent}>
          By submitting you agree to our {termsHref ? <Link href={termsHref}>Terms of Service</Link> : "Terms of Service"} and Privacy
          Policy
        </p>

        <button className={styles.submit} type="submit">
          {sent ? "Email draft prepared" : "Submit"}
        </button>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {sent
          ? "Choose an email app if prompted, then review and send your message there."
          : errorCount
            ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} your attention.`
            : ""}
      </p>
    </form>
  );
}
