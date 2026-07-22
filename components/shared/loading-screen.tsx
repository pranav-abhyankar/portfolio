'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  { text: 'Understanding business problem...', delay: 0 },
  { text: 'Designing solution architecture...', delay: 0.12 },
  { text: 'Building intelligent workflows...', delay: 0.24 },
  { text: 'Integrating enterprise systems...', delay: 0.36 },
  { text: 'Deploying production solution...', delay: 0.48 },
  { text: 'Ready.', delay: 0.6, highlight: true },
]

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)
  const [lines, setLines] = useState<number[]>([])

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, i])
      }, line.delay * 1000 + 200)
    })

    const totalTime = (BOOT_LINES[BOOT_LINES.length - 1].delay + 0.6) * 1000 + 400
    const done = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 350)
    }, totalTime)

    return () => clearTimeout(done)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#080808' }}
          exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-0 right-0 h-px bg-violet-500/20"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="w-full max-w-lg px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono font-bold text-sm text-white tracking-widest">PRANAV</span>
                <span className="font-mono text-sm text-zinc-600">//</span>
                <span className="font-mono text-sm text-violet-400 tracking-widest">AI DEVELOPER</span>
              </div>
              <div className="h-px w-full bg-white/10" />
            </motion.div>

            {/* Boot lines */}
            <div className="space-y-2">
              <AnimatePresence>
                {lines.map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`font-mono text-sm flex items-center gap-2 ${
                      BOOT_LINES[i].highlight
                        ? 'text-white font-semibold'
                        : 'text-zinc-500'
                    }`}
                  >
                    {BOOT_LINES[i].text}
                    {i === lines[lines.length - 1] && !BOOT_LINES[i].highlight && (
                      <span className="inline-block w-2 h-3.5 bg-zinc-400 animate-cursor-blink" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <motion.div
              className="mt-10 h-px w-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #6366f1, #06b6d4)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>

            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-3 font-mono text-[10px] text-zinc-700 text-right"
            >
              {Math.round((lines.length / BOOT_LINES.length) * 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
