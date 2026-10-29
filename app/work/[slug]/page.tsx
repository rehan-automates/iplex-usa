import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon } from "@/components/ArrowIcon";
import { PageShell } from "@/components/PageShell";
import {
  ASSETS,
  getCaseStudy,
  relatedCaseStudies,
  resolveCaseStudy,
  visible,
  workProjects,
} from "@/lib/content";

import styles from "./caseStudy.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

// Only published case studies exist as pages; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return visible(workProjects).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};

  const study = resolveCaseStudy(entry);
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

function SectionLabel({ children }: { children: string }) {
  return <p className={styles.sectionLabel}>{children}</p>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();

  const study = resolveCaseStudy(entry);
  const related = relatedCaseStudies(slug).map(resolveCaseStudy);

  return (
    <PageShell className={styles.page}>
      <section className={styles.hero} aria-labelledby="case-study-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroHeading}>
              {study.client.logo ? <Image className={styles.clientLogo} src={study.client.logo} alt={study.client.name} width={124} height={32} unoptimized /> : null}
              <h1 id="case-study-title">
                {study.title}
              </h1>
              <p>{study.summary}</p>
            </div>

            <dl className={styles.projectInfo}>
              <div><dt>year</dt><dd>{study.year}</dd></div>
              <div><dt>industry</dt><dd>{study.industry}</dd></div>
              <div className={styles.serviceInfo}>
                <dt>Services</dt>
                <dd>{study.services.map((service) => <span key={service}>{service}</span>)}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.heroImage}>
            <Image src={study.hero.backdrop} alt="" fill sizes="(max-width: 1024px) 100vw, 620px" unoptimized />
            <Image className={styles.heroArtwork} src={study.hero.image} alt={study.hero.alt} fill preload sizes="(max-width: 1024px) 100vw, 620px" unoptimized />
          </div>
        </div>
      </section>

      <section className={styles.challenge}>
        <Image className={styles.challengeBackground} src={ASSETS.ctaBackdrop} alt="" fill sizes="1200px" unoptimized />
        <div className={styles.challengeShade} aria-hidden="true" />
        <div className={styles.challengeContent}>
          <SectionLabel>CHALLENGES</SectionLabel>
          <blockquote>“{study.challenge.quote}”</blockquote>
          {study.challenge.attribution ? <p className={styles.attribution}>{study.challenge.attribution}</p> : null}
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.splitInner}>
          <div className={styles.approachCopy}>
            <SectionLabel>OUR APPROACH</SectionLabel>
            <h2>{study.approach.heading}</h2>
            {study.approach.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={styles.splitImage}>
            <Image src={study.approach.image.src} alt={study.approach.image.alt} fill sizes="(max-width: 1024px) 100vw, 620px" unoptimized />
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.splitInner}>
          <div className={styles.splitImage}>
            <Image src={study.results.image.backdrop} alt="" fill sizes="(max-width: 1024px) 100vw, 620px" unoptimized />
            <Image className={styles.resultsArtwork} src={study.results.image.artwork} alt={study.results.image.alt} fill sizes="(max-width: 1024px) 100vw, 620px" unoptimized />
          </div>
          <div className={styles.resultsCopy}>
            <SectionLabel>THE RESULTS</SectionLabel>
            <h2>{study.results.heading}</h2>
            <p>{study.results.text}</p>
            <div className={styles.resultsStats}>
              {study.results.stats.map((stat) => (
                <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className={styles.moreProjects} aria-labelledby="more-projects-title">
          <div className={styles.moreProjectsInner}>
            <div className={styles.moreProjectsHeading}>
              <h2 id="more-projects-title">More Projects</h2>
              <Link className={styles.moreLink} href="/work"><span>See More</span><ArrowIcon /></Link>
            </div>

            <div className={styles.relatedGrid}>
              {related.map((project) => (
                <article className={styles.relatedCard} key={project.slug}>
                  <div className={styles.relatedImage}>
                    <Image src={project.cardImage} alt="" fill sizes="(max-width: 768px) 100vw, 392px" unoptimized />
                  </div>
                  <div className={styles.relatedContent}>
                    {project.client.logo ? <Image src={project.client.logo} alt="" width={124} height={32} unoptimized /> : null}
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <Link href={`/work/${project.slug}`} aria-label={`View case study: ${project.title}`}>
                      <span>View Case Study</span><ArrowIcon />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
