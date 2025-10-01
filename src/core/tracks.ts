export type TrackStep = {
  id: string
  title: string
  description?: string
}

export type LearningTrack = {
  id: string
  name: string
  steps: TrackStep[]
  assignedUserIds: string[]
}

const tracks: LearningTrack[] = [
  { id: 'lt1', name: 'Frontend Basics', steps: [
    { id: 's1', title: 'Intro to TypeScript' },
    { id: 's2', title: 'React Components' },
  ], assignedUserIds: [] }
]

export function listTracks(): LearningTrack[] { return tracks }
export function createTrack(name: string): LearningTrack {
  const t: LearningTrack = { id: `lt_${Math.random().toString(36).slice(2,8)}`, name, steps: [], assignedUserIds: [] }
  tracks.unshift(t)
  return t
}
export function updateTrack(id: string, name: string): LearningTrack | null {
  const t = tracks.find(x => x.id === id); if (!t) return null; t.name = name; return t
}
export function deleteTrack(id: string): boolean {
  const i = tracks.findIndex(x => x.id === id); if (i === -1) return false; tracks.splice(i,1); return true
}
export function addStep(trackId: string, title: string, description?: string): LearningTrack | null {
  const t = tracks.find(x => x.id === trackId); if (!t) return null
  t.steps.push({ id: `s_${Math.random().toString(36).slice(2,8)}`, title, description })
  return t
}
export function removeStep(trackId: string, stepId: string): LearningTrack | null {
  const t = tracks.find(x => x.id === trackId); if (!t) return null
  t.steps = t.steps.filter(s => s.id !== stepId)
  return t
}
export function assignUsers(trackId: string, userIds: string[]): LearningTrack | null {
  const t = tracks.find(x => x.id === trackId); if (!t) return null
  t.assignedUserIds = Array.from(new Set([...(t.assignedUserIds), ...userIds]))
  return t
}



