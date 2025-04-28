import React, { useState, useCallback } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/cart" className="hover:text-gray-600">
              カート
            </Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
              Twitter
            </a>
          </nav>

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
              <Link
                href="/cart"
                className="hover:text-gray-600"
                onClick={handleMenuClose}
              >
                カート
              </Link>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
                onClick={handleMenuClose}
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
                onClick={handleMenuClose}
              >
                Twitter
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 