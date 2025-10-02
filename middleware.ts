import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware currently disabled - no authentication integration active
export async function middleware(req: NextRequest) {
  // Allow all requests to pass through
  return NextResponse.next()
}

export const config = {
  matcher: ['/users/:path*', '/jobs/:path*', '/templates/:path*', '/tracks/:path*', '/support/:path*', '/cms/:path*', '/analytics', '/flags', '/metabase'],
}


