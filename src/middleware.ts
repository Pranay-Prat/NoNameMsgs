import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server'
export { default } from 'next-auth/middleware';
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    if (token && (
        request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup') || request.nextUrl.pathname.startsWith('/verify')
    )){
    return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (!token && (
        request.nextUrl.pathname.startsWith('/dashboard'))) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
  
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup', '/', '/verify/:path*'],
};
