"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const SCROLL_EDGE_TOLERANCE = 12;

export type TestimonialCarouselProps = {
  /** Eyebrow and title shown on the left of the heading row. */
  heading: ReactNode;
  /** The cards (`article.testimonial-card`). */
  children: ReactNode;
};

/** Scroll-snap track with persistent previous/next controls. */
export function TestimonialCarousel({ heading, children }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [{ overflows, atStart, atEnd }, setPosition] = useState({ overflows: false, atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setPosition({
      overflows: track.scrollWidth > track.clientWidth + 2,
      atStart: track.scrollLeft <= SCROLL_EDGE_TOLERANCE,
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - SCROLL_EDGE_TOLERANCE,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <>
      <div className="testimonials-heading">
        {heading}
        <div className="carousel-controls" role="group" aria-label="Testimonial navigation">
          <button
            type="button"
            aria-controls="testimonial-track"
            aria-label="Previous testimonial"
            disabled={!overflows || atStart}
            onClick={() => scrollByCard(-1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            aria-controls="testimonial-track"
            aria-label="Next testimonial"
            disabled={!overflows || atEnd}
            onClick={() => scrollByCard(1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      {/* Focusable so keyboard users can scroll the track with the arrow keys. */}
      <div
        id="testimonial-track"
        className="testimonial-grid"
        ref={trackRef}
        role="region"
        aria-label="Client testimonials"
        tabIndex={0}
        onScroll={measure}
      >
        {children}
      </div>
    </>
  );
}
