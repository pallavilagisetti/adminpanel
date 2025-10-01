import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function GET() {
  const tickets = await prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ tickets })
}
export async function POST(request: Request) {
  const body = await request.json()
  const t = await prisma.ticket.create({ data: { subject: body.subject, requesterEmail: body.requesterEmail, status: 'open' } })
  recordAuditLog({ actor: 'admin', action: 'support.create', entity: 'ticket', entityId: t.id })
  return NextResponse.json({ ticket: t })
}



