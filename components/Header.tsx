"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact#careers", label: "Careers" },
] as const;

const logo = "/assets/9ec80305a487911b3718899bd05a058d7273641b.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("site-menu-open", isMenuOpen);
    return () => document.documentElement.classList.remove("site-menu-open");
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="header-brand" href="/" aria-label="iPlex home">
          <img className="header-logo" src={logo} alt="iPlex" width="82" height="38" />
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          className="header-menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
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
            {navigation.map((item) => (
              <Link
                className="header-navigation-link"
                href={item.href}
                key={item.label}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="header-navigation-slash" aria-hidden="true">
                  /
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            className="header-build-button"
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Let&apos;s Build</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
