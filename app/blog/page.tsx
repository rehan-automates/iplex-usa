import type { Metadata } from "next";

import { BlogCard } from "@/components/BlogCard";
import { PageShell } from "@/components/PageShell";
import { blogPosts, visible } from "@/lib/content";

import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert perspectives on AI automation, workflow design, and the systems behind high-performing businesses.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <PageShell className={styles.page}>
      <section className={styles.heading} aria-labelledby="blog-title">
        <p className={styles.eyebrow}>BLOGS</p>
        <h1 id="blog-title">Insights on AI &amp; Automation</h1>
        <p className={styles.description}>
          Expert perspectives on AI automation, workflow design, and the systems behind
          high-performing businesses.
        </p>
      </section>

      <section className={styles.grid} aria-labelledby="blog-list-title">
        <h2 className="visually-hidden" id="blog-list-title">Latest articles</h2>
        {visible(blogPosts).map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </section>
    </PageShell>
  );
}
