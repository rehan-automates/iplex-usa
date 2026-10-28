import type { Metadata } from "next";
import Image from "next/image";

import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { services } from "@/lib/content";

import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services | Intelligent Automation Systems",
  description:
    "Explore iPlex workflow automation, AI-powered systems, and sales and revenue automation services.",
};

export default function ServicesPage() {
  return (
    <main className={`site-page ${styles.page}`}>
      <Header />

      <section className={styles.intro} aria-labelledby="services-title">
        <p className={styles.eyebrow}>OUR SERVICES</p>
        <h1 id="services-title">Built to Simplify Operations</h1>
        <p className={styles.introDescription}>
          We design intelligent systems that streamline workflows, strengthen revenue processes,
          and connect your tools into one cohesive ecosystem.
        </p>
      </section>

      <section className={styles.servicesList} aria-label="iPlex services">
        {services.map((service, index) => {
          const isRevenueService = index === 2;

          return (
            <article
              className={`${styles.serviceCard} ${isRevenueService ? styles.serviceCardTall : ""}`}
              key={service.title}
            >
              <div className={styles.serviceCopy}>
                <p className={styles.serviceNumber}>/ {service.number}</p>
                <h2>
                  {isRevenueService ? (
                    <>
                      Sales &amp; Revenue
                      <br />
                      Automation
                    </>
                  ) : (
                    service.title
                  )}
                </h2>
                <p className={styles.serviceDescription}>{service.description}</p>

                <ul className={styles.deliverables}>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.serviceImage}>
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) calc(100vw - 74px), 310px"
                  unoptimized
                />
              </div>
            </article>
          );
        })}
      </section>

      <CTASection className={styles.cta} />
      <Footer />
    </main>
  );
}
