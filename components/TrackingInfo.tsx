import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { generateTrackingCsv, downloadCsv } from '../utils/export';
import { TrackingHistory } from '../types/tracking';
import { formatDate, useLocale } from '../utils/i18n';

interface TrackingInfoProps {
  trackingNumber: string;
  history: TrackingHistory[];
}

const TrackingInfo: React.FC<TrackingInfoProps> = ({ trackingNumber, history }) => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const [error, setError] = useState<string>('');

  const handleExport = async () => {
    try {
      const csv = generateTrackingCsv(history, locale);
      await downloadCsv(csv, `tracking-${trackingNumber}.csv`);
    } catch (err) {
      setError(t('tracking.error.exportFailed'));
      console.error('CSVエクスポートエラー:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow" role="region" aria-label={t('tracking.title')}>
      <h3 className="text-lg font-semibold mb-4">{t('tracking.title')}</h3>
      <p className="mb-2">
        {t('tracking.trackingNumber')}: <span className="font-mono">{trackingNumber}</span>
      </p>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div 
            key={index} 
            className="border-l-2 border-gray-200 pl-4"
            role="listitem"
            aria-label={`${item.status} - ${item.location}`}
          >
            <time dateTime={item.timestamp} className="text-sm text-gray-500">
              {formatDate(item.timestamp, locale)}
            </time>
            <p className="font-medium">{item.status}</p>
            <p className="text-sm">{item.location}</p>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-red-600 mt-2" role="alert">
          {error}
        </p>
      )}
      <button
        onClick={handleExport}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={t('tracking.exportCsvLabel')}
      >
        {t('tracking.exportCsv')}
      </button>
    </div>
  );
};

export default TrackingInfo; 