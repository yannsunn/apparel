import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { TrackingInfo } from '../../../types/tracking';

interface ErrorResponse {
  message: string;
  code: string;
  statusCode: number;
}

export default function TrackingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    if (!id || status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    const fetchTrackingInfo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracking?orderId=${id}`, {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });
        
        if (!res.ok) {
          const errorData: ErrorResponse = await res.json();
          setError(errorData);
          return;
        }

        const data = await res.json();
        setTrackingInfo(data);
      } catch (err) {
        setError({
          message: '配送情報の取得中にエラーが発生しました',
          code: 'FETCH_ERROR',
          statusCode: 500
        });
        console.error('Tracking info fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackingInfo();
  }, [id, session, status, router]);

  if (isLoading) {
    return <div className="text-center p-4">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-red-700">エラーが発生しました</h2>
          </div>
          <p className="text-red-600 mb-2">{error.message}</p>
          <div className="text-sm text-gray-600">
            <p>エラーコード: {error.code}</p>
            <p>ステータスコード: {error.statusCode}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  if (!trackingInfo) {
    return <div className="text-center p-4">配送情報が見つかりません</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">配送状況</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">追跡番号</p>
            <p className="font-semibold">{trackingInfo.trackingNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">配送業者</p>
            <p className="font-semibold">{trackingInfo.carrier}</p>
          </div>
          <div>
            <p className="text-gray-600">現在の状況</p>
            <p className="font-semibold">{trackingInfo.status}</p>
          </div>
          <div>
            <p className="text-gray-600">現在地</p>
            <p className="font-semibold">{trackingInfo.currentLocation}</p>
          </div>
          <div>
            <p className="text-gray-600">最終更新</p>
            <p className="font-semibold">
              {new Date(trackingInfo.timestamp).toLocaleString('ja-JP')}
            </p>
          </div>
          <div>
            <p className="text-gray-600">配達予定日時</p>
            <p className="font-semibold">
              {trackingInfo.estimatedDelivery
                ? new Date(trackingInfo.estimatedDelivery).toLocaleString('ja-JP')
                : '未定'}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-3">配送履歴</h2>
          <div className="space-y-4">
            {trackingInfo.history?.map((entry, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-32 text-sm text-gray-600">
                  {new Date(entry.timestamp).toLocaleString('ja-JP')}
                </div>
                <div>
                  <p className="font-medium">{entry.status}</p>
                  <p className="text-sm text-gray-600">{entry.location}</p>
                  {entry.description && (
                    <p className="text-sm text-gray-600">{entry.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {trackingInfo.additionalInfo && Object.keys(trackingInfo.additionalInfo).length > 0 && (
          <div className="border-t mt-6 pt-4">
            <h2 className="text-lg font-semibold mb-3">追加情報</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(trackingInfo.additionalInfo).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-600">{key}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 