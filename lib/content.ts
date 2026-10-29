/**
 * Site content — the single place to write copy.
 *
 * Every page, card, page title and SEO description reads from here, so a card and
 * the page it opens can never disagree. Each field below has a comment saying what
 * it is, how long it should be, and the image size it is designed for.
 *
 *  - New case study  → add one object to `workProjects`  (renders /work/<slug>)
 *  - New blog post   → add one object to `blogPosts`     (renders /blog/<slug>)
 *  - Not finished?   → set `draft: true`; it stays hidden in production and shows
 *                      with [placeholders] in `npm run dev` (see lib/draft.ts).
 *  - Finished        → remove `draft`; TypeScript then lists any missing field.
 *
 * Image paths come from `ASSETS` (lib/assets.ts). Put new files in public/assets/.
 */
import { ASSETS } from "./assets";
import { fill, ph, SHOW_DRAFTS, visible, type Draftable } from "./draft";

export { ASSETS };
export { SHOW_DRAFTS, visible };

/* ------------------------------------------------------------------ shared */

/** An image plus its description for screen readers. Use alt="" only for pure decoration. */
export type Img = {
  src: string;
  alt: string;
};

/** A headline number with what it measures, e.g. { value: "22+", label: "hours saved weekly" }. */
export type Stat = {
  value: string;
  label: string;
};

/** A company-wide number. `note` is for you: where the figure comes from, so it can be verified. */
export type Metric = Stat & {
  note?: string;
};

