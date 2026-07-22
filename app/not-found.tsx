import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-violet-600/10 blur-[80px] rounded-full" />
        <div className="relative">
          <p className="font-mono text-[120px] font-bold leading-none text-gradient-violet opacity-20 select-none">
            404
          </p>
          <div className="-mt-8">
            <p className="font-mono text-xs text-violet-400/70 uppercase tracking-widest mb-3">
              Page not found
            </p>
            <h1 className="font-display font-bold text-3xl text-white mb-3">
              This route doesn&apos;t exist
            </h1>
            <p className="text-zinc-500 text-sm mb-8 max-w-sm mx-auto">
              The agent returned no results for this path. Let&apos;s get you back to the orchestrator.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)' }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
