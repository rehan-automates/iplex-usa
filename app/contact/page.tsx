import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell iPlex what you are building and where software engineering or AI automation can help.",
};

export default function ContactPage() {
  return (
    <main className={`site-page ${styles.page}`}>
      <Header />

      <section className={styles.contact} aria-labelledby="contact-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>CONTACT US</p>
          <h1 id="contact-title">Let&rsquo;s talk about your workflow</h1>
          <p className={styles.description}>
            Share a few details about your business and what you&rsquo;re looking to automate. Our team
            will review your message and get back to you shortly.
          </p>
        </div>

        <ContactForm />
      </section>

      <CTASection className={styles.cta} />
      <Footer />
    </main>
  );
}
