import React from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            SportsUniform
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary">
              商品一覧
            </Link>
            <Link href="/customize" className="text-gray-700 hover:text-primary">
              カスタマイズ
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">
              会社概要
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary">
              お問い合わせ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-primary">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link href="/account" className="text-gray-700 hover:text-primary">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 