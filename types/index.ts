export interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  category: 'enterprise' | 'personal'
  featured: boolean
  date: string
  tech: string[]
  highlights: string[]
  challenges: string[]
  impact: string[]
  links: {
    github?: string
    demo?: string
    case_study?: string
  }
  accentColor: string
  gradientFrom: string
  gradientTo: string
  tags: string[]
  domain: string
}

export interface Experience {
  role: string
  company: string
  companyUrl?: string
  location: string
  period: string
  current: boolean
  type: 'full-time' | 'internship' | 'contract'
  description: string
  bullets: string[]
  tech: string[]
  accentColor: string
}

export interface SkillGroup {
  category: string
  icon: string
  description: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level?: 'expert' | 'proficient' | 'familiar'
  highlight?: boolean
}

export interface Certification {
  name: string
  provider: string
  shortCode: string
  year?: number
  credential?: string
  color: string
}

export interface NavItem {
  label: string
  href: string
}
