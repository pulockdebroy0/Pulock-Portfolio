import type { Metadata } from 'next'
import { AdminNav } from '@/components/admin-nav'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Pulock Deb Roy',
  description: 'Manage portfolio, publications, and messages',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
