import type { FeatureFlag } from './types'

const flags: Record<string, FeatureFlag> = {
  'jobs.enabled': { key: 'jobs.enabled', enabled: true, description: 'Enable Jobs moderation UI' },
  'audit.enabled': { key: 'audit.enabled', enabled: true, description: 'Enable audit log recording' },
}

export function isFlagEnabled(key: string): boolean {
  return flags[key]?.enabled ?? false
}

export function getAllFlags(): FeatureFlag[] {
  return Object.values(flags)
}

export function setFlag(key: string, enabled: boolean): FeatureFlag {
  const current = flags[key] ?? { key, enabled: false }
  flags[key] = { ...current, enabled }
  return flags[key]
}



