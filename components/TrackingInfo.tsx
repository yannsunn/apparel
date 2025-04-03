import React, { useEffect, useState } from 'react';
import { getTrackingUrl } from '../utils/tracking';
import { generateTrackingCsv, downloadCsv } from '../utils/export';

interface TrackingHistory {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

interface TrackingInfoProps {
  orderId: string;
  carrier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string | null;
  currentLocation: string | null;
  history: TrackingHistory[];
}

const TrackingInfo: React.FC<TrackingInfoProps> = ({
  orderId,
  carrier,
  trackingNumber,
  status,
  estimatedDelivery,
  currentLocation,
  history,
}) => {
  const [trackingData, setTrackingData] = useState({
    status,
    currentLocation,
    history,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const trackingUrl = getTrackingUrl(carrier, trackingNumber);

  const updateTrackingInfo = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/orders/${orderId}/tracking`);
      if (!response.ok) {
        throw new Error('配送状況の更新に失敗しました');
      }
      const data = await response.json();
      setTrackingData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('配送状況の更新エラー:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // 初回読み込み時に更新
    updateTrackingInfo();

    // 5分ごとに自動更新
    const interval = setInterval(updateTrackingInfo, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [orderId]);

  const handleExport = () => {
    const csv = generateTrackingCsv(orderId, {
      carrier,
      trackingNumber,
      status: trackingData.status,
      estimatedDelivery,
      currentLocation: trackingData.currentLocation,
      history: trackingData.history,
    });
    downloadCsv(csv, `tracking_${orderId}_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">配送状況</h2>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              最終更新: {lastUpdated.toLocaleString('ja-JP')}
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={updateTrackingInfo}
            disabled={isUpdating}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
              isUpdating
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg
              className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {isUpdating ? '更新中...' : '更新する'}
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            追跡履歴をエクスポート
          </button>
        </div>
      </div>
      
      {/* 基本情報 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">配送業者</p>
          <p className="font-medium">{carrier}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">追跡番号</p>
          <p className="font-medium">{trackingNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">現在の状態</p>
          <p className="font-medium">{trackingData.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">予定配達日</p>
          <p className="font-medium">
            {estimatedDelivery
              ? new Date(estimatedDelivery).toLocaleDateString('ja-JP')
              : '未定'}
          </p>
        </div>
      </div>

      {/* 現在地 */}
      {trackingData.currentLocation && (
        <div className="mb-6">
          <p className="text-sm text-gray-600">現在地</p>
          <p className="font-medium">{trackingData.currentLocation}</p>
        </div>
      )}

      {/* 配送履歴 */}
      <div>
        <h3 className="text-lg font-medium mb-4">配送履歴</h3>
        <div className="space-y-4">
          {trackingData.history.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                {index < trackingData.history.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mx-auto"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  {new Date(event.timestamp).toLocaleString('ja-JP')}
                </p>
                <p className="font-medium">{event.status}</p>
                {event.location && (
                  <p className="text-sm text-gray-600">{event.location}</p>
                )}
                {event.description && (
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 追跡ページリンク */}
      {trackingUrl && (
        <div className="mt-6">
          <a
            href={trackingUrl.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            {trackingUrl.name}の追跡ページで確認する
          </a>
        </div>
      )}
    </div>
  );
};

export default TrackingInfo; 