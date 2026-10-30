/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import Link from "next/link";

import { ASSETS } from "@/lib/assets";
import { siteInfo, visible, type SocialLink } from "@/lib/content";

const footerLogo = ASSETS.logo;
const footerMotion = ASSETS.footerAnimation;
const footerStill = ASSETS.footerStill;

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M11.4 18v-7h2.35l.35-2.73h-2.7V6.53c0-.79.22-1.33 1.35-1.33h1.44V2.76a19.3 19.3 0 0 0-2.1-.11c-2.08 0-3.5 1.27-3.5 3.6v2.02H6.25V11h2.34v7h2.81Z" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M3.1 3h3.32l4.26 5.69L15.66 3h1.28l-5.67 6.48L17.45 17h-3.31l-4.7-6.28L3.94 17H2.65l6.2-7.08L3.1 3Zm2.69.94H5.02l9.49 12.12h.77L5.79 3.94Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="14.45" cy="5.65" r="1" fill="currentColor" />
    </svg>
  );
}

const socialIcons: Record<SocialLink["platform"], ReactNode> = {
  facebook: <FacebookIcon />,
  x: <XIcon />,
  instagram: <InstagramIcon />,
};

export function Footer() {
  const socials = visible(siteInfo.socials);
  const legal = visible(siteInfo.legal);
  const navigation = [
    { href: "/", label: "Company" },
    { href: "/services", label: "Services" },
    { href: "/services", label: "Industries" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    ...legal.map(({ href, label }) => ({ href, label })),
    { href: "/blog", label: "Resources" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-column">
          <Link className="footer-brand" href="/" aria-label="iPlex home">
            <img className="footer-logo" src={footerLogo} alt="iPlex" width="82" height="38" />
          </Link>
          <p className="footer-statement">
            Software engineering and AI development for the startups shaping tomorrow.
          </p>

          <div className="footer-media" aria-hidden="true">
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet={footerStill} />
              <img className="footer-media-motion" src={footerMotion} alt="" loading="lazy" decoding="async" />
            </picture>
          </div>
        </div>

        <div className="footer-navigation-column">
          <p className="footer-label">Navigation</p>
          <nav className="footer-navigation" aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link className="footer-navigation-link" href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-contact-column">
          {socials.length ? (
            <div className="footer-social-block">
              <p className="footer-label">Socials</p>
              <div className="footer-socials">
                {socials.map((social) => (
                  <a
                    className="footer-social-link"
                    href={social.href}
                    key={social.platform}
                    aria-label={social.label}
                    {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {socialIcons[social.platform]}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className="footer-contact-block">
            <p className="footer-label">Email</p>
            <a className="footer-email" href={`mailto:${siteInfo.email}`}>
              {siteInfo.email}
            </a>
          </div>

          {siteInfo.phone ? (
            <div className="footer-contact-block">
              <p className="footer-label">Phone</p>
              <a className="footer-phone" href={siteInfo.phone.href}>
                {siteInfo.phone.display}
              </a>
            </div>
          ) : null}

          <form className="footer-newsletter" action="/contact" method="get">
            <label className="footer-label" htmlFor="footer-email">
              Subscribe to our newsletter
            </label>
            <div className="footer-newsletter-field">
              <input
                id="footer-email"
                name="email"
                placeholder="Email address"
                type="email"
                autoComplete="email"
                required
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div className="footer-legal">
        <p>
          © 2026 iPlex. All rights reserved.
          {legal.map((item) => (
            <span key={item.href}>
              {" · "}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
