# iPlex website

The iPlex marketing site and ad funnel, built from the approved designs with Next.js 16 (App Router), React 19,
TypeScript and Tailwind CSS 4. Every page is prerendered to static HTML; JavaScript is only shipped for the
interactive parts (navigation, FAQs, the homepage hero and lifecycle tabs, forms and the scorecard).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script                        | What it does                                |
| ----------------------------- | ------------------------------------------- |
| `npm run dev`                 | Development server                          |
| `npm run build` / `npm start` | Production build and server                 |
| `npm run lint`                | ESLint (Next.js rules)                      |
| `npm run typecheck`           | Generates route types, then runs TypeScript |
| `npm run format`              | Prettier                                    |

## Environment variables

| Name                            | Required             | Purpose                                                                    |
| ------------------------------- | -------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Yes (outside Vercel) | Canonical URLs, Open Graph, sitemap, structured data                       |
| `LEAD_WEBHOOK_URL`              | Yes in production    | Every form posts its JSON here (GoHighLevel inbound webhook, Zapier, Make) |
| `NEXT_PUBLIC_BOOKING_EMBED_URL` | Recommended          | Embeds your GoHighLevel / Calendly / Cal.com calendar on `/book`           |
| `NEXT_PUBLIC_GA_ID`             | No                   | Google Analytics 4                                                         |
| `NEXT_PUBLIC_META_PIXEL_ID`     | No                   | Meta Pixel                                                                 |

Form payload: `{ "form": "contact" | "partner" | "scorecard" | "agency", "fields": { ... }, "page": "/contact", "submittedAt": "ISO date" }`.
Scorecard submissions include a 0–100 score for each lifecycle stage.

## Pages

| Route                                                                       | Page                   | Indexed                               |
| --------------------------------------------------------------------------- | ---------------------- | ------------------------------------- |
| `/`                                                                         | Homepage               | Yes                                   |
| `/ai-audit`, `/ai-implementation`, `/ai-training`                           | Services               | Yes                                   |
| `/for-agencies`, `/for-b2b`                                                 | Who we help            | Yes                                   |
| `/partners`, `/results`, `/pricing`, `/about`, `/trust`, `/faq`, `/contact` | Company and trust      | Yes                                   |
| `/scorecard`                                                                | AI Readiness Scorecard | Yes                                   |
| `/agencies`, `/book`, `/thank-you`, `/scorecard/results`                    | Ad funnel              | No (noindex, kept out of the sitemap) |

## Project structure

```
app/
  (site)/        main website: full header and footer
  (funnel)/      ad funnel pages: logo-only header, slim footer
  layout.tsx     fonts, default metadata, analytics
  not-found.tsx  404 page
  globals.css    design tokens (exact brand hex values) and shared component classes
  sitemap.ts, robots.ts, icon.svg, apple-icon.png
components/      header, footer, FAQ accordion, CTA band, forms, homepage and scorecard widgets
lib/
  site.ts        page titles, descriptions, navigation (single source of truth)
  seo.ts         per-page metadata and structured data (Organization, Service, FAQPage, breadcrumbs)
  leads.ts       server action that forwards form submissions to LEAD_WEBHOOK_URL
  track.ts       conversion events for GA4 and Meta Pixel
public/          og.png (social share image), icon.png
```

### Styling notes

- Tailwind is loaded **without Preflight** on purpose. The designs were built on browser defaults, and skipping the
  reset keeps the pages pixel-identical to them. Exact pixel values from the designs are kept as arbitrary values
  (for example `text-[15.5px]`).
- Brand colours are defined once in `app/globals.css` (`@theme`) with their exact hex values, for example
  `text-muted`, `bg-mint`, `bg-emerald-600`.
- Shared pieces of the design system (`pill`, `glass`, `eyebrow`, `h1`, `h2`, `lead`, `wrap`, `sec`, the mobile
  sliders `m-slide`, and so on) are component classes in `globals.css`.
- On phones, long rows of cards become swipeable sliders (`m-slide`) with a scroll-driven progress bar.

## SEO

- Unique title and description per page (`lib/site.ts`), self-referencing canonical, Open Graph and Twitter cards.
- One H1 per page; FAQ answers are in the HTML even when collapsed.
- Structured data: Organization and WebSite on the homepage, Service on the three service pages, FAQPage wherever a
  FAQ appears, and a breadcrumb trail on inner pages.
- `sitemap.xml` lists indexed pages only; funnel pages are `noindex, follow`.
- Self-hosted Plus Jakarta Sans (variable, latin subset) preloaded with a size-adjusted fallback: no layout shift and no
  third-party font request.

## Before launch

- Set the environment variables above, including your calendar URL for `/book`.
- Replace the bracketed placeholders (phone, email, team bios, `[X]` guarantee hours, results, and the dates and
  details in the legal pages). The site deliberately doesn't state a company registration or location.
- Have a lawyer review the Privacy Policy, Terms of Service and Cookie notice (`app/(site)/privacy`, `terms`,
  `cookies`). They are templates written around how this site actually handles data.
- Add the real photos, videos and sample audit where the designs show placeholders.
- Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Phones

Most visitors arrive on a phone, so there is a dedicated phone layer (640px and below) in `app/globals.css`:
sticky compact header, left-aligned section intros, tighter spacing, full-width buttons, swipeable card rows,
scaled illustrations, a fold-out footer and 2×2 scorecard answers. Desktop and tablet are unaffected.
