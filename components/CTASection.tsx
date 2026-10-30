/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import Link from "next/link";

import { ASSETS } from "@/lib/assets";

import { ArrowIcon } from "./ArrowIcon";

const ctaBackground = ASSETS.ctaBackdrop;

export type CTASectionProps = {
  title?: ReactNode;
  description?: ReactNode;
  buttonLabel?: string;
  href?: string;
  className?: string;
};

export function CTASection({
  title = <>Ready to engineer your product&apos;s future?</>,
  description = (
    <>
      Tell us what you&apos;re building. We&apos;ll get back to you within 24 hours with a clear
      path forward — no sales pitch, no fluff.
    </>
  ),
  buttonLabel = "Start a conversation",
  href = "/contact",
  className,
}: CTASectionProps = {}) {
  return (
    <section className={["site-cta", className].filter(Boolean).join(" ")}>
      <img className="cta-background" src={ctaBackground} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="cta-scrim" aria-hidden="true" />
      <div className="cta-inner">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-description">{description}</p>
        <Link className="cta-button" href={href}>
          <span>{buttonLabel}</span>
          <ArrowIcon className="cta-button-arrow" />
        </Link>
      </div>
    </section>
  );
}
