'use client'

import { useScrollProgress } from '@/hooks/use-scroll'
import { motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  const springProgress = useSpring(progress, { stiffness: 200, damping: 40 })

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: springProgress }}
    />
  )
}
