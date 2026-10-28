import type { Metadata } from "next";

import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WorkCard } from "@/components/WorkCard";
import { workProjects } from "@/lib/content";

import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore selected iPlex software engineering, AI development, and product delivery case studies.",
};

export default function WorkPage() {
  return (
    <main className={`site-page ${styles.page}`}>
      <Header />

      <section className={styles.intro} aria-labelledby="work-title">
        <p className={styles.eyebrow}>WORK</p>
        <h1 id="work-title">Engineered. Scaled. Delivered.</h1>
        <p className={styles.description}>
          Real products. Real startups. Real numbers. Here&apos;s what happens when 200 engineers
          get behind your idea.
        </p>
      </section>

      <section className={styles.workList} aria-label="Selected work">
        {workProjects.map((project, index) => (
          <WorkCard project={project} index={index} key={project.title} />
        ))}
      </section>

      <CTASection className={styles.cta} />
      <Footer />
    </main>
  );
}
