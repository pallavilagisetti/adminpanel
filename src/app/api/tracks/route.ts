import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordAuditLog } from '@/core/audit'

export async function GET() {
  const tracks = await prisma.track.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json({ tracks })
}

export async function POST(request: Request) {
  const body = await request.json()
  const t = await prisma.track.create({ data: { name: body.name, steps: [], assignedUserIds: [] } })
  recordAuditLog({ actor: 'admin', action: 'tracks.create', entity: 'track', entityId: t.id })
  return NextResponse.json({ track: t })
}