/** "2026-03-06" → "March 6, 2026" (or "Mar 6, 2026" with month: "short"). */
export function formatDate(iso: string, month: "long" | "short" = "long"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", { month, day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

/* ------------------------------------------------------------ case studies */

type CaseStudyBody = {
  /** Year delivered, e.g. "2026". Shown on the card and in the project info. */
  year: string;
  /** Client's industry, e.g. "E-commerce". Shown in the project info on the page. */
  industry: string;
  /** Short work type shown on the card, e.g. "SaaS · Product Development". */
  category: string;
  /** 1–2 sentences (about 150–220 characters). Used under the page title, on the card and as the SEO description. */
  summary: string;
  /** The client. `logo` is a wordmark on a transparent background, about 248×64 px (displayed at 124×32). */
  client: { name: string; logo: string };
  /** What you delivered, 2–4 short items, e.g. "AI Workflow Automation". */
  services: readonly string[];
  /** Card image on Home and /work. Displayed about 588×720 px (portrait) — supply 1176×1440. */
  cardImage: string;
  /** Optional CSS object-position used to keep the important part visible in the portrait crop. */
  cardImagePosition?: string;
  /** Optional wider image column for cropped desktop product screens. */
  cardImageLayout?: "desktop-screen";
  /** Page hero. `image` is the foreground artwork, `backdrop` the full-bleed layer behind it. Displayed about 620×600 px — supply 1240×1200. */
  hero: { image: string; backdrop: string; alt: string };
  /** The client's problem, in their own words if you have a quote. 200–300 characters reads best. */
  challenge: { quote: string; attribution?: string };
  /** What you built. Heading ≤ 70 characters; 1–3 paragraphs. Image displayed 620×620 px — supply 1240×1240. */
  approach: { heading: string; paragraphs: readonly string[]; image: Img };
  /** The outcome. Exactly two stats (they also appear on the card). Image displayed 620×620 px — supply 1240×1240. */
  results: {
    heading: string;
    text: string;
    stats: readonly [Stat, Stat];
    image: { artwork: string; backdrop: string; alt: string };
  };
};

/** `slug` is the URL (/work/<slug>) and must be unique; `title` is the page H1 and the card title. */
export type CaseStudy = Draftable<{ slug: string; title: string }, CaseStudyBody>;
export type ResolvedCaseStudy = { slug: string; title: string; draft?: boolean } & CaseStudyBody;

const CASE_STUDY_PLACEHOLDER: CaseStudyBody = {
  year: ph("Year"),
  industry: ph("Industry"),
  category: ph("Category"),
  summary: ph("Summary — 1–2 sentences"),
  client: { name: ph("Client name"), logo: ASSETS.placeholder },
  services: [ph("Service")],
  cardImage: ASSETS.placeholder,
  hero: { image: ASSETS.placeholder, backdrop: ASSETS.placeholder, alt: ph("Hero image description") },
  challenge: { quote: ph("Challenge — the client’s problem") },
  approach: {
    heading: ph("Approach heading"),
    paragraphs: [ph("Approach paragraph")],
    image: { src: ASSETS.placeholder, alt: ph("Image description") },
  },
  results: {
    heading: ph("Results heading"),
    text: ph("Results summary"),
    stats: [
      { value: ph("Stat"), label: ph("What it measures") },
      { value: ph("Stat"), label: ph("What it measures") },
    ],
    image: { artwork: ASSETS.placeholder, backdrop: ASSETS.placeholder, alt: ph("Image description") },
  },
};

/** Complete shape for rendering: drafts get [placeholders] for anything not written yet. */
export function resolveCaseStudy(entry: CaseStudy): ResolvedCaseStudy {
  if (!entry.draft) return entry;
  return { ...fill(CASE_STUDY_PLACEHOLDER, entry), slug: entry.slug, title: entry.title, draft: true };
}

export const workProjects: readonly CaseStudy[] = [
  {
    slug: "clinuvel",
    title: "Scaling Clinuvel Digital Product Store with Automation",
    year: "2026",
    industry: "E-commerce",
    category: "SaaS · Product Development",
    summary:
      "Helping Batavia automate product delivery and customer workflows so their digital store can handle more sales with less manual work.",
    client: { name: "Clinuvel", logo: ASSETS.clinuvelWordmark },
    services: ["Campaign Data Tracking", "Content Operations System", "AI Workflow Automation"],
    cardImage: ASSETS.workSaas,
    hero: {
      image: ASSETS.caseStudyHero,
      backdrop: ASSETS.caseStudyHeroBackdrop,
      alt: "Clinuvel pioneering photomedicine and photocosmetics campaign",
    },
    challenge: {
      quote:
        "As our digital product sales started growing, we spent a lot of time manually sending files, answering common questions, and managing customer access. It became difficult to keep up as more customers purchased our products.",
    },
    approach: {
      heading: "Designing an Automated System for Digital Product Delivery",
      paragraphs: [
        "We built a system that connects Batavia’s checkout system, file delivery, and customer email workflows.",
        "When a customer purchases a product, the system automatically sends secure download access, onboarding instructions, and follow up emails. The team can also track product sales and customer activity from one central dashboard.",
      ],
      image: { src: ASSETS.caseStudyApproach, alt: "Iridescent product form" },
    },
    results: {
      heading: "Faster Product Delivery and More Scalable Sales Operations",
      text: "With automation in place, Batavia can sell more digital products without increasing manual work.",
      stats: [
        { value: "22+", label: "hours saved weekly" },
        { value: "2.4x", label: "more repeat purchases" },
      ],
      image: {
        artwork: ASSETS.caseStudyResults,
        backdrop: ASSETS.caseStudyResultsBackdrop,
        alt: "Portrait representing the project results",
      },
    },
  },
  {
    slug: "native-ai-copilot",
    title: "Embedding a Native AI Co-Pilot Into a B2B Product — Without Slowing the Roadmap",
    year: "2026",
    category: "AI Development · Product Engineering",
    summary:
      "A Series A startup needed to ship AI features fast — their competitors already had them. Our team designed, built, and shipped a native LLM-powered co-pilot in 6 weeks, integrated cleanly into their existing codebase with zero regressions.",
    cardImage: ASSETS.workAiProduct,
    cardImageLayout: "desktop-screen",
    industry: "B2B Software",
    client: { name: "B2B Software", logo: "" },
    services: ["AI Co-Pilot Development", "Product Engineering", "LLM Integration"],
    hero: {
      image: ASSETS.workAiProduct,
      backdrop: ASSETS.workAiProductBackdrop,
      alt: "AI-powered product interface with a live conversation and lead insights",
    },
    challenge: {
      quote: "A Series A startup needed to ship AI features fast while keeping its existing product roadmap moving.",
    },
    approach: {
      heading: "Building AI Into the Existing Product",
      paragraphs: [
        "Our team designed, built, and shipped a native LLM-powered co-pilot within the existing codebase.",
        "The integration supported the product roadmap while bringing AI capabilities directly into the user experience.",
      ],
      image: { src: ASSETS.workAiProduct, alt: "Native AI product experience" },
    },
    results: {
      heading: "From Concept to Shipped Feature in Six Weeks",
      text: "The co-pilot shipped in six weeks with zero regressions, alongside a 48% increase in user activation.",
      stats: [
        { value: "6 wks", label: "Concept to shipped feature" },
        { value: "48%", label: "Increase in user activation" },
      ],
      image: {
        artwork: ASSETS.workAiProduct,
        backdrop: ASSETS.workAiProductBackdrop,
        alt: "Shipped AI co-pilot interface",
      },
    },
  },
  {
    slug: "engineering-team-scale",
    title: "Scaling an Engineering Team from 4 to 30 Without Losing Velocity or Culture",
    year: "2026",
    category: "Staff Augmentation · Engineering Scale",
    summary:
      "A post-Series B startup was growing fast but couldn’t hire quickly enough. We provided 26 pre-vetted senior engineers who embedded directly into their squads — same Slack, same standups, same sprint cadence. They shipped 3 major product lines that quarter.",
    cardImage: ASSETS.workStaffAugmentation,
    industry: "Software & Technology",
    client: { name: "Software & Technology", logo: "" },
    services: ["Staff Augmentation", "Engineering Team Integration", "Product Delivery"],
    hero: {
      image: ASSETS.workStaffAugmentation,
      backdrop: ASSETS.ctaBackdrop,
      alt: "Mobile product interface supported by an embedded engineering team",
    },
    challenge: {
      quote: "A post-Series B startup was growing fast but could not hire quickly enough to support its product delivery needs.",
    },
    approach: {
      heading: "Embedding Engineers Into the Existing Team",
      paragraphs: [
        "We provided 26 pre-vetted senior engineers who embedded directly into the startup's squads.",
        "The engineers joined the same Slack channels, standups, and sprint cadence as the internal team, supporting delivery within its existing ways of working.",
      ],
      image: { src: ASSETS.workStaffAugmentation, alt: "Product experience delivered by the expanded engineering team" },
    },
    results: {
      heading: "More Engineering Capacity, Faster Product Delivery",
      text: "The team grew from four to 30 engineers and shipped three major product lines that quarter, with three times the feature output.",
      stats: [
        { value: "26", label: "Engineers embedded in 3 weeks" },
        { value: "3×", label: "Feature output that quarter" },
      ],
      image: {
        artwork: ASSETS.workStaffAugmentation,
        backdrop: ASSETS.ctaBackdrop,
        alt: "Mobile product delivered with embedded engineering support",
      },
    },
  },
];

/** Published case study for a URL slug (drafts are visible in dev only). */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return visible(workProjects).find((project) => project.slug === slug);
}

