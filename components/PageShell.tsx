import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export type PageShellProps = {
  /** Page-specific class (usually the CSS Module's `.page`). */
  className?: string;
  children: ReactNode;
};

/**
 * Common frame for every route: banner (Header), one <main id="main"> landmark that
 * the skip link targets, and contentinfo (Footer). The Header and Footer sit outside
 * <main> so assistive tech exposes them as the page-level banner and footer.
 */
export function PageShell({ className, children }: PageShellProps) {
  return (
    <div className={["site-page", className].filter(Boolean).join(" ")}>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
