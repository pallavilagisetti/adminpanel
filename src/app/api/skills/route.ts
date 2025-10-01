import { NextResponse } from 'next/server'
import { aggregateSkills } from '@/lib/mockData'

export async function GET() {
  const data = aggregateSkills()
  return NextResponse.json(data)
}

