import type { Metadata } from "next";
import Image from "next/image";

import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ASSETS } from "@/lib/content";

import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About iPlex | The Minds Behind the Automation",
  description:
    "Meet the team and operating principles behind iPlex's software engineering and AI automation systems.",
};

const values = [
  {
    icon: "clarity",
    title: <>Clarity Over<br />{" "}Complexity</>,
    description: <>We simplify complex workflows into<br />{" "}clear, structured systems.</>,
  },
  {
    icon: "human",
    title: <>Human-Centered<br />{" "}Automation</>,
    description: <>Automation should support how<br />{" "}teams actually work.</>,
  },
  {
    icon: "execution",
    title: <>Thoughtful<br />{" "}Execution</>,
    description: <>Every system is carefully designed<br />{" "}for reliability and efficiency.</>,
  },
  {
    icon: "growth",
    title: <>Long-Term<br />{" "}Development</>,
    description: <>We create automation that grows<br />{" "}with the business.</>,
  },
] as const;

const achievements = [
  { value: "14", suffix: "+", label: "Workflows Automated" },
  { value: "60", suffix: "%", label: "Time Saved" },
  { value: "04", suffix: "x", label: "Process Efficiency" },
  { value: "90", suffix: "%", label: "less Human Error" },
] as const;

function ValueIcon({ name }: { name: (typeof values)[number]["icon"] }) {
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
  return (
    <main className={`site-page ${styles.page}`}>
      <Header />

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src={ASSETS.aboutHero}
          alt="A technology studio set inside a forest"
          fill
          priority
          sizes="100vw"
          unoptimized
        />
        <div className={styles.heroShade} />
        <div className={`site-container ${styles.heroContent}`}>
          <p className="eyebrow">AI-NATIVE ENTERPRISE TRANSFORMATION</p>
          <h1>The Minds Behind the<br />{" "}Automation</h1>
        </div>
      </section>

      <section className={`${styles.featureSection} ${styles.approach}`}>
        <div className={`site-container ${styles.featureGrid}`}>
          <div className={styles.featureCopy}>
            <p className="micro-label">OUR APPROACH</p>
            <h2>Designing an Automation<br />{" "}System to Simplify<br />{" "}Campaign Management.</h2>
            <div className={styles.approachText}>
              <p>We designed an automation system that connected the agency&apos;s tools and streamlined key processes.</p>
              <p>Our focus was to:</p>
            </div>
            <ul className={styles.featureList}>
              <li>AI Workflow Automation</li>
              <li>Content Operations System</li>
              <li>Campaign Data Tracking</li>
            </ul>
          </div>
          <div className={styles.featureImageFrame}>
            <Image
              className={styles.featureImageTall}
              src={ASSETS.aboutApproach}
              alt="A team designing an automation system"
              width={588}
              height={769}
              sizes="(max-width: 720px) calc(100vw - 32px), 588px"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className={`${styles.featureSection} ${styles.results}`}>
        <div className={`site-container ${styles.featureGrid}`}>
          <div className={styles.featureImageFrame}>
            <Image
              className={styles.featureImageTall}
              src={ASSETS.aboutResults}
              alt="A team member working on a laptop"
              width={588}
              height={769}
              sizes="(max-width: 720px) calc(100vw - 32px), 588px"
              unoptimized
            />
          </div>
          <div className={styles.featureCopy}>
            <p className="micro-label">THE RESULTS</p>
            <h2>Faster Campaign Execution<br />{" "}and More Efficient Team<br />{" "}Operations</h2>
            <p className={styles.resultsText}>With automation in place, Shinta transformed how their campaigns were managed.<br />{" "}Tasks that previously required constant manual updates became automated<br />{" "}workflows.</p>
            <div className={styles.featureStats}>
              <div><strong>20+</strong><span>saved weekly on operational</span></div>
              <div><strong>3x</strong><span>faster campaign coordination</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
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

      <section className={styles.achievementsSection}>
        <div className={`site-container ${styles.achievementsGrid}`}>
          <div className={styles.achievementsList}>
            {achievements.map((item) => (
              <div className={styles.achievement} key={item.label}>
                <strong>{item.value}</strong>
                <div><b>{item.suffix}</b><span>{item.label}</span></div>
              </div>
            ))}
          </div>
          <div className={styles.achievementImageFrame}>
            <Image
              className={styles.achievementImage}
              src={ASSETS.aboutAchievements}
              alt="A bright modern office"
              width={831}
              height={820}
              sizes="(max-width: 720px) calc(100vw - 32px), 830px"
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className={styles.quoteInner}>
          <div className={styles.quoteCopy}>
            <span className={styles.quoteMark} aria-hidden="true">“</span>
            <blockquote>Our goal is simple: build<br />{" "}thoughtful systems that<br />{" "}help businesses run<br />{" "}more clearly and scale<br />{" "}with confidence.</blockquote>
            <div className={styles.quoteAttribution}>
              <p>Bagus William</p>
              <span>CEO &amp; Co-Founder of sanjaya</span>
            </div>
          </div>
          <div className={styles.portraitFrame}>
            <Image
              className={styles.portrait}
              src={ASSETS.aboutPortrait}
              alt="iPlex co-founder"
              width={348}
              height={430}
              sizes="(max-width: 720px) calc(100vw - 32px), 348px"
              unoptimized
            />
            <div className={styles.portraitShade} />
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
