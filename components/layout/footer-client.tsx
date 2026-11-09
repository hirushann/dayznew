"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timezone,
  hour: "2-digit",
  minute: "2-digit",
});

/** Rendered client-only: reading the clock during prerender would freeze it into the static shell. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(timeFormat.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return <time className="tabular-nums">{time ?? "--:--"} (GMT+5:30)</time>;
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
