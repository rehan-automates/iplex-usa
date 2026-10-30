"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { getOrbitLayout, getOrbitPoint, type OrbitLayout } from "@/lib/orbit-layout";

const labels = [
  "Poor Visibility",
  "Legacy Systems",
  "Rising Cloud Costs",
  "Data Silos",
  "Technical Debt",
];
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function PainOrbit() {
  const outerFadeId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const epochRef = useRef<number | null>(null);
  const [layout, setLayout] = useState<OrbitLayout | null>(null);
  const reduceMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => true);

  useEffect(() => {
    const root = rootRef.current!;
    const heading = headingRef.current!;
    function measure() {
      const labelSizes = labelRefs.current.map((label) => ({ width: label!.offsetWidth, height: label!.offsetHeight }));
      const gutter = Number.parseFloat(getComputedStyle(root).paddingLeft);
      const next = getOrbitLayout(root.clientWidth, gutter, { width: heading.offsetWidth, height: heading.offsetHeight }, labelSizes);
      setLayout((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(heading);
    labelRefs.current.forEach((label) => observer.observe(label!));
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!layout) return;
    let frame = 0;
    let inView = true;
    epochRef.current ??= performance.now();

    function paint(time: number) {
      const progress = reduceMotion ? 0 : (time - epochRef.current!) / 100_000;
      labelRefs.current.forEach((label, index) => {
        const { x, y } = getOrbitPoint(layout!, index, progress);
        label!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      });
    }
    function tick(time: number) {
      paint(time);
      frame = requestAnimationFrame(tick);
    }
    function updatePlayback() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!reduceMotion && inView && !document.hidden) frame = requestAnimationFrame(tick);
    }

    paint(performance.now());
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(rootRef.current!);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [layout, reduceMotion]);

  return (
    <section className="pain-section" aria-labelledby="enterprise-pain-title">
      <div className="pain-orbit" ref={rootRef} data-ready={Boolean(layout)} style={layout ? { height: layout.height } : undefined}>
        <svg className="pain-orbit__rings" viewBox={layout ? `0 0 ${layout.width} ${layout.height}` : "0 0 1240 963"} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={outerFadeId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="22%" stopColor="white" stopOpacity=".12" />
              <stop offset="78%" stopColor="white" stopOpacity=".12" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {(layout?.tracks ?? [{ rx: 200, ry: 200 }, { rx: 440, ry: 440 }, { rx: 330, ry: 330 }]).map((track, index) => (
            <ellipse key={index} cx={layout?.cx ?? 620} cy={layout?.cy ?? 481.5} rx={track.rx} ry={track.ry} stroke={index === 1 ? `url(#${outerFadeId})` : undefined} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <h2 ref={headingRef} id="enterprise-pain-title">The Hidden Cost<br />of Fragmented<br />Enterprise Systems</h2>
        {labels.map((label, index) => {
          const point = layout ? getOrbitPoint(layout, index, 0) : null;
          return (
            <span
              className="pain-pill"
              key={label}
              ref={(element) => { labelRefs.current[index] = element; }}
              style={point ? { transform: `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)` } : undefined}
            >
              <span className="pain-pill__label">{label}</span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
