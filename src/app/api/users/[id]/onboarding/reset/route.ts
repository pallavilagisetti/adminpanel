import { NextResponse } from 'next/server'
import { recordAuditLog } from '@/core/audit'
import { resetOnboarding } from '@/modules/users/state'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const { id } = params
  resetOnboarding(id)
  recordAuditLog({ actor: 'admin', action: 'users.reset_onboarding', entity: 'user', entityId: id })
  return NextResponse.json({ ok: true })
}



