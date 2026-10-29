import { SHOW_DRAFTS } from "@/lib/draft";

/** Marks an unfinished content entry. Renders nothing outside `npm run dev`. */
export function DraftBadge({ label = "Draft" }: { label?: string }) {
  if (!SHOW_DRAFTS) return null;
  return <span className="draft-badge">{label}</span>;
}