/** Other published case studies for the "More Projects" row. */
export function relatedCaseStudies(slug: string, max = 3): CaseStudy[] {
  return visible(workProjects).filter((project) => project.slug !== slug).slice(0, max);
}

/* -------------------------------------------------------------- blog posts */

/**
 * One block of an article body, rendered in order.
 *  - h2 / h3   section headings
 *  - p         paragraph; wrap words in **double asterisks** to bold them
 *  - list      bullets, with an optional lead-in line such as "Key areas include:"
 *  - image     inline picture, about 1000 px wide
 *  - quote     pull quote with optional attribution
 */
export type BlogBlock =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "list"; lead?: string; items: readonly string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; by?: string };

type BlogPostBody = {
  /** One word, e.g. "Announcement" or "Tips". */
  category: string;
  /** Publish date as YYYY-MM-DD. Formatted for you everywhere it appears. */
  date: string;
  /** 1–2 sentences (about 120–160 characters). Used as the SEO description. */
  excerpt: string;
  /** Card image on Home, /blog and "Insights". Displayed about 397×223 px — supply 794×446. */
  cardImage: string;
  /** Hero at the top of the article. Displayed 1000×605 px — supply 2000×1210. */
  hero: Img;
  /** The article, in order. See BlogBlock. */
  body: readonly BlogBlock[];
};

/** `slug` is the URL (/blog/<slug>) and must be unique; `title` is the article H1 and the card title. */
export type BlogPost = Draftable<{ slug: string; title: string }, BlogPostBody>;
export type ResolvedBlogPost = { slug: string; title: string; draft?: boolean } & BlogPostBody;

const BLOG_POST_PLACEHOLDER: BlogPostBody = {
  category: ph("Category"),
  date: ph("Date"),
  excerpt: ph("Excerpt — 1–2 sentences"),
  cardImage: ASSETS.placeholder,
  hero: { src: ASSETS.placeholder, alt: ph("Hero image description") },
  body: [
    { type: "h2", text: ph("Section heading") },
    { type: "p", text: ph("Write the article here") },
  ],
};

