'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import type { Media } from '@/lib/types'

export function MediaGallery() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/media')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load media')
        return response.json()
      })
      .then(setMedia)
      .catch((error) => {
        console.error('[v0] Error fetching media:', error)
        toast.error('Failed to load media')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selectedId) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedId])

  if (loading) {
    return <div className="flex items-center justify-center py-12"><p className="text-foreground/60">Loading media...</p></div>
  }

  if (media.length === 0) {
    return <div className="py-12 text-center"><p className="text-lg text-foreground/60">No media available yet.</p></div>
  }

  const featured = media.filter((item) => item.featured)
  const rest = media.filter((item) => !item.featured)
  const selected = media.find((item) => item.id === selectedId)
  const openMedia = (id: string) => setSelectedId(id)

  const card = (item: Media, featuredCard = false) => (
    <button
      key={item.id}
      type="button"
      className={`group relative block w-full overflow-hidden rounded-lg text-left ${featuredCard ? 'aspect-video' : 'aspect-square'}`}
      onClick={() => openMedia(item.id)}
      aria-label={`Open ${item.title}`}
    >
      <img src={item.imageUrl} alt={item.altText || item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-10 text-white">
        <span className={`${featuredCard ? 'text-xl' : 'text-sm'} block font-semibold`}>{item.title}</span>
        {featuredCard && item.description && <span className="mt-1 block line-clamp-2 text-sm text-white/80">{item.description}</span>}
      </span>
    </button>
  )

  return (
    <div className="space-y-12">
      {featured.length > 0 && <section aria-labelledby="featured-heading"><h2 id="featured-heading" className="mb-6 text-3xl font-serif font-bold text-foreground">Featured</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-2">{featured.map((item) => card(item, true))}</div></section>}
      {rest.length > 0 && <section aria-labelledby="gallery-heading"><h2 id="gallery-heading" className="mb-6 text-3xl font-serif font-bold text-foreground">Gallery</h2><div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{rest.map((item) => card(item))}</div></section>}
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelectedId(null)}><div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-lg bg-card p-6" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setSelectedId(null)} className="absolute right-3 top-3 rounded-full bg-background/80 p-2 text-foreground" aria-label="Close image viewer"><X className="h-5 w-5" /></button><img src={selected.imageUrl} alt={selected.altText || selected.title} className="max-h-[70vh] w-full rounded-lg object-contain" /><div className="pt-4"><h3 className="text-2xl font-bold text-foreground">{selected.title}</h3>{selected.description && <p className="mt-2 text-foreground/70">{selected.description}</p>}</div></div></div>}
    </div>
  )
}
