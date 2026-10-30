import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { CTASection } from "@/components/CTASection";
import { PageShell } from "@/components/PageShell";
import { siteInfo, visible } from "@/lib/content";

import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell iPlex what you are building and where software engineering or AI automation can help.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { careers } = siteInfo;
  // Use the same Terms link in development and deployment.
  const terms = visible(siteInfo.legal).find((page) => page.href === "/terms");

  return (
    <PageShell className={styles.page}>
      <section className={styles.contact} aria-labelledby="contact-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>CONTACT US</p>
          <h1 id="contact-title">Let&rsquo;s talk about your workflow</h1>
          <p className={styles.description}>
            Share a few details about your business and what you&rsquo;re looking to automate. Our team
            will review your message and get back to you shortly.
          </p>
        </div>

        <ContactForm termsHref={terms?.href} recipient={siteInfo.email} />
      </section>

      <section className={styles.careers} id="careers" aria-labelledby="careers-title">
        <p className={styles.eyebrow}>CAREERS</p>
        <h2 id="careers-title">{careers.heading}</h2>
        <p className={styles.careersBody}>{careers.body}</p>
        <a className={styles.careersLink} href={`mailto:${careers.email}`}>
          {careers.email}
        </a>
      </section>

      <CTASection className={styles.cta} />
    </PageShell>
  );
}
