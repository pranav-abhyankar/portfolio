'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import React from 'react'
import { MapPin, GraduationCap, Briefcase, Globe2, Quote } from 'lucide-react'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/utils'
import { useCountUp } from '@/hooks/use-count-up'

const STATS = [
  { numeric: 10, suffix: '+', label: 'Production Agents', detail: 'shipped to enterprise clients' },
  { numeric: 8.7, suffix: '', label: 'CGPA — VIT', detail: 'B.Tech CSE (2022–2026)', decimal: true },
  { numeric: 5, suffix: '+', label: 'Processes Automated', detail: 'replacing manual triage' },
  { numeric: 20, suffix: '+', label: 'Open Source Contributions', detail: 'across multiple projects' },
]

function AnimatedStat({ numeric, suffix, label, detail, decimal, inView }: {
  numeric: number
  suffix: string
  label: string
  detail: string
  decimal?: boolean
  inView: boolean
}) {
  const count = useCountUp(decimal ? numeric * 10 : numeric, 1200, inView)
  const display = decimal ? (count / 10).toFixed(1) : count

  return (
    <div className="glass-card gradient-border p-5 text-center group">
      <div className="font-display font-bold text-3xl text-gradient-violet mb-1 tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-xs font-semibold text-zinc-300 mb-1 leading-tight">{label}</div>
      <div className="text-[10px] font-mono text-zinc-700 leading-tight">{detail}</div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-[clamp(3rem,6vw,5.5rem)] overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" ref={ref}>
        {/* Section label */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-8 sm:mb-14"
        >
          <p className="section-label mb-3">01 — About</p>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.5rem)] text-white leading-tight">
            The Engineer<br />
            Behind the <span className="text-gradient">Solutions</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          {/* Left — story */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {/* Pull quote */}
            <motion.div
              variants={fadeUpVariants}
              className="relative pl-5 py-1"
              style={{ borderLeft: '2px solid rgba(139,92,246,0.5)' }}
            >
              <Quote className="absolute -top-1 -left-0.5 w-4 h-4 text-violet-500/60 fill-violet-500/20" />
              <p className="text-lg sm:text-xl font-display font-medium text-white/90 leading-snug">
                Great AI starts with understanding the business problem.
              </p>
            </motion.div>

            <motion.p variants={fadeUpVariants} className="text-zinc-400 leading-relaxed text-[1.05rem] sm:text-lg">
              I enjoy taking ideas from ambiguity to deployment — working closely with stakeholders to understand the
              problem, designing scalable architectures, building{' '}
              <span className="text-violet-300 font-medium">intelligent systems</span>, integrating enterprise platforms,
              and delivering software that teams rely on every day.
            </motion.p>

            <motion.p variants={fadeUpVariants} className="text-zinc-400 leading-relaxed text-[1.05rem] sm:text-lg">
              My experience spans enterprise AI across supply chain, finance, and manufacturing — designing and delivering
              production-ready AI solutions that integrate{' '}
              <span className="text-cyan-400 font-medium">enterprise data, business workflows, and cloud platforms</span>{' '}
              to create measurable business value.
            </motion.p>

            {/* Meta info */}
            <motion.div variants={fadeUpVariants} className="pt-2 space-y-3">
              {[
                { icon: Briefcase, text: 'Junior Data Scientist @ OFI Services, Bengaluru' },
                { icon: GraduationCap, text: 'B.Tech CSE — Vellore Institute of Technology (2022–2026)' },
                { icon: MapPin, text: 'Bengaluru, Karnataka, India' },
                { icon: Globe2, text: 'English · Marathi · Hindi · Sanskrit · German' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-zinc-500">
                  <Icon className="w-3.5 h-3.5 text-violet-400/70 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* Right — stats + achievements */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {/* Stat cards — animated counters */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeUpVariants} custom={i * 0.05}>
                  <AnimatedStat {...stat} inView={inView} />
                </motion.div>
              ))}
            </div>

            {/* Achievements card */}
            <motion.div
              variants={fadeUpVariants}
              className="glass-card p-5"
              style={{ border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-violet-400/70 mb-4">
                Achievements
              </p>
              <div className="space-y-3">
                {[
                  { dot: 'bg-violet-400', text: 'Semi-Finalist — Providence LEAP Ideathon' },
                  { dot: 'bg-indigo-400', text: 'Hacktoberfest 2025 — SuperContributor' },
                  { dot: 'bg-cyan-400', text: '2 Published Research Papers in field of AI' },
                ].map(({ dot, text }) => (
                  <div key={text} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${dot} flex-shrink-0`} />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Currently section */}
            <motion.div
              variants={fadeUpVariants}
              className="glass-card p-5"
              style={{ border: '1px solid rgba(139,92,246,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/70">
                  Currently
                </p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Currently building enterprise AI solutions at{' '}
                <span className="text-violet-300 font-medium">OFI Services</span> · Open to AI Engineer,
                Generative AI Engineer, and AI Solutions Architect opportunities.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
