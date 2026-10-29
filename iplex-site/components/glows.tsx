type Spot = { top: number; left?: number; right?: number; size: number; color: string };

/** Soft background colour glows. Positioned against the page wrapper, behind all sections. */
const DEFAULT_SPOTS: Spot[] = [
  { top: -220, left: -200, size: 720, color: "rgba(110,231,183,0.45)" },
  { top: 60, right: -260, size: 820, color: "rgba(167,243,208,0.5)" },
  { top: 1700, left: -300, size: 760, color: "rgba(191,219,254,0.45)" },
  { top: 3000, right: -280, size: 760, color: "rgba(253,230,138,0.4)" },
];

export function Glows({ spots = DEFAULT_SPOTS }: { spots?: Spot[] }) {
  return (
    <>
      {spots.map((s) => (
        <div
          key={`${s.top}-${s.left ?? s.right}`}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            background: `radial-gradient(circle, ${s.color} 0%, ${s.color.replace(/[\d.]+\)$/, "0)")} 65%)`,
          }}
        />
      ))}
    </>
  );
}
