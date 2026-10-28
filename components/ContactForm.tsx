"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label className={`${styles.field} ${styles.name}`}>
        <span>FULL NAME</span>
        <input name="name" placeholder="Enter full name" required />
      </label>

      <label className={`${styles.field} ${styles.email}`}>
        <span>EMAIL</span>
        <input type="email" name="email" placeholder="Enter email address" required />
      </label>

      <label className={`${styles.field} ${styles.company}`}>
        <span>COMPANY NAME</span>
        <input name="company" placeholder="Enter company name" />
      </label>

      <label className={`${styles.field} ${styles.budget}`}>
        <span>BUDGET</span>
        <select name="budget" defaultValue="">
          <option value="" disabled>Select budget range</option>
          <option>$10k – $25k</option>
          <option>$25k – $50k</option>
          <option>$50k – $100k</option>
          <option>$100k+</option>
        </select>
      </label>

      <label className={`${styles.field} ${styles.message}`}>
        <span>MESSAGE</span>
        <textarea name="message" placeholder="Let us know what we can help..." required />
      </label>

      <p className={styles.consent}>
        By submitting you agree to our <Link href="/terms">Terms of Service</Link> and Privacy
        Policy
      </p>

      <button className={styles.submit} type="submit">
        {sent ? "Message sent" : "Submit"}
      </button>
    </form>
  );
}
