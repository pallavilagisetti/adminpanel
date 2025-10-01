import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const a = await prisma.article.update({ where: { id: params.id }, data: { title: body.title, slug: body.slug, content: body.content } })
  recordAuditLog({ actor: 'admin', action: 'cms.update', entity: 'article', entityId: params.id })
  return NextResponse.json({ article: a })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.article.delete({ where: { id: params.id } })
  recordAuditLog({ actor: 'admin', action: 'cms.delete', entity: 'article', entityId: params.id })
  return NextResponse.json({ ok: true })
}



