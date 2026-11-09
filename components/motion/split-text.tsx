"use client";

import { motion } from "motion/react";
import { maskedLine, stagger, viewportOnce } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  staggerBy?: number;
  /** "mount" for above-the-fold text, "view" to wait until scrolled into view. */
  trigger?: "mount" | "view";
};

export function SplitText({
  text,
  as = "p",
  className,
  delay = 0,
  staggerBy = 0.06,
  trigger = "view",
}: SplitTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  const play =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: viewportOnce };

  return (
    <Tag className={className} initial="hidden" variants={stagger(staggerBy, delay)} {...play}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        // Padding/negative margin keeps descenders inside the mask.
        <span
          key={i}
          aria-hidden
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
        >
          <motion.span className="inline-block" variants={maskedLine}>
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
