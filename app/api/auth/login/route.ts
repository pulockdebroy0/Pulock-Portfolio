import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { hashPassword, generateToken, authCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email, password } = data

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find admin user
    const users = await sql`
      SELECT id, email, password_hash as "passwordHash"
      FROM admin_users
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const user = users[0]
    if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 128) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const passwordHash = hashPassword(password)

    if (user.passwordHash !== passwordHash) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate token
    const token = await generateToken(String(user.id), user.email)

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 200 }
    )

    // Set secure HTTP-only cookie
    response.cookies.set(authCookie(token))

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
  }
}
