import type { Metadata } from "next";
import Image from "next/image";

import { CTASection } from "@/components/CTASection";
import { DraftBadge } from "@/components/DraftBadge";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { about, teamForDisplay, type AboutValue } from "@/lib/content";

import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About iPlex | The Minds Behind the Automation",
  description:
    "Meet the team and operating principles behind iPlex's software engineering and AI automation systems.",
  alternates: { canonical: "/about" },
};

/** "14+" → { number: "14", suffix: "+" } so the suffix can be styled separately. */
function splitMetric(value: string) {
  const match = /^([0-9.]*)(.*)$/.exec(value);
  return { number: match?.[1] ?? value, suffix: match?.[2] ?? "" };
}

function ValueIcon({ name }: { name: AboutValue["icon"] }) {
  if (name === "human") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <circle cx="32" cy="10" r="6" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="2.7" />
        <path d="M11 55c1.5-17 9-28 21-28s19.5 11 21 28M20 37c3.4 4.4 7.4 6.6 12 6.6S40.6 41.4 44 37" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.7" />
      </svg>
    );
  }

  if (name === "execution") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <circle cx="37" cy="27" r="16" fill="none" stroke="currentColor" strokeWidth="2.7" />
        <path d="m22 31-11-7m11 17-9 9m24-7v12m12-17 8 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.7" />
        <circle cx="10" cy="23" r="5" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="2.7" />
        <circle cx="11" cy="51" r="5" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="2.7" />
        <circle cx="37" cy="56" r="5" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="2.7" />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path d="M10 48h44M14 48V34h12v14M26 48V26h13v22M39 48V18h12v30" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.7" />
        <path d="m17 21 10-8 9 6L50 8m-8 0h8v8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M4 10h56v46H4z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.7" />
      <path d="M20 10h24v46H20z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="2.7" />
      <path d="M4 26h56" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.7" />
    </svg>
  );
}

export default function AboutPage() {
  const { hero, story, expertise, values, metrics, metricsImage, leadership, teamHeading } = about;
  const team = teamForDisplay();

  return (
    <PageShell className={styles.page}>
      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="100vw"
          unoptimized
        />
        <div className={styles.heroShade} />
        <div className={`site-container ${styles.heroContent}`}>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
        </div>
      </section>

      <section className={`${styles.featureSection} ${styles.approach}`} aria-labelledby="about-story-title">
        <div className={`site-container ${styles.featureGrid}`}>
          <div className={styles.featureCopy}>
            <p className="micro-label">{story.eyebrow}</p>
            <h2 id="about-story-title">{story.heading}</h2>
            <div className={styles.approachText}>
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {story.listLead ? <p>{story.listLead}</p> : null}
            </div>
            {story.bullets?.length ? (
              <ul className={styles.featureList}>
                {story.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className={styles.featureImageFrame}>
            <Image
              className={styles.featureImageTall}
              src={story.image.src}
              alt={story.image.alt}
              width={588}
              height={769}
              sizes="(max-width: 1024px) calc(100vw - 32px), 588px"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className={`${styles.featureSection} ${styles.results}`} aria-labelledby="about-expertise-title">
        <div className={`site-container ${styles.featureGrid}`}>
          <div className={styles.featureImageFrame}>
            <Image
              className={styles.featureImageTall}
              src={expertise.image.src}
              alt={expertise.image.alt}
              width={588}
              height={769}
              sizes="(max-width: 1024px) calc(100vw - 32px), 588px"
              unoptimized
            />
          </div>
          <div className={styles.featureCopy}>
            <p className="micro-label">{expertise.eyebrow}</p>
            <h2 id="about-expertise-title">{expertise.heading}</h2>
            <p className={styles.resultsText}>{expertise.text}</p>
            <div className={styles.featureStats}>
              {expertise.stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection} aria-label="Our values">
        <div className={`site-container ${styles.valuesGrid}`}>
          {values.map((value) => (
            <article className={styles.valueCard} key={value.icon}>
              <span className={styles.valueIcon}><ValueIcon name={value.icon} /></span>
              <div className={styles.valueCopy}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {team.members.length ? (
        <section className={styles.teamSection} aria-labelledby="about-team-title">
          <div className="site-container">
            <p className="micro-label">{teamHeading.eyebrow}</p>
            <h2 id="about-team-title">
              {teamHeading.title}
              {team.isPlaceholder ? <DraftBadge /> : null}
            </h2>
            <ul className={styles.teamGrid}>
              {team.members.map((member, index) => (
                <li className={styles.teamCard} key={`${member.name}-${index}`}>
                  <div className={styles.teamPhoto}>
                    <Image src={member.photo.src} alt={member.photo.alt} fill sizes="(max-width: 768px) 50vw, 280px" unoptimized />
                  </div>
                  <h3>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  {member.bio ? <p className={styles.teamBio}>{member.bio}</p> : null}
                  {member.linkedin ? (
                    <a
                      className={styles.teamLink}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className={styles.achievementsSection} aria-label="By the numbers">
        <div className={`site-container ${styles.achievementsGrid}`}>
          <div className={styles.achievementsList}>
            {metrics.map((metric) => {
              const { number, suffix } = splitMetric(metric.value);
              return (
                <div className={styles.achievement} key={metric.label}>
                  <strong>{number}</strong>
                  <div><b>{suffix}</b><span>{metric.label}</span></div>
                </div>
              );
            })}
          </div>
          <div className={styles.achievementImageFrame}>
            <Image
              className={styles.achievementImage}
              src={metricsImage.src}
              alt={metricsImage.alt}
              width={831}
              height={820}
              sizes="(max-width: 1024px) calc(100vw - 32px), 830px"
              unoptimized
            />
          </div>
        </div>
      </section>

      <Reveal as="section" className={styles.quoteSection} aria-label="Leadership">
        <div className={styles.quoteInner}>
          <div className={styles.quoteCopy}>
            <span className={styles.quoteMark} aria-hidden="true">“</span>
            <blockquote>{leadership.quote}</blockquote>
          </div>
          <div className={styles.portraitFrame}>
            <Image
              className={styles.portrait}
              src={leadership.portrait.src}
              alt={leadership.portrait.alt}
              width={348}
              height={430}
              sizes="(max-width: 1024px) calc(100vw - 32px), 348px"
              unoptimized
            />
            <div className={styles.portraitShade} />
          </div>
          <div className={styles.quoteAttribution}>
            <p>{leadership.name}</p>
            <span>{leadership.role} of {leadership.company}</span>
          </div>
        </div>
      </Reveal>

      <CTASection />
    </PageShell>
  );
}
