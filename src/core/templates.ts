export type TemplateType = 'SOFA' | 'KYS'

export type TemplateVersion = {
  version: number
  body: string
  createdAt: number
}

export type Template = {
  id: string
  name: string
  type: TemplateType
  activeVersion: number
  versions: TemplateVersion[]
}

const templates: Template[] = [
  {
    id: 't1',
    name: 'Default SOFA',
    type: 'SOFA',
    activeVersion: 1,
    versions: [
      { version: 1, body: '{ "score": "sum(weights)" }', createdAt: Date.now() - 86400000 },
    ],
  },
]

export function listTemplates(): Template[] { return templates }

export function createTemplate(input: { name: string; type: TemplateType; body: string }): Template {
  const id = `tmpl_${Math.random().toString(36).slice(2, 8)}`
  const first: TemplateVersion = { version: 1, body: input.body, createdAt: Date.now() }
  const tmpl: Template = { id, name: input.name, type: input.type, activeVersion: 1, versions: [first] }
  templates.unshift(tmpl)
  return tmpl
}

export function updateTemplate(id: string, input: Partial<Pick<Template, 'name' | 'type'>>): Template | null {
  const t = templates.find(x => x.id === id)
  if (!t) return null
  if (input.name) t.name = input.name
  if (input.type) t.type = input.type
  return t
}

export function deleteTemplate(id: string): boolean {
  const idx = templates.findIndex(x => x.id === id)
  if (idx === -1) return false
  templates.splice(idx, 1)
  return true
}

export function addTemplateVersion(id: string, body: string): Template | null {
  const t = templates.find(x => x.id === id)
  if (!t) return null
  const next = (t.versions.at(-1)?.version ?? 0) + 1
  t.versions.push({ version: next, body, createdAt: Date.now() })
  t.activeVersion = next
  return t
}

export function rollbackTemplate(id: string, version: number): Template | null {
  const t = templates.find(x => x.id === id)
  if (!t) return null
  const v = t.versions.find(v => v.version === version)
  if (!v) return null
  t.activeVersion = version
  return t
}



