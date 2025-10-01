"use client"
import { useEffect, useState } from 'react'

type SkillCount = { skill: string; count: number }

export default function SkillsDashboardPage() {
  const [topSkills, setTopSkills] = useState<SkillCount[]>([])
  const [topMissing, setTopMissing] = useState<SkillCount[]>([])
  const [errors, setErrors] = useState<{ resumeId: string; userId: string }[]>([])

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(d => { setTopSkills(d.topSkills); setTopMissing(d.topMissing); setErrors(d.errors) })
  }, [])

  const skillsTracked = topSkills.length + topMissing.length
  const activeUsers = 9742 // placeholder to mirror screenshot
  const marketDemand = 87.3
  const avgGrowth = 16.8

  return (
    <div className="grid gap-6">
      <section className="card p-6">
        <h1 className="text-3xl font-bold">Skill Graph Analytics</h1>
        <p className="text-[var(--text-secondary)] mt-1">Comprehensive skill analysis and market demand insights</p>
      </section>

      {/* KPI tiles */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Skills Tracked</div>
          <div className="mt-2 text-3xl font-bold">{(2847).toLocaleString()}</div>
          <div className="mt-1 text-xs text-green-400">+89 new this month</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Active Users</div>
          <div className="mt-2 text-3xl font-bold">{activeUsers.toLocaleString()}</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">With skill assessments</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Market Demand</div>
          <div className="mt-2 text-3xl font-bold">{marketDemand}%</div>
          <div className="mt-1 text-xs text-green-400">High demand skills</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Avg Skill Growth</div>
          <div className="mt-2 text-3xl font-bold">{avgGrowth}%</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">Month over month</div>
        </div>
      </div>

      <div className="card p-2">
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-md text-sm bg-white/10 border border-white/10">Popular Skills</button>
          <button className="px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 text-white/80">Skill Gaps</button>
          <button className="px-3 py-2 rounded-md text-sm bg-white/5 border border-white/10 text-white/80">User Distribution</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold">Top Extracted Skills</h2>
          <div className="mt-4 space-y-2">
            {topSkills.length === 0 && <div className="text-white/60 text-sm">No data.</div>}
            {topSkills.map((s) => (
              <div key={s.skill} className="flex items-center gap-3">
                <div className="w-32 text-sm text-white/80 capitalize">{s.skill}</div>
                <div className="flex-1 h-2 rounded bg-white/10 overflow-hidden">
                  <div className="h-full bg-brand-500" style={{ width: `${Math.min(100, s.count * 10)}%` }} />
                </div>
                <div className="w-10 text-right text-sm text-white/70">{s.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold">Top Missing Skills</h2>
          <div className="mt-4 space-y-2">
            {topMissing.length === 0 && <div className="text-white/60 text-sm">No data.</div>}
            {topMissing.map((s) => (
              <div key={s.skill} className="flex items-center gap-3">
                <div className="w-32 text-sm text-white/80 capitalize">{s.skill}</div>
                <div className="flex-1 h-2 rounded bg-white/10 overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${Math.min(100, s.count * 10)}%` }} />
                </div>
                <div className="w-10 text-right text-sm text-white/70">{s.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold">Parsing Error Logs</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-4 py-3">Resume</th>
                <th className="text-left px-4 py-3">User</th>
              </tr>
            </thead>
            <tbody>
              {errors.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-white/60" colSpan={2}>No errors.</td>
                </tr>
              )}
              {errors.map(e => (
                <tr key={e.resumeId} className="border-t border-white/5">
                  <td className="px-4 py-3">{e.resumeId}</td>
                  <td className="px-4 py-3">{e.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

