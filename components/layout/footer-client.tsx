"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

/** Rendered client-only: reading the clock during prerender would freeze it into the static shell. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // shortOffset follows DST (Amsterdam is GMT+1 or GMT+2), so the label can't be hardcoded.
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "shortOffset",
    });
    const tick = () => setTime(format.format(new Date()).replace(/ (GMT.*)$/, " ($1)"));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [timeZone]);

  return <time className="tabular-nums">{time ?? "--:--"}</time>;
}

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
