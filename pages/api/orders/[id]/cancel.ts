import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session?.user?.id) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    const orderId = req.query.id as string;
    if (!orderId) {
      return res.status(400).json({ message: '注文IDが必要です' });
    }

    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ message: 'キャンセル理由が必要です' });
    }

    // 注文の存在確認と権限チェック
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
      },
    });

    if (!order) {
      return res.status(404).json({ message: '注文が見つかりません' });
    }

    // キャンセル可能な状態かチェック
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'この注文はキャンセルできません' });
    }

    // 注文をキャンセル状態に更新
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'cancelled',
        cancelReason: reason,
        cancelledAt: new Date(),
      },
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('注文キャンセルエラー:', error);
    return res.status(500).json({ message: 'サーバーエラーが発生しました' });
  } finally {
    await prisma.$disconnect();
  }
} 