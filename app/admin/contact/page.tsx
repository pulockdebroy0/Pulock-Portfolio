'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ContactInfo {
  email: string
  whatsapp: string
  whatsapp_url: string
  linkedin_name: string
  linkedin_url: string
}

const fields: { label: string; name: keyof ContactInfo; type: string; placeholder: string }[] = [
  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'admin@example.com' },
  { label: 'WhatsApp Display Number', name: 'whatsapp', type: 'text', placeholder: '+8801739161076' },
  { label: 'WhatsApp Link URL', name: 'whatsapp_url', type: 'url', placeholder: 'https://wa.me/8801739161076' },
  { label: 'LinkedIn Display Name', name: 'linkedin_name', type: 'text', placeholder: 'Pulock Deb Roy' },
  { label: 'LinkedIn Profile URL', name: 'linkedin_url', type: 'url', placeholder: 'https://linkedin.com/in/username' },
]

export default function AdminContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ContactInfo>({
    email: '',
    whatsapp: '',
    whatsapp_url: '',
    linkedin_name: '',
    linkedin_url: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetch('/api/contact-info')
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setFormData({
            email: data.email ?? '',
            whatsapp: data.whatsapp ?? '',
            whatsapp_url: data.whatsapp_url ?? '',
            linkedin_name: data.linkedin_name ?? '',
            linkedin_url: data.linkedin_url ?? '',
          })
        }
      })
      .catch(() => toast.error('Failed to load contact info'))
      .finally(() => setLoading(false))
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('admin_token')
    setSaving(true)
    try {
      const res = await fetch('/api/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast.success('Contact info updated!')
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to update')
      }
    } catch {
      toast.error('Error saving contact info')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-foreground">Contact Info</h1>
        <p className="text-foreground/60 mt-2">Update the contact details shown on your website</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-card p-8 rounded-lg border border-border">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
