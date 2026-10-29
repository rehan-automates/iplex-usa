/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";

import type { BlogBlock } from "@/lib/content";

/** Splits text on **double asterisks** and bolds the odd segments. */
function renderInline(text: string): ReactNode[] {
  return text.split("**").map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part));
}

export function ArticleBody({ blocks }: { blocks: readonly BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return <h2 key={index}>{block.text}</h2>;
          case "h3":
            return <h3 key={index}>{block.text}</h3>;
          case "p":
            return <p key={index}>{renderInline(block.text)}</p>;
          case "list":
            return (
              <div className="article-list" key={index}>
                {block.lead ? <p className="article-list-lead">{block.lead}</p> : null}
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          case "image":
            return (
              <figure key={index}>
                <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={index}>
                <p>{block.text}</p>
                {block.by ? <footer>{block.by}</footer> : null}
              </blockquote>
            );
        }
      })}
    </>
  );
}
