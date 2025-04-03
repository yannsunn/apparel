import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const orderId = req.query.id as string;

  try {
    // 注文データを取得
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
      },
      include: {
        trackingInfo: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!order.trackingInfo) {
      return res.status(404).json({ message: 'Tracking info not found' });
    }

    // ここで実際の配送業者のAPIを呼び出して最新の情報を取得
    // この例では、モックデータを返します
    const mockTrackingData = {
      status: order.trackingInfo.status,
      currentLocation: order.trackingInfo.currentLocation,
      history: order.trackingInfo.history,
    };

    // データベースを更新
    await prisma.trackingInfo.update({
      where: {
        id: order.trackingInfo.id,
      },
      data: mockTrackingData,
    });

    return res.status(200).json(mockTrackingData);
  } catch (error) {
    console.error('配送状況の更新エラー:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 