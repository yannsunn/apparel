import { NextApiRequest, NextApiResponse } from 'next';
import logger from '../../../../lib/logger';

// 通知設定を保存するための仮のストレージ
// 実際の実装では、データベースを使用する必要があります
const notificationSubscriptions = new Map<string, boolean>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query;
  
  if (typeof orderId !== 'string') {
    return res.status(400).json({ error: '注文IDが無効です' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // 通知設定の取得
        const isSubscribed = notificationSubscriptions.get(orderId) || false;
        return res.status(200).json({ isSubscribed });

      case 'POST':
        // 通知設定の登録
        notificationSubscriptions.set(orderId, true);
        logger.info(`通知設定が登録されました: ${orderId}`);
        return res.status(200).json({ message: '通知設定を登録しました' });

      case 'DELETE':
        // 通知設定の解除
        notificationSubscriptions.delete(orderId);
        logger.info(`通知設定が解除されました: ${orderId}`);
        return res.status(200).json({ message: '通知設定を解除しました' });

      default:
        return res.status(405).json({ error: 'メソッドが許可されていません' });
    }
  } catch (error) {
    logger.error('通知設定の処理中にエラーが発生しました:', error);
    return res.status(500).json({ error: '内部サーバーエラーが発生しました' });
  }
} 