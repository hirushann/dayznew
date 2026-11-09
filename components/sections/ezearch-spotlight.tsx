import Link from "next/link";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { MockSearch } from "@/components/ui/mock-search";
import { ProductLogo } from "@/components/ui/product-logo";
import { ezearch } from "@/content/products";

/** Home page band: our own product, eZearch. */
export function EzearchSpotlight() {
  const stats = ezearch.stats.filter((s) => !s.display).slice(0, 3);
  return (
    <section aria-label="Built by DayZ: eZearch" className="container-site py-section">
      <div className="rounded-card border-line bg-surface-1/60 relative isolate grid gap-12 overflow-hidden border p-6 md:p-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div aria-hidden className="cta-glow absolute -top-1/2 -left-1/4 -z-10 size-[50rem]" />
        <div className="lg:col-span-6">
          <p className="micro-label">[ Built by DayZ: eZearch ]</p>
          <ProductLogo product={ezearch} className="mt-8 h-8 md:h-10" />
          <SplitText
            as="h2"
            text="Store search that understands typos"
            className="font-display text-title mt-8 font-semibold tracking-tight"
          />
          <p className="text-lead text-fg-muted mt-5 max-w-xl">
            {ezearch.tagline} Our own product, built and run by the DayZ team.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.short} className="flex flex-col-reverse gap-1">
                <dt className="text-fg-muted text-sm">{stat.short}</dt>
                <dd className="font-display text-title font-semibold whitespace-nowrap">
                  <Counter to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Link href={ezearch.href} className={buttonClass("primary")}>
                Explore {ezearch.name}
              </Link>
            </Magnetic>
            <ExternalLink href={ezearch.url} className={buttonClass("ghost")}>
              Visit ezearch.com
            </ExternalLink>
          </div>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <MockSearch />
        </Reveal>
      </div>
    </section>
  );
}
