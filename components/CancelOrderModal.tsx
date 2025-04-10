import React, { useState } from 'react';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isCancelling: boolean;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isCancelling,
}) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(reason);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">注文のキャンセル</h2>
        <p className="text-gray-600 mb-4">
          キャンセル理由を入力してください。
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows={4}
            placeholder="キャンセル理由を入力してください"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isCancelling}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="btn-danger"
              disabled={isCancelling || !reason.trim()}
            >
              {isCancelling ? 'キャンセル中...' : '注文をキャンセル'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelOrderModal; 