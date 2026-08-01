'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import type { Media } from '@/lib/types'

export function MediaGallery() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      setMedia(data)
    } catch (error) {
      console.error('[v0] Error fetching media:', error)
      toast.error('Failed to load media')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading media...</p>
        </div>
      </div>
    )
  }

  if (media.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60 text-lg">No media available yet.</p>
      </div>
    )
  }

  const featured = media.filter((item) => item.featured)
  const rest = media.filter((item) => !item.featured)

  return (
    <div className="space-y-12">
      {/* Featured Media */}
      {featured.length > 0 && (
        <div>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {featured.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer"
                onClick={() => setSelectedId(item.id)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="p-4 w-full bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-white/80 line-clamp-2 mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Media Grid */}
      {rest.length > 0 && (
        <div>
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                onClick={() => setSelectedId(item.id)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-3 w-full bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedId && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {media.find((m) => m.id === selectedId) && (
              <div className="p-6 space-y-4">
                <img
                  src={media.find((m) => m.id === selectedId)?.imageUrl}
                  alt={media.find((m) => m.id === selectedId)?.title}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{media.find((m) => m.id === selectedId)?.title}</h3>
                  {media.find((m) => m.id === selectedId)?.description && (
                    <p className="text-foreground/70 mt-2">{media.find((m) => m.id === selectedId)?.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
