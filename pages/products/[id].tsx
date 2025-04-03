import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  // 仮の商品データ
  const product = {
    id: Number(id),
    name: 'サッカーユニフォーム',
    price: 12800,
    description: '高品質な素材を使用した、快適な着心地のサッカーユニフォームです。',
    image: '/images/product-1.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-600 mb-4">
              ¥{product.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">サイズ</h2>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded hover:border-primary"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-full"
            >
              カートに追加
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail; 