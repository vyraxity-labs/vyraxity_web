import {
  useReducedMotion as useMotionReducedMotion,
  type Transition,
  type Variants,
} from 'motion/react';

export const motionDurations = {
  micro: 0.18, // 150–200ms — button hover, link states
  linkHover: 0.15, // 120–180ms
  standard: 0.5, // 400–600ms — cards/content entering viewport
  narrative: 1.0, // 800–1200ms — hero / major visual transitions
  ambientMin: 8, // seconds — generative background, slow end
  ambientMax: 30, // seconds — generative background, slow end
} as const;

export const easeStandard = [0.16, 1, 0.3, 1] as const; // confident, non-bouncy ease-out

export const transitionStandard: Transition = {
  duration: motionDurations.standard,
  ease: easeStandard,
};

export const transitionNarrative: Transition = {
  duration: motionDurations.narrative,
  ease: easeStandard,
};

export const transitionMicro: Transition = {
  duration: motionDurations.micro,
  ease: easeStandard,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionStandard,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionStandard,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionStandard,
  },
};

export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Re-export useReducedMotion from motion/react for centralized import from @/lib/motion
 */
export const useReducedMotion = useMotionReducedMotion;
