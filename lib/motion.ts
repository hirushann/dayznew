import type { Transition, Variants } from "motion/react";

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  hover: 0.25,
  reveal: 0.9,
  slow: 1.2,
} as const;

export const spring = {
  magnetic: { stiffness: 180, damping: 15, mass: 0.4 },
  soft: { stiffness: 150, damping: 20 },
  cursor: { stiffness: 350, damping: 30, mass: 0.5 },
} as const;

export const viewportOnce = { once: true, margin: "-10%" } as const;

export const revealTransition: Transition = { duration: duration.reveal, ease: ease.out };

/** Pass the delay (s) through Motion's `custom` prop. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...revealTransition, delay },
  }),
};

/** Child of an overflow-hidden mask: slides up from below the line. */
export const maskedLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: revealTransition },
};

/** Small lift for menu items and other compact UI. */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: ease.out } },
};

export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** sessionStorage flag: preloader already shown this session. */
export const INTRO_KEY = "dz-intro";
