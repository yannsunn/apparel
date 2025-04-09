import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { handleApiError, AppError } from '@/utils/error-handling';
import { handleDatabaseError } from '@/utils/db-error-handling';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      throw new AppError('METHOD_NOT_ALLOWED', '許可されていないメソッドです', 405);
    }

    const session = await getSession({ req });
    if (!session?.user?.id) {
      throw new AppError('UNAUTHORIZED', '認証が必要です', 401);
    }

    const orderId = req.query.id as string;
    if (!orderId) {
      throw new AppError('INVALID_PARAMETER', '注文IDが必要です', 400);
    }

    const { reason } = req.body;
    if (!reason) {
      throw new AppError('INVALID_PARAMETER', 'キャンセル理由が必要です', 400);
    }

    // 注文の存在確認と権限チェック
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
      },
    });

    if (!order) {
      throw new AppError('NOT_FOUND', '注文が見つかりません', 404);
    }

    // キャンセル可能な状態かチェック
    if (order.status !== 'pending') {
      throw new AppError('INVALID_ORDER_STATE', 'この注文はキャンセルできません', 400);
    }

    // 注文をキャンセル状態に更新
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'cancelled',
        cancelReason: reason,
      },
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    const dbError = handleDatabaseError(error);
    const { status, body } = handleApiError(dbError);
    return res.status(status).json(body);
  } finally {
    await prisma.$disconnect();
  }
} 