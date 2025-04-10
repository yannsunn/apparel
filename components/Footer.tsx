import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SportsUniform</h3>
            <p className="text-gray-300">
              高品質なスポーツユニフォームを
              お手頃価格でご提供します。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">ショッピング</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  商品一覧
                </Link>
              </li>
              <li>
                <Link href="/customize" className="text-gray-300 hover:text-white">
                  カスタマイズ
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white">
                  カート
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">会社情報</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>電話: 0120-XXX-XXX</li>
              <li>メール: info@sportsuniform.com</li>
              <li>営業時間: 9:00-18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 SportsUniform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 