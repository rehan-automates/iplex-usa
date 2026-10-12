import Link from "next/link";
import type { ReactNode } from "react";

type Action = { label: string; href: string };

/** Dark call-to-action band that closes most pages. First action is primary. */
export function CtaBand({
  title,
  description,
  actions,
  textMaxWidth = 660,
}: {
  title: ReactNode;
  description?: string;
  actions: Action[];
  textMaxWidth?: number;
}) {
  return (
    <section className="cta-band relative z-[1] overflow-hidden bg-night text-white py-[clamp(72px,9vw,112px)] mt-[clamp(24px,4vw,48px)] max-[640px]:py-[56px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1.2px,transparent_1.2px)] [background-size:22px_22px]"
      />
      <div className="wrap relative flex flex-wrap items-end justify-between gap-y-[32px] gap-x-[48px]">
        <div className="flex flex-col gap-[18px]" style={{ maxWidth: textMaxWidth }}>
          <h2 className="cta-title m-0 text-[length:clamp(36px,4.6vw,58px)] leading-[1.04] tracking-[-0.045em] font-extrabold text-white text-balance">
            {title}
          </h2>
          {description ? <p className="m-0 text-[18px] leading-[1.6] text-fog">{description}</p> : null}
        </div>
        <div className="flex flex-wrap gap-[12px] max-[640px]:w-full">
          {actions.map((action, i) => {
            const className = `pill ${i === 0 ? "pill-mint" : "pill-ghost"}`;
            return action.href.startsWith("/") ? (
              <Link key={action.label} className={className} href={action.href}>
                {action.label}
              </Link>
            ) : (
              <a key={action.label} className={className} href={action.href}>
                {action.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
