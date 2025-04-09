import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

const Products: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'サッカーユニフォーム',
      price: 12800,
      image: '/images/product-1.jpg',
    },
    {
      id: 2,
      name: 'バスケットボールユニフォーム',
      price: 9800,
      image: '/images/product-2.jpg',
    },
    {
      id: 3,
      name: '野球ユニフォーム',
      price: 15800,
      image: '/images/product-3.jpg',
    },
    {
      id: 4,
      name: 'バレーボールユニフォーム',
      price: 11800,
      image: '/images/product-4.jpg',
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">商品一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="relative h-48 mb-4" style={{ position: 'relative' }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
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