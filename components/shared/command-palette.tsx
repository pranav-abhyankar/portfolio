'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Github, Linkedin, Mail, ExternalLink, Code2, User, Briefcase, Award, MessageSquare, X } from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  category: string
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const scrollTo = useCallback((id: string) => {
    onClose()
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [onClose])

  const commands: CommandItem[] = [
    { id: 'about', label: 'About', description: 'Who Pranav is and what he builds', icon: User, action: () => scrollTo('about'), category: 'Navigate' },
    { id: 'projects', label: 'Projects', description: 'Multi-agent systems and AI applications', icon: Code2, action: () => scrollTo('projects'), category: 'Navigate' },
    { id: 'experience', label: 'Experience', description: 'Career timeline and achievements', icon: Briefcase, action: () => scrollTo('experience'), category: 'Navigate' },
    { id: 'skills', label: 'Skills', description: 'AI/ML stack and tooling', icon: Code2, action: () => scrollTo('skills'), category: 'Navigate' },
    { id: 'certifications', label: 'Certifications', description: '8 industry certifications', icon: Award, action: () => scrollTo('certifications'), category: 'Navigate' },
    { id: 'contact', label: 'Contact', description: 'Get in touch', icon: MessageSquare, action: () => scrollTo('contact'), category: 'Navigate' },
    { id: 'github', label: 'GitHub', description: 'github.com/pranav-abhyankar', icon: Github, action: () => window.open('https://github.com/pranav-abhyankar', '_blank'), category: 'Links' },
    { id: 'linkedin', label: 'LinkedIn', description: 'linkedin.com/in/pranav-abhyankar', icon: Linkedin, action: () => window.open('https://linkedin.com/in/pranav-abhyankar', '_blank'), category: 'Links' },
    { id: 'email', label: 'Send Email', description: 'pranavabhyankar92@gmail.com', icon: Mail, action: () => window.location.href = 'mailto:pranavabhyankar92@gmail.com', category: 'Links' },
  ]

  const filtered = query
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  useEffect(() => setSelected(0), [query])

  useEffect(() => {
    if (!open) { setQuery(''); setSelected(0) }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && filtered[selected]) { filtered[selected].action() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected, onClose])

  // Group by category
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, CommandItem[]>)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="cmd-overlay"
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="w-full max-w-xl mx-4 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(16,16,20,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05]">
              <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search or jump to..."
                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 outline-none font-mono"
              />
              <button onClick={onClose} className="p-1 text-zinc-600 hover:text-zinc-400 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="px-5 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-700">
                    {category}
                  </p>
                  {items.map((item) => {
                    const idx = filtered.indexOf(item)
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelected(idx)}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-100 ${
                          selected === idx ? 'bg-violet-500/10' : ''
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selected === idx ? 'bg-violet-500/20' : 'bg-white/[0.03]'
                        }`}>
                          <item.icon className={`w-3.5 h-3.5 ${selected === idx ? 'text-violet-300' : 'text-zinc-500'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${selected === idx ? 'text-violet-200' : 'text-zinc-300'}`}>
                            {item.label}
                          </p>
                          {item.description && (
                            <p className="text-xs text-zinc-600 truncate">{item.description}</p>
                          )}
                        </div>
                        {selected === idx && (
                          <ArrowRight className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-5 py-8 text-center text-sm text-zinc-600 font-mono">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-700">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">esc</kbd>
                  close
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-700">
                <ExternalLink className="w-3 h-3" />
                pranav.dev
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
