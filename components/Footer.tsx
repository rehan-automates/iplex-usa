/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const footerLogo = "/assets/9ec80305a487911b3718899bd05a058d7273641b.png";
const footerMotion = "/assets/347c615881b659a74d52e560d6c00089e2b701d4.gif";
const footerStill = "/assets/6b5fb31731d5f3618f25467b52a4bbe7b3b4302b.png";

const footerNavigation = [
  { href: "/", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/services", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Condition" },
  { href: "/blog", label: "Resources" },
] as const;

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

export function Footer() {
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
            <img className="footer-media-motion" src={footerMotion} alt="" />
            <img className="footer-media-still" src={footerStill} alt="" />
          </div>
        </div>

        <div className="footer-navigation-column">
          <p className="footer-label">Navigation</p>
          <nav className="footer-navigation" aria-label="Footer navigation">
            {footerNavigation.map((item) => (
              <Link className="footer-navigation-link" href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-contact-column">
          <div className="footer-social-block">
            <p className="footer-label">Socials</p>
            <div className="footer-socials">
              <a className="footer-social-link" href="#" aria-label="iPlex on Facebook">
                <FacebookIcon />
              </a>
              <a className="footer-social-link" href="#" aria-label="iPlex on X">
                <XIcon />
              </a>
              <a className="footer-social-link" href="#" aria-label="iPlex on Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className="footer-contact-block">
            <p className="footer-label">Email</p>
            <a className="footer-email" href="mailto:info@iplex.ai">
              info@iplex.ai
            </a>
          </div>

          <div className="footer-contact-block">
            <p className="footer-label">Phone</p>
            <a className="footer-phone" href="tel:+12345678">
              +12 345 678
            </a>
          </div>

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
                required
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div className="footer-legal">
        <p>© 2026 iPlex. All rights reserved. · Privacy Policy · Terms &amp; Conditions</p>
      </div>
    </footer>
  );
}
