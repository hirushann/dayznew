"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Moves children by ±offset px across the element's pass through the viewport. */
export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}
