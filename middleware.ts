import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証が不要なパスを定義
const publicPaths = [
  '/login',
  '/api/auth/login',
  '/api/auth/register',
  '/_next',
  '/static',
];

export function middleware(request: NextRequest) {
  // 現在のパスを取得
  const { pathname } = request.nextUrl;

  // 静的アセットやパブリックパスの場合はスキップ
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // auth-tokenの存在確認
  const token = request.cookies.get('auth-token');

  // トークンが存在しない場合、ログインページにリダイレクト
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: [
    /*
     * /api/auth/* を除外する（認証エンドポイント）
     * /_next/static を除外する（静的アセット）
     * /_next/image を除外する（画像最適化API）
     */
    '/((?!api/auth|_next/static|_next/image).*)',
  ],
}; 