/**
 * Draft handling for content entries.
 *
 * An entry marked `draft: true` is a work in progress:
 *  - production (`next build`, including Vercel previews): hidden everywhere —
 *    lists, related grids, footer, `generateStaticParams`, and its own URL (404).
 *  - development (`npm run dev`): shown with a DRAFT badge, and any field you have
 *    not written yet renders as a [Placeholder] so you can see the empty slot.
 *
 * Flip `draft: true` to `draft: false` (or delete the line) once every field is
 * written. TypeScript then requires the complete set of fields for that entry.
 */
export const SHOW_DRAFTS = process.env.NODE_ENV === "development";

export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

/**
 * A content entry. `Base` fields are always required (they drive routing and
 * cards); `Body` fields may be left out only while `draft: true`.
 */
export type Draftable<Base, Body> = Base &
  (({ draft: true } & DeepPartial<Body>) | ({ draft?: false } & Body));

export function isVisible(item: { draft?: boolean }): boolean {
  return SHOW_DRAFTS || !item.draft;
}

export function visible<T extends { draft?: boolean }>(items: readonly T[]): T[] {
  return items.filter(isVisible);
}

/** Label shown in place of a field that has not been written yet (dev only). */
export const ph = (label: string) => `[${label}]`;

/** Fill the gaps of a partially written entry with placeholder values. */
export function fill<T>(defaults: T, partial: unknown): T {
  if (partial === undefined || partial === null || partial === "") return defaults;

  if (Array.isArray(defaults)) {
    if (!Array.isArray(partial) || partial.length === 0) return defaults;
    return partial.map((item, index) => fill(defaults[index] ?? defaults[0], item)) as T;
  }

  if (defaults && typeof defaults === "object") {
    const base = defaults as Record<string, unknown>;
    const given = partial as Record<string, unknown>;
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(given)) {
      out[key] = key in base ? fill(base[key], given[key]) : given[key];
    }
    return out as T;
  }

  return partial as T;
}
