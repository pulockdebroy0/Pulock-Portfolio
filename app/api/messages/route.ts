import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const messages = await sql`
      SELECT id, name, email, message, is_read as "read", created_at as "createdAt"
      FROM messages
      ORDER BY created_at DESC
    `
    return NextResponse.json(messages)
  } catch (error) {
    console.error('[messages] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO messages (name, email, message, is_read)
      VALUES (${name}, ${email}, ${message}, false)
      RETURNING id, name, email, message, is_read as "read", created_at as "createdAt"
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[messages] POST error:', error)
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
  }
}
