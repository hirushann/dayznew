"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

export function Reveal({ delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    />
  );
}
