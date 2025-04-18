import { useState, useEffect } from 'react';

export function CookieNotice() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm text-gray-600 mr-4">
          当サイトではお客様の利便性向上のためクッキーを使用しています。
          <a href="/privacy" className="text-primary hover:underline ml-1">プライバシーポリシー</a>
        </p>
        <button
          onClick={handleAccept}
          className="btn btn-secondary text-sm py-2"
        >
          了解
        </button>
      </div>
    </div>
  );
} 