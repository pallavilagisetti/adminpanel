import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function GET() {
  const templates = await prisma.template.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json({ templates })
}

export async function POST(request: Request) {
  const body = await request.json()
  const versions = [{ version: 1, body: body.body, createdAt: Date.now() }]
  const tmpl = await prisma.template.create({ data: { name: body.name, type: String(body.type), activeVersion: 1, versions } })
  recordAuditLog({ actor: 'admin', action: 'templates.create', entity: 'template', entityId: tmpl.id })
  return NextResponse.json({ template: tmpl })
}



