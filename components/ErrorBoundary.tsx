import React, { ReactNode } from 'react';
import logger from '../lib/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('コンポーネントエラー:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-fallback p-6 m-4 border border-red-300 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">予期しないエラーが発生しました</h2>
          <p className="mb-4">申し訳ありませんが、問題が発生しました。再読み込みをお試しください。</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ページを再読み込み
          </button>
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <div className="mt-4 p-3 bg-gray-100 rounded overflow-auto">
              <p className="font-mono text-sm text-red-600">{this.state.error.toString()}</p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 