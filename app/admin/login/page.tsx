'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [isSetup, setIsSetup] = useState(false)
  const [mode, setMode] = useState<'login' | 'setup'>('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/auth/setup')
        const data = await response.json()
        setIsSetup(data.adminExists)
        setMode(data.adminExists ? 'login' : 'setup')
      } catch (error) {
        console.error('[v0] Error checking admin status:', error)
        setMode('login')
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [])

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

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Admin account created! Please login.')
        setMode('login')
        setFormData({ email: formData.email, password: '' })
      } else {
        const error = await response.json()
        toast.error(error.error || 'Setup failed')
      }
    } catch (error) {
      console.error('[v0] Setup error:', error)
      toast.error('Error creating admin account')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-foreground/60">
            {mode === 'setup' ? 'Create your admin account' : 'Login to manage your content'}
          </p>
        </div>

        <form
          onSubmit={mode === 'setup' ? handleSetup : handleLogin}
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
            {mode === 'setup' && (
              <p className="text-xs text-foreground/60 mt-1">Minimum 8 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting
              ? mode === 'setup'
                ? 'Creating account...'
                : 'Logging in...'
              : mode === 'setup'
                ? 'Create Account'
                : 'Login'}
          </button>

          {mode === 'login' && (
            <div className="pt-4 border-t border-border">
              <p className="text-center text-sm text-foreground/60 mb-3">
                No account yet?
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode('setup')
                  setFormData({ email: '', password: '' })
                }}
                className="w-full px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Create Admin Account
              </button>
            </div>
          )}

          {mode === 'setup' && (
            <div className="pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setFormData({ email: '', password: '' })
                }}
                className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
