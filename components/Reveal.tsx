"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";

export type RevealProps = HTMLAttributes<HTMLElement> & {
  /** Element to render, so existing semantic tags and classes are kept. */
  as?: ElementType;
  /** Position in a small group (0-based). Delays the reveal by a few steps, capped so nobody waits for a long list. */
  index?: number;
  children?: ReactNode;
};

/**
 * Fades an element up once, the first time it scrolls into view.
 *
 *  - Anything already on screen when the page loads is left alone: above-the-fold content is never hidden.
 *  - The hidden state is only ever added by this script, so with JS off (or reduced motion on) the content is simply there.
 *  - It observes once and then stops, so scrolling back up never replays it.
 */
export function Reveal({ as: Tag = "div", index = 0, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { top, bottom } = element.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return;

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} style={{ ...style, "--reveal-index": Math.min(index, 4) } as CSSProperties} {...props}>
      {children}
    </Component>
  );
}
