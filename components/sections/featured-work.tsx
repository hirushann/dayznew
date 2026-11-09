"use client";

import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { featuredProjects } from "@/content/work";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

// Pinned (horizontal) card widths, also capped by viewport height (16:10 art + heading +
// caption ≈ 100dvh - 21rem) so cards never overflow the screen. The lead project is larger.
const CARD = "shrink-0 w-[min(60vw,56rem,(100dvh-21rem)*1.36)]";
const LEAD_CARD = "shrink-0 w-[min(72vw,68rem,(100dvh-21rem)*1.6)]";

/**
 * Desktop: the section is made as tall as the track's overflow, the inner view pins,
 * and vertical scroll drives the track's x. Mobile / reduced motion: plain vertical stack.
 */
export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
  const distance = useMotionValue(0);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    // ResizeObserver fires once on observe, so this also does the initial measure.
    const ro = new ResizeObserver(() => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(window.innerHeight + d);
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, [pinned, distance]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  return (
    <section
      ref={sectionRef}
      className={cn(!pinned && "py-section")}
      style={pinned && height ? { height } : undefined}
    >
      <div
        className={cn(pinned && "sticky top-0 flex h-dvh flex-col justify-center overflow-hidden")}
      >
        <div className="container-site">
          <SectionHeading label="05 — Work" title="Selected work" />
        </div>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          // Row layout only while pinned: before hydration and with reduced motion it's a grid,
          // so the track can never push the page wider than the viewport.
          className={cn(
            "container-site mt-12 gap-6",
            pinned ? "mx-0 flex w-max max-w-none flex-row" : "grid gap-y-16 md:grid-cols-2",
          )}
        >
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={pinned ? (i === 0 ? LEAD_CARD : CARD) : undefined}
            />
          ))}
          <Link
            href="/contact"
            className={cn(
              pinned && CARD,
              "rounded-card border-line-strong hover:border-accent group grid aspect-[16/10] place-items-center border border-dashed transition-colors",
            )}
          >
            <span className="font-display text-title flex items-center gap-4">
              Your project next
              <ArrowRight className="text-accent ease-out-expo size-8 transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
