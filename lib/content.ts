import { ASSETS } from "./assets";

export { ASSETS };

export type Stat = {
  value: string;
  label: string;
};

export type WorkProject = {
  slug: string;
  year: string;
  category: string;
  title: string;
  description: string;
  image: string;
  logo?: string;
  stats: readonly [Stat, Stat];
};

export type BlogPost = {
  slug: string;
  category: "Announcement" | "Tips";
  date: string;
  title: string;
  image: string;
};

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

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogArticleSection = {
  heading: string;
  subheading?: string;
  paragraphs: readonly string[];
  leadIn?: string;
  bullets?: readonly string[];
};

export const workProjects: readonly WorkProject[] = [
  {
    slug: "clinuvel",
    year: "2026",
    category: "SaaS · Product Development",
    title: "Building a Full B2B SaaS Platform from Scratch — in 10 Weeks",
    description:
      "A US-based fintech startup needed an MVP fast — investors were watching, and the clock was ticking. iPlex took them from product spec to a live, production-grade SaaS platform in under 10 weeks. They closed their seed round 3 weeks after launch.",
    image: ASSETS.workSaas,
    logo: ASSETS.clinuvelWordmark,
    stats: [
      { value: "10", label: "Weeks to production" },
      { value: "3×", label: "Faster than in-house estimate" },
    ],
  },
  {
    slug: "native-ai-copilot",
    year: "2026",
    category: "AI Development · Product Engineering",
    title:
      "Embedding a Native AI Co-Pilot Into a B2B Product — Without Slowing the Roadmap",
    description:
      "A Series A startup needed to ship AI features fast — their competitors already had them. Our team designed, built, and shipped a native LLM-powered co-pilot in 6 weeks, integrated cleanly into their existing codebase with zero regressions.",
    image: ASSETS.workAiProduct,
    logo: ASSETS.clinuvelWordmark,
    stats: [
      { value: "6 wks", label: "Concept to shipped feature" },
      { value: "48%", label: "Increase in user activation" },
    ],
  },
  {
    slug: "engineering-team-scale",
    year: "2026",
    category: "Staff Augmentation · Engineering Scale",
    title:
      "Scaling an Engineering Team from 4 to 30 Without Losing Velocity or Culture",
    description:
      "A post-Series B startup was growing fast but couldn't hire quickly enough. We provided 26 pre-vetted senior engineers who embedded directly into their squads — same Slack, same standups, same sprint cadence. They shipped 3 major product lines that quarter.",
    image: ASSETS.workStaffAugmentation,
    logo: ASSETS.clinuvelWordmark,
    stats: [
      { value: "26", label: "Engineers embedded in 3 weeks" },
      { value: "3×", label: "Feature output that quarter" },
    ],
  },
] as const;

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "building-smarter-ai-tools",
    category: "Announcement",
    date: "March 6, 2026",
    title: "Scaling AI at a Series A Startup: What Nobody Tells You",
    image: ASSETS.blogRobot,
  },
  {
    slug: "smarter-ai-workflows",
    category: "Tips",
    date: "March 6, 2026",
    title: "How to Get 10× Better Results From AI With 10× Smarter Workflows",
    image: ASSETS.blogGlasses,
  },
  {
    slug: "smaller-engineering-team",
    category: "Tips",
    date: "March 6, 2026",
    title: "How to Get 10× Better Results From AI With a Smaller Engineering Team",
    image: ASSETS.blogLaptop,
  },
] as const;

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

export const faqItems: readonly FaqItem[] = [
  {
    question: "What exactly does iPlex do?",
    answer:
      "We're a 200-engineer software and AI company. We build products from scratch, add AI capabilities to existing ones, and embed senior engineers directly into startup teams that need to move faster.",
  },
  {
    question: "How is iPlex different from a typical offshore dev shop?",
    answer: "",
  },
  {
    question: "How quickly can we get started?",
    answer: "",
  },
  {
    question: "Do you work with early-stage startups or only funded companies?",
    answer: "",
  },
  {
    question: "What timezone do your engineers work in?",
    answer: "",
  },
  {
    question: "Can you work with our existing codebase and tech stack?",
    answer: "",
  },
] as const;

export const blogArticleSections: readonly BlogArticleSection[] = [
  {
    heading: "Introduction",
    paragraphs: [
      "Today, we’re excited to share an important milestone in our journey with artificial intelligence. As AI continues to reshape industries and transform how teams work, we’re launching a new initiative focused on building smarter, scalable AI solutions.",
      "This announcement marks the beginning of a long-term effort to explore, develop, and implement AI-powered tools that improve productivity, automate workflows, and unlock new opportunities for businesses.",
      "For startups, AI engineers, and marketers, the potential of AI is enormous. However, turning that potential into practical solutions requires thoughtful design, experimentation, and collaboration. Our goal with this initiative is to help bridge that gap.",
    ],
  },
  {
    heading: "What This Announcement Means",
    subheading: "A Focus on AI-Powered Innovation",
    paragraphs: [
      "This initiative is centered on exploring how artificial intelligence can solve real-world problems. Rather than focusing only on experimentation, the goal is to develop practical tools and workflows that businesses can use every day.",
    ],
    leadIn: "Key areas of focus include:",
    bullets: [
      "AI automation systems",
      "scalable AI workflows",
      "intelligent data analysis tools",
      "AI-powered productivity solutions",
    ],
  },
  {
    heading: "Key Areas of Development",
    subheading: "AI Workflow Automation",
    paragraphs: [
      "One major focus will be designing AI workflows that streamline operations. These workflows connect AI models with business tools, allowing processes to run automatically.",
    ],
    leadIn: "Examples of automated workflows include:",
    bullets: [
      "customer support systems",
      "marketing campaign automation",
      "data analysis pipelines",
      "content generation systems",
    ],
  },
  {
    heading: "AI Tools for Productivity",
    paragraphs: [
      "Another priority is developing tools that help teams work more effectively. AI assistants and automation systems can support tasks such as research, writing, analysis, and reporting.",
      "For many organizations, productivity improvements come from small optimizations repeated across daily workflows.",
    ],
  },
  {
    heading: "Looking Ahead",
    subheading: "A Long-Term Vision",
    paragraphs: [
      "Artificial intelligence is evolving rapidly, and its long-term impact will be profound. This initiative represents the beginning of a broader journey to explore how AI can improve productivity, creativity, and collaboration.",
      "Rather than focusing on short-term trends, the goal is to build solutions that remain valuable as technology evolves.",
    ],
  },
  {
    heading: "Collaboration Opportunities",
    paragraphs: [
      "We believe that the future of AI will be shaped by collaboration between developers, entrepreneurs, researchers, and creators. As this initiative grows, we hope to engage with individuals and teams who share an interest in building practical AI solutions.",
    ],
  },
  {
    heading: "Final Thoughts",
    paragraphs: [
      "Artificial intelligence is opening the door to new possibilities across industries. But meaningful progress requires more than just powerful technology—it requires thoughtful implementation. This AI innovation initiative is a step toward building smarter tools, more efficient workflows, and practical solutions that help teams work better. As development continues, we’re excited to explore new ideas, collaborate with the community, and contribute to the evolving world of AI. The journey is just beginning—and the future of AI innovation looks incredibly promising.",
    ],
  },
] as const;

export const articleMeta = {
  category: "Announcement",
  date: "Mar 6, 2026",
  title: "Building Smarter AI Tools for the Future of Scalable Businesses",
  image: ASSETS.blogArticleHero,
} as const;
