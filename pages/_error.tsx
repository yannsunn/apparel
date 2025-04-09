import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import Head from 'next/head';
import Link from 'next/link';

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  const errorTitle = statusCode ? `${statusCode} - サーバーエラー` : 'クライアントエラー';
  
  return (
    <>
      <Head>
        <title>{errorTitle} | AparelEC</title>
        <meta name="description" content="エラーが発生しました。" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-6">{statusCode || 'エラー'}</h1>
          <h2 className="text-2xl font-semibold mb-4">問題が発生しました</h2>
          <p className="mb-8">
            {statusCode
              ? `サーバーでエラーが発生しました。`
              : 'クライアント側でエラーが発生しました。'}
          </p>
          <div className="flex justify-center">
            <Link href="/" className="px-6 py-2 bg-black text-white rounded-md">
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 