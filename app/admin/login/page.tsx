'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('admin_token', data.token)
        toast.success('Login successful!')
        router.push('/admin')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Login failed')
      }
    } catch (error) {
      console.error('[v0] Login error:', error)
      toast.error('Error logging in')
    } finally {
      setSubmitting(false)
    }
  }





  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-foreground/60">Login to manage your content</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6 bg-card p-8 rounded-lg shadow-md border border-border"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
