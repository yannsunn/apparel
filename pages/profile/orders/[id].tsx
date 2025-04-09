import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import CancelOrderModal from '../../../components/CancelOrderModal';
import { PrismaClient, Prisma } from '@prisma/client';
import TrackingInfo from '../../../components/TrackingInfo';
import DeliveryNotification from '../../../components/DeliveryNotification';

const prisma = new PrismaClient();

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  customization: Prisma.JsonValue;
}

interface Order {
  id: string;
  createdAt: Date;
  status: string;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    zipCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string | null;
    phone: string;
  };
  cancelReason?: string;
  cancelledAt?: Date;
  trackingInfo?: {
    carrier: string;
    trackingNumber: string;
    status: string;
    estimatedDelivery: string | null;
    currentLocation: string | null;
    history: {
      timestamp: string;
      status: string;
      location: string;
      description: string;
    }[];
  };
}

const OrderDetailPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!session?.user?.id || !id) return;

      try {
        const orderData = await prisma.order.findFirst({
          where: {
            id: id as string,
            userId: session.user.id,
          },
          include: {
            items: true,
            shippingAddress: true,
          },
        });

        if (orderData) {
          setOrder(orderData);
        } else {
          setError('注文が見つかりません');
        }
      } catch (error) {
        console.error('注文データの取得エラー:', error);
        setError('注文データの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [session, id]);

  const handleCancel = async (reason: string) => {
    if (!order) return;

    setIsCancelling(true);
    try {
      const response = await fetch(`/api/orders/${order.id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error('キャンセルに失敗しました');
      }

      // 注文データを更新
      const updatedOrder = await response.json();
      setOrder(updatedOrder);
      setIsModalOpen(false);
    } catch (error) {
      console.error('キャンセルエラー:', error);
      setError('注文のキャンセルに失敗しました');
    } finally {
      setIsCancelling(false);
    }
  };

  if (!session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-gray-600 mb-8">
            注文履歴を表示するにはログインしてください。
          </p>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12">
          <h1 className="text-3xl font-bold mb-8">注文詳細</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || '注文が見つかりません'}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">注文詳細</h1>

        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-6">
              {/* 注文情報 */}
              <div>
                <h2 className="text-xl font-semibold mb-4">注文情報</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">注文番号</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">注文日時</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleString('ja-JP')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">注文状態</p>
                    <p className="font-medium">{order.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">合計金額</p>
                    <p className="font-medium">¥{order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* キャンセル情報 */}
              {order.status === 'cancelled' && order.cancelReason && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">キャンセル情報</h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="mb-2">
                      <p className="text-sm text-gray-600">キャンセル日時</p>
                      <p className="font-medium">
                        {order.cancelledAt && new Date(order.cancelledAt).toLocaleString('ja-JP')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">キャンセル理由</p>
                      <p className="whitespace-pre-wrap">{order.cancelReason}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 商品一覧 */}
              <div>
                <h2 className="text-xl font-semibold mb-4">商品一覧</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.productName}</h3>
                          <p className="text-sm text-gray-600">
                            数量: {item.quantity}個
                          </p>
                          <p className="text-sm text-gray-600">
                            単価: ¥{item.price.toLocaleString()}
                          </p>
                          <div className="mt-2 text-sm">
                            <p>カスタマイズ情報:</p>
                            <ul className="list-disc list-inside text-gray-600">
                              <li>カラー: {(item.customization as { color: string }).color}</li>
                              <li>サイズ: {(item.customization as { size: string }).size}</li>
                              <li>背番号: {(item.customization as { number: string }).number}</li>
                            </ul>
                          </div>
                        </div>
                        <p className="font-medium">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 配送先情報 */}
              <div>
                <h2 className="text-xl font-semibold mb-4">配送先情報</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-gray-600">
                    〒{order.shippingAddress.zipCode}
                    <br />
                    {order.shippingAddress.prefecture}
                    {order.shippingAddress.city}
                    {order.shippingAddress.street}
                    {order.shippingAddress.building && <br />}
                    {order.shippingAddress.building}
                  </p>
                  <p className="text-gray-600 mt-1">
                    TEL: {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => router.push('/profile?tab=orders')}
                  className="btn-secondary"
                >
                  注文履歴に戻る
                </button>
                {order.status === 'pending' && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-danger"
                  >
                    注文をキャンセル
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 配送状況 */}
          {order.status === 'shipped' && order.trackingInfo && (
            <div className="space-y-6">
              <TrackingInfo orderId={order.id} {...order.trackingInfo} />
              <DeliveryNotification
                orderId={order.id}
                trackingInfo={order.trackingInfo}
              />
            </div>
          )}
        </div>

        <CancelOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleCancel}
          isCancelling={isCancelling}
        />
      </div>
    </Layout>
  );
};

export default OrderDetailPage; 