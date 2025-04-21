'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>読み込み中...</div>;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-2">ようこそ、{session?.user?.name}さん</h2>
        <p className="text-gray-600">
          このページは認証済みユーザーのみがアクセスできます。
        </p>
      </div>
    </div>
  );
} 