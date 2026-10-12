import { FunnelFooter, FunnelHeader } from "@/components/funnel-chrome";

/** Ad funnel pages: logo-only header and a slim footer, so visitors stay on task. */
export default function FunnelLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative overflow-hidden bg-mint text-ink">
      <FunnelHeader />
      <main id="main">{children}</main>
      <FunnelFooter />
    </div>
  );
}
