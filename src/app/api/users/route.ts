import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type QueryParams = {
  page?: string
  pageSize?: string
  q?: string
  sort?: 'name' | 'email'
  dir?: 'asc' | 'desc'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').trim()
  const page = Number(searchParams.get('page') || '1')
  const pageSize = Math.min(100, Number(searchParams.get('pageSize') || '20'))
  const sort = (searchParams.get('sort') as 'name' | 'email') || 'name'
  const dir = (searchParams.get('dir') as 'asc' | 'desc') || 'asc'

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { email: { contains: q, mode: 'insensitive' } },
        ],
      }
    : {}

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { [sort]: dir },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, name: true, email: true, active: true, roles: true },
    }),
  ])

  return NextResponse.json({ users, total, page, pageSize })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, active } = body as { id: string; active: boolean }
  try {
    const user = await prisma.user.update({ where: { id }, data: { active: Boolean(active) } })
    return NextResponse.json({ ok: true, user })
  } catch (e) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
}

