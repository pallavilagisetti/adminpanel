"use client"
import { useEffect, useState } from 'react'

type Article = { id: string; title: string; slug: string; content: string; updatedAt: number }

export default function CMSPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => { fetch('/api/cms').then(r => r.json()).then(d => setArticles(d.articles)) }, [])

  const create = async () => {
    const r = await fetch('/api/cms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, slug, content }) })
    const d = await r.json(); setArticles([d.article, ...articles]); setTitle(''); setSlug(''); setContent('')
  }

  const update = async (id: string) => {
    const r = await fetch(`/api/cms/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, slug, content }) })
    const d = await r.json(); setArticles(prev => prev.map(a => a.id === id ? d.article : a))
  }

  const remove = async (id: string) => {
    await fetch(`/api/cms/${id}`, { method: 'DELETE' })
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Help Center CMS</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage support articles</p>
      </div>

      <div className="card p-6 grid gap-3">
        <div className="grid md:grid-cols-3 gap-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="input-field" />
          <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" className="input-field" />
          <button onClick={create} className="btn-secondary">Create</button>
        </div>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="input-field h-24" />
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-[var(--border)]">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium">Title</th>
              <th className="text-left px-6 py-4 text-sm font-medium">Slug</th>
              <th className="text-right px-6 py-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {articles.map(a => (
              <tr key={a.id}>
                <td className="px-6 py-4">{a.title}</td>
                <td className="px-6 py-4">{a.slug}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => update(a.id)} className="btn-secondary text-xs">Update</button>
                    <button onClick={() => remove(a.id)} className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



