'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function AdminInitPage() {
  const router = useRouter()
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!secret.trim()) {
      toast.error('Please enter the admin secret')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin-init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret }),
      })

      const data = await response.json()

      if (response.ok) {
        setInitialized(true)
        toast.success('Admin account created successfully!')
        
        setTimeout(() => {
          router.push('/admin/login')
        }, 2000)
      } else {
        toast.error(data.error || 'Initialization failed')
      }
    } catch (error) {
      console.error('[v0] Init error:', error)
      toast.error('Error initializing admin account')
    } finally {
      setLoading(false)
    }
  }

  if (initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Admin Account Created!</h2>
          <p className="text-foreground/60 mb-4">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Admin Setup</h1>
          <p className="text-foreground/60">Initialize admin account with secret key</p>
        </div>

        <form
          onSubmit={handleInitialize}
          className="space-y-6 bg-card p-8 rounded-lg shadow-md border border-border"
        >
          <div>
            <label htmlFor="secret" className="block text-sm font-medium text-foreground mb-2">
              Admin Secret
            </label>
            <input
              id="secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter admin secret"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              disabled={loading}
            />
            <p className="text-xs text-foreground/60 mt-1">
              Check your ADMIN_SECRET environment variable
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Initializing...' : 'Initialize Admin Account'}
          </button>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-foreground/50 mb-2">Credentials to set:</p>
            <div className="bg-background/50 p-3 rounded text-xs text-foreground/60 space-y-1">
              <p>Email: pulockkumardeb02@gmail.com</p>
              <p>Password: Pulock2000@</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
