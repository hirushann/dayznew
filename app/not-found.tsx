import Link from "next/link";
import type { CSSProperties } from "react";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-dvh place-items-center overflow-hidden pt-32 pb-20 text-center">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div className="container-site">
        <p className="micro-label">[ Error 404 ]</p>
        {/* Digits bob out of phase; the middle 0 spins like it's still looking for the page. */}
        <p
          aria-hidden
          className="font-display mt-4 flex justify-center text-[clamp(7rem,30vw,22rem)] leading-none font-semibold tracking-tighter"
        >
          <span className="bob-digit" style={{ "--i": 0 } as CSSProperties}>
            4
          </span>
          <span className="bob-digit" style={{ "--i": 1 } as CSSProperties}>
            <span className="spin-digit text-accent font-serif font-normal italic">0</span>
          </span>
          <span className="bob-digit" style={{ "--i": 2 } as CSSProperties}>
            4
          </span>
        </p>
        <h1 className="font-display text-title mt-6 font-semibold tracking-tight">
          This page is having a day off.
        </h1>
        <p className="text-fg-muted mt-4">The link may be broken, or the page may have moved.</p>
        <Link href="/" className={buttonClass("primary", "mt-10")}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
