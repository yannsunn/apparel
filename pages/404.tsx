import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Custom404: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // エラーをログに記録
    console.error('404エラー:', {
      path: router.asPath,
      query: router.query
    });
  }, [router.asPath, router.query]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          ページが見つかりません
        </h1>
        <p className="mt-2 text-base text-gray-600">
          申し訳ありませんが、お探しのページは存在しないか、移動した可能性があります。
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;

// 静的ページとして事前生成
export async function getStaticProps() {
  return {
    props: {},
  };
} 