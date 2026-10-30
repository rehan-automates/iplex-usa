import type { ReactNode } from "react";

import { PageShell } from "./PageShell";

import styles from "./InformationPage.module.css";

export function InformationPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PageShell>
      <article className={`site-container ${styles.content}`}>
        <p className="micro-label">IPLEX</p>
        <h1>{title}</h1>
        {children}
      </article>
    </PageShell>
  );
}
