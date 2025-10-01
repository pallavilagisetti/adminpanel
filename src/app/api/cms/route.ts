import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function GET() { 
  const articles = await prisma.article.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json({ articles }) 
}
export async function POST(request: Request) {
  const body = await request.json()
  const a = await prisma.article.create({ data: { title: body.title, slug: body.slug, content: body.content } })
  recordAuditLog({ actor: 'admin', action: 'cms.create', entity: 'article', entityId: a.id })
  return NextResponse.json({ article: a })
}



