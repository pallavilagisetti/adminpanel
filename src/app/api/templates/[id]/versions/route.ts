import { NextResponse } from 'next/server'
import { addTemplateVersion } from '@/core/templates'
import { recordAuditLog } from '@/core/audit'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const t = addTemplateVersion(params.id, body.body)
  if (!t) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  recordAuditLog({ actor: 'admin', action: 'templates.add_version', entity: 'template', entityId: params.id })
  return NextResponse.json({ template: t })
}



