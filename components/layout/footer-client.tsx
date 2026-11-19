"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0 }))}
      className="hover:text-fg inline-flex items-center gap-2 transition-colors"
    >
      Back to top <ArrowUp className="size-4" />
    </button>
  );
}
