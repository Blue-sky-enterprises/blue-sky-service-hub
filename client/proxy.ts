import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;

    // Define public routes that do not require a token
    const isPublicRoute = pathname === '/' || pathname.startsWith('/auth');

    // If user has no token and tries to access a protected route
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // If user has a token and tries to access an auth route (login/signup)
    if (token && pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
