"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { ease } from "@/lib/motion";

// Client-only flag: the first mount (initial load) is covered by the preloader, so skip the curtain.
let hasMounted = false;

/**
 * Templates remount on every navigation, so this plays an enter transition per route:
 * a curtain wipes up and the page eases in.
 * shortcut: enter-only — App Router unmounts the old page instantly, so a true exit
 * animation would need intercepted links; add a TransitionLink if exits are wanted.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [isFirst] = useState(() => typeof window === "undefined" || !hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <>
      {!isFirst && (
        <motion.div
          aria-hidden
          className="bg-surface-2 border-accent pointer-events-none fixed inset-0 z-[70] border-b-2"
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: ease.inOut }}
        />
      )}
      <motion.div
        initial={isFirst ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: ease.out }}
      >
        {children}
      </motion.div>
    </>
  );
}
