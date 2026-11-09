"use client";

import { motion, useSpring } from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/content/company";
import { spring } from "@/lib/motion";

export function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(0, spring.soft);
  const y = useSpring(0, spring.soft);

  const onMove = (e: PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const ActiveIcon = active === null ? null : industries[active].icon;

  return (
    <section className="container-site py-section">
      <SectionHeading label="03 — Industries" title="Industries we serve" />

      <div
        ref={ref}
        className="relative mt-16"
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
      >
        <ul className="border-line border-t">
          {industries.map((industry, i) => (
            <li
              key={industry.name}
              className="group border-line border-b"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            >
              <div className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-10">
                <span className="text-fg-muted font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-title ease-out-expo flex-1 transition-transform duration-500 group-hover:translate-x-4">
                  {industry.name}
                </h3>
                {industry.detail && (
                  <p className="text-fg-muted md:max-w-xs md:text-right">{industry.detail}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Cursor-following preview tile (mouse only; touch never sets `active`). */}
        <motion.div
          aria-hidden
          style={{ x, y }}
          animate={{ scale: active === null ? 0 : 1, opacity: active === null ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-card bg-accent text-accent-ink pointer-events-none absolute top-0 left-0 hidden size-44 -translate-x-1/2 -translate-y-1/2 place-items-center md:grid"
        >
          {ActiveIcon && <ActiveIcon className="size-16" strokeWidth={1.25} />}
        </motion.div>
      </div>
    </section>
  );
}
