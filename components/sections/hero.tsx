import Link from "next/link";
import type { CSSProperties } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { buttonClass } from "@/components/ui/button";
import { HeroTitle } from "@/components/ui/hero-title";
import { site } from "@/content/site";
import { HeroGlow } from "./hero-glow";

/**
 * Server-rendered so the headline (LCP) is in the HTML; reveals are CSS (.hero-word / .hero-fade).
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-dvh flex-col justify-end overflow-hidden pt-40 pb-12">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <HeroGlow />

      <div className="container-site">
        <p className="micro-label hero-fade">
          [ Software studio — {site.address.locality}, Sri Lanka — Est. {site.founded} ]
        </p>

        <HeroTitle text={site.motto} accent="design," className="mt-6 max-w-[13ch]" />

        <div className="mt-12 grid items-end gap-8 md:grid-cols-12">
          <p
            className="hero-fade text-lead text-fg-muted md:col-span-6 lg:col-span-5"
            style={{ "--d": "500ms" } as CSSProperties}
          >
            {site.tagline} Custom software, web and mobile apps, design and QA — built by our team
            in Sri Lanka since {site.founded}.
          </p>
          <div
            className="hero-fade flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7"
            style={{ "--d": "650ms" } as CSSProperties}
          >
            <Magnetic>
              <Link href="/contact" className={buttonClass("primary")}>
                Start a project
              </Link>
            </Magnetic>
            <Link href="/work" className={buttonClass("ghost")}>
              See our work
            </Link>
          </div>
        </div>

        <div
          aria-hidden
          className="hero-fade micro-label mt-16 flex items-center gap-3"
          style={{ "--d": "900ms" } as CSSProperties}
        >
          <span className="bg-line relative block h-10 w-px overflow-hidden">
            <span className="scroll-cue bg-accent absolute inset-x-0 top-0 h-1/2" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}
