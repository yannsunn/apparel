import React, { useState, useEffect } from 'react';

interface DeliveryNotificationProps {
  orderId: string;
  trackingInfo: {
    carrier: string;
    trackingNumber: string;
    status: string;
    estimatedDelivery: string | null;
  };
}

const DeliveryNotification: React.FC<DeliveryNotificationProps> = ({
  orderId,
  trackingInfo,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}/notifications`);
        const data = await response.json();
        setIsSubscribed(data.isSubscribed);
      } catch (error) {
        console.error('通知設定の取得に失敗しました:', error);
      }
    };

    checkSubscription();
  }, [orderId]);

  const handleToggleSubscription = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/orders/${orderId}/notifications`, {
        method: isSubscribed ? 'DELETE' : 'POST',
      });

      if (!response.ok) {
        throw new Error('通知設定の更新に失敗しました');
      }

      setIsSubscribed(!isSubscribed);
    } catch (error) {
      setError('通知設定の更新に失敗しました');
      console.error('通知設定の更新エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">配送状況の通知設定</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">配送状況の更新をメールで通知</p>
            <p className="text-xs text-gray-500 mt-1">
              配送状況が更新された際に、メールで通知を受け取ります
            </p>
          </div>
          <button
            onClick={handleToggleSubscription}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isSubscribed
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {isLoading ? '処理中...' : isSubscribed ? '通知を解除' : '通知を設定'}
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-2" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {isSubscribed && (
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              現在、配送状況の更新をメールで通知する設定が有効になっています。
            </p>
            {trackingInfo.estimatedDelivery && (
              <p className="text-sm text-blue-700 mt-1">
                予定配達日: {new Date(trackingInfo.estimatedDelivery).toLocaleDateString('ja-JP')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryNotification; 