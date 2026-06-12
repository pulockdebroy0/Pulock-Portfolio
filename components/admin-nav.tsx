'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Home, FileText, Mail, Images, Phone } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      // Clear the auth token from localStorage
      localStorage.removeItem('admin_token')
      // Clear the cookie
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      console.error('[v0] Logout error:', error)
      toast.error('Failed to logout')
    } finally {
      setLoading(false)
    }
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/portfolio', label: 'Portfolio', icon: Images },
    { href: '/admin/publications', label: 'Publications', icon: FileText },
    { href: '/admin/messages', label: 'Messages', icon: Mail },
    { href: '/admin/contact', label: 'Contact Info', icon: Phone },
  ]

  return (
    <nav className="w-64 bg-foreground text-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/20">
        <h1 className="text-2xl font-serif font-bold">Admin Panel</h1>
        <p className="text-sm text-background/60 mt-1">Manage your content</p>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-secondary text-foreground'
                  : 'text-background/70 hover:bg-background/10 hover:text-background'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-border/20 p-4">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-background/70 hover:bg-background/10 hover:text-background transition-colors disabled:opacity-50"
        >
          <LogOut className="w-5 h-5" />
          <span>{loading ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </nav>
  )
}
