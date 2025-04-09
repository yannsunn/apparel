import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { TrackingInfo } from '../../../types/tracking';

export default function TrackingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
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
        const res = await fetch(`/api/orders/${id}/tracking`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setError('注文が見つかりません');
            return;
          }
          throw new Error('配送情報の取得に失敗しました');
        }

        const data = await res.json();

        if (data.error) {
          if (data.error.code === 'STATIC_EXPORT') {
            setError('静的エクスポート環境では配送情報を取得できません。実際のサイトでご確認ください。');
            return;
          }
          setError(data.error.message || '配送情報の取得に失敗しました');
          return;
        }

        setTrackingInfo(data);
      } catch (err) {
        setError('配送情報の取得中にエラーが発生しました');
        console.error('Tracking info fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackingInfo();
  }, [id, session, status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>配送情報を読み込んでいます...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>エラーが発生しました</h1>
        <p>{error}</p>
        <button 
          onClick={() => router.back()} 
          className="back-button"
        >
          前のページに戻る
        </button>
      </div>
    );
  }

  if (!trackingInfo) {
    return (
      <div className="no-data-container">
        <p>配送情報が見つかりません</p>
        <button 
          onClick={() => router.back()} 
          className="back-button"
        >
          前のページに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="tracking-container">
      <h1>配送状況</h1>
      <div className="tracking-details">
        <p>追跡番号: {trackingInfo.trackingNumber}</p>
        <p>ステータス: {trackingInfo.status}</p>
        <p>現在地: {trackingInfo.currentLocation || '不明'}</p>
        {trackingInfo.estimatedDeliveryDate && (
          <p>配達予定日: {new Date(trackingInfo.estimatedDeliveryDate).toLocaleDateString('ja-JP')}</p>
        )}
        {trackingInfo.additionalInfo && (
          <div className="additional-info">
            <h2>追加情報</h2>
            <p>配達時間帯: {trackingInfo.additionalInfo.deliveryTimeWindow || '指定なし'}</p>
            <p>荷物サイズ: {trackingInfo.additionalInfo.packageSize || '不明'}</p>
            <p>配送タイプ: {trackingInfo.additionalInfo.deliveryType || '通常配送'}</p>
          </div>
        )}
      </div>
      {trackingInfo.history && Array.isArray(trackingInfo.history) && (
        <div className="tracking-history">
          <h2>配送履歴</h2>
          <ul>
            {trackingInfo.history.map((entry, index) => (
              <li key={index} className="history-entry">
                <time>{new Date(entry.timestamp).toLocaleString('ja-JP')}</time>
                <span className="description">{entry.description}</span>
                {entry.location && <span className="location">（{entry.location}）</span>}
                {entry.additionalInfo && (
                  <div className="entry-additional-info">
                    {Object.entries(entry.additionalInfo).map(([key, value]) => (
                      <p key={key}>{key}: {value}</p>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button 
        onClick={() => router.back()} 
        className="back-button"
      >
        前のページに戻る
      </button>
    </div>
  );
} 