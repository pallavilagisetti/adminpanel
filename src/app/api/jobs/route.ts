import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') as 'pending' | 'approved' | 'rejected' | null
  const page = Number(searchParams.get('page') || '1')
  const pageSize = Math.min(100, Number(searchParams.get('pageSize') || '20'))

  const where = status ? { status } : {}
  const [total, jobs] = await Promise.all([
    prisma.job.count({ where }),
    prisma.job.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
  ])
  return NextResponse.json({ jobs, total, page, pageSize })
}



