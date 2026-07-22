'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { experience } from '@/data/experience'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/utils'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-[clamp(3rem,6vw,5.5rem)] overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/4 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-8 sm:mb-14"
        >
          <p className="section-label mb-3">02 — Experience</p>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.5rem)] text-white leading-tight">
            Where I&apos;ve <span className="text-gradient">Worked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-2 bottom-2 w-px hidden sm:block"
            style={{ background: 'linear-gradient(180deg, rgba(139,92,246,0.6), rgba(99,102,241,0.3), transparent)' }} />

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={fadeUpVariants}
                custom={i * 0.08}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-7 -translate-x-[calc(50%-0.5px)]">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-[#0a0a0a]"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${exp.accentColor}, ${exp.accentColor}88)`,
                      boxShadow: `0 0 12px ${exp.accentColor}55`,
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="glass-card gradient-border p-5 sm:p-7 group"
                  style={{ position: 'relative' }}
                >
                  {/* Current badge */}
                  {exp.current && (
                    <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-400"
                      style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Current
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex flex-col gap-1 mb-4 pr-16 sm:pr-20">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded text-white"
                        style={{ background: exp.accentColor + '33', border: `1px solid ${exp.accentColor}40` }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-gradient transition-all duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold" style={{ color: exp.accentColor }}>
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-zinc-600 font-mono mt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 italic mb-4">{exp.description}</p>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.accentColor + 'aa' }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04]">
                    {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
