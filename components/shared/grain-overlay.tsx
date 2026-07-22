'use client'

import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function GrainOverlay() {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return null
  return <div className="grain-overlay" aria-hidden="true" />
}
