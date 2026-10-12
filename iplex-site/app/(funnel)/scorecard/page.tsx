import type { Metadata } from "next";
import { Glows } from "@/components/glows";
import { JsonLd } from "@/components/json-ld";
import { Scorecard } from "@/components/scorecard/scorecard";
import { pageMetadata, pageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/scorecard");

export default function ScorecardPage() {
  return (
    <>
      <JsonLd data={pageSchema("/scorecard")} />
      <Glows />
      <section className="sec pt-[clamp(24px,4vw,48px)] pb-[clamp(64px,8vw,96px)]">
        <div className="wrap max-w-[860px]">
          <Scorecard />
        </div>
      </section>
    </>
  );
}
