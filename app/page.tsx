'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/items');
        
        if (!response.ok) {
          throw new Error(`APIエラー: ${response.status}`);
        }

        const data = await response.json();
        
        if (isMounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : '商品の取得に失敗しました');
          console.error('商品取得エラー:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative h-screen">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="ヒーロー画像"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Fashion Story
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              あなたらしさを表現する最高の一着を
            </p>
            <Link
              href="/products"
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-opacity-90 transition"
            >
              商品を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 特集セクション */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">特集</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative aspect-[3/4]">
              <Image
                src="https://picsum.photos/600/800?random=1"
                alt="春の新作コレクション"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold">
                  春の新作コレクション
                </h3>
              </div>
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="https://picsum.photos/600/800?random=2"
                alt="コーディネート特集"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold">
                  コーディネート特集
                </h3>
              </div>
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="https://picsum.photos/600/800?random=3"
                alt="人気アイテムランキング"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold">
                  人気アイテムランキング
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新着商品セクション */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">新着商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-square mb-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg group-hover:opacity-90 transition"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                <p className="text-gray-600">¥{item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition"
            >
              すべての商品を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ニュースセクション */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">ニュース</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b pb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gray-500">2024.03.{item}</span>
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded">
                    お知らせ
                  </span>
                </div>
                <Link href="#" className="hover:text-gray-600">
                  春の新作アイテムが入荷しました
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-block border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition"
            >
              ニュース一覧
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 