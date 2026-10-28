/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { ArrowIcon } from "./ArrowIcon";

export type WorkMetric = {
  value?: string;
  label?: string;
  number?: string;
  caption?: string;
};

export type WorkProject = {
  year?: string;
  category?: string;
  tags?: readonly string[] | string;
  disciplines?: readonly string[] | string;
  meta?: readonly string[] | string;
  title: string;
  description?: string;
  image?: string;
  imageSrc?: string;
  imageAlt?: string;
  alt?: string;
  logo?: string;
  href?: string;
  link?: string;
  ctaLabel?: string;
  metrics?: readonly WorkMetric[];
  stats?: readonly WorkMetric[];
};

export type WorkCardProps = {
  project: WorkProject;
  index?: number;
};

function toList(value?: readonly string[] | string) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function WorkCard({ project, index = 0 }: WorkCardProps) {
  const image = project.image ?? project.imageSrc;
  const imageAlt = project.imageAlt ?? project.alt ?? project.title;
  const href = project.href ?? project.link ?? "/work/clinuvel";
  const metrics = project.metrics ?? project.stats ?? [];
  const metadata = project.meta
    ? toList(project.meta)
    : [project.year, project.category, ...toList(project.tags ?? project.disciplines)].filter(
        (item): item is string => Boolean(item),
      );

  return (
    <article className="work-card" data-index={index + 1}>
      <div className="work-card-media">
        {image ? <img className="work-card-image" src={image} alt={imageAlt} /> : null}
      </div>

      <div className="work-card-content">
        {metadata.length ? (
          <div className="work-card-meta" aria-label={metadata.join(", ")}>
            {metadata.map((item, metaIndex) => (
              <span className="work-card-meta-item" key={`${item}-${metaIndex}`}>
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {project.logo ? (
          <img className="work-card-logo" src={project.logo} alt="" aria-hidden="true" />
        ) : null}

        <div className="work-card-copy">
          <h3 className="work-card-title">{project.title}</h3>
          {project.description ? (
            <p className="work-card-description">{project.description}</p>
          ) : null}
          <Link className="work-card-button" href={href}>
            <span>{project.ctaLabel ?? "View Case Study"}</span>
            <ArrowIcon className="work-card-button-arrow" />
          </Link>
        </div>

        {metrics.length ? (
          <div className="work-card-metrics">
            {metrics.map((metric, metricIndex) => (
              <div className="work-card-metric" key={`${metric.label ?? metric.caption}-${metricIndex}`}>
                <strong className="work-card-metric-value">
                  {metric.value ?? metric.number}
                </strong>
                <span className="work-card-metric-label">
                  {metric.label ?? metric.caption}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
