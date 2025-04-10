import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-primary">AparelEC</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/customize"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-primary"
                >
                  カスタマイズ
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-primary"
                >
                  商品一覧
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/cart" className="p-2 text-gray-900 hover:text-primary">
                🛒 カート
              </Link>
              {session ? (
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    href="/profile"
                    className="text-gray-900 hover:text-primary"
                  >
                    マイページ
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-900 hover:text-primary"
                  >
                    ログアウト
                  </button>
                </div>
              ) : (
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-gray-900 hover:text-primary"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                  >
                    新規登録
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow">{children}</main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AparelEC</h3>
              <p className="text-gray-400">
                高品質なスポーツユニフォームを
                <br />
                お手頃価格で提供します
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">リンク</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    会社概要
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    プライバシーポリシー
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
              <p className="text-gray-400">
                メール: info@aparelec.com
                <br />
                電話: 03-1234-5678
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 AparelEC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 