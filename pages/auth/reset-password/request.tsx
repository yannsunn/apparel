import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../../../utils/mail';

const prisma = new PrismaClient();

const RequestResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // ユーザーの存在確認
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // セキュリティのため、ユーザーが存在しない場合でも成功メッセージを表示
        setSuccess('パスワードリセット用のリンクを送信しました');
        setIsLoading(false);
        return;
      }

      // リセットトークンの生成
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1時間後

      // リセットトークンの保存
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });

      // メール送信
      const emailSent = await sendPasswordResetEmail(email, resetToken);

      if (!emailSent) {
        throw new Error('メール送信に失敗しました');
      }

      setSuccess('パスワードリセット用のリンクを送信しました');
    } catch (error) {
      console.error('パスワードリセットエラー:', error);
      setError('パスワードリセットのリクエストに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">パスワードリセット</h1>

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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/auth/signin')}
                className="btn-secondary"
                disabled={isLoading}
              >
                ログインページに戻る
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? '送信中...' : 'リセットリンクを送信'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RequestResetPasswordPage; 