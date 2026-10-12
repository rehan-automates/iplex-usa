import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Main website: full navigation and footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative overflow-clip bg-mint text-ink">
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
