"use client";

import { Search } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const QUERY = "snekers";
// Illustrative results for the demo, not real store data.
const RESULTS = ["Sneakers", "Sneaker socks", "Sneaker cleaning kit"];
const TYPE_START = 400; // ms after entering view
const TYPE_STEP = 110; // ms per character
const RESULTS_AFTER = 250; // ms after the last character

/** Decorative demo: types a misspelled query, then shows the corrected result first. */
export function MockSearch({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    const timers = [...QUERY].map((_, i) =>
      setTimeout(() => setTyped(i + 1), TYPE_START + i * TYPE_STEP),
    );
    timers.push(
      setTimeout(() => setShowResults(true), TYPE_START + QUERY.length * TYPE_STEP + RESULTS_AFTER),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  // Reduced motion: skip the typing and show the finished state.
  const done = reduce || showResults;
  const text = reduce ? QUERY : QUERY.slice(0, typed);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Demo: searching “${QUERY}” returns “${RESULTS[0]}” as the first result.`}
      className={cn(
        "rounded-card border-line bg-surface-1 border p-3 shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="border-line-strong bg-bg flex items-center gap-3 rounded-xl border px-4 py-3.5">
        <Search className="text-fg-muted size-5 shrink-0" aria-hidden />
        <span className="font-mono text-base md:text-lg">{text}</span>
        <span
          aria-hidden
          className={cn("bg-accent -ml-2 h-5 w-px", !done && "animate-pulse", done && "opacity-0")}
        />
        <span
          className={cn(
            "text-accent ml-auto font-mono text-xs transition-opacity duration-300",
            done ? "opacity-100" : "opacity-0",
          )}
        >
          4.4 ms
        </span>
      </div>
      <ul className="mt-2 space-y-1">
        {RESULTS.map((result, i) => (
          <motion.li
            key={result}
            initial={false}
            animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: done ? i * 0.08 : 0, duration: 0.4, ease: ease.out }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl px-4 py-3",
              i === 0 && "bg-surface-2",
            )}
          >
            <span className="flex items-center gap-3">
              <span className="bg-line size-9 shrink-0 rounded-lg" />
              <span className={cn(i === 0 && "font-medium")}>{result}</span>
            </span>
            {i === 0 && (
              <span className="text-accent font-mono text-[0.6875rem] tracking-wider uppercase">
                Typo fixed
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
