"use client"
import { useEffect, useMemo, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  signupMethod: 'Google' | 'Email'
  profileType: 'Resume' | 'Manual'
  active: boolean
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState('')
  const [signup, setSignup] = useState<'All' | 'Google' | 'Email'>('All')
  const [profile, setProfile] = useState<'All' | 'Resume' | 'Manual'>('All')
  const [sortKey, setSortKey] = useState<'name' | 'email'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(data => {
      setUsers(Array.isArray(data) ? data : (data.users ?? []))
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let list = users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
    if (signup !== 'All') list = list.filter(u => u.signupMethod === signup)
    if (profile !== 'All') list = list.filter(u => u.profileType === profile)
    list = [...list].sort((a, b) => {
      const va = a[sortKey].toString().toLowerCase()
      const vb = b[sortKey].toString().toLowerCase()
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    })
    return list
  }, [users, query, signup, profile, sortKey, sortDir])

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.active).length
  const proUsers = users.filter(u => u.profileType === 'Resume').length
  const suspended = users.filter(u => !u.active).length

  const toggleActive = async (user: User) => {
    const res = await fetch('/api/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: user.id, active: !user.active }) })
    if (res.ok) {
      const { user: updated } = await res.json()
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header + KPI tiles */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Total Users</div>
          <div className="mt-2 text-3xl font-bold">{totalUsers.toLocaleString()}</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Active Users</div>
          <div className="mt-2 text-3xl font-bold">{activeUsers.toLocaleString()}</div>
          <div className="mt-1 text-xs text-green-400">{totalUsers ? Math.round((activeUsers/totalUsers)*100) : 0}% of total</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Pro Users</div>
          <div className="mt-2 text-3xl font-bold">{proUsers.toLocaleString()}</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">conversion rate</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Suspended</div>
          <div className="mt-2 text-3xl font-bold">{suspended.toLocaleString()}</div>
          <div className="mt-1 text-xs text-red-400">{totalUsers ? (suspended/totalUsers*100).toFixed(1) : '0'}% of total</div>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">User Management</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage and monitor all registered users</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-[var(--text-secondary)]">
            {filtered.length} of {users.length} users
          </div>
        </div>
      </div>

      {/* Directory + Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder="Search by name or email..." 
                className="input-field pl-10 w-full sm:w-64" 
              />
            </div>
            <select value={signup} onChange={e => setSignup(e.target.value as any)} className="input-field">
              <option>All Signup Methods</option>
              <option>Google</option>
              <option>Email</option>
            </select>
            <select value={profile} onChange={e => setProfile(e.target.value as any)} className="input-field">
              <option>All Profile Types</option>
              <option>Resume</option>
              <option>Manual</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { setSortKey('name'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') }} 
              className={`btn-secondary ${sortKey === 'name' ? 'bg-[var(--accent)] text-white' : ''}`}
            >
              Sort by Name {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              onClick={() => { setSortKey('email'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') }} 
              className={`btn-secondary ${sortKey === 'email' ? 'bg-[var(--accent)] text-white' : ''}`}
            >
              Sort by Email {sortKey === 'email' && (sortDir === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[var(--border)]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Signup</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Profile</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[var(--border)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-medium">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-[var(--text-primary)]">{u.name}</div>
                        <div className="text-sm text-[var(--text-secondary)]">ID: {u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[var(--text-primary)]">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.signupMethod === 'Google' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {u.signupMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.profileType === 'Resume' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {u.profileType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toggleActive(u)} 
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          u.active 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {u.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button className="btn-secondary text-xs">
                        <a href={`/users/${u.id}`}>View Details</a>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-[var(--text-primary)]">No users found</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

