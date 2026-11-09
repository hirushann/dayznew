"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Card with a cursor-following spotlight, border glow and a slight 3D tilt (mouse only). */
export function SpotlightCard({
  children,
  className,
  tilt = 5,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, spring.soft);
  const rotateY = useSpring(0, spring.soft);

  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    // CSS vars instead of state: no re-render per pointer move.
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
    if (reduce || e.pointerType !== "mouse") return;
    rotateY.set((px - 0.5) * tilt * 2);
    rotateX.set((0.5 - py) * tilt * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        "group rounded-card border-line bg-surface-1 relative overflow-hidden border",
        className,
      )}
    >
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="border-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
