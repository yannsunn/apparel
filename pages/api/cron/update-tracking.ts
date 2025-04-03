import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { sendDeliveryUpdateEmail } from '../../../utils/mail';

const prisma = new PrismaClient();

// 配送業者のAPIクライアントをインポート
import { YamatoClient } from '../../../utils/carriers/yamato';
import { SagawaClient } from '../../../utils/carriers/sagawa';
import { JapanPostClient } from '../../../utils/carriers/japan-post';

const BATCH_SIZE = 50; // 一度に処理する注文数
const MAX_CONCURRENT_REQUESTS = 10; // 同時に実行するリクエスト数

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 認証チェック（APIキーなど）
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.CRON_API_KEY) {
    return res.status(401).json({ message: '認証が必要です' });
  }

  try {
    // 配送中の注文を取得（バッチサイズを制限）
    const orders = await prisma.order.findMany({
      where: {
        status: 'shipped',
        trackingInfo: {
          isNot: null,
        },
      },
      include: {
        trackingInfo: true,
        deliveryNotifications: {
          include: {
            user: true,
          },
        },
      },
      take: BATCH_SIZE,
    });

    const results = {
      updated: 0,
      notified: 0,
      errors: 0,
      processed: 0,
    };

    // 注文を配送業者ごとにグループ化
    const ordersByCarrier = orders.reduce((acc, order) => {
      if (!order.trackingInfo) return acc;
      const carrier = order.trackingInfo.carrier;
      if (!acc[carrier]) {
        acc[carrier] = [];
      }
      acc[carrier].push(order);
      return acc;
    }, {} as { [key: string]: typeof orders });

    // 配送業者ごとに並列処理を実行
    await Promise.all(
      Object.entries(ordersByCarrier).map(async ([carrier, carrierOrders]) => {
        // 配送業者に応じて適切なクライアントを選択
        let client;
        switch (carrier) {
          case 'ヤマト運輸':
            client = new YamatoClient();
            break;
          case '佐川急便':
            client = new SagawaClient();
            break;
          case '日本郵便':
            client = new JapanPostClient();
            break;
          default:
            console.error(`未対応の配送業者: ${carrier}`);
            return;
        }

        // 注文を並列処理
        const chunks = [];
        for (let i = 0; i < carrierOrders.length; i += MAX_CONCURRENT_REQUESTS) {
          chunks.push(carrierOrders.slice(i, i + MAX_CONCURRENT_REQUESTS));
        }

        for (const chunk of chunks) {
          await Promise.all(
            chunk.map(async (order) => {
              if (!order.trackingInfo) return;

              try {
                // 配送状況を取得
                const trackingData = await client.getTrackingInfo(
                  order.trackingInfo.trackingNumber
                );

                // 配送状況が更新されているか確認
                if (
                  trackingData.status !== order.trackingInfo.status ||
                  trackingData.currentLocation !== order.trackingInfo.currentLocation
                ) {
                  // 配送状況を更新
                  await prisma.trackingInfo.update({
                    where: { orderId: order.id },
                    data: {
                      status: trackingData.status,
                      currentLocation: trackingData.currentLocation,
                      estimatedDelivery: trackingData.estimatedDelivery,
                      history: {
                        push: {
                          timestamp: trackingData.timestamp,
                          status: trackingData.status,
                          location: trackingData.currentLocation,
                          description: trackingData.description,
                        },
                      },
                    },
                  });

                  results.updated++;

                  // 通知設定がある場合はメールを送信
                  if (order.deliveryNotifications.length > 0) {
                    await Promise.all(
                      order.deliveryNotifications.map((notification) =>
                        sendDeliveryUpdateEmail({
                          to: notification.user.email,
                          orderId: order.id,
                          status: trackingData.status,
                          location: trackingData.currentLocation,
                          estimatedDelivery: trackingData.estimatedDelivery,
                        })
                      )
                    );
                    results.notified += order.deliveryNotifications.length;
                  }
                }
              } catch (error) {
                console.error(`注文 ${order.id} の更新エラー:`, error);
                results.errors++;
              }
              results.processed++;
            })
          );
        }
      })
    );

    return res.status(200).json({
      message: '配送状況の更新が完了しました',
      results,
    });
  } catch (error) {
    console.error('バッチ処理エラー:', error);
    return res.status(500).json({
      message: '配送状況の更新に失敗しました',
      error: error instanceof Error ? error.message : '不明なエラー',
    });
  }
} 