/** Complete shape for rendering: drafts get [placeholders] for anything not written yet. */
export function resolveBlogPost(entry: BlogPost): ResolvedBlogPost {
  if (!entry.draft) return entry;
  const { body, ...rest } = entry;
  return {
    ...fill(BLOG_POST_PLACEHOLDER, rest),
    body: body?.length ? (body as readonly BlogBlock[]) : BLOG_POST_PLACEHOLDER.body,
    slug: entry.slug,
    title: entry.title,
    draft: true,
  };
}

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "building-smarter-ai-tools",
    title: "Building Smarter AI Tools for the Future of Scalable Businesses",
    category: "Announcement",
    date: "2026-03-06",
    excerpt:
      "How practical AI tools, scalable workflows, and thoughtful automation can help growing businesses work better.",
    cardImage: ASSETS.blogRobot,
    hero: { src: ASSETS.articleHero, alt: "A luminous moon surrounded by golden smoke" },
    body: [
      { type: "h2", text: "Introduction" },
      {
        type: "p",
        text: "Today, we’re excited to share an important milestone in our journey with artificial intelligence. As AI continues to reshape industries and transform how teams work, we’re launching a new initiative focused on **building smarter, scalable AI solutions.**",
      },
      {
        type: "p",
        text: "This announcement marks the beginning of a long-term effort to explore, develop, and implement AI-powered tools that improve productivity, automate workflows, and unlock new opportunities for businesses.",
      },
      {
        type: "p",
        text: "For startups, AI engineers, and marketers, the potential of AI is enormous. However, turning that potential into practical solutions requires thoughtful design, experimentation, and collaboration. Our goal with this initiative is to help bridge that gap.",
      },
      { type: "h2", text: "What This Announcement Means" },
      { type: "h3", text: "A Focus on AI-Powered Innovation" },
      {
        type: "p",
        text: "This initiative is centered on exploring how artificial intelligence can solve real-world problems. Rather than focusing only on experimentation, the goal is to develop practical tools and workflows that businesses can use every day.",
      },
      {
        type: "list",
        lead: "Key areas of focus include:",
        items: [
          "AI automation systems",
          "scalable AI workflows",
          "intelligent data analysis tools",
          "AI-powered productivity solutions",
        ],
      },
      { type: "h2", text: "Key Areas of Development" },
      { type: "h3", text: "AI Workflow Automation" },
      {
        type: "p",
        text: "One major focus will be designing **AI workflows that streamline operations.** These workflows connect AI models with business tools, allowing processes to run automatically.",
      },
      {
        type: "list",
        lead: "Examples of automated workflows include:",
        items: [
          "customer support systems",
          "marketing campaign automation",
          "data analysis pipelines",
          "content generation systems",
        ],
      },
      {
        type: "p",
        text: "By improving workflow design, businesses can reduce manual work and increase efficiency.",
      },
      { type: "h3", text: "AI Tools for Productivity" },
      {
        type: "p",
        text: "Another priority is developing tools that help teams work more effectively. AI assistants and automation systems can support tasks such as research, writing, analysis, and reporting.",
      },
      {
        type: "p",
        text: "For many organizations, productivity improvements come from small optimizations repeated across daily workflows.",
      },
      { type: "h2", text: "Looking Ahead" },
      { type: "h3", text: "A Long-Term Vision" },
      {
        type: "p",
        text: "Artificial intelligence is evolving rapidly, and its long-term impact will be profound. This initiative represents the beginning of a broader journey to explore how AI can improve productivity, creativity, and collaboration.",
      },
      {
        type: "p",
        text: "Rather than focusing on short-term trends, the goal is to build solutions that remain valuable as technology evolves.",
      },
      { type: "h3", text: "Collaboration Opportunities" },
      {
        type: "p",
        text: "We believe that the future of AI will be shaped by collaboration between developers, entrepreneurs, researchers, and creators. As this initiative grows, we hope to engage with individuals and teams who share an interest in building practical AI solutions.",
      },
      { type: "h2", text: "Final Thoughts" },
      {
        type: "p",
        text: "Artificial intelligence is opening the door to new possibilities across industries. But meaningful progress requires more than just powerful technology—it requires thoughtful implementation. This AI innovation initiative is a step toward building smarter tools, more efficient workflows, and practical solutions that help teams work better. As development continues, we’re excited to explore new ideas, collaborate with the community, and contribute to the evolving world of AI. The journey is just beginning—and the future of AI innovation looks incredibly promising.",
      },
    ],
  },
  {
    slug: "smarter-ai-workflows",
    title: "How to Get 10× Better Results From AI With 10× Smarter Workflows",
    category: "Tips",
    date: "2026-03-06",
    cardImage: ASSETS.blogGlasses,
    excerpt: "A practical approach to improving AI results through clear inputs, focused tasks, human review, and repeatable workflows.",
    hero: { src: ASSETS.blogGlasses, alt: "Smart glasses representing AI-assisted workflows" },
    body: [
      { type: "h2", text: "Start With the Workflow" },
      { type: "p", text: "Better AI results start with a clear definition of the work. Identify the task, the information it needs, and the decision or output it should support before adding a model to the process. Treat the goal of a tenfold improvement as an ambition to measure, rather than a guaranteed result." },
      { type: "h2", text: "Give Each Step a Clear Purpose" },
      { type: "p", text: "Break a broad request into focused steps: collect the relevant information, produce an initial output, check it against your requirements, and send it to the right person for review. Clear boundaries make failures easier to find and fix." },
      { type: "list", items: ["Define the expected output and acceptance criteria.", "Supply relevant context and examples.", "Keep human review at decisions that need judgment.", "Record errors and use them to improve the workflow."] },
      { type: "h2", text: "Measure the Whole Process" },
      { type: "p", text: "Compare the workflow with your existing process using completion time, correction effort, and output quality. A fast initial response is useful only when the final result saves work. Start with one repeatable task, review the results, and expand the process when it is dependable." },
    ],
  },
  {
    slug: "smaller-engineering-team",
    title: "How to Get 10× Better Results From AI With a Smaller Engineering Team",
    category: "Tips",
    date: "2026-03-06",
    cardImage: ASSETS.blogLaptop,
    excerpt: "How a focused engineering team can use AI to reduce repetitive work while keeping ownership, review, and product quality clear.",
    hero: { src: ASSETS.blogLaptop, alt: "Laptop representing a focused engineering workflow" },
    body: [
      { type: "h2", text: "Focus the Team on the Work That Matters" },
      { type: "p", text: "A smaller engineering team needs clear priorities and a manageable scope. AI can support that focus by helping with repetitive work, but architecture, product decisions, and accountability still need named owners. A tenfold improvement is a goal to test against your own baseline, rather than an automatic outcome." },
      { type: "h2", text: "Use AI Within the Delivery Process" },
      { type: "p", text: "Start with bounded tasks such as drafting documentation, explaining unfamiliar code, or proposing an implementation for a well-defined change. Give the tool the relevant context and review its output through the same process used for other contributions." },
      { type: "list", items: ["Keep changes small enough to review carefully.", "Assign an engineer to own each change.", "Validate behavior with checks that match the risk.", "Document decisions so the whole team can maintain the result."] },
      { type: "h2", text: "Improve Through Feedback" },
      { type: "p", text: "Track delivery time, rework, and defects to understand whether AI assistance is helping. Keep the workflows that reduce effort without weakening quality, and revise those that create extra review work. The aim is a dependable delivery process that the team can sustain." },
    ],
  },
];

