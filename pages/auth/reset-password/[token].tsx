import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return;

      try {
        const user = await prisma.user.findFirst({
          where: {
            resetToken: token as string,
            resetTokenExpiry: {
              gt: new Date(),
            },
          },
        });

        if (user) {
          setIsValidToken(true);
        } else {
          setError('無効または期限切れのリセットリンクです');
          setTimeout(() => {
            router.push('/auth/reset-password/request');
          }, 3000);
        }
      } catch (error) {
        setError('トークンの検証に失敗しました');
        setTimeout(() => {
          router.push('/auth/reset-password/request');
        }, 3000);
      }
    };

    validateToken();
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // パスワードの一致確認
    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    try {
      if (token) {
        // パスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(formData.password, 10);

        // パスワードの更新とリセットトークンのクリア
        await prisma.user.update({
          where: {
            resetToken: token as string,
          },
          data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
        });

        setSuccess('パスワードを更新しました');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 1500);
      }
    } catch (error) {
      setError('パスワードの更新に失敗しました');
    }
  };

  if (!isValidToken) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-12">
          <h1 className="text-3xl font-bold mb-8">パスワードリセット</h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <p className="text-gray-600">
            リセットページにリダイレクトします...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">新しいパスワードの設定</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                新しいパスワード
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
                required
                minLength={8}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                新しいパスワード（確認）
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input-field"
                required
                minLength={8}
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                パスワードを更新
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage; 