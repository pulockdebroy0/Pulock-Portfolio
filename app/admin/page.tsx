'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface DashboardStats {
  portfolioCount: number
  publicationsCount: number
  messagesCount: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    portfolioCount: 0,
    publicationsCount: 0,
    messagesCount: 0,
    unreadMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      try {
        // Fetch portfolio count
        const portfolioRes = await fetch('/api/portfolio')
        const portfolioData = await portfolioRes.json()
        
        // Fetch publications count
        const pubRes = await fetch('/api/publications')
        const pubData = await pubRes.json()
        
        // Fetch messages
        const messagesRes = await fetch('/api/messages', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        const messagesData = await messagesRes.json()
        
        if (Array.isArray(portfolioData) && Array.isArray(pubData) && Array.isArray(messagesData)) {
          setStats({
            portfolioCount: portfolioData.length,
            publicationsCount: pubData.length,
            messagesCount: messagesData.length,
            unreadMessages: messagesData.filter((m: any) => !m.read).length,
          })
        }
      } catch (error) {
        console.error('[v0] Error fetching stats:', error)
        toast.error('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

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

  const StatCard = ({ label, value, subtext }: { label: string; value: number; subtext?: string }) => (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <p className="text-foreground/60 text-sm font-medium">{label}</p>
      <p className="text-4xl font-bold text-foreground mt-2">{value}</p>
      {subtext && <p className="text-sm text-foreground/60 mt-1">{subtext}</p>}
    </div>
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground/60 mt-2">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Portfolio Items" value={stats.portfolioCount} />
        <StatCard label="Publications" value={stats.publicationsCount} />
        <StatCard label="Total Messages" value={stats.messagesCount} />
        <StatCard
          label="Unread Messages"
          value={stats.unreadMessages}
          subtext={`of ${stats.messagesCount} total`}
        />
      </div>

      <div className="mt-12 bg-card p-6 rounded-lg shadow-sm border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/portfolio"
            className="p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-1">Manage Portfolio</h3>
            <p className="text-sm text-foreground/60">Add, edit, or delete portfolio items</p>
          </a>
          <a
            href="/admin/publications"
            className="p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-1">Manage Publications</h3>
            <p className="text-sm text-foreground/60">Add, edit, or delete publications</p>
          </a>
          <a
            href="/admin/messages"
            className="p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-1">View Messages</h3>
            <p className="text-sm text-foreground/60">Read and manage contact messages</p>
          </a>
        </div>
      </div>
    </div>
  )
}
