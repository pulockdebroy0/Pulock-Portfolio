import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Allow access to setup route
  if (pathname === '/api/auth/setup') {
    return NextResponse.next()
  }

  // Allow access to check route
  if (pathname === '/api/auth/check') {
    return NextResponse.next()
  }

  // Allow access to login API route
  if (pathname === '/api/auth/login') {
    return NextResponse.next()
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/:path*'],
}
