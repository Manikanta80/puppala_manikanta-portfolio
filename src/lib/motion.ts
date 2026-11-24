// Centralized motion system for Aqua Flow 3.0
import type { Transition, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

// Reduced motion detection hook
export const useReducedMotion = (defaultValue = false) => {
  const [reduced, setReduced] = useState(defaultValue)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mediaQuery.matches)
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reduced
}

// Shared easing curves — consistent across the whole experience
export const easing = {
  liquid: [0.4, 0, 0.2, 1] as const,
  smooth: [0.23, 1, 0.32, 1] as const,
  gentle: [0.25, 0.1, 0.25, 1] as const,
}

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.1,
}

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
  mass: 0.8,
}

// Reusable entrance variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

// Headline character reveal
export const charReveal: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: duration.base, ease: easing.smooth },
  }),
}

// Ambient float (shared by hero portrait, floating labels)
export const floatLoop: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
}

// Viewport-triggered reveal helper
export const viewportOnce = { once: true, amount: 0.25 }

export default {
  easing,
  duration,
  spring,
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  charReveal,
  floatLoop,
  viewportOnce,
  useReducedMotion,
}