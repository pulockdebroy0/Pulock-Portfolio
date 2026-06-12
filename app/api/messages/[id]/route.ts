import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

type RouteContext = { params: Promise<{ id: string }> }

function requireAuth(request: NextRequest) {
  const auth = request.headers.get('authorization')
  return auth?.startsWith('Bearer ') ? auth.substring(7) : null
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  if (!requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const message = await sql`
      SELECT id, name, email, message, is_read as "read", created_at as "createdAt"
      FROM messages WHERE id = ${id}
    `
    if (message.length === 0) return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    return NextResponse.json(message[0])
  } catch (error) {
    console.error('[messages] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch message' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const { read } = await request.json()
    const result = await sql`
      UPDATE messages
      SET is_read = COALESCE(${read}, is_read)
      WHERE id = ${id}
      RETURNING id, name, email, message, is_read as "read", created_at as "createdAt"
    `
    if (result.length === 0) return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('[messages] PUT error:', error)
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!requireAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const result = await sql`DELETE FROM messages WHERE id = ${id} RETURNING id`
    if (result.length === 0) return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    return NextResponse.json({ message: 'Message deleted successfully' })
  } catch (error) {
    console.error('[messages] DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
