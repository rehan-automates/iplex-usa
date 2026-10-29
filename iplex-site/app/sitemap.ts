import type { MetadataRoute } from "next";
import { pages, site, type RouteKey } from "@/lib/site";

/** Indexed pages only; hidden funnel pages (noindex) are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(pages) as RouteKey[])
    .filter((route) => !pages[route].noindex)
    .map((route) => ({
      url: `${site.url}${route === "/" ? "" : route}`,
      changeFrequency: "monthly",
      priority: pages[route].priority ?? 0.5,
    }));
}
