"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";

import type { AboutContent, Testimonial } from "@/lib/content";

import styles from "./about.module.css";

type QuoteSlide = AboutContent["leadership"] & { example?: boolean };

export function AboutTestimonials({ leadership, examples }: {
  leadership: AboutContent["leadership"];
  examples: readonly Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const trackId = useId();
  const slides: QuoteSlide[] = [leadership, ...examples.map((item) => ({
    quote: item.quote,
    name: item.attribution,
    role: item.role,
    company: item.company.name,
    portrait: item.portrait,
    example: item.example,
  }))];

  function move(direction: number) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case "ArrowLeft": move(-1); break;
      case "ArrowRight": move(1); break;
      case "Home": setActive(0); break;
      case "End": setActive(slides.length - 1); break;
      default: return;
    }
    event.preventDefault();
  }

  return (
    <section
      className={styles.quoteSection}
      aria-label="Leadership and testimonials"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.quoteTop}>
        <span className={styles.quoteCount} aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <div className="carousel-controls" role="group" aria-label="Testimonial navigation">
          <button type="button" aria-label="Previous testimonial" aria-controls={trackId} disabled={slides.length < 2} onClick={() => move(-1)}>
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" aria-label="Next testimonial" aria-controls={trackId} disabled={slides.length < 2} onClick={() => move(1)}>
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <div id={trackId} aria-live="polite" aria-atomic="true">
        {slides.map((slide, index) => (
          <article
            className={styles.quoteInner}
            key={slide.name}
            hidden={active !== index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <div className={styles.quoteCopy}>
              <span className={styles.quoteMark} aria-hidden="true">“</span>
              <blockquote>{slide.quote}</blockquote>
            </div>
            <div className={styles.portraitFrame}>
              <Image
                className={styles.portrait}
                src={slide.portrait.src}
                alt={slide.portrait.alt}
                width={348}
                height={430}
                sizes="(max-width: 900px) 300px, 348px"
                // Slides after the first sit in `hidden` containers, where lazy images never start loading: fetch them
                // quietly in the background so clicking through never shows an empty portrait.
                {...(index === 0 ? {} : { loading: "eager" as const, fetchPriority: "low" as const })}
                unoptimized
              />
              <div className={styles.portraitShade} />
            </div>
            <div className={styles.quoteAttribution}>
              <p>{slide.name}</p>
              <span>{slide.role} of {slide.company}</span>
              {slide.example ? <small className={styles.quoteExample}>Illustrative testimonial · Fictional profile &amp; AI-generated portrait</small> : null}
            </div>
          </article>
        ))}
      </div>
      <div className={styles.quoteDots} role="group" aria-label="Choose a testimonial">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.name}
            aria-label={`Show testimonial ${index + 1}: ${slide.name}`}
            aria-current={active === index ? "true" : undefined}
            aria-controls={trackId}
            onClick={() => setActive(index)}
          ><span /></button>
        ))}
      </div>
    </section>
  );
}
