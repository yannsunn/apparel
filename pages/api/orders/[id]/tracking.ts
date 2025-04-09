// pages/api/orders/[id]/tracking.ts
// 静的サイトエクスポートではAPIルートは動作しないため、このファイルは実際には使用されません
// ビルドエラーを回避するために最小限の実装に変更します

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
import { logger } from '../../../../lib/logger';
import { YamatoClient } from '../../../../utils/carriers/yamato';
import { SagawaClient } from '../../../../utils/carriers/sagawa';
import { FedExClient } from '../../../../utils/carriers/fedex';
import { TrackingInfo } from '../../../../types/tracking';
import { Prisma } from '@prisma/client';
import { getTrackingUrl } from '../../../../utils/tracking';

interface ExtendedError extends Error {
  code?: string;
  details?: unknown;
}

// 配送履歴の型定義
interface TrackingHistoryEntry {
  status: string;
  location: string | null;
  timestamp: string;
  description: string;
  carrier: string;
  additionalInfo?: {
    deliveryWindow?: string;
    weight?: string;
    size?: string;
    deliveryType?: string;
    senderName?: string;
  };
}

// データベースのTrackingInfo型定義
interface DbTrackingInfo {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber: string;
  status: string;
  currentLocation?: string | null;
  history: Prisma.JsonValue;
  estimatedDeliveryDate?: string | null;
  createdAt: Date;
}

interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

interface StaticExportResponse {
  message: string;
  path?: string;
}

interface ApiResponse<T = TrackingInfo | StaticExportResponse> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

interface ErrorWithMessage extends Error {
  message: string;
}

// 型変換用のユーティリティ関数
function convertToDbTrackingInfo(data: any): DbTrackingInfo {
  return {
    ...data,
    history: Array.isArray(data.history) 
      ? data.history.map((entry: any) => ({
          status: entry.status,
          location: entry.location,
          timestamp: entry.timestamp,
          description: entry.description,
          carrier: entry.carrier,
          additionalInfo: entry.additionalInfo
        }))
      : []
  };
}

/**
 * 配送情報を取得・更新するAPIハンドラー
 * @param req - Next.jsのリクエストオブジェクト
 * @param res - Next.jsのレスポンスオブジェクト
 * @returns 更新された配送情報またはエラーレスポンス
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // 静的エクスポート時の処理
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    logger.info('Static export detected, skipping API route')
    return res.status(200).json({
      success: true,
      data: {
        message: 'API routes are not available during static export',
        path: req.url
      }
    })
  }

  if (req.method !== 'GET') {
    logger.warn('許可されていないメソッド:', { method: req.method });
    return res.status(405).json({
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: '許可されていないメソッドです'
      }
    });
  }

  const session = await getSession({ req });
  if (!session) {
    logger.warn('認証が必要です');
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: '認証が必要です'
      }
    });
  }

  const { id: orderId } = req.query;
  if (!orderId || typeof orderId !== 'string') {
    logger.warn('注文IDが必要です');
    return res.status(400).json({
      success: false,
      error: {
        code: 'ORDER_ID_REQUIRED',
        message: '注文IDが必要です'
      }
    });
  }

  try {
    // セッションチェックの前にデータベース接続確認
    try {
      await prisma.$connect();
    } catch (dbError) {
      const error = dbError as ErrorWithMessage;
      logger.error('データベース接続エラー:', { error: error.message });
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_CONNECTION_ERROR',
          message: 'データベースに接続できません',
          details: error.message
        }
      });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        trackingInfo: true
      }
    });

    if (!order) {
      logger.warn('注文が見つかりません', { orderId });
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: '注文が見つかりません',
          details: { orderId }
        }
      });
    }

    if (!order.trackingInfo?.trackingNumber || !order.trackingInfo?.carrier) {
      logger.warn('追跡番号が見つかりません', { orderId });
      return res.status(404).json({
        success: false,
        error: {
          code: 'TRACKING_NOT_FOUND',
          message: '追跡番号が見つかりません',
          details: { orderId }
        }
      });
    }

    let trackingInfo: TrackingInfo;
    try {
      switch (order.trackingInfo.carrier.toLowerCase()) {
        case 'yamato':
          const yamatoClient = new YamatoClient(process.env.YAMATO_API_KEY || '');
          trackingInfo = await yamatoClient.getTrackingInfo(order.trackingInfo.trackingNumber);
          break;
        case 'sagawa':
          const sagawaClient = new SagawaClient(process.env.SAGAWA_API_KEY || '');
          trackingInfo = await sagawaClient.getTrackingInfo(order.trackingInfo.trackingNumber);
          break;
        case 'fedex':
          const fedexClient = new FedExClient(process.env.FEDEX_API_KEY || '');
          trackingInfo = await fedexClient.getTrackingInfo(order.trackingInfo.trackingNumber);
          break;
        default:
          throw new Error(`対応していない配送業者です: ${order.trackingInfo.carrier}`);
      }
    } catch (carrierError) {
      const error = carrierError as ErrorWithMessage;
      logger.error('配送業者APIエラー:', { error: error.message });
      return res.status(500).json({
        success: false,
        error: {
          code: 'CARRIER_API_ERROR',
          message: '配送情報の取得に失敗しました',
          details: error.message
        }
      });
    }

    try {
      await prisma.trackingInfo.update({
        where: { orderId: order.id },
        data: {
          status: trackingInfo.status,
          currentLocation: trackingInfo.currentLocation,
          estimatedDeliveryDate: trackingInfo.estimatedDelivery,
          updatedAt: new Date()
        }
      });
    } catch (updateError) {
      const error = updateError as ErrorWithMessage;
      logger.error('データベース更新エラー:', { error: error.message });
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_UPDATE_ERROR',
          message: '配送情報の更新に失敗しました',
          details: error.message
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: trackingInfo
    });

  } catch (error) {
    const err = error as ErrorWithMessage;
    logger.error('予期せぬエラーが発生しました', { error: err.message });
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'サーバー内部エラーが発生しました',
        details: err.message
      }
    });
  }
} 