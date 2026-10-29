import type { Metadata } from "next";

import { CTASection } from "@/components/CTASection";
import { PageShell } from "@/components/PageShell";
import { WorkCard } from "@/components/WorkCard";
import { visible, workProjects } from "@/lib/content";

import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore selected iPlex software engineering, AI development, and product delivery case studies.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell className={styles.page}>
      <section className={styles.intro} aria-labelledby="work-title">
        <p className={styles.eyebrow}>WORK</p>
        <h1 id="work-title">Engineered. Scaled. Delivered.</h1>
        <p className={styles.description}>
          Real products. Real startups. Real numbers. Here&apos;s what happens when 200 engineers
          get behind your idea.
        </p>
      </section>

      <section className={styles.workList} aria-labelledby="work-list-title">
        <h2 className="visually-hidden" id="work-list-title">Selected case studies</h2>
        {visible(workProjects).map((project, index) => (
          <WorkCard project={project} index={index} key={project.slug} />
        ))}
      </section>

      <CTASection className={styles.cta} />
    </PageShell>
  );
}
