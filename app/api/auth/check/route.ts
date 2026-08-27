import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const configuredSecret = process.env.ADMIN_SECRET

function getSecret() {
  if (!configuredSecret || configuredSecret.length < 32) throw new Error('ADMIN_SECRET is not configured securely')
  return new TextEncoder().encode(configuredSecret)
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Verify the token
    await jwtVerify(token, getSecret())

    return NextResponse.json({ authenticated: true }, { status: 200 })
  } catch (error) {
    console.error('[v0] Auth check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
