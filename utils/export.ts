import { TrackingHistory } from '../types/tracking';
import { formatDate } from './i18n';

/**
 * 配送履歴データをCSV形式に変換します
 */
export const generateTrackingCsv = (history: TrackingHistory[], locale: string): string => {
  const headers = locale === 'en' 
    ? ['Date & Time', 'Status', 'Location']
    : ['日時', '状態', '場所'];

  const rows = history.map(item => [
    formatDate(item.timestamp, locale),
    item.status,
    item.location
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return '\uFEFF' + csvContent; // BOMを追加してExcelで文字化けを防ぐ
};

/**
 * CSVファイルをダウンロードします
 */
export const downloadCsv = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}; 