/** Published post for a URL slug (drafts are visible in dev only). */
export function getBlogPost(slug: string): BlogPost | undefined {
  return visible(blogPosts).find((post) => post.slug === slug);
}

/** Other published posts for the "Insights" row. */
export function relatedBlogPosts(slug: string, max = 3): BlogPost[] {
  return visible(blogPosts).filter((post) => post.slug !== slug).slice(0, max);
}

/* ---------------------------------------------- services and process steps */

export type Service = {
  number: string;
  title: string;
  description: string;
  features: readonly string[];
  image: string;
};

export type ProcessStep = {
  number: number;
  title: string;
  description: string;
  image: string;
};

export const services: readonly Service[] = [
  {
    number: "01",
    title: "Workflow Automation",
    description: "Structured systems that eliminate repetitive work.",
    features: [
      "WORKFLOW AUDITS",
      "CROSS-PLATFORM TOOL INTEGRATION",
      "BUILD SCALABLE INTERNAL SYSTEMS",
      "INTERNAL OPERATIONS AUTOMATION",
    ],
    image: ASSETS.serviceWorkflow,
  },
  {
    number: "02",
    title: "AI-Powered Systems",
    description: "Intelligence embedded into your operations.",
    features: [
      "AI LEAD QUALIFICATION SYSTEMS",
      "AI DATA PROCESSING & ENRICHMENT",
      "CUSTOM GPT INTERNAL ASSISTANTS",
      "SMART ROUTING & DECISION LOGIC",
    ],
    image: ASSETS.serviceAi,
  },
  {
    number: "03",
    title: "Sales & Revenue Automation",
    description: "Predictable, scalable revenue infrastructure.",
    features: [
      "AUTOMATED LEAD CAPTURE & DISTRIBUTION",
      "CRM PIPELINE AUTOMATION",
      "FOLLOW-UP & NURTURE SEQUENCES",
      "REVENUE PERFORMANCE DASHBOARDS",
    ],
    image: ASSETS.serviceRevenue,
  },
] as const;

