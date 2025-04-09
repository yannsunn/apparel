// pages/api/orders/[id]/tracking.ts
// 静的サイトエクスポートではAPIルートは動作しないため、このファイルは実際には使用されません
// ビルドエラーを回避するために最小限の実装に変更します

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 静的エクスポートでは実行されない
  res.status(200).json({ message: 'This API route is not available in static export' });
} 