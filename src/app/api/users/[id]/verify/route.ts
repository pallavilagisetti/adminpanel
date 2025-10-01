import { NextResponse } from 'next/server'
import { recordAuditLog } from '@/core/audit'
import { setUserVerified } from '@/modules/users/state'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  setUserVerified(id, true)
  recordAuditLog({ actor: 'admin', action: 'users.verify', entity: 'user', entityId: id })
  return NextResponse.json({ ok: true })
}



