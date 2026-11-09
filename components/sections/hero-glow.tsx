"use client";

import { motion, useSpring } from "motion/react";
import { useEffect } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

const DRIFT = { x: 240, y: 160 }; // max px the glow drifts toward the cursor

export function HeroGlow() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const x = useSpring(0, { stiffness: 40, damping: 20 });
  const y = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * DRIFT.x);
      y.set((e.clientY / window.innerHeight - 0.5) * DRIFT.y);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="hero-glow pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[min(70rem,150vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
    />
  );
}
