'use client'

import React from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface MarqueeStripProps {
  items: string[]
  reverse?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function MarqueeStrip({ items, reverse = false, className = '', style }: MarqueeStripProps) {
  const prefersReducedMotion = useReducedMotion()

  const doubled = [...items, ...items]

  if (prefersReducedMotion) {
    return (
      <div className={`flex flex-wrap gap-3 py-4 ${className}`} style={style}>
        {items.map((item, i) => (
          <span key={i} className="text-xs font-mono text-zinc-600 uppercase tracking-widest">{item}</span>
        ))}
      </div>
    )
  }

  return (
    <div className={`marquee-wrapper py-4 ${className}`} style={style}>
      <div className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="text-xs font-mono text-zinc-600 uppercase tracking-[0.2em] whitespace-nowrap">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
