import type { NextApiRequest } from 'next'
import posthog from 'posthog-js'
import { PostHog } from 'posthog-node'

export function initPosthogClient() {
  if (typeof window !== 'undefined') {
    if (!posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com' })
    }
    return posthog
  }
  const key = process.env.POSTHOG_KEY
  const host = process.env.POSTHOG_HOST || 'https://app.posthog.com'
  return new PostHog(key || '', { host })
}



