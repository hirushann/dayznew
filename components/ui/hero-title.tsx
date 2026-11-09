import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Page <h1> with a masked word-by-word reveal. Pure CSS (.hero-word in globals.css), so it is
 * server-rendered, starts before hydration and waits for the preloader on a first visit.
 */
export function HeroTitle({
  text,
  accent,
  className,
}: {
  text: string;
  /** Exact word (including punctuation) to set in the accent serif. */
  accent?: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <h1 className={cn("font-display text-hero font-semibold tracking-tight", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={i} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
            <span
              className={cn(
                "hero-word",
                word === accent && "text-accent pr-[0.08em] font-serif font-normal italic",
              )}
              style={{ "--i": i } as CSSProperties}
            >
              {word}
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </h1>
  );
}
