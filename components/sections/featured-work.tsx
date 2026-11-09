"use client";

import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/content/work";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

// Widths are also capped by viewport height (16:10 art + heading + caption ≈ 100dvh - 21rem)
// so pinned cards never overflow the screen. The lead project (our own product) is larger.
const CARD = "w-full shrink-0 lg:w-[min(60vw,56rem,(100dvh-21rem)*1.36)]";
const LEAD_CARD = "w-full shrink-0 lg:w-[min(72vw,68rem,(100dvh-21rem)*1.6)]";

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
          className="container-site mt-12 flex flex-col gap-6 lg:mx-0 lg:w-max lg:max-w-none lg:flex-row"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={i === 0 ? LEAD_CARD : CARD}
            />
          ))}
          <Link
            href="/contact"
            className={cn(
              CARD,
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
