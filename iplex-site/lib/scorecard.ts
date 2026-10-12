/** AI Readiness Scorecard: questions, scoring and the opportunity shown for each stage. */

export const SCALE = ["Never", "Sometimes", "Usually", "Always"] as const;

export const STAGES = [
  {
    name: "Lead acquisition",
    questions: [
      "New leads get a reply within the hour.",
      "Each piece of content is reused across several channels.",
      "Lead details reach your CRM without anyone retyping them.",
    ],
    opportunity:
      "Reply to every new lead within minutes, and turn each webinar or article into posts and emails in your voice.",
  },
  {
    name: "Sales",
    questions: [
      "Proposals start from a library of your best past work.",
      "Call notes and next steps land in your CRM automatically.",
      "Every lead gets a tailored follow-up, on time.",
    ],
    opportunity: "Start every proposal from your best past work, and send a tailored follow-up after every call.",
  },
  {
    name: "Onboarding",
    questions: [
      "New clients get access requests and a welcome on day one.",
      "Intake answers turn into a first brief without retyping.",
      "A new client is ready for kickoff within a week.",
    ],
    opportunity: "Turn intake answers into a first brief, and send access requests with reminders automatically.",
  },
  {
    name: "Delivery",
    questions: [
      "Your team has one place for each client’s brand voice and guidelines.",
      "A first draft takes less than an hour.",
      "Work is checked against a clear standard before it goes out.",
    ],
    opportunity:
      "Keep each client's brand voice in one place, and get first drafts your team only needs to review and polish.",
  },
  {
    name: "Retention",
    questions: [
      "Reports explain what changed and why, not just the numbers.",
      "You hear early when a client goes quiet.",
      "Renewals are planned weeks ahead.",
    ],
    opportunity: "Turn monthly reports into explanations of what changed, and get an alert when a client goes quiet.",
  },
  {
    name: "Operations",
    questions: [
      "Meeting notes become tasks without anyone retyping them.",
      "Anyone can find an answer in your documents in minutes.",
      "You can see your team’s capacity for the next two weeks.",
    ],
    opportunity: "Turn meeting notes into tasks, and give your team an assistant that answers from your own documents.",
  },
] as const;

/** The example shown in the designs, used when a visitor arrives without their own results. */
export const EXAMPLE_SCORES = [68, 54, 31, 57, 26, 39];

/** Score per stage, 0 to 100 (Never = 0, Always = 100). Unanswered questions count as "Never". */
export function stageScores(answers: Record<string, string>): number[] {
  return STAGES.map((stage, s) => {
    const points = stage.questions.map((_, q) => {
      const idx = SCALE.indexOf((answers[`${s}-${q}`] ?? "Never") as (typeof SCALE)[number]);
      return (Math.max(idx, 0) / (SCALE.length - 1)) * 100;
    });
    return Math.round(points.reduce((a, b) => a + b, 0) / points.length);
  });
}

/** Scores travel in the URL as "68-54-31-57-26-39", so a results link can be shared. */
export function encodeScores(scores: number[]): string {
  return scores.join("-");
}

export function decodeScores(value: string | null): number[] | null {
  if (!value) return null;
  const parts = value.split("-").map(Number);
  if (parts.length !== STAGES.length || parts.some((n) => !Number.isFinite(n) || n < 0 || n > 100)) return null;
  return parts.map(Math.round);
}

/** Indexes of the three lowest-scoring stages, lowest first (ties keep lifecycle order). */
export function topOpportunities(scores: number[]): number[] {
  return scores
    .map((score, i) => ({ score, i }))
    .sort((a, b) => a.score - b.score || a.i - b.i)
    .slice(0, 3)
    .map((x) => x.i);
}
