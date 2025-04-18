import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('/api/items');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setError('商品が見つかりませんでした');
        }
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setError('商品の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    }
    
    fetchItems();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
      {error}
    </div>
  );
  
  if (items.length === 0) return (
    <div className="text-gray-500 text-center py-8">
      商品がありません
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map(item => (
        <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
              unoptimized
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{item.name}</h3>
            <p className="text-gray-600">¥{item.price.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 