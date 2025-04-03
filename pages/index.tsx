import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* ヒーローセクション */}
      <section className="relative h-[600px] mb-12">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="スポーツユニフォーム"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              あなたのチームに最適な
              <br />
              オリジナルユニフォーム
            </h1>
            <p className="text-xl mb-8">
              高品質な素材とカスタマイズ性で、
              <br />
              チームの個性を表現
            </p>
            <Link
              href="/customize"
              className="bg-accent hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              カスタマイズを始める
            </Link>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">特徴</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">完全カスタマイズ</h3>
            <p className="text-gray-600">
              色、デザイン、ロゴ、番号など、
              すべてを自由にカスタマイズできます
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">高品質素材</h3>
            <p className="text-gray-600">
              快適な着心地と耐久性を
              両立した素材を使用
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">迅速な納期</h3>
            <p className="text-gray-600">
              最短2週間で
              お届け可能です
            </p>
          </div>
        </div>
      </section>

      {/* 商品一覧セクション */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">人気商品</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`/images/product-${i}.jpg`}
                  alt={`商品${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">サッカーユニフォーム</h3>
                <p className="text-gray-600 mb-2">¥12,800〜</p>
                <Link
                  href={`/products/${i}`}
                  className="block text-center bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home; 