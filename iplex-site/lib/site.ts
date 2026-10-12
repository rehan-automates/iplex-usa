/**
 * Single source of truth for site-wide settings, navigation and page SEO.
 * Sitemap, metadata, structured data and navigation all read from here.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "iPlex",
  url: resolveSiteUrl(),
  tagline: "Same team. More done.",
  description: "We find where AI fits in your business, build it, and train your team to run it.",
  locale: "en_US",
} as const;

export type RouteKey =
  | "/"
  | "/ai-audit"
  | "/ai-implementation"
  | "/ai-training"
  | "/for-agencies"
  | "/for-b2b"
  | "/partners"
  | "/results"
  | "/pricing"
  | "/about"
  | "/trust"
  | "/faq"
  | "/contact"
  | "/agencies"
  | "/scorecard"
  | "/scorecard/results"
  | "/book"
  | "/thank-you"
  | "/privacy"
  | "/terms"
  | "/cookies";

export type PageSeo = {
  /** Shown in the browser tab and search results (the " | iPlex" suffix is added automatically). */
  title: string;
  description: string;
  /** Short name used in breadcrumbs. */
  label: string;
  /** Hidden funnel pages are excluded from search engines and the sitemap. */
  noindex?: boolean;
  /** Relative importance for the sitemap. */
  priority?: number;
};

export const pages: Record<RouteKey, PageSeo> = {
  "/": {
    title: "AI Systems for Marketing Agencies and B2B Teams",
    label: "Home",
    description:
      "We build AI systems that help you find, win, onboard, serve, and keep clients, then train your team to run them. Same team. More done.",
    priority: 1,
  },
  "/ai-audit": {
    title: "AI Opportunity Audit for Agencies and B2B Teams",
    label: "AI Opportunity Audit",
    description:
      "In two to three weeks, we map your client lifecycle and rank every task AI can take on, by hours saved. Fixed price, credited toward implementation.",
    priority: 0.9,
  },
  "/ai-implementation": {
    title: "AI Implementation Sprints",
    label: "AI Implementation",
    description:
      "We build two to four AI systems at a time around your content and tools, test them with your team, and hand them over working. Fixed price and timeline.",
    priority: 0.8,
  },
  "/ai-training": {
    title: "AI Training for Agency and B2B Teams",
    label: "AI Training",
    description:
      "Role-based AI training, playbooks, and a usage policy, so your whole team uses AI well every day. Leadership sessions from $2,500.",
    priority: 0.8,
  },
  "/for-agencies": {
    title: "AI Systems for Marketing Agencies",
    label: "For Marketing Agencies",
    description:
      "AI systems for SEO, content, paid media, social, and creative agencies. Take on more clients without adding headcount.",
    priority: 0.8,
  },
  "/for-b2b": {
    title: "AI Systems for B2B Service Companies",
    label: "For B2B Companies",
    description:
      "AI systems for B2B service companies and professional services firms: faster proposals, smoother onboarding, clearer reporting. Same team. More done.",
    priority: 0.8,
  },
  "/partners": {
    title: "Agency Partner Program: Offer AI Services to Your Clients",
    label: "Agency Partners",
    description:
      "Offer AI audits, implementation, and training to your clients under your brand. We deliver the work; you keep the client and the margin.",
    priority: 0.7,
  },
  "/results": {
    title: "Results and Case Studies",
    label: "Results",
    description:
      "See a sample AI Opportunity Map, walkthroughs of the AI systems we build, and results from our clients, shared with permission.",
    priority: 0.7,
  },
  "/pricing": {
    title: "Pricing",
    label: "Pricing",
    description:
      "Fixed prices for AI audits, implementation sprints, team training, and ongoing support. Audit fees are credited toward implementation.",
    priority: 0.8,
  },
  "/about": {
    title: "About",
    label: "About",
    description:
      "We help agencies and B2B teams do more with AI, without replacing people. Meet the team behind iPlex.",
    priority: 0.6,
  },
  "/trust": {
    title: "Trust and Security",
    label: "Trust & Security",
    description:
      "How iPlex protects your data: business-grade AI tools, a signed data processing agreement, and access only where it's needed.",
    priority: 0.6,
  },
  "/faq": {
    title: "Frequently Asked Questions",
    label: "FAQ",
    description: "Answers about AI and your team, our audit, implementation, training, data security, and pricing.",
    priority: 0.6,
  },
  "/contact": {
    title: "Contact",
    label: "Contact",
    description: "Questions about a partnership, an existing project, press, or careers? Get in touch with iPlex.",
    priority: 0.5,
  },
  "/scorecard": {
    title: "AI Readiness Scorecard: Free Five-Minute Assessment",
    label: "AI Readiness Scorecard",
    description:
      "Answer 18 quick questions and get a score for each stage of your client lifecycle, plus your three biggest AI opportunities. Free, with instant results.",
    priority: 0.9,
  },
  "/scorecard/results": {
    title: "Your AI Readiness Results",
    label: "Scorecard results",
    description: "Your AI Readiness Scorecard results, by lifecycle stage.",
    noindex: true,
  },
  "/agencies": {
    title: "Take On More Clients Without Adding Headcount",
    label: "For agencies",
    description:
      "AI systems for marketing agencies. Book a free 30-minute Opportunity Call and see where your team's hours go.",
    noindex: true,
  },
  "/book": {
    title: "Book Your Free Opportunity Call",
    label: "Book a call",
    description: "Pick a time for a free 30-minute Opportunity Call with iPlex.",
    noindex: true,
  },
  "/privacy": {
    title: "Privacy Policy",
    label: "Privacy Policy",
    description:
      "What information iPlex collects through this website and its forms, how we use it, and the choices you have.",
    priority: 0.3,
  },
  "/terms": {
    title: "Terms of Service",
    label: "Terms of Service",
    description: "The terms for using the iPlex website and its free resources.",
    priority: 0.3,
  },
  "/cookies": {
    title: "Cookie Notice",
    label: "Cookie notice",
    description: "Which cookies the iPlex website uses, why, and how to change your choice.",
    priority: 0.3,
  },
  "/thank-you": {
    title: "You're Booked",
    label: "Thank you",
    description: "Your Opportunity Call is booked. Here's what happens next.",
    noindex: true,
  },
};

