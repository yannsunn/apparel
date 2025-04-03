interface TrackingHistory {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string | null;
  currentLocation: string | null;
  history: TrackingHistory[];
}

export const generateTrackingCsv = (orderId: string, trackingInfo: TrackingInfo): string => {
  // CSVヘッダー
  const headers = [
    '注文番号',
    '配送業者',
    '追跡番号',
    '現在の状態',
    '予定配達日',
    '現在の場所',
    '日時',
    '状態',
    '場所',
    '詳細'
  ].join(',');

  // 基本情報行
  const baseInfo = [
    orderId,
    trackingInfo.carrier,
    trackingInfo.trackingNumber,
    trackingInfo.status,
    trackingInfo.estimatedDelivery ? new Date(trackingInfo.estimatedDelivery).toLocaleString('ja-JP') : '',
    trackingInfo.currentLocation || '',
    '',
    '',
    '',
    ''
  ].map(field => `"${field}"`).join(',');

  // 履歴行
  const historyRows = trackingInfo.history.map(item => [
    '',
    '',
    '',
    '',
    '',
    '',
    new Date(item.timestamp).toLocaleString('ja-JP'),
    item.status,
    item.location,
    item.description
  ].map(field => `"${field}"`).join(','));

  // すべての行を結合
  return [headers, baseInfo, ...historyRows].join('\n');
};

export const downloadCsv = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}; 