/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { dateAttr, formatDate, resolveBlogPost, type BlogPost } from "@/lib/content";


export type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const entry = resolveBlogPost(post);
  const href = `/blog/${entry.slug}`;

  return (
    <article className="blog-card">
      <Link className="blog-card-media-link" href={href} aria-label={`Read ${entry.title}`}>
        <img className="blog-card-image" src={entry.cardImage} alt="" loading="lazy" decoding="async" />
      </Link>
      <div className="blog-card-copy">
        <p className="blog-card-meta">
          <span>{entry.category}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={dateAttr(entry.date)}>{formatDate(entry.date)}</time>
        </p>
        <h3 className="blog-card-title">
          <Link href={href}>{entry.title}</Link>
        </h3>
      </div>
    </article>
  );
}