export const processSteps: readonly ProcessStep[] = [
  {
    number: 1,
    title: "Understand Your Workflow",
    description:
      `We spend time understanding what you're building, where you're stuck, and what "done" actually looks like for your team. No assumptions. No templates. We design the engagement around your product and pace — not ours.`,
    image: ASSETS.processUnderstand,
  },
  {
    number: 2,
    title: "Design & Build the System",
    description:
      `Our engineers jump in — same stack, same tools, same rhythms as your team. We ship working software fast, starting with the highest-leverage parts of the product. You'll see real progress in the first sprint, not the fifth.`,
    image: ASSETS.processBuild,
  },
  {
    number: 3,
    title: "Optimize & Scale",
    description:
      `Once the product is live, we keep moving. We iterate fast, improve what's working, and scale up or down as your needs change. Think of us as the engineering muscle you can flex on demand — without the overhead of headcount.`,
    image: ASSETS.processScale,
  },
] as const;

/* --------------------------------------------------------------- About page */

export type AboutValue = {
  /** Which icon the card shows. */
  icon: "clarity" | "human" | "execution" | "growth";
  /** 2–3 words. */
  title: string;
  /** One sentence, about 60–80 characters. */
  description: string;
};

export type TeamMember = {
  name: string;
  /** Job title, e.g. "Head of Engineering". */
  role: string;
  /** One or two sentences. Optional. */
  bio?: string;
  /** Square portrait, displayed about 280×280 px — supply 560×560. */
  photo: Img;
  /** Full LinkedIn profile URL. Optional. */
  linkedin?: string;
};

export type AboutContent = {
  /** Top banner. `image` is full width, about 1440×900 px. */
  hero: { eyebrow: string; title: string; image: Img };
  /** Company story. `image` is portrait, displayed 588×769 px — supply 1176×1538. */
  story: {
    eyebrow: string;
    heading: string;
    paragraphs: readonly string[];
    /** Line introducing the bullets, e.g. "Our focus is to:". */
    listLead?: string;
    bullets?: readonly string[];
    image: Img;
  };
  /** What the company is good at. Two stats. `image` is portrait, displayed 588×769 px — supply 1176×1538. */
  expertise: {
    eyebrow: string;
    heading: string;
    text: string;
    stats: readonly [Stat, Stat];
    image: Img;
  };
  /** Four values fit the layout. */
  values: readonly AboutValue[];
  /** Company-wide numbers (four fit the layout). `image` is displayed about 831×820 px — supply 1662×1640. */
  metrics: readonly Metric[];
  metricsImage: Img;
  /** Leave empty until you have people to list: the section stays hidden in production. */
  team: readonly TeamMember[];
  /** Heading above the team grid. */
  teamHeading: { eyebrow: string; title: string };
  /** Founder / leadership quote. `portrait` is displayed 348×430 px — supply 696×860. */
  leadership: {
    quote: string;
    name: string;
    role: string;
    company: string;
    portrait: Img;
  };
};

