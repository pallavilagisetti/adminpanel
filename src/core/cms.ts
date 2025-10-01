export type Article = {
  id: string
  title: string
  slug: string
  content: string
  updatedAt: number
}

const articles: Article[] = [
  { id: 'a1', title: 'Getting Started', slug: 'getting-started', content: 'Welcome to SkillGraph…', updatedAt: Date.now() - 3600_000 },
]

export function listArticles(): Article[] { return articles }
export function createArticle(title: string, slug: string, content: string): Article {
  const a: Article = { id: `a_${Math.random().toString(36).slice(2,8)}`, title, slug, content, updatedAt: Date.now() }
  articles.unshift(a); return a
}
export function updateArticle(id: string, input: Partial<Pick<Article,'title'|'slug'|'content'>>): Article | null {
  const a = articles.find(x => x.id === id); if (!a) return null
  if (input.title) a.title = input.title
  if (input.slug) a.slug = input.slug
  if (input.content) a.content = input.content
  a.updatedAt = Date.now()
  return a
}
export function deleteArticle(id: string): boolean {
  const i = articles.findIndex(x => x.id === id); if (i === -1) return false; articles.splice(i,1); return true
}



