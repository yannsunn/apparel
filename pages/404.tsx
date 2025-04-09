import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - ページが見つかりません | AparelEC</title>
        <meta name="description" content="お探しのページは見つかりませんでした。" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">ページが見つかりません</h2>
          <p className="mb-8">
            お探しのページは存在しないか、移動された可能性があります。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md"
            >
              前のページに戻る
            </button>
            <Link href="/" className="px-6 py-2 bg-black text-white rounded-md">
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// 静的ページとして事前生成
export async function getStaticProps() {
  return {
    props: {},
  };
} 