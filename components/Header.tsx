import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      // 未認証時の処理
    },
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  }, []);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="fixed w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold">
            APPAREL SHOP
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-gray-600">
              商品一覧
            </Link>
            <Link href="/news" className="hover:text-gray-600">
              ニュース
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              ショップについて
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              お問い合わせ
            </Link>
            {status === 'loading' ? null : session ? (
              <>
                <Link href="/account" className="hover:text-gray-600">
                  マイページ
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hover:text-gray-600"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-90"
              >
                ログイン
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-primary">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            {session ? (
              <Link href="/account" className="text-gray-700 hover:text-primary">
                <UserIcon className="h-6 w-6" />
              </Link>
            ) : (
              <Link href="/auth/login" className="text-gray-700 hover:text-primary">
                <UserIcon className="h-6 w-6" />
              </Link>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={handleMenuToggle}
            aria-label="メニュー"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="hover:text-gray-600"
                onClick={handleMenuClose}
              >
                商品一覧
              </Link>
              <Link
                href="/news"
                className="hover:text-gray-600"
                onClick={handleMenuClose}
              >
                ニュース
              </Link>
              <Link
                href="/about"
                className="hover:text-gray-600"
                onClick={handleMenuClose}
              >
                ショップについて
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-600"
                onClick={handleMenuClose}
              >
                お問い合わせ
              </Link>
              {status === 'loading' ? null : session ? (
                <>
                  <Link
                    href="/account"
                    className="hover:text-gray-600"
                    onClick={handleMenuClose}
                  >
                    マイページ
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      handleMenuClose();
                    }}
                    className="hover:text-gray-600 text-left"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-90 inline-block"
                  onClick={handleMenuClose}
                >
                  ログイン
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 