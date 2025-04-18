import React, { useEffect } from 'react';

interface OrderSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  dateRange: {
    start: string;
    end: string;
  };
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

const OrderSearch: React.FC<OrderSearchProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
}) => {
  // 日付範囲の検証
  useEffect(() => {
    if (dateRange.start && dateRange.end && dateRange.start > dateRange.end) {
      onDateRangeChange({ ...dateRange, end: dateRange.start });
    }
  }, [dateRange.start]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    if (dateRange.end && newStart > dateRange.end) {
      onDateRangeChange({ start: newStart, end: newStart });
    } else {
      onDateRangeChange({ ...dateRange, start: newStart });
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    if (dateRange.start && newEnd < dateRange.start) {
      onDateRangeChange({ ...dateRange, end: dateRange.start });
    } else {
      onDateRangeChange({ ...dateRange, end: newEnd });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6" role="search" aria-label="注文検索フォーム">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* キーワード検索 */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            キーワード検索
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="注文番号、商品名など"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            aria-label="キーワードで注文を検索"
          />
        </div>

        {/* ステータスフィルター */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            注文状態
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            aria-label="注文状態でフィルター"
          >
            <option value="">すべて</option>
            <option value="pending">保留中</option>
            <option value="processing">処理中</option>
            <option value="shipped">発送済み</option>
            <option value="delivered">配達完了</option>
            <option value="cancelled">キャンセル</option>
          </select>
        </div>

        {/* 期間フィルター */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            開始日
          </label>
          <input
            type="date"
            id="startDate"
            value={dateRange.start}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            aria-label="検索期間の開始日"
            max={dateRange.end || undefined}
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            終了日
          </label>
          <input
            type="date"
            id="endDate"
            value={dateRange.end}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            aria-label="検索期間の終了日"
            min={dateRange.start || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSearch; 