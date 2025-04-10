import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.user?.id) {
    return res.status(401).json({ message: '認証が必要です' });
  }

  const orderId = req.query.id as string;

  // 注文が存在し、ユーザーのものか確認
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
    },
  });

  if (!order) {
    return res.status(404).json({ message: '注文が見つかりません' });
  }

  if (req.method === 'GET') {
    // 通知設定の取得
    const notification = await prisma.deliveryNotification.findFirst({
      where: {
        orderId,
      },
    });

    return res.status(200).json({
      isSubscribed: !!notification,
    });
  }

  if (req.method === 'POST') {
    // 通知設定の作成
    try {
      const notification = await prisma.deliveryNotification.create({
        data: {
          orderId,
          userId: session.user.id,
        },
      });

      return res.status(200).json({
        message: '通知設定を有効にしました',
        notification,
      });
    } catch (error) {
      console.error('通知設定の作成エラー:', error);
      return res.status(500).json({ message: '通知設定の作成に失敗しました' });
    }
  }

  if (req.method === 'DELETE') {
    // 通知設定の削除
    try {
      await prisma.deliveryNotification.deleteMany({
        where: {
          orderId,
        },
      });

      return res.status(200).json({
        message: '通知設定を無効にしました',
      });
    } catch (error) {
      console.error('通知設定の削除エラー:', error);
      return res.status(500).json({ message: '通知設定の削除に失敗しました' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 