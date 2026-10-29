/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";

import { BlogCard } from "@/components/BlogCard";
import { CTASection } from "@/components/CTASection";
import { DynamicHomeHeroVideo } from "@/components/DynamicHomeHeroVideo";
import { FAQ } from "@/components/FAQ";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { WorkCard } from "@/components/WorkCard";
import {
  ASSETS,
  blogPosts,
  homeStats,
  processSteps,
  siteInfo,
  testimonials,
  visible,
  visibleFaq,
  workProjects,
} from "@/lib/content";

const painPoints = [
  "Lack of Visibility",
  "Legacy Modernization Lag",
  "High Cloud OpEx",
  "Fragmented Data Silos",
  "Integration & Technical Debt",
];

const comparison = [
  { label: "Time to first commit", iplex: "Days", inhouse: "Weeks to months", inhouseState: "warning", agency: "Weeks", agencyState: "warning" },
  { label: "Senior engineers on the work", iplex: "Always", inhouse: "Depends on hiring luck", inhouseState: "cross", agency: "Rarely", agencyState: "check" },
  { label: "AI development capability", iplex: "Core practice", inhouse: "Hard to hire", inhouseState: "warning", agency: "Add-on or outsourced", agencyState: "cross" },
  { label: "Flexibility to scale up/down", iplex: "On demand", inhouse: "Expensive & slow", inhouseState: "warning", agency: "Limited", agencyState: "warning" },
  { label: "Ownership of outcomes", iplex: "End-to-end", inhouse: "Yes, but slow to ramp", inhouseState: "warning", agency: "Delivery only", agencyState: "cross" },
] as const;

const statusGlyph = { check: "✓", cross: "×", warning: "△" } as const;

export default function HomePage() {
  return (
    <PageShell className="home-page">
      <section className="home-hero">
        <div className="home-hero__media">
          <Image
            className="home-hero__poster"
            src={ASSETS.homeHeroPoster}
            alt=""
            fill
            preload
            unoptimized
            sizes="100vw"
          />
          <DynamicHomeHeroVideo src={ASSETS.homeHeroLoop} poster={ASSETS.homeHeroPoster} />
        </div>
        <div className="home-hero__shade" />
        <div className="home-hero__copy site-container">
          <p className="eyebrow">AI-NATIVE ENTERPRISE TRANSFORMATION</p>
          <h1>Your product, built by engineers who&apos;ve done it before.</h1>
        </div>
      </section>

      <Reveal as="section" className="trusted-strip site-container" aria-label="Trusted companies">
        <p className="micro-label">TRUSTED COMPANIES ACROSS INDUSTRIES</p>
        <div className="trusted-strip__viewport">
          <div className="trusted-strip__track">
            {[0, 1].map((copyIndex) => (
              <div
                className="trusted-strip__group"
                aria-hidden={copyIndex === 1 ? true : undefined}
                key={copyIndex}
              >
                {siteInfo.trustedCompanies.map((name) => (
                  <span key={`${copyIndex}-${name}`}>{name}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="pain-section">
        <Reveal as="div" className="pain-orbit" aria-label="Enterprise pain points">
          <div className="pain-orbit__rings" />
          {painPoints.map((point, index) => (
            <span className={`pain-pill-orbit pain-pill-orbit--${index + 1}`} key={point}>
              <span className={`pain-pill pain-pill--${index + 1}`} style={{ "--pill-index": index } as CSSProperties}>
                {point}
              </span>
            </span>
          ))}
          <h2>The Hidden Cost<br />of Fragmented<br />Enterprise Systems</h2>
        </Reveal>
      </section>

      <section className="home-work site-container">
        <SectionHeading
          eyebrow="OUR WORKS"
          title={<>Engineered. Scaled.<br />Delivered.</>}
          description="Real products. Real startups. Real numbers. Here's what happens when 200 engineers get behind your idea."
        />
        <div className="work-stack">
          {visible(workProjects).map((project, index) => <WorkCard project={project} index={index} key={project.slug} />)}
        </div>
        <div className="center-action"><Link className="button button--dark" href="/work">See All Case Studies <span>↗</span></Link></div>
      </section>

      <section className="process-section">
        <div className="site-container">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="A simple, structured approach to building your product"
            description="No long onboarding. No agency runaround. Engineers in your workflow within days, shipping within weeks."
          />
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal as="article" className="process-card" index={index} key={step.title}>
                <img src={step.image} alt="" />
                <h3>{index + 1}. {step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison-section">
        <img className="comparison-section__bg" src={ASSETS.whyUsBackground} alt="" />
        <div className="site-container comparison-section__content">
          <SectionHeading
            eyebrow="WHY US"
            title={<>Built for Real Business<br />Impact</>}
            description="Most agencies talk about AI. We build systems that reduce manual work, improve accuracy, and scale with your operations."
          />
          <Reveal as="div" className="comparison-table" role="table" aria-label="iPlex comparison">
            <div className="comparison-row comparison-row--head" role="row">
              <span role="columnheader">What matters<br />to startups</span><span role="columnheader"><img src={ASSETS.logo} alt="iPlex" /></span><span role="columnheader">Hiring in-house</span><span role="columnheader">Typical offshore agency</span>
            </div>
            {comparison.map((row) => (
              <div className="comparison-row" role="row" key={row.label}>
                <span role="cell">{row.label}</span>
                <span className="is-iplex" role="cell"><i aria-hidden="true">✓</i>{row.iplex}</span>
                <span className={`comparison-value comparison-value--${row.inhouseState}`} role="cell"><i aria-hidden="true">{statusGlyph[row.inhouseState]}</i>{row.inhouse}</span>
                <span className={`comparison-value comparison-value--${row.agencyState}`} role="cell"><i aria-hidden="true">{statusGlyph[row.agencyState]}</i>{row.agency}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="testimonials-section site-container">
        <TestimonialCarousel
          heading={<div><p className="micro-label">TESTIMONIALS</p><h2>Hear from our satisfied clients</h2></div>}
        >
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.company.name}>
              <div className="testimonial-card__copy">
                {item.company.logo ? (
                  <img className="testimonial-card__logo" src={item.company.logo} alt={item.company.name} />
                ) : (
                  <div className="testimonial-card__wordmark">{item.company.name}</div>
                )}
                <blockquote>“{item.quote}”</blockquote>
                <p>{item.attribution}</p><span>{item.role}</span>
              </div>
              <div className="testimonial-card__media">
                <img src={item.portrait.src} alt={item.portrait.alt} loading="lazy" decoding="async" />
              </div>
            </article>
          ))}
        </TestimonialCarousel>
        <Reveal as="div" className="stats-row">
          {homeStats.map((stat) => (
            <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
          ))}
        </Reveal>
      </section>

      <section className="insights-section site-container">
        <div className="section-line-heading"><h2>Insights on AI &amp; Automation</h2><Link className="button button--dark" href="/blog">See More <span>↗</span></Link></div>
        <div className="blog-grid">{visible(blogPosts).map((post, index) => <Reveal index={index} key={post.slug}><BlogCard post={post} /></Reveal>)}</div>
      </section>

      <section className="faq-section site-container">
        <div className="faq-section__title"><h2>Have questions?<br />Check out the<br />FAQs</h2></div>
        <FAQ items={visibleFaq()} />
      </section>

      <CTASection />
    </PageShell>
  );
}
