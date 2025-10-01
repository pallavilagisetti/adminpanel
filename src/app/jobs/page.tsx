"use client"
import { useEffect, useMemo, useState } from 'react'

type Job = {
  id: string
  title: string
  company: string
  location: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All')
  const [activeCount, setActiveCount] = useState(0)
  const [applications, setApplications] = useState(8942)
  const [avgSalary, setAvgSalary] = useState('$142k')
  const [remotePct, setRemotePct] = useState(68)

  useEffect(() => {
    fetch('/api/jobs').then(r => r.json()).then(d => {
      setJobs(d.jobs)
      const active = d.jobs.filter((j: Job) => j.status === 'approved').length
      setActiveCount(active)
    })
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'All') return jobs
    const map: Record<string, Job['status']> = { Pending: 'pending', Approved: 'approved', Rejected: 'rejected' }
    return jobs.filter(j => j.status === map[filter])
  }, [jobs, filter])

  const approve = async (job: Job) => {
    const res = await fetch(`/api/jobs/${job.id}/approve`, { method: 'POST' })
    if (res.ok) {
      const { job: updated } = await res.json()
      setJobs(prev => prev.map(j => j.id === updated.id ? updated : j))
    }
  }

  const reject = async (job: Job) => {
    const res = await fetch(`/api/jobs/${job.id}/reject`, { method: 'POST' })
    if (res.ok) {
      const { job: updated } = await res.json()
      setJobs(prev => prev.map(j => j.id === updated.id ? updated : j))
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI tiles */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Active Jobs</div>
          <div className="mt-2 text-3xl font-bold">{activeCount.toLocaleString()}</div>
          <div className="mt-1 text-xs text-green-400">+67 this week</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Applications</div>
          <div className="mt-2 text-3xl font-bold">{applications.toLocaleString()}</div>
          <div className="mt-1 text-xs text-green-400">+234 today</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Avg Salary</div>
          <div className="mt-2 text-3xl font-bold">{avgSalary}</div>
          <div className="mt-1 text-xs text-green-400">+8.2% vs last quarter</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Remote Jobs</div>
          <div className="mt-2 text-3xl font-bold">{remotePct}%</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">847 remote positions</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Job Ingestion</h1>
          <p className="text-[var(--text-secondary)] mt-1">Moderate incoming jobs and manage matching</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value as any)} className="input-field">
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[var(--border)]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Title</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Company</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Location</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(j => (
                <tr key={j.id} className="hover:bg-[var(--border)]/50 transition-colors">
                  <td className="px-6 py-4">{j.title}</td>
                  <td className="px-6 py-4">{j.company}</td>
                  <td className="px-6 py-4">{j.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      j.status === 'approved' ? 'bg-green-100 text-green-800' : j.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {j.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => approve(j)} disabled={j.status !== 'pending'} className="px-3 py-1.5 rounded-md bg-green-500 enabled:hover:bg-green-600 disabled:opacity-50 text-white text-xs">Approve</button>
                      <button onClick={() => reject(j)} disabled={j.status !== 'pending'} className="px-3 py-1.5 rounded-md bg-red-500 enabled:hover:bg-red-600 disabled:opacity-50 text-white text-xs">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



