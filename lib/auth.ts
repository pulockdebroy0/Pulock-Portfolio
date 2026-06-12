import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'your-secret-key-change-in-production'

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + ADMIN_SECRET).digest('hex')
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export async function getCurrentUser(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  
  // In production, validate the token against your database
  // For now, just check if it's not empty
  return token ? { id: token } : null
}
