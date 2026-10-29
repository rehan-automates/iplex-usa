"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Sticky site header. Transparent at the top of the page (exactly as designed) and turns into a
 * frosted bar once the visitor scrolls, so navigation is always one tap or click away.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > 8,
    () => false,
  );
  return (
    <header className="site-header" data-scrolled={scrolled ? "" : undefined}>
      {children}
    </header>
  );
}
