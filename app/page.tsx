/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { BlogCard } from "@/components/BlogCard";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeHeroVideo } from "@/components/HomeHeroVideo";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkCard } from "@/components/WorkCard";
import { ASSETS, blogPosts, faqItems, processSteps, workProjects } from "@/lib/content";

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
    <main className="site-page home-page">
      <Header />

      <section className="home-hero">
        <div className="home-hero__media">
          <img
            className="home-hero__backdrop"
            src={ASSETS.homeHeroLandscape}
            alt="A rocky landscape beneath an overcast sky"
          />
          <HomeHeroVideo
            poster={ASSETS.homeHeroLandscape}
            src={ASSETS.homeHeroLoop}
          />
        </div>
        <div className="home-hero__shade" />
        <div className="home-hero__copy site-container">
          <p className="eyebrow">AI-NATIVE ENTERPRISE TRANSFORMATION</p>
          <h1>Your product, built by engineers who&apos;ve done it before.</h1>
        </div>
      </section>

      <section className="trusted-strip site-container" aria-label="Trusted companies">
        <p className="micro-label">TRUSTED COMPANIES ACROSS INDUSTRIES</p>
        <div className="trusted-strip__track">
          {["Shinta", "RAMA", "Pandawa", "BIMA", "Sadewa", "NAKULA", "Batavia", "BLOCKHAUS", "Mandala"].map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </section>

      <section className="pain-section">
        <div className="pain-orbit" aria-label="Enterprise pain points">
          <div className="pain-orbit__rings" />
          {painPoints.map((point, index) => (
            <span className={`pain-pill pain-pill--${index + 1}`} key={point}>{point}</span>
          ))}
          <h2>The Hidden Cost<br />of Fragmented<br />Enterprise Systems</h2>
        </div>
      </section>

      <section className="home-work site-container">
        <SectionHeading
          eyebrow="OUR WORKS"
          title={<>Engineered. Scaled.<br />Delivered.</>}
          description="Real products. Real startups. Real numbers. Here's what happens when 200 engineers get behind your idea."
        />
        <div className="work-stack">
          {workProjects.map((project, index) => <WorkCard project={project} index={index} key={project.title} />)}
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
              <article className="process-card" key={step.title}>
                <img src={step.image} alt="" />
                <h3>{index + 1}. {step.title}</h3>
                <p>{step.description}</p>
              </article>
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
          <div className="comparison-table" role="table" aria-label="iPlex comparison">
            <div className="comparison-row comparison-row--head" role="row">
              <span>What matters<br />to startups</span><span><img src={ASSETS.logo} alt="iPlex" /></span><span>Hiring in-house</span><span>Typical offshore agency</span>
            </div>
            {comparison.map((row) => (
              <div className="comparison-row" role="row" key={row.label}>
                <span role="cell">{row.label}</span>
                <span className="is-iplex" role="cell"><i aria-hidden="true">✓</i>{row.iplex}</span>
                <span className={`comparison-value comparison-value--${row.inhouseState}`} role="cell"><i aria-hidden="true">{statusGlyph[row.inhouseState]}</i>{row.inhouse}</span>
                <span className={`comparison-value comparison-value--${row.agencyState}`} role="cell"><i aria-hidden="true">{statusGlyph[row.agencyState]}</i>{row.agency}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section site-container">
        <div className="testimonials-heading">
          <div><p className="micro-label">TESTIMONIALS</p><h2>Hear from our satisfied clients</h2></div>
          <div className="carousel-controls" aria-hidden="true"><span>‹</span><span>›</span></div>
        </div>
        <div className="testimonial-grid">
          <article className="testimonial-card">
            <div className="testimonial-card__copy">
              <img className="testimonial-card__logo" src={ASSETS.clinuvelWordmark} alt="Clinuvel" />
              <blockquote>“Honored with the 2026–2027 Microsoft AI Business Solutions Inner Circle award for the sixth consecutive year, reflecting leadership in AI innovation and measurable business impact.”</blockquote>
              <p>Fintech Startup, San Francisco</p><span>VP of Engineering</span>
            </div>
            <img src={ASSETS.testimonialWoman} alt="Client portrait" />
          </article>
          <article className="testimonial-card">
            <div className="testimonial-card__copy">
              <img className="testimonial-card__logo" src={ASSETS.apricotWordmark} alt="Apricot Law" />
              <blockquote>“Named to Forbes Asia’s Best Under a Billion for the sixth time, demonstrating consistent performance, strategic resilience, and sustained technological delivery globally.”</blockquote>
              <p>B2B SaaS Company, New York</p><span>Founder &amp; CEO</span>
            </div>
            <img src={ASSETS.testimonialMan} alt="Client portrait" />
          </article>
        </div>
        <div className="stats-row">
          {[['10+', 'Years'], ['54%', 'Time Saved'], ['4×', 'Process Efficiency'], ['79%', 'less Human Error']].map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      <section className="insights-section site-container">
        <div className="section-line-heading"><h2>Insights on AI &amp; Automation</h2><Link className="button button--dark" href="/blog">See More <span>↗</span></Link></div>
        <div className="blog-grid">{blogPosts.map((post) => <BlogCard post={post} key={post.title} />)}</div>
      </section>

      <section className="faq-section site-container">
        <div className="faq-section__title"><h2>Have questions?<br />Check out the<br />FAQs</h2></div>
        <FAQ items={faqItems} />
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
