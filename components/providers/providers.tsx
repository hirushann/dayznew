"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { MotionConfig, cancelFrame, frame, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  // Drive Lenis from Motion's frame loop so scroll and useScroll update in the same tick.
  useEffect(() => {
    if (reduce) return;
    const update = ({ timestamp }: { timestamp: number }) =>
      lenisRef.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);

  // reducedMotion="user": Motion drops transform animations and keeps opacity for those users.
  return (
    <MotionConfig reducedMotion="user">
      {reduce ? (
        children
      ) : (
        <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1 }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
