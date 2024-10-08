import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Get the token from cookies
    const token = req.cookies.get('token');

    // Check if the user is logging out and clears the token
    const isProtectedRoute = req.nextUrl.pathname.startsWith('/account') || req.nextUrl.pathname.startsWith('/checkout');

    // If the user is trying to access the login route while authenticated, redirect to account
    if (req.nextUrl.pathname.startsWith('/login') && token) {
        // Redirect authenticated users from login page to account page
        return NextResponse.redirect(new URL('/account', req.url));
    }

    // Redirect to login if token is missing and user is on a protected route
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Continue to the requested page if token is present or the route is not protected
    return NextResponse.next();
}

// Apply middleware to the specific routes (account, checkout, and login)
export const config = {
    matcher: ['/account/:path*', '/checkout', '/login'],
};
