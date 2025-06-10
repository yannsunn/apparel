import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ErrorBoundary } from '@/components/ui/error-boundary'

export const metadata: Metadata = {
  title: {
    template: '%s | アパレルEC',
    default: 'アパレルEC - ファッション通販サイト',
  },
  description: '最新トレンドのアパレルを取り揃えた、モダンなオンラインファッションストア。高品質な商品とスムーズなショッピング体験をお届けします。',
  metadataBase: new URL('https://apparel-roan.vercel.app'),
  keywords: ['アパレル', 'ファッション', '通販', 'EC', 'オンラインショップ', '衣類', 'トレンド', 'スタイル'],
  authors: [{ name: 'アパレルEC', url: 'https://apparel-roan.vercel.app' }],
  creator: 'アパレルEC',
  publisher: 'アパレルEC',
  category: 'shopping',
  classification: 'E-commerce',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://apparel-roan.vercel.app',
    title: 'アパレルEC - ファッション通販サイト',
    description: '最新トレンドのアパレルを取り揃えたオンラインファッションストア',
    siteName: 'アパレルEC',
    images: [
      {
        url: '/api/og?title=Modern Web Application&description=Next.js 15 + React 19&theme=gradient',
        width: 1200,
        height: 630,
        alt: 'アパレルEC - ファッション通販サイト',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'アパレルEC',
    description: '最新トレンドのアパレルを取り揃えたオンラインファッションストア',
    creator: '@claudeai',
    images: ['/api/og?title=Modern Web Application&description=Next.js 15 + React 19&theme=gradient'],
  },
  verification: {
    google: 'google-site-verification-token',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2a5298' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3c72' },
  ],
  colorScheme: 'light dark',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://vercel.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.com" />
        <meta name="ext-protection" content="enabled" />
        <meta name="application-name" content="アパレルEC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="アパレルEC" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2a5298" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <ErrorBoundary>
          {children}
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  )
}