import { jwtVerify, SignJWT } from 'jose'
import crypto from 'crypto'

function getSecret() {
  const value = process.env.ADMIN_SECRET
  if (!value || value.length < 32) {
    throw new Error('ADMIN_SECRET must be configured with at least 32 characters')
  }
  return new TextEncoder().encode(value)
}

export function hashPassword(password: string): string {
  const secret = process.env.ADMIN_SECRET
  if (!secret) throw new Error('ADMIN_SECRET is not configured')
  return crypto.createHash('sha256').update(password + secret).digest('hex')
}

export function verifyPassword(password: string, hash: string): boolean {
  const actual = hashPassword(password)
  return actual.length === hash.length && crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(hash))
}

export async function generateToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function getCurrentUser(request: Request) {
  const cookieToken = request.headers.get('cookie')?.match(/(?:^|;\s*)admin_token=([^;]+)/)?.[1]
  const authHeader = request.headers.get('authorization')
  const token = cookieToken || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null)
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload.sub ? { id: payload.sub, email: typeof payload.email === 'string' ? payload.email : undefined } : null
  } catch {
    return null
  }
}

export function authCookie(token: string) {
  return {
    name: 'admin_token', value: token, httpOnly: true, secure: true,
    sameSite: 'lax' as const, maxAge: 7 * 24 * 60 * 60, path: '/',
  }
}

export function clearAuthCookie() {
  return { ...authCookie(''), maxAge: 0 }
}

export function generateLegacyToken() {
  return crypto.randomBytes(32).toString('hex')
}
