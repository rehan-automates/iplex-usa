"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact#careers", label: "Careers" },
] as const;

const logo = "/assets/9ec80305a487911b3718899bd05a058d7273641b.png";

/** True when `href` is the page being viewed, or a parent of it (so /work stays current on /work/clinuvel). */
function isCurrent(href: string, pathname: string) {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  // The menu is "open" only on the page it was opened on, so navigating closes it without an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const isMenuOpen = openedOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => setOpenedOn(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenedOn(null);
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("site-menu-open", isMenuOpen);
    return () => document.documentElement.classList.remove("site-menu-open");
  }, [isMenuOpen]);

  // While the full-screen menu is open, only the menu is reachable: the page behind it is inert.
  useEffect(() => {
    if (!isMenuOpen) return;

    const behind = [document.getElementById("main"), document.querySelector<HTMLElement>(".site-footer")];
    behind.forEach((element) => {
      if (element) element.inert = true;
    });
    firstLinkRef.current?.focus();

    return () => {
      behind.forEach((element) => {
        if (element) element.inert = false;
      });
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="header-inner">
        <Link className="header-brand" href="/" aria-label="iPlex home">
          <img className="header-logo" src={logo} alt="iPlex" width="82" height="38" />
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          className="header-menu-toggle"
          onClick={() => setOpenedOn(isMenuOpen ? null : pathname)}
          ref={toggleRef}
          type="button"
        >
          <span className="header-menu-line" />
          <span className="header-menu-line" />
        </button>

        <nav
          aria-label="Primary navigation"
          className="header-navigation"
          data-open={isMenuOpen ? "true" : "false"}
          id="site-navigation"
        >
          <div className="header-navigation-links">
            {navigation.map((item, index) => (
              <Link
                aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
                className="header-navigation-link"
                href={item.href}
                key={item.label}
                onClick={closeMenu}
                ref={index === 0 ? firstLinkRef : undefined}
              >
                <span className="header-navigation-slash" aria-hidden="true">
                  /
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          <Link className="header-build-button" href="/contact" onClick={closeMenu}>
            <span>Let&apos;s Build</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
