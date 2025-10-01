"use client"
import { useEffect, useState } from 'react'
import UserRolePicker from '@/modules/users/components/UserRolePicker'

type Params = { params: { id: string } }

export default function UserDetailPage({ params }: Params) {
  const { id } = params
  const [roles, setRoles] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    fetch(`/api/users/${id}/roles`).then(r => r.json()).then(d => setRoles(d.roles))
  }, [id])

  const saveRoles = async (next: string[]) => {
    setSaving(true)
    await fetch(`/api/users/${id}/roles`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ roles: next }) })
    setRoles(next)
    setSaving(false)
  }

  const doVerify = async () => {
    await fetch(`/api/users/${id}/verify`, { method: 'POST' })
    setVerified(true)
  }

  const resetOnboard = async () => {
    await fetch(`/api/users/${id}/onboarding/reset`, { method: 'POST' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">User {id}</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage roles, verification and onboarding</p>
        </div>
        <div className="flex gap-2">
          <button onClick={doVerify} className="btn-secondary">{verified ? 'Verified' : 'Verify Identity'}</button>
          <button onClick={resetOnboard} className="btn-secondary">Reset Onboarding</button>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Roles</h2>
          <div className="text-xs text-white/60">{saving ? 'Saving…' : ' '}</div>
        </div>
        <UserRolePicker roles={roles} onChange={saveRoles} />
      </div>
    </div>
  )
}



