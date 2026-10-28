import type { Metadata } from "next";

import { BlogCard } from "@/components/BlogCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { blogPosts } from "@/lib/content";

import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert perspectives on AI automation, workflow design, and the systems behind high-performing businesses.",
};

const articleHref = "/blog/building-smarter-ai-tools";

export default function BlogPage() {
  const posts = [...blogPosts, ...blogPosts];

  return (
    <main className={`site-page ${styles.page}`}>
      <Header />

      <section className={styles.heading} aria-labelledby="blog-title">
        <p className={styles.eyebrow}>BLOGS</p>
        <h1 id="blog-title">Insights on AI &amp; Automation</h1>
        <p className={styles.description}>
          Expert perspectives on AI automation, workflow design, and the systems behind
          high-performing businesses.
        </p>
      </section>

      <section className={styles.grid} aria-label="Latest insights">
        {posts.map((post, index) => (
          <BlogCard post={{ ...post, href: articleHref }} key={`${post.title}-${index}`} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
