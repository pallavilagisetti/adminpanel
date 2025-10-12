"use client"
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

type User = {
  id: string
  name: string | null
  email: string
  plan: 'Free' | 'Pro' | 'Enterprise'
  status: 'Active' | 'Inactive' | 'Suspended'
  joinedDate: string
  lastActive: string
  skills: number
  resumes: number
  active: boolean
}

export default function UsersPage() {
  const router = useRouter()
  const { user: adminUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All Status' | 'Active' | 'Inactive' | 'Suspended'>('All Status')
  const [sortKey, setSortKey] = useState<'name' | 'email'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [loading, setLoading] = useState(true)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState<'above' | 'below'>('below')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sample data matching the image
  const sampleUsers: User[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      plan: 'Pro',
      status: 'Active',
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago',
      skills: 24,
      resumes: 3,
      active: true
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      plan: 'Free',
      status: 'Active',
      joinedDate: '2024-02-20',
      lastActive: '1 day ago',
      skills: 12,
      resumes: 1,
      active: true
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      plan: 'Enterprise',
      status: 'Inactive',
      joinedDate: '2023-11-10',
      lastActive: '1 week ago',
      skills: 45,
      resumes: 5,
      active: false
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@example.com',
      plan: 'Pro',
      status: 'Suspended',
      joinedDate: '2024-03-05',
      lastActive: '2 weeks ago',
      skills: 18,
      resumes: 2,
      active: false
    }
  ]

  useEffect(() => {
    // Use sample data for now
    setUsers(sampleUsers)
    setLoading(false)
  }, [])

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(ref => 
        ref && ref.contains(target)
      )
      
      if (!isClickInsideAnyDropdown) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filtered = useMemo(() => {
    let list = users.filter(u => 
      (u.name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ?? false) || 
      u.email.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    if (statusFilter !== 'All Status') list = list.filter(u => u.status === statusFilter)
    list = [...list].sort((a, b) => {
      const va = (a[sortKey] || '').toString().toLowerCase()
      const vb = (b[sortKey] || '').toString().toLowerCase()
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    })
    return list
  }, [users, debouncedQuery, statusFilter, sortKey, sortDir])

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'Active').length
  const proUsers = users.filter(u => u.plan === 'Pro').length
  const suspended = users.filter(u => u.status === 'Suspended').length

  const toggleActive = async (user: User) => {
    const res = await fetch('/api/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: user.id, active: !user.active }) })
    if (res.ok) {
      const { user: updated } = await res.json()
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    }
  }

  const calculateDropdownPosition = (buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const dropdownHeight = 200 // Approximate dropdown height
    
    // Check if there's enough space below the button
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top
    
    // If not enough space below but enough space above, position above
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      return 'above'
    }
    
    return 'below'
  }

  const handleDropdownToggle = (userId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (openDropdown === userId) {
      setOpenDropdown(null)
    } else {
      const position = calculateDropdownPosition(event.currentTarget)
      setDropdownPosition(position)
      setOpenDropdown(userId)
    }
  }

  const handleDropdownAction = async (action: string, user: User) => {
    setOpenDropdown(null)
    setActionLoading(`${action}-${user.id}`)
    
    try {
      switch (action) {
        case 'view-profile':
          router.push(`/users/${user.id}`)
          break
        case 'login-as-user':
          router.push(`/users/${user.id}/login`)
          break
        case 'send-message':
          // Open email client with user's email and admin context
          const adminEmail = adminUser?.email || 'admin@skillgraph.ai'
          const adminName = adminUser?.displayName || 'Admin'
          const subject = `Message from ${adminName} (SkillGraph AI Admin)`
          const body = `Hello ${user.name || 'User'},

This message is being sent to you from the SkillGraph AI Admin Panel.

Best regards,
${adminName}
Admin - SkillGraph AI`
          
          window.location.href = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
          break
        case 'suspend-account':
          await handleSuspendAccount(user)
          break
        case 'activate-account':
          await handleActivateAccount(user)
          break
        case 'deactivate-account':
          await handleDeactivateAccount(user)
          break
        default:
          break
      }
    } catch (error) {
      console.error(`Error performing action ${action}:`, error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleSuspendAccount = async (user: User) => {
    const confirmed = window.confirm(`Are you sure you want to suspend ${user.name}'s account?`)
    if (confirmed) {
      try {
        // Update user status to suspended
        setUsers(prev => prev.map(u => 
          u.id === user.id 
            ? { ...u, status: 'Suspended' as const, active: false }
            : u
        ))
        
        // Show success message
        alert(`${user.name}'s account has been suspended successfully.`)
      } catch (error) {
        console.error('Error suspending account:', error)
        alert('Failed to suspend account. Please try again.')
      }
    }
  }

  const handleActivateAccount = async (user: User) => {
    const confirmed = window.confirm(`Are you sure you want to activate ${user.name}'s account?`)
    if (confirmed) {
      try {
        // Update user status to active
        setUsers(prev => prev.map(u => 
          u.id === user.id 
            ? { ...u, status: 'Active' as const, active: true }
            : u
        ))
        
        // Show success message
        alert(`${user.name}'s account has been activated successfully.`)
      } catch (error) {
        console.error('Error activating account:', error)
        alert('Failed to activate account. Please try again.')
      }
    }
  }

  const handleDeactivateAccount = async (user: User) => {
    const confirmed = window.confirm(`Are you sure you want to deactivate ${user.name}'s account?`)
    if (confirmed) {
      try {
        // Update user status to inactive
        setUsers(prev => prev.map(u => 
          u.id === user.id 
            ? { ...u, status: 'Inactive' as const, active: false }
            : u
        ))
        
        // Show success message
        alert(`${user.name}'s account has been deactivated successfully.`)
      } catch (error) {
        console.error('Error deactivating account:', error)
        alert('Failed to deactivate account. Please try again.')
      }
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Users Management</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage user accounts, subscriptions, and activity.</p>
      </div>

      {/* KPI tiles */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="metric-card p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Total Users</div>
              <div className="mt-2 text-3xl font-bold">12,847</div>
              <div className="mt-1 text-xs text-green-400">+12.5% from last month</div>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="metric-card p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Active Users</div>
              <div className="mt-2 text-3xl font-bold">11,234</div>
              <div className="mt-1 text-xs text-green-400">87.4% of total</div>
            </div>
            <div className="w-8 h-8 border-2 border-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="metric-card p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Pro Users</div>
              <div className="mt-2 text-3xl font-bold">3,847</div>
              <div className="mt-1 text-xs text-purple-400">29.9% conversion rate</div>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="metric-card p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-[var(--text-secondary)]">Suspended</div>
              <div className="mt-2 text-3xl font-bold">89</div>
              <div className="mt-1 text-xs text-red-400">0.7% of total</div>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* User Directory */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">User Directory</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-4">Search and filter through all user accounts.</p>
        
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
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="input-field">
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full">
            <thead className="bg-[var(--border)]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Plan</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Activity</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Skills</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Resumes</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-[var(--text-primary)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[var(--border)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {(u.name || u.email).split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-[var(--text-primary)]">{u.name || 'No Name'}</div>
                        <div className="text-sm text-[var(--text-secondary)]">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.plan === 'Pro' 
                        ? 'bg-purple-100 text-purple-800' 
                        : u.plan === 'Enterprise'
                        ? 'bg-purple-200 text-purple-900'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : u.status === 'Suspended'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[var(--text-primary)]">
                      <div>Joined {u.joinedDate}</div>
                      <div className="text-[var(--text-secondary)]">Active {u.lastActive}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[var(--text-primary)]">{u.skills}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[var(--text-primary)]">{u.resumes}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div 
                      className="relative" 
                      ref={(el) => {
                        dropdownRefs.current[u.id] = el
                      }}
                    >
                      <button 
                        onClick={(e) => handleDropdownToggle(u.id, e)}
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-md hover:bg-[var(--border)]/50"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                      
                      {openDropdown === u.id && (
                        <div className={`absolute right-0 z-[100] w-48 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg ${
                          dropdownPosition === 'above' ? 'bottom-8' : 'top-8'
                        }`}>
                          <div className="py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDropdownAction('view-profile', u)
                              }}
                              disabled={actionLoading === `view-profile-${u.id}`}
                              className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === `view-profile-${u.id}` ? (
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent"></div>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              )}
                              View Profile
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDropdownAction('login-as-user', u)
                              }}
                              disabled={actionLoading === `login-as-user-${u.id}`}
                              className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === `login-as-user-${u.id}` ? (
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent"></div>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                              )}
                              Login as User
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDropdownAction('send-message', u)
                              }}
                              disabled={actionLoading === `send-message-${u.id}`}
                              className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--border)]/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === `send-message-${u.id}` ? (
                                <div className="w-4 h-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent"></div>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              )}
                              Send Message
                            </button>
                            
                            {/* Status change buttons based on current status */}
                            {u.status === 'Active' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDropdownAction('deactivate-account', u)
                                }}
                                disabled={actionLoading === `deactivate-account-${u.id}`}
                                className="w-full text-left px-4 py-2 text-sm text-orange-500 hover:bg-orange-500/10 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading === `deactivate-account-${u.id}` ? (
                                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                  </svg>
                                )}
                                Deactivate Account
                              </button>
                            )}
                            
                            {(u.status === 'Inactive' || u.status === 'Suspended') && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDropdownAction('activate-account', u)
                                }}
                                disabled={actionLoading === `activate-account-${u.id}`}
                                className="w-full text-left px-4 py-2 text-sm text-green-500 hover:bg-green-500/10 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading === `activate-account-${u.id}` ? (
                                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                Activate Account
                              </button>
                            )}
                            
                            {u.status !== 'Suspended' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDropdownAction('suspend-account', u)
                                }}
                                disabled={actionLoading === `suspend-account-${u.id}`}
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading === `suspend-account-${u.id}` ? (
                                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                  </svg>
                                )}
                                Suspend Account
                              </button>
                            )}
                          </div>
                        </div>
                      )}
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

