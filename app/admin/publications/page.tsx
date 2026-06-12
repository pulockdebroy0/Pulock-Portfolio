'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import type { Publication } from '@/lib/types'

export default function PublicationsPage() {
  const router = useRouter()
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    link: '',
    publishedAt: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }
      fetchPublications()
    }

    checkAuth()
  }, [router])

  const fetchPublications = async () => {
    try {
      const response = await fetch('/api/publications')
      const data = await response.json()
      setPublications(data)
    } catch (error) {
      console.error('[v0] Error fetching publications:', error)
      toast.error('Failed to load publications')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/publications/${editingId}` : '/api/publications'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          publishedAt: new Date(formData.publishedAt).toISOString(),
        }),
      })

      if (response.ok) {
        toast.success(editingId ? 'Publication updated' : 'Publication created')
        resetForm()
        fetchPublications()
      } else {
        toast.error('Failed to save publication')
      }
    } catch (error) {
      console.error('[v0] Error saving publication:', error)
      toast.error('Error saving publication')
    }
  }

  const handleEdit = (pub: Publication) => {
    setFormData({
      title: pub.title,
      description: pub.description,
      content: pub.content,
      imageUrl: pub.imageUrl || '',
      link: pub.link || '',
      publishedAt: new Date(pub.publishedAt).toISOString().split('T')[0],
    })
    setEditingId(pub.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      const response = await fetch(`/api/publications/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Publication deleted')
        fetchPublications()
      } else {
        toast.error('Failed to delete')
      }
    } catch (error) {
      console.error('[v0] Error:', error)
      toast.error('Error deleting publication')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      link: '',
      publishedAt: new Date().toISOString().split('T')[0],
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-foreground">Publications</h1>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          Add Publication
        </button>
      </div>

      {showForm && (
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {editingId ? 'Edit Publication' : 'New Publication'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full px-3 py-2 border border-border rounded-lg"
              required
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full px-3 py-2 border border-border rounded-lg"
              required
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Content"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg resize-none"
            />
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Link (optional)"
              className="w-full px-3 py-2 border border-border rounded-lg"
            />
            <input
              type="date"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg"
            />
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                {editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="px-4 py-2 border border-border rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {publications.length === 0 ? (
          <p className="text-foreground/60 text-center py-8">No publications yet</p>
        ) : (
          publications.map((pub) => (
            <div key={pub.id} className="bg-card p-6 rounded-lg border border-border flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-foreground">{pub.title}</h3>
                <p className="text-foreground/70">{pub.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(pub)} className="p-2 text-primary hover:bg-primary/10 rounded">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(pub.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
