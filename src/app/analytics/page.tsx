"use client"
import { useMemo, useState } from 'react'

type Gap = { name: string; score: number; tag: 'Very High' | 'High' | 'Medium' }

export default function AnalyticsPage() {
  const [tab, setTab] = useState<'Skill Analysis' | 'Market Trends' | 'Job Performance' | 'Geographic'>('Skill Analysis')

  const gaps: Gap[] = useMemo(() => (
    [
      { name: 'React', score: 85, tag: 'High' },
      { name: 'Python', score: 78, tag: 'Very High' },
      { name: 'AWS', score: 72, tag: 'High' },
      { name: 'Docker', score: 68, tag: 'Medium' },
      { name: 'TypeScript', score: 65, tag: 'High' },
      { name: 'Kubernetes', score: 58, tag: 'Medium' },
    ]
  ), [])

  const emerging = [
    { name: 'AI/ML', growth: '+245%', requests: 1847 },
    { name: 'Blockchain', growth: '+198%', requests: 892 },
    { name: 'DevOps', growth: '+156%', requests: 2341 },
    { name: 'Cloud Security', growth: '+134%', requests: 1456 },
    { name: 'Data Science', growth: '+89%', requests: 2987 },
  ]

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h1 className="text-3xl font-bold">Advanced Analytics</h1>
        <p className="text-[var(--text-secondary)] mt-1">Deep insights into skills, trends, and platform performance</p>
      </section>

      <div className="card p-2">
        <div className="grid grid-cols-4 gap-2">
          {(['Skill Analysis', 'Market Trends', 'Job Performance', 'Geographic'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 rounded-md text-sm ${tab === t ? 'bg-white/10 border border-white/10' : 'bg-white/5 border border-white/10 text-white/80'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold">Skill Gap Heatmap</h2>
          <p className="text-[var(--text-secondary)] text-sm">Most in-demand skills with highest gap scores</p>
          <div className="mt-4 space-y-4">
            {gaps.map(g => (
              <div key={g.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{g.name}</div>
                    <span className={`text-2xs px-2 py-0.5 rounded-full border ${g.tag === 'Very High' ? 'border-red-400 text-red-300' : g.tag === 'High' ? 'border-yellow-400 text-yellow-300' : 'border-blue-400 text-blue-300'}`}>{g.tag}</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">{g.score}%</div>
                </div>
                <div className="h-2 rounded bg-white/10 overflow-hidden">
                  <div className="h-full bg-[var(--accent)]" style={{ width: `${g.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-semibold">Emerging Skills</h2>
          <p className="text-[var(--text-secondary)] text-sm">Fastest growing skills by user interest</p>
          <div className="mt-4 space-y-3">
            {emerging.map(e => (
              <div key={e.name} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-md px-4 py-3">
                <div>
                  <div className="font-medium">{e.name}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{e.requests.toLocaleString()} requests</div>
                </div>
                <div className="text-xs text-green-400">{e.growth}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}



