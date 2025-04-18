import { NextApiRequest, NextApiResponse } from 'next';

// 商品データの型定義
interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

// サンプルデータ
const sampleItems: Item[] = [
  {
    id: '1',
    name: 'サンプル商品1',
    price: 1000,
    description: '商品の説明文がここに入ります',
    imageUrl: '/images/sample1.jpg'
  },
  {
    id: '2',
    name: 'サンプル商品2',
    price: 2000,
    description: '商品の説明文がここに入ります',
    imageUrl: '/images/sample2.jpg'
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'メソッドが許可されていません',
      allowedMethods: ['GET']
    });
  }

  try {
    // 実際のアプリケーションではここでデータベースからデータを取得します
    if (!sampleItems || sampleItems.length === 0) {
      return res.status(404).json({ 
        error: '商品が見つかりませんでした',
        timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json(sampleItems);
  } catch (error) {
    console.error('APIエラー:', error);
    return res.status(500).json({ 
      error: 'サーバーエラーが発生しました',
      timestamp: new Date().toISOString()
    });
  }
} 