export const about: AboutContent = {
  hero: {
    eyebrow: "AI-NATIVE ENTERPRISE TRANSFORMATION",
    title: "The Minds Behind the Automation",
    image: { src: ASSETS.aboutHero, alt: "A technology studio set inside a forest" },
  },
  story: {
    eyebrow: "OUR APPROACH",
    heading: "Designing an Automation System to Simplify Campaign Management.",
    paragraphs: ["We designed an automation system that connected the agency’s tools and streamlined key processes."],
    listLead: "Our focus was to:",
    bullets: ["AI Workflow Automation", "Content Operations System", "Campaign Data Tracking"],
    image: { src: ASSETS.aboutApproach, alt: "A team designing an automation system" },
  },
  expertise: {
    eyebrow: "THE RESULTS",
    heading: "Faster Campaign Execution and More Efficient Team Operations",
    text: "With automation in place, Shinta transformed how their campaigns were managed. Tasks that previously required constant manual updates became automated workflows.",
    stats: [
      { value: "20+", label: "saved weekly on operational" },
      { value: "3x", label: "faster campaign coordination" },
    ],
    image: { src: ASSETS.aboutResults, alt: "A team member working on a laptop" },
  },
  values: [
    {
      icon: "clarity",
      title: "Clarity Over Complexity",
      description: "We simplify complex workflows into clear, structured systems.",
    },
    {
      icon: "human",
      title: "Human-Centered Automation",
      description: "Automation should support how teams actually work.",
    },
    {
      icon: "execution",
      title: "Thoughtful Execution",
      description: "Every system is carefully designed for reliability and efficiency.",
    },
    {
      icon: "growth",
      title: "Long-Term Development",
      description: "We create automation that grows with the business.",
    },
  ],
  metrics: [
    { value: "14+", label: "Workflows Automated" },
    { value: "60%", label: "Time Saved" },
    { value: "04x", label: "Process Efficiency" },
    { value: "90%", label: "less Human Error" },
  ],
  metricsImage: { src: ASSETS.aboutAchievements, alt: "A bright modern office" },
  team: [],
  teamHeading: { eyebrow: "TEAM", title: "Our Team" },
  leadership: {
    quote:
      "Our goal is simple: build thoughtful systems that help businesses run more clearly and scale with confidence.",
    name: "Bagus William",
    role: "CEO & Co-Founder",
    company: "sanjaya",
    portrait: { src: ASSETS.aboutPortrait, alt: "iPlex co-founder" },
  },
};

const TEAM_MOCK_MEMBERS: readonly TeamMember[] = [
  {
    name: "Maya Chen",
    role: "Product & AI Engineering Lead",
    bio: "Connects product strategy, applied AI, and reliable software delivery.",
    photo: { src: ASSETS.teamMaya, alt: "AI-generated mock portrait of Maya Chen" },
  },
  {
    name: "Omar Haddad",
    role: "Senior Automation Engineer",
    bio: "Designs dependable integrations that remove repetitive work from daily operations.",
    photo: { src: ASSETS.teamOmar, alt: "AI-generated mock portrait of Omar Haddad" },
  },
  {
    name: "Amara Okafor",
    role: "Product Design Lead",
    bio: "Turns complex business workflows into clear, human-centered product experiences.",
    photo: { src: ASSETS.teamAmara, alt: "AI-generated mock portrait of Amara Okafor" },
  },
];

/** Team members to show: the real list, or three [placeholders] in dev while it is empty. */
export function teamForDisplay(): { members: readonly TeamMember[]; isPlaceholder: boolean } {
  if (about.team.length) return { members: about.team, isPlaceholder: false };
  if (SHOW_DRAFTS) return { members: TEAM_MOCK_MEMBERS, isPlaceholder: true };
  return { members: [], isPlaceholder: false };
}

/* ------------------------------------------- Home: stats, testimonials, logos */

/** The four numbers under the testimonials on Home. */
export const homeStats: readonly Metric[] = [
  { value: "10+", label: "Years" },
  { value: "54%", label: "Time Saved" },
  { value: "4×", label: "Process Efficiency" },
  { value: "79%", label: "less Human Error" },
];

export type Testimonial = {
  draft?: boolean;
  /** `logo` is a wordmark on a transparent background, displayed about 124×32 px. */
  company: { name: string; logo?: string };
  /** The quote itself, 100–220 characters, without quotation marks (they are added for you). */
  quote: string;
  /** Who said it, e.g. "Fintech Startup, San Francisco". */
  attribution: string;
  /** Their job title, e.g. "VP of Engineering". */
  role: string;
  /** Portrait, displayed 318×400 px — supply 636×800. */
  portrait: Img;
};

export const testimonials: readonly Testimonial[] = [
  {
    company: { name: "Clinuvel", logo: ASSETS.clinuvelWordmark },
    quote:
      "Honored with the 2026–2027 Microsoft AI Business Solutions Inner Circle award for the sixth consecutive year, reflecting leadership in AI innovation and measurable business impact.",
    attribution: "Fintech Startup, San Francisco",
    role: "VP of Engineering",
    portrait: { src: ASSETS.testimonialWoman, alt: "Client portrait" },
  },
  {
    company: { name: "Apricot Law", logo: ASSETS.apricotWordmark },
    quote:
      "Named to Forbes Asia’s Best Under a Billion for the sixth time, demonstrating consistent performance, strategic resilience, and sustained technological delivery globally.",
    attribution: "B2B SaaS Company, New York",
    role: "Founder & CEO",
    portrait: { src: ASSETS.testimonialMan, alt: "Client portrait" },
  },
  {
    company: { name: "VelaGrid" },
    quote:
      "iPlex replaced three disconnected release workflows with one dependable platform. Our teams now ship weekly, with clearer ownership and far fewer production handoffs.",
    attribution: "Logistics Platform, Austin",
    role: "Chief Operating Officer",
    portrait: { src: ASSETS.testimonialVelaGrid, alt: "VelaGrid technology operations leader" },
  },
  {
    company: { name: "Novaline Systems" },
    quote:
      "Their engineers stabilized the platform and delivered the automation layer we had postponed for two quarters, without slowing the product roadmap.",
    attribution: "Healthcare SaaS, Singapore",
    role: "Chief Product Officer",
    portrait: { src: ASSETS.testimonialNovaline, alt: "Novaline Systems product leader" },
  },
];

