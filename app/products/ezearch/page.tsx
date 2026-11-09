import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Cta } from "@/components/sections/cta";
import { JsonLdScript, ORG_ID } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { HeroTitle } from "@/components/ui/hero-title";
import { ProductLogo } from "@/components/ui/product-logo";
import { SectionHeading } from "@/components/ui/section-heading";
import { ezearch as product } from "@/content/products";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${product.name} — WooCommerce search`,
  description: `${product.tagline} Live in 3 minutes, with a free plan. Built by ${site.name}.`,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: product.name,
  url: product.url,
  description: product.tagline,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "E-commerce search",
  operatingSystem: "WordPress (WooCommerce plugin)",
  image: `${site.url}${product.logo.src}`,
  featureList: product.features.map((f) => f.title),
  publisher: { "@id": ORG_ID },
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default function EzearchPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-44 pb-20 md:pt-56 md:pb-28">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div className="container-site">
          <div className="hero-fade flex flex-wrap items-center gap-4">
            <ProductLogo product={product} eager className="h-9 md:h-12" />
            <Badge>{product.badge}</Badge>
          </div>
          <HeroTitle
            text={product.tagline}
            accent="typo-tolerant"
            className="text-display mt-10 max-w-[20ch]"
          />
          <p
            className="hero-fade text-lead text-fg-muted mt-8 max-w-2xl"
            style={{ "--d": "450ms" } as CSSProperties}
          >
            Built by {site.name}. Free plan available —{" "}
            <ExternalLink href={product.pricingUrl} className="text-fg hover:text-accent underline">
              see pricing
            </ExternalLink>
            .
          </p>
          <div
            className="hero-fade mt-10 flex flex-wrap gap-3"
            style={{ "--d": "600ms" } as CSSProperties}
          >
            <Magnetic>
              <ExternalLink href={product.url} className={buttonClass("primary")}>
                Visit {product.name}
              </ExternalLink>
            </Magnetic>
            <ExternalLink href={product.demoUrl} className={buttonClass("ghost")}>
              Try the live demo
            </ExternalLink>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="container-site pb-section">
        <SectionHeading label="The problem" title="Default WooCommerce search lets shoppers down" />
        <ol className="mt-16 grid gap-4 md:grid-cols-3">
          {product.problems.map((problem, i) => (
            <li key={problem.title}>
              <Reveal delay={i * 0.08} className="rounded-card border-line h-full border p-8">
                <span className="text-accent font-mono text-xs">{pad(i)}</span>
                <h3 className="font-display mt-8 text-2xl font-medium">{problem.title}</h3>
                <p className="text-fg-muted mt-3">{problem.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Stats */}
      <section aria-label={`${product.name} in numbers`} className="container-site pb-section">
        <dl className="rounded-card border-line bg-line grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4">
          {product.stats.map((stat) => (
            <div key={stat.label} className="bg-bg flex flex-col-reverse gap-6 p-8">
              <dt className="text-fg-muted">{stat.label}</dt>
              <dd className="font-display text-display font-semibold">
                {stat.display ?? (
                  <Counter to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Features */}
      <section className="container-site pb-section">
        <SectionHeading label="Features" title="Everything store search should do" />
        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {product.features.map((feature, i) => (
            <li key={feature.title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <SpotlightCard className="h-full p-8">
                  <feature.icon className="text-accent size-8" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-display mt-10 text-2xl font-medium">{feature.title}</h3>
                  <p className="text-fg-muted mt-3">{feature.body}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="container-site pb-section">
        <SectionHeading label="How it works" title="Live in three steps" />
        <ol className="border-line mt-16 grid gap-px border-t md:grid-cols-3 md:border-t-0">
          {product.steps.map((step, i) => (
            <li
              key={step.title}
              className="border-line border-b py-8 md:border-t md:border-b-0 md:pr-10"
            >
              <Reveal delay={i * 0.1}>
                <span className="font-display text-accent text-display font-semibold">{i + 1}</span>
                <h3 className="font-display mt-6 text-2xl font-medium">{step.title}</h3>
                <p className="text-fg-muted mt-3 max-w-sm">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <Cta
        label="Try it"
        title={`Search that just works`}
        text="Install the plugin, run the first sync and your store search is live. A free plan is available."
        actions={
          <>
            <Magnetic>
              <ExternalLink href={product.url} className={buttonClass("primary")}>
                Visit {product.name}
              </ExternalLink>
            </Magnetic>
            <ExternalLink href={product.demoUrl} className={buttonClass("ghost")}>
              Try the live demo
            </ExternalLink>
          </>
        }
      />
    </>
  );
}
