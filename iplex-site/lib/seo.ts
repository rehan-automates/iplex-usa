import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pages, site, type RouteKey } from "@/lib/site";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "iPlex: AI systems for agencies and B2B teams" };

/** Per-page metadata: unique title and description, self-canonical, Open Graph and robots rules. */
export function pageMetadata(route: RouteKey): Metadata {
  const page = pages[route];
  const title = route === "/" ? { absolute: `${page.title} | ${site.name}` } : page.title;
  const ogTitle = `${page.title} | ${site.name}`;
  return {
    title,
    description: page.description,
    alternates: { canonical: route },
    openGraph: {
      type: "website",
      url: route,
      siteName: site.name,
      locale: site.locale,
      title: ogTitle,
      description: page.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.description,
      images: [OG_IMAGE.url],
    },
    robots: page.noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export type FaqEntry = { question: string; answer: ReactNode; answerText?: string };

type Thing = Record<string, unknown>;

const orgId = `${site.url}/#organization`;

function organization(): Thing {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.png`,
    description: site.description,
    slogan: site.tagline,
  };
}

const SERVICES: Partial<Record<RouteKey, { name: string; serviceType: string; price: string; unit?: string }>> = {
  "/ai-audit": { name: "AI Opportunity Audit", serviceType: "AI consulting", price: "2500" },
  "/ai-implementation": {
    name: "AI Implementation Sprint",
    serviceType: "AI implementation",
    price: "7500",
    unit: "per sprint",
  },
  "/ai-training": { name: "AI Team Training", serviceType: "AI training", price: "2500" },
};

/**
 * Structured data for a page: Organization + WebSite on the homepage, a breadcrumb
 * trail on inner pages, Service on the three service pages and FAQPage wherever a FAQ is shown.
 */
export function pageSchema(route: RouteKey, opts: { faqs?: FaqEntry[] } = {}): Thing {
  const page = pages[route];
  const url = `${site.url}${route === "/" ? "" : route}`;
  const graph: Thing[] = [];

  if (route === "/") {
    graph.push(organization(), {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": orgId },
    });
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: pages["/"].label, item: site.url },
        { "@type": "ListItem", position: 2, name: page.label, item: url },
      ],
    });
  }

  const service = SERVICES[route];
  if (service) {
    graph.push({
      "@type": "Service",
      name: service.name,
      serviceType: service.serviceType,
      description: page.description,
      url,
      provider: { "@type": "Organization", "@id": orgId, name: site.name, url: site.url },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: service.price,
        description: `Starting price${service.unit ? `, ${service.unit}` : ""}`,
      },
    });
  }

  if (opts.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: opts.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answerText ?? (typeof f.answer === "string" ? f.answer : ""),
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
