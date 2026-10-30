/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { resolveCaseStudy, type CaseStudy } from "@/lib/content";

import { ArrowIcon } from "./ArrowIcon";

export type WorkCardProps = {
  project: CaseStudy;
  index?: number;
};

export function WorkCard({ project, index = 0 }: WorkCardProps) {
  const study = resolveCaseStudy(project);
  const href = `/work/${study.slug}`;

  return (
    <article
      className={`work-card${study.cardImageLayout === "desktop-screen" ? " work-card--desktop-screen" : ""}`}
      data-index={index + 1}
    >
      <div className="work-card-media">
        <img
          className={`work-card-image${study.cardImageLayout === "desktop-screen" ? " project-screenshot" : ""}`}
          src={study.cardImage}
          alt=""
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          style={study.cardImagePosition ? { objectPosition: study.cardImagePosition } : undefined}
        />
      </div>

      <div className="work-card-content">
        <div className="work-card-meta">
          <span className="work-card-meta-item">{study.year}</span>
          <span className="work-card-meta-item">{study.category}</span>
        </div>

        <h3 className="work-card-title">{study.title}</h3>

        {study.client.logo ? <img className="work-card-logo" src={study.client.logo} alt="" aria-hidden="true" /> : null}

        <div className="work-card-copy">
          <p className="work-card-description">{study.summary}</p>
          <Link className="work-card-button" href={href} aria-label={`View case study: ${study.title}`}>
            <span>View Case Study</span>
            <ArrowIcon className="work-card-button-arrow" />
          </Link>
        </div>

        <div className="work-card-metrics">
          {study.results.stats.map((stat, statIndex) => (
            <div className="work-card-metric" key={`${stat.label}-${statIndex}`}>
              <strong className="work-card-metric-value">{stat.value}</strong>
              <span className="work-card-metric-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
