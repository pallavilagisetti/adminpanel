"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Sample data - in real app, fetch from API
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
    const userId = params.id as string
    const foundUser = sampleUsers.find(u => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
    }
    setLoading(false)
  }, [params.id])

  const handleSuspendAccount = async () => {
    if (!user) return
    
    const confirmed = window.confirm(`Are you sure you want to suspend ${user.name}'s account?`)
    if (confirmed) {
      try {
        // Here you would make an API call to suspend the account
        console.log(`Account suspended for: ${user.name}`)
        alert(`${user.name}'s account has been suspended successfully.`)
        router.push('/users')
      } catch (error) {
        console.error('Error suspending account:', error)
        alert('Failed to suspend account. Please try again.')
      }
    }
  }

  const handleSendMessage = () => {
    if (!user) return
    window.location.href = `mailto:${user.email}?subject=Message from SkillGraph AI Admin`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-[var(--text-primary)]">User not found</h3>
        <p className="text-[var(--text-secondary)] mt-1">The user you're looking for doesn't exist.</p>
        <Link href="/users" className="btn-primary mt-4 inline-block">
          Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">User Profile</h1>
          <p className="text-[var(--text-secondary)] mt-1">Detailed information about {user.name}</p>
        </div>
        <Link href="/users" className="btn-secondary">
          ← Back to Users
        </Link>
      </div>

      {/* User Info Card */}
      <div className="card p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {(user.name || user.email).split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{user.name}</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : user.status === 'Suspended'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.status}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.plan === 'Pro' 
                  ? 'bg-purple-100 text-purple-800' 
                  : user.plan === 'Enterprise'
                  ? 'bg-purple-200 text-purple-900'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.plan}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[var(--text-secondary)]">Email</label>
                <p className="text-[var(--text-primary)]">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)]">User ID</label>
                <p className="text-[var(--text-primary)]">{user.id}</p>
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)]">Joined</label>
                <p className="text-[var(--text-primary)]">{user.joinedDate}</p>
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)]">Last Active</label>
                <p className="text-[var(--text-primary)]">{user.lastActive}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Skills</div>
          <div className="mt-2 text-3xl font-bold">{user.skills}</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">Total skills added</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Resumes</div>
          <div className="mt-2 text-3xl font-bold">{user.resumes}</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">Resumes uploaded</div>
        </div>
        <div className="metric-card p-6">
          <div className="text-sm text-[var(--text-secondary)]">Account Status</div>
          <div className="mt-2 text-3xl font-bold">{user.active ? 'Active' : 'Inactive'}</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">Current status</div>
        </div>
      </div>

      {/* Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Actions</h3>
        <div className="flex gap-3">
          <button 
            onClick={handleSendMessage}
            className="btn-primary"
          >
            Send Message
          </button>
          <button 
            onClick={handleSuspendAccount}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Suspend Account
          </button>
          <Link 
            href={`/users/${user.id}/login`}
            className="btn-secondary"
          >
            Login as User
          </Link>
        </div>
      </div>
    </div>
  )
}