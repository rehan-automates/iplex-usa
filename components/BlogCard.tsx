/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export type BlogPost = {
  title: string;
  category?: string;
  date?: string;
  image?: string;
  imageSrc?: string;
  imageAlt?: string;
  alt?: string;
  href?: string;
  link?: string;
  slug?: string;
};

export type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const image = post.image ?? post.imageSrc;
  const href = post.href ?? post.link ?? `/blog/${post.slug ?? "building-smarter-ai-tools"}`;

  return (
    <article className="blog-card">
      <Link className="blog-card-media-link" href={href} aria-label={`Read ${post.title}`}>
        {image ? (
          <img
            className="blog-card-image"
            src={image}
            alt={post.imageAlt ?? post.alt ?? ""}
          />
        ) : null}
      </Link>
      <div className="blog-card-copy">
        {post.category || post.date ? (
          <p className="blog-card-meta">
            {post.category ? <span>{post.category}</span> : null}
            {post.category && post.date ? <span aria-hidden="true">•</span> : null}
            {post.date ? <time>{post.date}</time> : null}
          </p>
        ) : null}
        <h3 className="blog-card-title">
          <Link href={href}>{post.title}</Link>
        </h3>
      </div>
    </article>
  );
}
