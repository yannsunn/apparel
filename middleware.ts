import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    // 認証済みユーザーのみアクセス可能
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/profile/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/api/orders/:path*',
    '/api/cart/:path*',
  ],
}; 