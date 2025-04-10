import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProfileData {
  name: string;
  email: string;
}

const EditProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session?.user?.id) {
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
        });
        if (user) {
          setFormData({
            name: user.name || '',
            email: user.email,
          });
        }
      }
    };
    fetchProfileData();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (session?.user?.id) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            name: formData.name,
          },
        });
        setSuccess('プロフィールを更新しました');
      }
    } catch (error) {
      setError('プロフィールの更新に失敗しました');
    }
  };

  if (!session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-gray-600 mb-8">
            プロフィールを編集するにはログインしてください。
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">プロフィール編集</h1>

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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                お名前
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                disabled
                className="input-field bg-gray-50"
              />
              <p className="mt-1 text-sm text-gray-500">
                メールアドレスは変更できません
              </p>
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
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfilePage; 