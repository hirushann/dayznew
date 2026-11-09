import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-pill border-accent/40 bg-accent/10 text-accent inline-flex items-center border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wider whitespace-nowrap uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
