import { useState } from 'react';
import { setCookie } from 'cookies-next';

interface UseAuthReturn {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('認証に失敗しました');
      }

      const data = await response.json();
      setCookie('auth-token', data.token);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
} 