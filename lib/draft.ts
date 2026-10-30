/**
 * Content helpers for the client preview. All entries render in every environment.
 * Draft metadata allows partially written entries without controlling visibility.
 */
export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

/**
 * A content entry. `Base` fields are always required (they drive routing and
 * cards); `Body` fields may be left out only while `draft: true`.
 */
export type Draftable<Base, Body> = Base &
  (({ draft: true } & DeepPartial<Body>) | ({ draft?: false } & Body));

export function visible<T extends { draft?: boolean }>(items: readonly T[]): T[] {
  return [...items];
}

/** Label shown in place of a field that has not been written yet. */
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
