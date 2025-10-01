import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.update({ where: { id: params.id }, data: { status: 'rejected' } })
    recordAuditLog({ actor: 'admin', action: 'jobs.reject', entity: 'job', entityId: job.id })
    return NextResponse.json({ ok: true, job })
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
}



