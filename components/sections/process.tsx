"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { processSteps } from "@/content/company";

export function Process({ label = "04 — How we work" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="container-site py-section grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <p className="micro-label">[ {label} ]</p>
          <SplitText
            as="h2"
            text="Project journey with DayZ Solutions"
            className="font-display text-display mt-6 font-semibold tracking-tight"
          />
          <p className="text-lead text-fg-muted mt-6 max-w-md">
            Six steps from the first conversation to long-term support.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative pl-10 lg:col-span-6 lg:col-start-7">
        <div aria-hidden className="bg-line absolute top-2 bottom-2 left-0 w-px">
          <motion.div style={{ scaleY }} className="bg-accent h-full w-full origin-top" />
        </div>
        <ol className="space-y-16">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="bg-accent ring-bg absolute top-2 -left-10 size-2.5 -translate-x-1/2 rounded-full ring-4"
              />
              <Reveal>
                <p className="text-accent font-mono text-xs">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display mt-2 text-2xl font-medium md:text-3xl">{step.title}</h3>
                <p className="text-fg-muted mt-3 max-w-lg">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
