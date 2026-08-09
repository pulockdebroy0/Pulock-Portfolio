'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Edit2, Plus, Upload } from 'lucide-react'
import { toast } from 'sonner'
import type { Media } from '@/lib/types'

export default function MediaManagementPage() {
  const router = useRouter()
  const [items, setItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    altText: '',
    featured: false,
  })

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }
      fetchMedia()
    }

    checkAuth()
  }, [router])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('[v0] Error fetching media:', error)
      toast.error('Failed to load media')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const target = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        toast.error('Failed to upload image')
        return
      }

      const data = await response.json()
      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
      }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('[v0] Upload error:', error)
      toast.error('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.imageUrl) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/media/${editingId}` : '/api/media'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingId ? 'Media updated successfully' : 'Media created successfully')
        resetForm()
        fetchMedia()
      } else {
        toast.error('Failed to save media')
      }
    } catch (error) {
      console.error('[v0] Error saving media:', error)
      toast.error('Error saving media')
    }
  }

  const handleEdit = (item: Media) => {
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      altText: item.altText || item.title,
      featured: item.featured,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Media deleted')
        fetchMedia()
      } else {
        toast.error('Failed to delete media')
      }
    } catch (error) {
      console.error('[v0] Error deleting media:', error)
      toast.error('Error deleting media')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      featured: false,
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-foreground">Media Management</h1>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Media
        </button>
      </div>

      {showForm && (
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {editingId ? 'Edit Media' : 'Add New Media'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Image *</label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                <button
                  type="button"
                  disabled={uploading}
                  className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
              {formData.imageUrl && (
                <div className="mt-2">
                  <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Image alt text *</label>
              <input
                type="text"
                name="altText"
                value={formData.altText}
                onChange={handleInputChange}
                placeholder="Describe the image for accessibility and search"
                className="w-full rounded-lg border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-medium text-foreground">
                Featured
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-border rounded-lg hover:bg-secondary/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p className="text-foreground/60 text-center py-8 col-span-full">No media yet. Upload some photos!</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-foreground/60 mb-2 line-clamp-2">{item.description}</p>
                {item.featured && <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded mb-2">Featured</span>}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-3 py-2 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
