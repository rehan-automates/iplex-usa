import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { footerNav, site } from "@/lib/site";

function FooterLink({ href, label }: { href: string; label: string }) {
  return href.startsWith("/") ? (
    <Link className="footlink" href={href}>
      {label}
    </Link>
  ) : (
    <a className="footlink" href={href}>
      {label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-[1] pt-[56px] pb-[40px] max-[640px]:pt-[40px]">
      <div className="wrap flex flex-col gap-[40px] max-[640px]:gap-[28px]">
        <div className="flex flex-wrap gap-y-[40px] gap-x-[48px] max-[640px]:gap-y-[20px]">
          <div className="flex-[1_1_260px] max-w-[320px] flex flex-col gap-[14px]">
            <Wordmark />
            <p className="m-0 text-[15px] leading-[1.6] text-muted">{site.description}</p>
          </div>

          {/* Tablet and desktop: link columns. */}
          <nav
            className="flex-[3_1_620px] hidden min-[641px]:grid grid-cols-[repeat(auto-fit,minmax(min(130px,100%),1fr))] gap-y-[28px] gap-x-[24px] text-[15px]"
            aria-label="Footer"
          >
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-[12px]">
                <span className="font-extrabold">{group.title}</span>
                {group.links.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </div>
            ))}
          </nav>

          {/* Phones: each group folds into a tap-to-open row. */}
          <nav className="min-[641px]:hidden w-full" aria-label="Footer">
            {footerNav.map((group) => (
              <details key={group.title} className="foot-acc">
                <summary>
                  {group.title}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="flex flex-col pb-[10px] text-[15.5px]">
                  {group.links.map((link) => (
                    <FooterLink key={link.label} {...link} />
                  ))}
                </div>
              </details>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-y-[12px] gap-x-[32px] pt-[22px] [border-top:1px_solid_rgba(16,24,20,0.1)] text-[14px] text-subtle">
          {/* TODO: replace the bracketed placeholders with your contact details. */}
          <span>© 2026 iPlex</span>
          <span>[Phone number] · [Business email]</span>
          <a className="font-bold no-underline" href="#linkedin">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
