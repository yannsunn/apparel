import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AddressFormData {
  name: string;
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
  building: string;
  phone: string;
  isDefault: boolean;
}

const NewAddressPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<AddressFormData>({
    name: '',
    zipCode: '',
    prefecture: '',
    city: '',
    street: '',
    building: '',
    phone: '',
    isDefault: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!session?.user?.id) {
        throw new Error('認証が必要です');
      }

      // 新規住所の作成
      await prisma.address.create({
        data: {
          userId: session.user.id,
          name: formData.name,
          zipCode: formData.zipCode,
          prefecture: formData.prefecture,
          city: formData.city,
          street: formData.street,
          building: formData.building,
          phone: formData.phone,
          isDefault: formData.isDefault,
        },
      });

      router.push('/profile?tab=addresses');
    } catch (error) {
      console.error('住所の作成エラー:', error);
      setError('住所の作成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-gray-600 mb-8">
            住所を追加するにはログインしてください。
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">新規住所の登録</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                住所の名称
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
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                郵便番号
              </label>
              <input
                type="text"
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700">
                都道府県
              </label>
              <input
                type="text"
                id="prefecture"
                value={formData.prefecture}
                onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                市区町村
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                番地
              </label>
              <input
                type="text"
                id="street"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                建物名・部屋番号
              </label>
              <input
                type="text"
                id="building"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                電話番号
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                デフォルトの住所として設定
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/profile?tab=addresses')}
                className="btn-secondary"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewAddressPage; 