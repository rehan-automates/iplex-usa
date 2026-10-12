"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { mainNav, navSection, type RouteKey } from "@/lib/site";

const ICON = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Small icons for the expandable menu items. */
const ICONS: Record<string, ReactNode> = {
  "/ai-audit": (
    <svg {...ICON}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  "/ai-implementation": (
    <svg {...ICON}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  "/ai-training": (
    <svg {...ICON}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </svg>
  ),
  "/for-agencies": (
    <svg {...ICON}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  "/for-b2b": (
    <svg {...ICON}>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
};

const Chevron = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Arrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const MINOR_LINKS = [
  { label: "Trust & Security", href: "/trust" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/**
 * Menu for tablets and phones (below 1080px): a sheet under the sticky header with expandable
 * Services and Who We Help groups, the main pages, and the two calls to action pinned at the bottom.
 * Closes on navigation, Escape, or a tap on the dimmed page; the page behind doesn't scroll while open.
 */
export function MobileMenu() {
  const pathname = usePathname() as RouteKey;
  const activeSection = navSection[pathname];
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetId = useId();

  // Navigating closes the menu.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const toggle = () => {
    if (!open) setExpanded(activeSection === "Services" || activeSection === "Who We Help" ? activeSection : null);
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.menuOpen = "";
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1080) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      delete root.dataset.menuOpen;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="mm-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={toggle}
      >
        <span className="mm-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open
        ? createPortal(
            <>
              <div className="mm-backdrop" onClick={close} aria-hidden="true" />
              <nav id={sheetId} className="mm-sheet" aria-label="Menu">
                <div className="mm-body">
                  {mainNav.map((item) => {
                    if (!item.children) {
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="mm-row mm-group"
                          aria-current={item.label === activeSection ? "page" : undefined}
                          onClick={close}
                        >
                          {item.label}
                          <Arrow />
                        </Link>
                      );
                    }
                    const isExpanded = expanded === item.label;
                    const panelId = `${sheetId}-${item.label.replace(/\W+/g, "")}`;
                    return (
                      <div key={item.label} className="mm-group">
                        <button
                          type="button"
                          className="mm-row"
                          aria-expanded={isExpanded}
                          aria-controls={panelId}
                          data-active={item.label === activeSection ? "" : undefined}
                          onClick={() => setExpanded(isExpanded ? null : item.label)}
                        >
                          {item.label}
                          <Chevron />
                        </button>
                        <div
                          id={panelId}
                          className="mm-collapse"
                          data-open={isExpanded ? "" : undefined}
                          inert={!isExpanded}
                        >
                          <div>
                            <div className="mm-sub">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  aria-current={pathname === child.href ? "page" : undefined}
                                  onClick={close}
                                >
                                  <span className="mm-ico">{ICONS[child.href]}</span>
                                  <span>
                                    <strong>{child.label}</strong>
                                    <small>{child.hint}</small>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mm-minor">
                    {MINOR_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        onClick={close}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mm-foot">
                  <Link className="pill pill-primary" href="/book" onClick={close}>
                    Book a free call
                  </Link>
                  <Link className="pill pill-outline" href="/scorecard" onClick={close}>
                    Get your AI score
                  </Link>
                </div>
              </nav>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
