import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Protect admin routes (exclude login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      if (Date.now() > decoded.expiry) {
        // Token expired, clear cookie and redirect
        const response = NextResponse.redirect(new URL('/admin/login', request.url))
        response.cookies.delete('admin-token')
        return response
      }
    } catch {
      // Invalid token, clear cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin-token')
      return response
    }
  }

  // Protect admin API routes (exclude login and create-admin)
  if (pathname.startsWith('/api/admin') && 
      pathname !== '/api/admin/login' && 
      pathname !== '/api/admin/logout' &&
      pathname !== '/api/admin/create-admin') {
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      if (Date.now() > decoded.expiry) {
        return NextResponse.json(
          { success: false, message: 'Token expired' },
          { status: 401 }
        )
      }
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }
  }

  // Protect data management API routes (POST, PUT, DELETE, PATCH operations)
  const protectedApiRoutes = [
    '/api/property',
    '/api/land',
    '/api/interior',
    '/api/marble',
    '/api/sanitary',
    '/api/slider'
  ]

  const isProtectedRoute = protectedApiRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }
    
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
      if (Date.now() > decoded.expiry) {
        return NextResponse.json(
          { success: false, message: 'Token expired' },
          { status: 401 }
        )
      }
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/property/:path*',
    '/api/land/:path*',
    '/api/interior/:path*',
    '/api/marble/:path*',
    '/api/sanitary/:path*',
    '/api/slider/:path*'
  ]
}
