"use client"
import { useEffect, useState } from 'react'

type Track = { id: string; name: string; steps: { id: string; title: string }[]; assignedUserIds: string[] }

export default function TracksPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [name, setName] = useState('')
  const [userIds, setUserIds] = useState('')

  useEffect(() => { fetch('/api/tracks').then(r => r.json()).then(d => setTracks(d.tracks)) }, [])

  const create = async () => {
    const r = await fetch('/api/tracks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    const d = await r.json(); setTracks([d.track, ...tracks]); setName('')
  }

  const assign = async (id: string) => {
    const ids = userIds.split(',').map(s => s.trim()).filter(Boolean)
    const r = await fetch(`/api/tracks/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userIds: ids }) })
    const d = await r.json(); setTracks(prev => prev.map(t => t.id === id ? d.track : t)); setUserIds('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Learning Tracks</h1>
        <p className="text-[var(--text-secondary)] mt-1">Create tracks and assign to users</p>
      </div>

      <div className="card p-6 grid gap-3">
        <div className="grid md:grid-cols-3 gap-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Track name" className="input-field" />
          <button onClick={create} className="btn-secondary">Create Track</button>
          <input value={userIds} onChange={e => setUserIds(e.target.value)} placeholder="Assign user IDs (comma separated)" className="input-field" />
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[var(--border)]">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium">Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Steps</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Assigned Users</th>
              <th className="text-right px-6 py-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {tracks.map(t => (
              <tr key={t.id}>
                <td className="px-6 py-4">{t.name}</td>
                <td className="px-6 py-4">{t.steps.map(s => s.title).join(', ') || '—'}</td>
                <td className="px-6 py-4">{t.assignedUserIds.join(', ') || '—'}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => assign(t.id)} className="px-3 py-1.5 rounded-md bg-brand-500 hover:bg-brand-400 text-white text-xs">Assign Users</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



