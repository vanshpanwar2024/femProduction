import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './auth';

// Add routes that require authentication
const protectedRoutes = ['/dashboard', '/profile'];
const publicRoutes = ['/login', '/register', '/', '/about', '/events', '/gallery'];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const session = request.cookies.get('session')?.value;
  const user = session ? await decrypt(session) : null;

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isPublicRoute && user && path === '/login') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  
  return NextResponse.next();
}
