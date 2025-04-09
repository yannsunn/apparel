import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>AparelEC | オンラインアパレルショップ</title>
        <meta name="description" content="オンラインアパレルショッピングの新しい体験" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* ヒーローセクション */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">AparelEC</span>
              <span className="block text-blue-600">オンラインアパレルショップ</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              高品質なオリジナルアパレル製品をオンラインでカスタマイズ
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  カタログを見る
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  お問い合わせ
                </Link>
              </div>
            </div>
          </div>
          
          {/* 特徴セクション */}
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">特徴</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  最高品質のアパレル製品
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  当社の製品は、品質、デザイン、持続可能性にこだわって製造されています。
                </p>
              </div>
            </div>
          </div>
          
          {/* 準備中メッセージ */}
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-500 mb-6">
              このサイトは現在構築中です。すぐに新しいコレクションをお届けします。
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

// 静的ページとして事前生成
export async function getStaticProps() {
  return {
    props: {},
  };
} 