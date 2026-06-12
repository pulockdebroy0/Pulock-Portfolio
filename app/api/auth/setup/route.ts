import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check if any admin user already exists
    const existingUsers = await sql`
      SELECT id FROM admin_users LIMIT 1
    `

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Admin user already exists. Cannot setup again.' },
        { status: 400 }
      )
    }

    const data = await request.json()
    const { email, password } = data

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    const passwordHash = hashPassword(password)

    const result = await sql`
      INSERT INTO admin_users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id, email
    `

    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        user: result[0],
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Admin setup error:', error)
    return NextResponse.json({ error: 'Failed to setup admin user' }, { status: 500 })
  }
}

// GET to check if admin already exists
export async function GET() {
  try {
    const users = await sql`
      SELECT id FROM admin_users LIMIT 1
    `

    return NextResponse.json({
      adminExists: users.length > 0,
    })
  } catch (error) {
    console.error('[v0] Admin check error:', error)
    return NextResponse.json({ error: 'Failed to check admin status' }, { status: 500 })
  }
}
