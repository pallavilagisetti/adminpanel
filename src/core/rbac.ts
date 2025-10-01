import type { Permission, Role } from './types'

const roleToPermissions: Record<Role, Permission[]> = {
  admin: [
    'users.read',
    'users.write',
    'users.verify',
    'users.reset_onboarding',
    'jobs.read',
    'jobs.moderate',
    'analytics.read',
    'flags.write',
  ],
  moderator: ['users.read', 'users.write', 'jobs.read', 'jobs.moderate'],
  analyst: ['users.read', 'jobs.read', 'analytics.read'],
  support: ['users.read', 'users.reset_onboarding'],
  reader: ['users.read', 'jobs.read'],
}

export function roleHasPermission(role: Role, permission: Permission): boolean {
  return roleToPermissions[role]?.includes(permission) ?? false
}



