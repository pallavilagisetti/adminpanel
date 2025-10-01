import type { AuditLog } from './types'
import { initPosthogClient } from '@/lib/posthog'
import { prisma } from '@/lib/prisma'

const logs: AuditLog[] = []

export async function recordAuditLog(entry: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
  const log: AuditLog = {
    ...entry,
    id: `al_${Math.random().toString(36).slice(2, 10)}`,
    timestamp: Date.now(),
  }
  logs.unshift(log)
  try {
    const ph = initPosthogClient() as any
    if (ph && typeof ph.capture === 'function') {
      ph.capture({ distinctId: entry.actor || 'admin', event: entry.action, properties: { entity: entry.entity, entityId: entry.entityId, ...entry.metadata } })
    }
    // Persist to DB (best-effort)
    await prisma.auditLog.create({ data: { actor: log.actor, action: log.action, entity: log.entity, entityId: log.entityId, metadata: log.metadata as any } })
  } catch {}
  return log
}

export function getAuditLogs(): AuditLog[] {
  return logs
}


