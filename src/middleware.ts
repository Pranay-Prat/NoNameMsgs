import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server'
export { default } from 'next-auth/middleware';
// This function can be marked `async` if using `await` inside
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
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};
