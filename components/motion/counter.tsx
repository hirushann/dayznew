"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { ease, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Counter({
  to,
  suffix = "",
  decimals = 0,
  seconds = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  seconds?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewportOnce);
  const reduce = useReducedMotion();

  // SSR renders the final value; once hydrated we zero it and count up when in view.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!inView) {
      el.textContent = `${(0).toFixed(decimals)}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: seconds,
      ease: ease.out,
      onUpdate: (v) => (el.textContent = `${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix, decimals, seconds]);

  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sr-only">{`${to.toFixed(decimals)}${suffix}`}</span>
      <span ref={ref} aria-hidden>
        {`${to.toFixed(decimals)}${suffix}`}
      </span>
    </span>
  );
}
