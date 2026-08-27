import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { hashPassword } from '@/lib/auth'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const INIT_SECRET = process.env.ADMIN_INIT_SECRET


export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json()

    if (secret !== INIT_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if admin already exists
    const existingUsers = await sql`
      SELECT id FROM admin_users LIMIT 1
    `

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'Admin user already exists' },
        { status: 200 }
      )
    }

    // Create admin user with specified credentials
    const passwordHash = hashPassword(ADMIN_PASSWORD)

    const result = await sql`
      INSERT INTO admin_users (email, password_hash)
      VALUES (${ADMIN_EMAIL}, ${passwordHash})
      RETURNING id, email, created_at
    `

    return NextResponse.json(
      {
        message: 'Admin account created successfully',
        user: result[0],
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Admin init error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize admin account' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const users = await sql`
      SELECT COUNT(*) as count FROM admin_users
    `

    return NextResponse.json({
      adminCount: users[0].count,
      adminExists: users[0].count > 0,
    })
  } catch (error) {
    console.error('[v0] Admin check error:', error)
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    )
  }
}
