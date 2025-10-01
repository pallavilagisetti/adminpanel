import { NextResponse } from 'next/server'
import { RESUMES } from '@/lib/mockData'

export async function GET() {
  return NextResponse.json({ resumes: RESUMES })
}

