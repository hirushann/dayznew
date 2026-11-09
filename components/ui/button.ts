import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-medium transition-colors duration-300";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-fg",
  ghost: "border border-line-strong text-fg hover:border-fg",
} as const;

export function buttonClass(variant: keyof typeof variants = "primary", className?: string) {
  return cn(base, variants[variant], className);
}
