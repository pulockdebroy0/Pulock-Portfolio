import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.ADMIN_SECRET || 'your-secret-key')

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Verify the token
    await jwtVerify(token, secret)

    return NextResponse.json({ authenticated: true }, { status: 200 })
  } catch (error) {
    console.error('[v0] Auth check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
