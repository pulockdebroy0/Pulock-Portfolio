'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Mail } from 'lucide-react'
import { toast } from 'sonner'
import type { Message } from '@/lib/types'

export default function MessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }
      fetchMessages()
    }

    checkAuth()
  }, [router])

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (Array.isArray(data)) {
        setMessages(data)
      }
    } catch (error) {
      console.error('[v0] Error fetching messages:', error)
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (message: Message) => {
    try {
      const token = localStorage.getItem('admin_token')
      await fetch(`/api/messages/${message.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ read: !message.read }),
      })
      fetchMessages()
    } catch (error) {
      console.error('[v0] Error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('Message deleted')
        fetchMessages()
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('[v0] Error:', error)
      toast.error('Error deleting message')
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
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-card rounded-lg border border-border overflow-hidden">
          <div className="bg-secondary/10 p-4 border-b border-border">
            <p className="text-sm font-medium text-foreground">
              {messages.length} Message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-foreground/60 text-center py-8">No messages</p>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left px-4 py-3 border-b border-border hover:bg-secondary/5 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-secondary/10' : ''
                  } ${!msg.read ? 'bg-accent/5' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{msg.name}</p>
                      <p className="text-sm text-foreground/60">{msg.email}</p>
                      <p className="text-xs text-foreground/40 truncate">{msg.message.substring(0, 50)}...</p>
                    </div>
                    {!msg.read && <div className="w-2 h-2 bg-accent rounded-full ml-2 mt-1" />}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedMessage.name}</h2>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-primary hover:text-primary/80 flex items-center gap-2 mt-2"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedMessage.read
                        ? 'bg-secondary/10 text-secondary'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {selectedMessage.read ? 'Mark Unread' : 'Mark as Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Message</p>
                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="text-xs text-foreground/40">
                  Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <p className="text-foreground/60">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