/* ------------------------------------------------- Site info (footer, contact) */

export type SocialLink = {
  platform: "facebook" | "x" | "instagram";
  /** Accessible name, e.g. "iPlex on Facebook". */
  label: string;
  /** Full profile URL. Entries marked `draft` are hidden in production. */
  href: string;
  draft?: boolean;
};

export type LegalLink = {
  label: string;
  /** Page path, e.g. "/privacy". Hidden in production while `draft` (no page exists yet). */
  href: string;
  draft?: boolean;
};

export type SiteInfo = {
  email: string;
  /** Leave out to hide the phone number. `href` must be a tel: link in international format. */
  phone?: { display: string; href: string };
  socials: readonly SocialLink[];
  legal: readonly LegalLink[];
  /** The Careers section on /contact (the header links to /contact#careers). */
  careers: { heading: string; body: string; email: string };
  /** Names in the "Trusted companies" strip on Home (nine fit the layout). */
  trustedCompanies: readonly string[];
};

export const siteInfo: SiteInfo = {
  email: "info@iplex.ai",
  phone: { display: "+12 345 678", href: "tel:+12345678" },
  socials: [
    { platform: "facebook", label: "iPlex on Facebook", href: "#", draft: true },
    { platform: "x", label: "iPlex on X", href: "#", draft: true },
    { platform: "instagram", label: "iPlex on Instagram", href: "#", draft: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy", draft: true },
    { label: "Terms and Condition", href: "/terms", draft: true },
  ],
  careers: {
    heading: "Careers",
    body: "Interested in joining iPlex? Write to us at the address below.",
    email: "info@iplex.ai",
  },
  trustedCompanies: ["Shinta", "RAMA", "Pandawa", "BIMA", "Sadewa", "NAKULA", "Batavia", "BLOCKHAUS", "Mandala"],
};

/* ---------------------------------------------------------------------- FAQ */

export type FaqItem = {
  question: string;
  /** Two or three sentences. An item with an empty answer is treated as a draft. */
  answer: string;
};

export const faqItems: readonly FaqItem[] = [
  {
    question: "What exactly does iPlex do?",
    answer:
      "We're a 200-engineer software and AI company. We build products from scratch, add AI capabilities to existing ones, and embed senior engineers directly into startup teams that need to move faster.",
  },
  {
    question: "How is iPlex different from a typical offshore dev shop?",
    answer:
      "We work as a senior product and engineering partner, not a ticket-taking vendor. The team owns outcomes, communicates directly, and stays accountable from product thinking through production.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most engagements can begin within one to two weeks. We use the first conversations to align on your goals, technical context, and the smallest team that can create momentum.",
  },
  {
    question: "Do you work with early-stage startups or only funded companies?",
    answer:
      "Both. We tailor the engagement to the stage of the product—from validating and shipping a first version to modernizing or scaling an established platform.",
  },
  {
    question: "What timezone do your engineers work in?",
    answer:
      "Our distributed teams arrange meaningful overlap with your working day and join the same planning, standups, reviews, and communication channels as your internal team.",
  },
  {
    question: "Can you work with our existing codebase and tech stack?",
    answer:
      "Yes. We regularly join existing products, learn the architecture, improve it safely, and work within your stack and delivery process before recommending any major change.",
  },
];

/** FAQ items that have an answer (unanswered ones show in dev only). */
export function visibleFaq(): FaqItem[] {
  return faqItems.filter((item) => SHOW_DRAFTS || item.answer.trim() !== "");
}

/** A valid value for <time dateTime>, or undefined while the date is still a [placeholder]. */
export function dateAttr(iso: string): string | undefined {
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(iso) ? iso : undefined;
}
