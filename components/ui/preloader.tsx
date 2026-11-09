"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { INTRO_KEY, ease } from "@/lib/motion";

/**
 * First visit per session: logo in → progress line → curtain wipe (~1.8s total).
 * Repeat visits are hidden before paint by the inline script in app/layout.tsx.
 * The curtain is paper-coloured so the full-colour logo reads correctly.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Storage blocked: the intro just plays again next time.
    }
  }, []);

  if (done) return null;

  return (
    <motion.div
      data-preloader
      aria-hidden
      className="bg-paper fixed inset-0 z-[90] grid place-items-center"
      animate={{ y: "-100%" }}
      transition={{ delay: 1.2, duration: 0.6, ease: ease.inOut }}
      onAnimationComplete={() => {
        // Later client-side visits to the home page skip the hero's preloader delay.
        document.documentElement.dataset.intro = "seen";
        setDone(true);
      }}
    >
      <motion.div
        className="w-56"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: ease.out }}
      >
        <Image
          src="/brand/brand-logo.png"
          alt={site.name}
          width={1737}
          height={715}
          sizes="224px"
          fetchPriority="high"
          loading="eager"
        />
        <div className="bg-paper-fg/10 mt-6 h-px overflow-hidden">
          <motion.div
            className="bg-navy h-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: ease.inOut }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
