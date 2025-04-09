import React from 'react';
import { generateTrackingCsv, downloadCsv } from '../utils/export';

type TrackingHistory = {
  timestamp: string;
  status: string;
  location: string;
};

interface TrackingInfoProps {
  trackingNumber: string;
  history: TrackingHistory[];
}

const TrackingInfo: React.FC<TrackingInfoProps> = ({ trackingNumber, history }) => {
  const handleExport = () => {
    const csv = generateTrackingCsv(history);
    downloadCsv(csv, `tracking-${trackingNumber}.csv`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">配送状況</h3>
      <p className="mb-2">追跡番号: {trackingNumber}</p>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index} className="border-l-2 border-gray-200 pl-4">
            <p className="text-sm text-gray-500">{item.timestamp}</p>
            <p className="font-medium">{item.status}</p>
            <p className="text-sm">{item.location}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleExport}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        CSVエクスポート
      </button>
    </div>
  );
};

export default TrackingInfo; 