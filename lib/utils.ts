import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom font sizes, otherwise it treats `text-hero` etc. as colours
// and `cn("text-hero", "text-fg-muted")` would drop one of them.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["hero", "display", "title", "lead"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
