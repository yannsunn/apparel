type TrackingHistory = {
  timestamp: string;
  status: string;
  location: string;
};

export const generateTrackingCsv = (history: TrackingHistory[]): string => {
  const headers = ['タイムスタンプ', 'ステータス', '場所'];
  const rows = history.map(item => [
    item.timestamp,
    item.status,
    item.location,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  return csvContent;
};

export const downloadCsv = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 