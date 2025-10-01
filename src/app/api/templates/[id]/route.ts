import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const t = await prisma.template.update({ where: { id: params.id }, data: { name: body.name, type: String(body.type) } })
  recordAuditLog({ actor: 'admin', action: 'templates.update', entity: 'template', entityId: params.id })
  return NextResponse.json({ template: t })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.template.delete({ where: { id: params.id } })
  recordAuditLog({ actor: 'admin', action: 'templates.delete', entity: 'template', entityId: params.id })
  return NextResponse.json({ ok: true })
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  if (typeof body.version === 'number') {
    const t0 = await prisma.template.findUnique({ where: { id: params.id } })
    if (!t0) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    const t = await prisma.template.update({ where: { id: params.id }, data: { activeVersion: body.version } })
    recordAuditLog({ actor: 'admin', action: 'templates.rollback', entity: 'template', entityId: params.id, metadata: { version: body.version } })
    return NextResponse.json({ template: t })
  }
  return NextResponse.json({ error: 'bad_request' }, { status: 400 })
}



