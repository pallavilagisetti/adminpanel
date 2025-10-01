import { NextResponse } from 'next/server'
import { recordAuditLog } from '@/core/audit'
import { getUserState, setUserRoles } from '@/modules/users/state'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const state = getUserState(id)
  return NextResponse.json({ roles: state.roles })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  const { roles } = body as { roles: string[] }
  setUserRoles(id, roles)
  recordAuditLog({ actor: 'admin', action: 'users.set_roles', entity: 'user', entityId: id, metadata: { roles } })
  return NextResponse.json({ ok: true })
}



