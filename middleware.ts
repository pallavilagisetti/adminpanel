import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'

const ROLE_ACCESS: { pattern: RegExp; roles: string[] }[] = [
  { pattern: /^\/analytics/, roles: ['admin', 'analyst'] },
  { pattern: /^\/flags/, roles: ['admin'] },
  { pattern: /^\/templates/, roles: ['admin', 'moderator'] },
  { pattern: /^\/jobs/, roles: ['admin', 'moderator'] },
  { pattern: /^\/users/, roles: ['admin', 'moderator', 'support', 'analyst', 'reader'] },
  { pattern: /^\/tracks/, roles: ['admin', 'moderator'] },
  { pattern: /^\/support/, roles: ['admin', 'support'] },
  { pattern: /^\/cms/, roles: ['admin', 'support'] },
  { pattern: /^\/metabase/, roles: ['admin', 'analyst'] },
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // Skip auth in local/dev when Auth0 envs are not configured
  if (!process.env.AUTH0_ISSUER_BASE_URL || !process.env.AUTH0_CLIENT_ID) {
    return res
  }
  const session = await getSession(req, res)
  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url))
  }
  const pathname = req.nextUrl.pathname
  const match = ROLE_ACCESS.find(r => r.pattern.test(pathname))
  if (!match) return res
  const roles: string[] = (session.user as any)?.roles || (session.user as any)?.['https://roles'] || []
  const allowed = roles.some(r => match.roles.includes(r))
  if (!allowed) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return res
}

export const config = {
  matcher: ['/users/:path*', '/jobs/:path*', '/templates/:path*', '/tracks/:path*', '/support/:path*', '/cms/:path*', '/analytics', '/flags', '/metabase'],
}


