"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { mainNav, navSection, type RouteKey } from "@/lib/site";

function ChevronDown() {
  return (
    <svg
      width="15"
      height="15"
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
}

/**
 * Desktop navigation. Dropdowns open on hover or keyboard focus and close as soon as a page is
 * chosen, the pointer leaves, focus moves away, Escape is pressed, or the visitor clicks elsewhere.
 */
export function MainNav() {
  const pathname = usePathname() as RouteKey;
  const activeSection = navSection[pathname];
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // A new page always starts with every dropdown closed.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const show = (label: string) => {
    cancelClose();
    setOpen(label);
  };
  const hideSoon = () => {
    cancelClose();
    // A short grace period lets the pointer travel from the label into the menu.
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const onKeyDown = (label: string) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(null);
      (event.currentTarget.querySelector(".navlink") as HTMLElement | null)?.focus();
    } else if (event.key === "ArrowDown" && open !== label) {
      event.preventDefault();
      setOpen(label);
      requestAnimationFrame(() => (event.currentTarget?.querySelector(".dd-menu a") as HTMLElement | null)?.focus());
    }
  };

  return (
    <nav ref={navRef} className="nav-links" aria-label="Main">
      {mainNav.map((item) => {
        const active = item.label === activeSection;
        const linkClass = active ? "navlink text-ink font-extrabold" : "navlink";
        const current = active ? ("page" as const) : undefined;

        if (!item.children) {
          return (
            <Link key={item.label} href={item.href} className={linkClass} aria-current={current}>
              {item.label}
            </Link>
          );
        }

        const isOpen = open === item.label;
        const menuId = `dd-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
        return (
          <div
            key={item.label}
            className="dd"
            data-js=""
            data-open={isOpen ? "" : undefined}
            onMouseEnter={() => show(item.label)}
            onMouseLeave={hideSoon}
            onFocus={() => show(item.label)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(null);
            }}
            onKeyDown={onKeyDown(item.label)}
          >
            <Link
              href={item.href}
              className={linkClass}
              aria-current={current}
              aria-expanded={isOpen}
              aria-controls={menuId}
              onClick={() => setOpen(null)}
            >
              {item.label}
              <ChevronDown />
            </Link>
            <div id={menuId} className="dd-menu">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  aria-current={pathname === child.href ? "page" : undefined}
                  onClick={() => setOpen(null)}
                >
                  {child.label}
                  <span>{child.hint}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
