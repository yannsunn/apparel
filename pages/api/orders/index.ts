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

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search as string;
  const status = req.query.status as string;
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  try {
    // 検索条件の構築
    const where: any = {
      userId: session.user.id,
    };

    // キーワード検索
    if (search) {
      where.OR = [
        { id: { contains: search } },
        { items: { some: { productName: { contains: search } } } },
      ];
    }

    // ステータスフィルター
    if (status) {
      where.status = status;
    }

    // 日付範囲フィルター
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // 総注文数を取得
    const totalOrders = await prisma.order.count({ where });

    // 注文データを取得
    const orders = await prisma.order.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: true,
        trackingInfo: true,
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalOrders / limit);

    return res.status(200).json({
      orders,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('注文データの取得エラー:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 