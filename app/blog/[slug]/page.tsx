/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon } from "@/components/ArrowIcon";
import { ArticleBody } from "@/components/ArticleBody";
import { BlogCard } from "@/components/BlogCard";
import { PageShell } from "@/components/PageShell";
import {
  blogPosts,
  dateAttr,
  formatDate,
  getBlogPost,
  relatedBlogPosts,
  resolveBlogPost,
  visible,
} from "@/lib/content";

import styles from "./article.module.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Only published posts exist as pages; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return visible(blogPosts).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBlogPost(slug);
  if (!entry) return {};

  const post = resolveBlogPost(entry);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: dateAttr(post.date) },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const entry = getBlogPost(slug);
  if (!entry) notFound();

  const post = resolveBlogPost(entry);
  const related = relatedBlogPosts(slug);

  return (
    <PageShell className={styles.page}>
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <p className={styles.meta}>
            <span>{post.category}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={dateAttr(post.date)}>{formatDate(post.date, "short")}</time>
          </p>
          <h1>{post.title}</h1>
        </header>

        <img className={styles.hero} src={post.hero.src} alt={post.hero.alt} />

        <div className={styles.body}>
          <ArticleBody blocks={post.body} />
        </div>
      </article>

      {related.length ? (
        <section className={styles.related} aria-labelledby="related-title">
          <div className={styles.relatedHeader}>
            <h2 id="related-title">Insights on AI &amp; Automation</h2>
            <Link className={styles.more} href="/blog">
              <span>See More</span>
              <ArrowIcon />
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <BlogCard post={item} key={item.slug} />
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
