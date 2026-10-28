import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/ArrowIcon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ASSETS } from "@/lib/content";

import styles from "./clinuvel.module.css";

export const metadata: Metadata = {
  title: "Work | Clinuvel Case Study",
  description:
    "How iPlex designed an automated system for Clinuvel's digital product delivery and customer workflows.",
};

const services = [
  "Campaign Data Tracking",
  "Content Operations System",
  "AI Workflow Automation",
] as const;

const relatedProjects = [
  {
    title: <>Scaling Mandala&apos;s E Commerce<br />Operations with Automation</>,
    description: <>Helping Mandala automate order processing and<br />customer workflows to handle more sales without…</>,
    image: ASSETS.relatedProjectMandala,
  },
  {
    title: <>Scaling Pandawa&apos;s SaaS Operations<br />with Automation</>,
    description: <>Helping Pandawa automate customer onboarding and<br />internal workflows to scale faster without adding more…</>,
    image: ASSETS.workStaffAugmentation,
  },
  {
    title: <>Scaling Shinta&apos;s Influencers Marketing<br />for Growth</>,
    description: <>Quantifiable results achieved through<br />intelligent workflows and integrated systems.</>,
    image: ASSETS.relatedProjectPandawa,
  },
] as const;

function SectionLabel({ children }: { children: string }) {
  return <p className={styles.sectionLabel}>{children}</p>;
}

export default function ClinuvelCaseStudyPage() {
  return (
    <main className={`site-page ${styles.page}`}>
      <Header />

      <section className={styles.hero} aria-labelledby="case-study-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroHeading}>
              <Image className={styles.clientLogo} src={ASSETS.clinuvelWordmark} alt="Clinuvel" width={124} height={32} unoptimized />
              <h1 id="case-study-title">Scaling Clinuvel Digital<br />Product Store with<br />Automation</h1>
              <p>Helping Batavia automate product delivery and customer workflows so their<br />digital store can handle more sales with less manual work.</p>
            </div>

            <dl className={styles.projectInfo}>
              <div><dt>year</dt><dd>2026</dd></div>
              <div><dt>industry</dt><dd>E-commerce</dd></div>
              <div className={styles.serviceInfo}>
                <dt>Services</dt>
                <dd>{services.map((service) => <span key={service}>{service}</span>)}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.heroImage}>
            <Image src={ASSETS.caseStudyHeroBackdrop} alt="" fill sizes="620px" unoptimized />
            <Image className={styles.heroArtwork} src={ASSETS.caseStudyHero} alt="Clinuvel pioneering photomedicine and photocosmetics campaign" fill priority sizes="620px" unoptimized />
          </div>
        </div>
      </section>

      <section className={styles.challenge}>
        <Image className={styles.challengeBackground} src={ASSETS.ctaBackdrop} alt="" fill sizes="1200px" unoptimized />
        <div className={styles.challengeShade} aria-hidden="true" />
        <div className={styles.challengeContent}>
          <SectionLabel>CHALLENGES</SectionLabel>
          <blockquote>“As our digital product sales started growing, we spent a lot of time manually sending files, answering common questions, and managing customer access. It became difficult to keep up as more customers purchased our products.”</blockquote>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.splitInner}>
          <div className={styles.approachCopy}>
            <SectionLabel>OUR APPROACH</SectionLabel>
            <h2>Designing an Automated<br />System for Digital<br />Product Delivery</h2>
            <p>We built a system that connects Batavia&apos;s checkout system, file delivery, and customer email workflows.</p>
            <p>When a customer purchases a product, the system automatically sends secure download access, onboarding instructions, and follow up emails. The team can also track product sales and customer activity from one central dashboard.</p>
          </div>
          <div className={styles.splitImage}>
            <Image src={ASSETS.caseStudyApproach} alt="Iridescent product form" fill sizes="620px" unoptimized />
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.splitInner}>
          <div className={styles.splitImage}>
            <Image src={ASSETS.caseStudyResultsBackdrop} alt="" fill sizes="620px" unoptimized />
            <Image className={styles.resultsArtwork} src={ASSETS.caseStudyResults} alt="Portrait representing the project results" fill sizes="620px" unoptimized />
          </div>
          <div className={styles.resultsCopy}>
            <SectionLabel>THE RESULTS</SectionLabel>
            <h2>Faster Product Delivery<br />and More Scalable Sales<br />Operations</h2>
            <p>With automation in place, Batavia can sell more digital products without increasing manual work.</p>
            <div className={styles.resultsStats}>
              <div><strong>22+</strong><span>hours saved weekly</span></div>
              <div><strong>2.4x</strong><span>more repeat purchases</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.moreProjects}>
        <div className={styles.moreProjectsInner}>
          <div className={styles.moreProjectsHeading}>
            <h2>More Projects</h2>
            <Link className={styles.moreLink} href="/work"><span>See More</span><ArrowIcon /></Link>
          </div>

          <div className={styles.relatedGrid}>
            {relatedProjects.map((project) => (
              <article className={styles.relatedCard} key={project.image}>
                <div className={styles.relatedImage}><Image src={project.image} alt="" fill sizes="392px" unoptimized /></div>
                <div className={styles.relatedContent}>
                  <Image src={ASSETS.clinuvelWordmark} alt="Clinuvel" width={124} height={32} unoptimized />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Link href="/work/clinuvel"><span>View Case Study</span><ArrowIcon /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
