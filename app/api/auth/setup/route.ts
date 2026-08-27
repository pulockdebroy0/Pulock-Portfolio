import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const setupSecret = request.headers.get('x-admin-setup-secret')
  const configuredSecret = process.env.ADMIN_SECRET
  if (!configuredSecret || !setupSecret || setupSecret !== configuredSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

    // Generate token
    const token = await generateToken(String(result[0].id), result[0].email)

    const response = NextResponse.json(
      {
        message: 'Admin user created successfully',
        user: result[0],
        token,
      },
      { status: 201 }
    )

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
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
