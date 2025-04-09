import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { PrismaClient, Prisma } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { generateTrackingCsv, downloadCsv } from '../../utils/export';
import OrderSearch from '../../components/OrderSearch';

const prisma = new PrismaClient();

const ITEMS_PER_PAGE = 10;

interface Address {
  id: string;
  name: string;
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
  building?: string;
  phone: string;
  isDefault: boolean;
}

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  customization: Prisma.JsonValue;
}

interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string | null;
  currentLocation: string | null;
  history: Array<{
    status: string;
    location: string;
    timestamp: string;
    description: string;
  }>;
}

interface Order {
  id: string;
  createdAt: Date;
  status: string;
  totalAmount: number;
  items: OrderItem[];
  trackingInfo?: TrackingInfo;
  cancelReason?: string;
}

interface ProfileData {
  name: string;
  email: string;
  addresses: Address[];
  orders: Order[];
}

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  React.useEffect(() => {
    const fetchProfileData = async () => {
      if (session?.user?.id) {
        const user = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          select: {
            name: true,
            email: true,
            addresses: {
              select: {
                id: true,
                name: true,
                zipCode: true,
                prefecture: true,
                city: true,
                street: true,
                building: true,
                phone: true,
                isDefault: true,
              },
            },
            orders: {
              select: {
                id: true,
                createdAt: true,
                status: true,
                totalAmount: true,
                items: {
                  select: {
                    id: true,
                    productName: true,
                    quantity: true,
                    price: true,
                    customization: true,
                  },
                },
              },
            },
          },
        });

        if (user) {
          setProfileData({
            name: user.name,
            email: user.email,
            addresses: user.addresses,
            orders: user.orders,
          });
        }
      }
    };
    fetchProfileData();
  }, [session]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.id) return;

      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
          search: searchQuery,
          status: statusFilter,
          startDate: dateRange.start,
          endDate: dateRange.end,
        });

        const response = await fetch(`/api/orders?${queryParams}`);
        if (!response.ok) {
          throw new Error('注文データの取得に失敗しました');
        }
        const data = await response.json();
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('注文データの取得エラー:', error);
        setError('注文データの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [session, activeTab, currentPage, searchQuery, statusFilter, dateRange]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleBulkExport = () => {
    if (selectedOrders.length === 0) return;

    const selectedOrdersData = orders.filter((order) =>
      selectedOrders.includes(order.id)
    );

    const csv = selectedOrdersData
      .map((order) =>
        generateTrackingCsv(order.id, {
          carrier: order.trackingInfo?.carrier || '',
          trackingNumber: order.trackingInfo?.trackingNumber || '',
          status: order.trackingInfo?.status || '',
          estimatedDelivery: order.trackingInfo?.estimatedDelivery || null,
          currentLocation: order.trackingInfo?.currentLocation || null,
          history: order.trackingInfo?.history || [],
        })
      )
      .join('\n\n');

    downloadCsv(csv, `tracking_${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (!session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-gray-600 mb-8">
            プロフィールを表示するにはログインしてください。
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">マイページ</h1>

        {/* タブ */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              プロフィール
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`${
                activeTab === 'addresses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              配送先住所
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              注文履歴
            </button>
          </nav>
        </div>

        {/* プロフィール情報 */}
        {activeTab === 'profile' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">プロフィール情報</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">お名前</label>
                <p className="mt-1 text-gray-900">{profileData?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                <p className="mt-1 text-gray-900">{profileData?.email}</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/profile/edit" className="btn-primary">
                  プロフィールを編集
                </Link>
                <Link href="/profile/password" className="btn-secondary">
                  パスワードを変更
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 配送先住所 */}
        {activeTab === 'addresses' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">配送先住所</h2>
              <Link href="/profile/addresses/new" className="btn-primary">
                新規住所を追加
              </Link>
            </div>
            <div className="space-y-4">
              {profileData?.addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-gray-600">
                        〒{address.zipCode}
                        <br />
                        {address.prefecture}
                        {address.city}
                        {address.street}
                        {address.building && <br />}
                        {address.building}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        TEL: {address.phone}
                      </p>
                      {address.isDefault && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary text-white rounded">
                          デフォルト
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/profile/addresses/${address.id}`}
                        className="btn-secondary text-sm"
                      >
                        編集
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 注文履歴 */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* 検索フィルター */}
            <OrderSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />

            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">読み込み中...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">注文履歴がありません</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        setSelectedOrders(
                          selectedOrders.length === orders.length
                            ? []
                            : orders.map((order) => order.id)
                        )
                      }
                      className={`px-3 py-1 rounded text-sm ${
                        selectedOrders.length === orders.length
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedOrders.length === orders.length ? 'すべて解除' : 'すべて選択'}
                    </button>
                    {selectedOrders.length > 0 && (
                      <button
                        onClick={handleBulkExport}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        選択した注文をエクスポート
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/profile/orders/${order.id}`}
                      className="block bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleOrderSelect(order.id);
                          }}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-gray-600">注文番号</p>
                              <p className="font-medium">{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">注文日時</p>
                              <p className="font-medium">
                                {new Date(order.createdAt).toLocaleString('ja-JP')}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">状態</p>
                              <p className="font-medium">{order.status}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">合計金額</p>
                              <p className="font-medium">
                                ¥{order.totalAmount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {order.status === 'cancelled' && order.cancelReason && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-600">キャンセル理由</p>
                              <p className="text-sm line-clamp-2">{order.cancelReason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* ページネーション */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      前へ
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      次へ
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage; 