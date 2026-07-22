'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Star, GitFork, Activity, Users } from 'lucide-react'
import { fadeUpVariants } from '@/lib/utils'

interface GithubUser {
  public_repos: number
  followers: number
  following: number
  name: string
}

interface GithubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
}

export default function GithubStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [user, setUser] = useState<GithubUser | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/pranav-abhyankar'),
          fetch('https://api.github.com/users/pranav-abhyankar/repos?per_page=6&sort=updated'),
        ])
        if (userRes.ok) setUser(await userRes.json())
        if (reposRes.ok) {
          const data: GithubRepo[] = await reposRes.json()
          setRepos(data.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4))
        }
      } catch {
        // GitHub API unavailable — graceful degradation
      } finally {
        setLoading(false)
      }
    }
    if (inView) fetchData()
  }, [inView])

  const LANG_COLORS: Record<string, string> = {
    Python: '#3776ab',
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Java: '#ed8b00',
  }

  return (
    <section className="relative py-16 overflow-hidden" ref={ref}>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 text-zinc-600 text-sm font-mono">
            <Github className="w-4 h-4" />
            <a
              href="https://github.com/pranav-abhyankar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-300 transition-colors"
            >
              github.com/pranav-abhyankar
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        {!loading && user && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.1}
            className="flex flex-wrap items-center justify-center gap-8 mb-8"
          >
            {[
              { icon: Activity, value: `${user.public_repos}`, label: 'Repositories' },
              { icon: Users, value: `${user.followers}`, label: 'Followers' },
              { icon: Star, value: '20+', label: 'OSS Contributions' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 text-zinc-500">
                <Icon className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-mono text-sm text-zinc-300 font-semibold">{value}</span>
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Repos grid */}
        {!loading && repos.length > 0 && (
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.2}
            className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
          >
            {repos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 p-4 rounded-xl text-left transition-all duration-200 hover:-translate-y-1 group"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.2)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-zinc-300 font-medium group-hover:text-violet-300 transition-colors">
                    {repo.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
                {repo.description && (
                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                )}
                {repo.language && (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-700">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: LANG_COLORS[repo.language] || '#8b8b8b' }}
                    />
                    {repo.language}
                  </div>
                )}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
