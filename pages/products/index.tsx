import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { Alert } from '../../components/Alert';

const Products: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'サッカーユニフォーム',
      price: 12800,
      image: '/images/products/soccer-uniform.jpg',
    },
    {
      id: 2,
      name: 'バスケットボールユニフォーム',
      price: 9800,
      image: '/images/products/basketball-uniform.jpg',
    },
    {
      id: 3,
      name: '野球ユニフォーム',
      price: 15800,
      image: '/images/products/baseball-uniform.jpg',
    },
    {
      id: 4,
      name: 'バレーボールユニフォーム',
      price: 11800,
      image: '/images/products/volleyball-uniform.jpg',
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // APIエンドポイントが準備できたら以下のコメントを解除
        // const response = await fetch('/api/products');
        // if (!response.ok) throw new Error('商品データの取得に失敗しました');
        // const data = await response.json();
        // setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : '商品データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-8">
          <Alert type="error" message={error} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">商品一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="relative h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">¥{product.price.toLocaleString()}</p>
              <Link
                href={`/products/${product.id}`}
                className="btn btn-primary block text-center"
              >
                詳細を見る
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products; 