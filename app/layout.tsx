import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pranav Pradeep Abhyankar — Portfolio',
  description:
    'AI Engineer designing and shipping production multi-agent AI systems for enterprise clients. LangChain, LangGraph, LLMs, SAP, Celonis. Based in Bengaluru, India.',
  keywords: [
    'AI Engineer', 'Multi-Agent Systems', 'LangChain', 'LangGraph',
    'LLM Applications', 'Generative AI', 'RAG', 'Python', 'FastAPI',
    'SAP Integration', 'Celonis', 'Enterprise AI', 'Agentic AI',
    'OpenAI', 'Anthropic Claude', 'Google Gemini', 'Pranav Pradeep Abhyankar',
  ],
  authors: [{ name: 'Pranav Pradeep Abhyankar', url: 'https://github.com/pranav-abhyankar' }],
  creator: 'Pranav Pradeep Abhyankar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Pranav Pradeep Abhyankar — Portfolio',
    description: 'Designing and shipping production multi-agent AI systems for enterprise clients.',
    siteName: 'Pranav Pradeep Abhyankar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav Pradeep Abhyankar — Portfolio',
    description: 'AI Engineer building production multi-agent systems with LangGraph, LLMs, SAP & Celonis.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

// Injected before React hydrates — prevents flash of wrong theme
const THEME_SCRIPT = `
try {
  var t = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.add(t);
} catch(e) {
  document.documentElement.classList.add('dark');
}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
