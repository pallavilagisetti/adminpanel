"use client"
import { useEffect, useMemo, useState } from 'react'

type Ticket = { id: string; subject: string; requesterEmail: string; status: 'open' | 'pending' | 'resolved'; createdAt: number }

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'All' | 'open' | 'pending' | 'resolved'>('All')

  useEffect(() => { fetch('/api/support').then(r => r.json()).then(d => setTickets(d.tickets)) }, [])

  const filtered = useMemo(() => status === 'All' ? tickets : tickets.filter(t => t.status === status), [tickets, status])

  const create = async () => {
    const r = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, requesterEmail: email }) })
    const d = await r.json(); setTickets([d.ticket, ...tickets]); setSubject(''); setEmail('')
  }

  const setTicketStatus = async (id: string, next: 'open' | 'pending' | 'resolved') => {
    const r = await fetch(`/api/support/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) })
    const d = await r.json(); setTickets(prev => prev.map(t => t.id === id ? d.ticket : t))
  }

  const remove = async (id: string) => {
    await fetch(`/api/support/${id}`, { method: 'DELETE' })
    setTickets(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Support Desk</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage support tickets</p>
        </div>
        <select value={status} onChange={e => setStatus(e.target.value as any)} className="input-field">
          <option>All</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="card p-6 grid md:grid-cols-3 gap-3">
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="input-field" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Requester Email" className="input-field" />
        <button onClick={create} className="btn-secondary">Create Ticket</button>
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[var(--border)]">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium">Subject</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Requester</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="px-6 py-4">{t.subject}</td>
                <td className="px-6 py-4">{t.requesterEmail}</td>
                <td className="px-6 py-4">{t.status}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setTicketStatus(t.id, 'open')} className="btn-secondary text-xs">Open</button>
                    <button onClick={() => setTicketStatus(t.id, 'pending')} className="btn-secondary text-xs">Pending</button>
                    <button onClick={() => setTicketStatus(t.id, 'resolved')} className="btn-secondary text-xs">Resolve</button>
                    <button onClick={() => remove(t.id)} className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



