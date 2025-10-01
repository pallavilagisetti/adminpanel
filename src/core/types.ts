export type Role = 'admin' | 'moderator' | 'analyst' | 'support' | 'reader'

export type Permission =
  | 'users.read'
  | 'users.write'
  | 'users.verify'
  | 'users.reset_onboarding'
  | 'jobs.read'
  | 'jobs.moderate'
  | 'analytics.read'
  | 'flags.write'

export type AuditLog = {
  id: string
  actor: string
  action: string
  entity: string
  entityId: string
  timestamp: number
  metadata?: Record<string, unknown>
}

export type FeatureFlag = {
  key: string
  enabled: boolean
  description?: string
}



