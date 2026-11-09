"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { spring } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";

const INTERACTIVE = "[data-cursor], a, button, [role=button], input, textarea, select, label";

/** Dot + lagging ring. Add data-cursor="View" to any element to show a label. */
export function Cursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, spring.cursor);
  const ringY = useSpring(y, spring.cursor);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element).closest<HTMLElement>(INTERACTIVE);
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="bg-accent absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x, y }}
      />
      <motion.div
        className="border-fg/40 absolute top-0 left-0 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: label ? 0 : hovering ? 1.6 : 1, opacity: label ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      />
      <AnimatePresence>
        {label && (
          <motion.div
            key="label"
            className="bg-accent text-accent-ink absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 font-mono text-xs tracking-wider uppercase"
            style={{ x: ringX, y: ringY }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
