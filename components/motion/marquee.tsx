import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pure CSS marquee: two identical tracks each slide -100%, so the loop is seamless. */
export function Marquee({
  children,
  className,
  seconds = 40,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  seconds?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 || undefined}
          className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{
            animationDuration: `${seconds}s`,
            animationDirection: reverse ? "reverse" : undefined,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
