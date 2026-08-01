'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminNav } from '@/components/admin-nav'

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('[v0] Auth check failed:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
