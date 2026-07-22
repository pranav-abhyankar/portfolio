'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Building2, Code2, Calendar, ArrowRight, Star, X } from 'lucide-react'
import { projects } from '@/data/projects'
import { fadeUpVariants } from '@/lib/utils'
import type { Project } from '@/types'

type Filter = 'all' | 'enterprise' | 'personal'

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--t-card-bg)', border: '1px solid var(--t-border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient top bar */}
        <div className="h-1 w-full rounded-t-2xl flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${project.gradientFrom}, ${project.gradientTo})` }} />

        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 pb-4">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
              >
                {project.domain}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400/80 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Featured
                </span>
              )}
              <span className="flex items-center gap-1 text-[11px] text-zinc-600 font-mono ml-auto">
                <Calendar className="w-3 h-3" />
                {project.date}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl text-white leading-snug">
              {project.title}
              <span className="text-zinc-500 font-normal"> — {project.subtitle}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-5">
          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed">{project.longDescription}</p>

          {/* Tech stack */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(t => (
                <span key={t} className="tag" style={{ color: project.accentColor + 'cc', borderColor: project.accentColor + '30', background: project.accentColor + '08' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-2">Key Highlights</p>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accentColor }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-2">Challenges</p>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-500 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50" style={{ background: project.accentColor }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Impact */}
          {project.impact && project.impact.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-2">Impact</p>
              <ul className="space-y-2">
                {project.impact.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.gradientTo }} />
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="pt-2 border-t border-white/[0.04] flex items-center gap-4">
            {project.links.github ? (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-violet-300 transition-colors">
                <Github className="w-3.5 h-3.5" />
                GitHub
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-700">
                <Building2 className="w-3.5 h-3.5" />
                Enterprise deployment — no public repo
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * 100
    const my = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mx', `${mx}%`)
    card.style.setProperty('--my', `${my}%`)
    const rx = (my - 50) * 0.12
    const ry = (mx - 50) * -0.12
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    setHovered(false)
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="holo-card group relative flex flex-col cursor-pointer"
      style={{
        border: `1px solid ${hovered ? 'rgba(139,92,246,0.2)' : 'var(--t-border)'}`,
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px ${project.accentColor}20` : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease',
        willChange: 'transform',
      }}
      onClick={() => onOpen(project)}
    >
      {/* Gradient top bar */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${project.gradientFrom}, ${project.gradientTo})` }}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 sm:p-6">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
            >
              {project.domain}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400/80 px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <Star className="w-2.5 h-2.5 fill-current" />
                Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-600 font-mono">
            <Calendar className="w-3 h-3" />
            {project.date}
          </div>
        </div>

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${project.accentColor}15` }}
        >
          {project.category === 'enterprise'
            ? <Building2 className="w-5 h-5" style={{ color: project.accentColor }} />
            : <Code2 className="w-5 h-5" style={{ color: project.accentColor }} />
          }
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base text-white leading-snug mb-1 group-hover:text-gradient transition-all duration-300">
          {project.title}
          <span className="text-zinc-500 font-normal"> — {project.subtitle}</span>
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {project.highlights.slice(0, 2).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accentColor + 'aa' }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="tag" style={{ color: project.accentColor + 'cc', borderColor: project.accentColor + '30', background: project.accentColor + '08' }}>
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="tag">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/[0.04]">
          {project.links.github ? (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-violet-300 transition-colors">
              <Github className="w-3.5 h-3.5" />
              GitHub
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-700">
              <Building2 className="w-3.5 h-3.5" />
              Enterprise deployment
            </span>
          )}

          <motion.div
            animate={{ opacity: hovered ? 1 : 0.5, x: hovered ? 0 : -2 }}
            transition={{ duration: 0.15 }}
            className="ml-auto flex items-center gap-1 text-xs font-mono"
            style={{ color: project.accentColor }}
          >
            View details
            <ArrowRight className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="relative py-[clamp(3rem,6vw,5.5rem)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/4 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-8 sm:mb-14"
        >
          <p className="section-label mb-3">03 — Projects</p>
          <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.5rem)] text-white leading-tight">
            Systems I&apos;ve <span className="text-gradient">Shipped</span>
          </h2>
          <p className="text-zinc-500 mt-3 max-w-lg text-sm leading-relaxed">
            Enterprise-grade multi-agent platforms built and deployed to production.
            Every project below is a system real clients depend on.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.1}
          className="flex flex-wrap gap-2 mb-8 sm:mb-10"
        >
          {(['all', 'enterprise', 'personal'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                filter === f
                  ? 'text-white shadow-lg'
                  : 'border text-zinc-500 hover:text-zinc-200'
              }`}
              style={filter === f
                ? { background: 'linear-gradient(135deg, #7c3aed, #6366f1)', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }
                : { borderColor: 'rgba(255,255,255,0.06)', background: 'transparent' }
              }
            >
              {f === 'all' ? 'All Projects' : f === 'enterprise' ? 'Enterprise' : 'Personal'}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
