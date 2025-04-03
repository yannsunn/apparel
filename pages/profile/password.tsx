import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 新規パスワードの一致確認
    if (formData.newPassword !== formData.confirmPassword) {
      setError('新規パスワードが一致しません');
      return;
    }

    try {
      if (session?.user?.id) {
        // 現在のパスワードを取得
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { password: true },
        });

        if (!user) {
          setError('ユーザーが見つかりません');
          return;
        }

        // 現在のパスワードの検証
        const isValid = await bcrypt.compare(
          formData.currentPassword,
          user.password
        );

        if (!isValid) {
          setError('現在のパスワードが正しくありません');
          return;
        }

        // 新規パスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(formData.newPassword, 10);

        // パスワードの更新
        await prisma.user.update({
          where: { id: session.user.id },
          data: { password: hashedPassword },
        });

        setSuccess('パスワードを変更しました');
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      }
    } catch (error) {
      setError('パスワードの変更に失敗しました');
    }
  };

  if (!session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-gray-600 mb-8">
            パスワードを変更するにはログインしてください。
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">パスワード変更</h1>

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
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                現在のパスワード
              </label>
              <input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="input-field"
                required
                minLength={8}
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                新規パスワード
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="input-field"
                required
                minLength={8}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                新規パスワード（確認）
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

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="btn-secondary"
              >
                キャンセル
              </button>
              <button type="submit" className="btn-primary">
                変更
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePasswordPage; 