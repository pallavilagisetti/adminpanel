import { NextResponse } from 'next/server'
import { getAllFlags, setFlag } from '@/core/flags'

export async function GET() { return NextResponse.json({ flags: getAllFlags() }) }
export async function PUT(request: Request) {
  const body = await request.json()
  const f = setFlag(body.key, Boolean(body.enabled))
  return NextResponse.json({ flag: f })
}



