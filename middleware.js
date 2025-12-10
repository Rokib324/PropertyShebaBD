import { NextResponse } from 'next/server'

// Helper function to verify admin token
const verifyAdminToken = (token) => {
  if (!token) return null;
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    if (Date.now() > decoded.expiry) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Protect admin pages (exclude login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value
    const admin = verifyAdminToken(token)
    
    if (!admin) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Clear expired token and redirect
    if (!admin) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin-token')
      return response
    }
  }

  // Protect admin API routes (exclude auth routes: login, logout, register)
  if (pathname.startsWith('/api/admin') && 
      pathname !== '/api/admin/login' && 
      pathname !== '/api/admin/logout' &&
      pathname !== '/api/admin/register') {
    const token = request.cookies.get('admin-token')?.value
    const admin = verifyAdminToken(token)
    
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please login.' },
        { status: 401 }
      )
    }

    // Super admin only routes
    const superAdminOnlyRoutes = ['/api/admin/register'];
    if (superAdminOnlyRoutes.some(route => pathname.startsWith(route)) && admin.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden. Super admin access required.' },
        { status: 403 }
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
    const admin = verifyAdminToken(token)
    
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
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
