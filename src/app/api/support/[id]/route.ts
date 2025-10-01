import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const t = await prisma.ticket.update({ where: { id: params.id }, data: { status: String(body.status) } })
  recordAuditLog({ actor: 'admin', action: 'support.update', entity: 'ticket', entityId: params.id, metadata: { status: body.status } })
  return NextResponse.json({ ticket: t })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.ticket.delete({ where: { id: params.id } })
  recordAuditLog({ actor: 'admin', action: 'support.delete', entity: 'ticket', entityId: params.id })
  return NextResponse.json({ ok: true })
}



