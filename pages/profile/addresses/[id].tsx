import React, { useState, useEffect } from 'react';
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

const EditAddressPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
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
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAddressData = async () => {
      if (session?.user?.id && id) {
        const address = await prisma.address.findFirst({
          where: {
            id: id as string,
            userId: session.user.id,
          },
        });

        if (address) {
          setFormData({
            name: address.name,
            zipCode: address.zipCode,
            prefecture: address.prefecture,
            city: address.city,
            street: address.street,
            building: address.building || '',
            phone: address.phone,
            isDefault: address.isDefault,
          });
        }
      }
    };
    fetchAddressData();
  }, [session, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (session?.user?.id && id) {
        // デフォルト住所として設定する場合、他の住所のデフォルトフラグを解除
        if (formData.isDefault) {
          await prisma.address.updateMany({
            where: {
              userId: session.user.id,
              isDefault: true,
              NOT: {
                id: id as string,
              },
            },
            data: {
              isDefault: false,
            },
          });
        }

        // 住所の更新
        await prisma.address.update({
          where: {
            id: id as string,
          },
          data: formData,
        });

        setSuccess('住所を更新しました');
        setTimeout(() => {
          router.push('/profile?tab=addresses');
        }, 1500);
      }
    } catch (error) {
      setError('住所の更新に失敗しました');
    }
  };

  const handleDelete = async () => {
    if (!confirm('この住所を削除してもよろしいですか？')) {
      return;
    }

    try {
      if (session?.user?.id && id) {
        await prisma.address.delete({
          where: {
            id: id as string,
          },
        });

        router.push('/profile?tab=addresses');
      }
    } catch (error) {
      setError('住所の削除に失敗しました');
    }
  };

  if (!session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-gray-600 mb-8">
            住所を編集するにはログインしてください。
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">住所編集</h1>

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
                pattern="[0-9]{3}-[0-9]{4}"
                placeholder="123-4567"
              />
            </div>

            <div>
              <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700">
                都道府県
              </label>
              <select
                id="prefecture"
                value={formData.prefecture}
                onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                className="input-field"
                required
              >
                <option value="">選択してください</option>
                <option value="北海道">北海道</option>
                <option value="青森県">青森県</option>
                <option value="岩手県">岩手県</option>
                <option value="宮城県">宮城県</option>
                <option value="秋田県">秋田県</option>
                <option value="山形県">山形県</option>
                <option value="福島県">福島県</option>
                <option value="茨城県">茨城県</option>
                <option value="栃木県">栃木県</option>
                <option value="群馬県">群馬県</option>
                <option value="埼玉県">埼玉県</option>
                <option value="千葉県">千葉県</option>
                <option value="東京都">東京都</option>
                <option value="神奈川県">神奈川県</option>
                <option value="新潟県">新潟県</option>
                <option value="富山県">富山県</option>
                <option value="石川県">石川県</option>
                <option value="福井県">福井県</option>
                <option value="山梨県">山梨県</option>
                <option value="長野県">長野県</option>
                <option value="岐阜県">岐阜県</option>
                <option value="静岡県">静岡県</option>
                <option value="愛知県">愛知県</option>
                <option value="三重県">三重県</option>
                <option value="滋賀県">滋賀県</option>
                <option value="京都府">京都府</option>
                <option value="大阪府">大阪府</option>
                <option value="兵庫県">兵庫県</option>
                <option value="奈良県">奈良県</option>
                <option value="和歌山県">和歌山県</option>
                <option value="鳥取県">鳥取県</option>
                <option value="島根県">島根県</option>
                <option value="岡山県">岡山県</option>
                <option value="広島県">広島県</option>
                <option value="山口県">山口県</option>
                <option value="徳島県">徳島県</option>
                <option value="香川県">香川県</option>
                <option value="愛媛県">愛媛県</option>
                <option value="高知県">高知県</option>
                <option value="福岡県">福岡県</option>
                <option value="佐賀県">佐賀県</option>
                <option value="長崎県">長崎県</option>
                <option value="熊本県">熊本県</option>
                <option value="大分県">大分県</option>
                <option value="宮崎県">宮崎県</option>
                <option value="鹿児島県">鹿児島県</option>
                <option value="沖縄県">沖縄県</option>
              </select>
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
                pattern="[0-9]{2,4}-[0-9]{2,4}-[0-9]{4}"
                placeholder="090-1234-5678"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                デフォルトの配送先として設定する
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleDelete}
                className="btn-secondary text-red-600"
              >
                削除
              </button>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/profile?tab=addresses')}
                  className="btn-secondary"
                >
                  キャンセル
                </button>
                <button type="submit" className="btn-primary">
                  保存
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditAddressPage; 