export type NavLink = { label: string; href: RouteKey; hint?: string };

export const mainNav: Array<NavLink & { children?: NavLink[] }> = [
  {
    label: "Services",
    href: "/ai-audit",
    children: [
      { label: "AI Opportunity Audit", href: "/ai-audit", hint: "Find it" },
      { label: "AI Implementation", href: "/ai-implementation", hint: "Build it" },
      { label: "AI Training", href: "/ai-training", hint: "Make it stick" },
    ],
  },
  {
    label: "Who We Help",
    href: "/for-agencies",
    children: [
      { label: "For Marketing Agencies", href: "/for-agencies", hint: "SEO, content, paid media, social, creative" },
      { label: "For B2B Companies", href: "/for-b2b", hint: "Service firms and professional services" },
    ],
  },
  { label: "Agency Partners", href: "/partners" },
  { label: "Results", href: "/results" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Services",
    links: [
      { label: "AI Opportunity Audit", href: "/ai-audit" },
      { label: "AI Implementation", href: "/ai-implementation" },
      { label: "AI Training", href: "/ai-training" },
    ],
  },
  {
    title: "Who We Help",
    links: [
      { label: "For Marketing Agencies", href: "/for-agencies" },
      { label: "For B2B Companies", href: "/for-b2b" },
      { label: "Agency Partners", href: "/partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Results", href: "/results" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Trust & Security", href: "/trust" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie notice", href: "/cookies" },
    ],
  },
];

/** Pages whose header nav item should appear active. */
export const navSection: Partial<Record<RouteKey, string>> = {
  "/ai-audit": "Services",
  "/ai-implementation": "Services",
  "/ai-training": "Services",
  "/for-agencies": "Who We Help",
  "/for-b2b": "Who We Help",
  "/partners": "Agency Partners",
  "/results": "Results",
  "/pricing": "Pricing",
  "/about": "About",
};
