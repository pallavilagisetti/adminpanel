import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const t = await prisma.track.update({ where: { id: params.id }, data: { name: body.name } })
  recordAuditLog({ actor: 'admin', action: 'tracks.update', entity: 'track', entityId: params.id })
  return NextResponse.json({ track: t })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.track.delete({ where: { id: params.id } })
  recordAuditLog({ actor: 'admin', action: 'tracks.delete', entity: 'track', entityId: params.id })
  return NextResponse.json({ ok: true })
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  if (Array.isArray(body.userIds)) {
    const t0 = await prisma.track.findUnique({ where: { id: params.id } })
    if (!t0) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    const assigned = Array.from(new Set([...(t0.assignedUserIds as any[]), ...body.userIds]))
    const t = await prisma.track.update({ where: { id: params.id }, data: { assignedUserIds: assigned } })
    recordAuditLog({ actor: 'admin', action: 'tracks.assign', entity: 'track', entityId: params.id, metadata: { userIds: body.userIds } })
    return NextResponse.json({ track: t })
  }
  return NextResponse.json({ error: 'bad_request' }, { status: 400 })
}



