import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ExtensionErrorBoundary from './components/ExtensionErrorBoundary'
import PerformanceMonitor from './components/PerformanceMonitor'
import { ErrorBoundary } from '@/components/ui/error-boundary'

export const metadata: Metadata = {
  title: {
    template: '%s | Modern Web Application',
    default: 'Modern Web Application - Next.js 15 & React 19',
  },
  description: 'Professional web application built with cutting-edge technology: Next.js 15.3.3, React 19, TypeScript 5.7.3. Optimized for performance, security, and user experience.',
  metadataBase: new URL('https://apparel-roan.vercel.app'),
  keywords: ['Next.js', 'React', 'TypeScript', 'Modern Web App', 'Performance', 'Security', 'PWA'],
  authors: [{ name: 'Claude Code', url: 'https://claude.ai/code' }],
  creator: 'Claude Code',
  publisher: 'Vercel',
  category: 'technology',
  classification: 'Business',
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
    locale: 'en_US',
    url: 'https://apparel-roan.vercel.app',
    title: 'Modern Web Application - Next.js 15 & React 19',
    description: 'Professional web application built with cutting-edge technology',
    siteName: 'Modern Web Application',
    images: [
      {
        url: '/api/og?title=Modern Web Application&description=Next.js 15 + React 19&theme=gradient',
        width: 1200,
        height: 630,
        alt: 'Modern Web Application - Built with Next.js 15 & React 19',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Web Application',
    description: 'Professional web application built with cutting-edge technology',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://vercel.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.com" />
        <meta name="ext-protection" content="enabled" />
        <meta name="application-name" content="Modern Web Application" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Modern Web App" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2a5298" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <ErrorBoundary>
          <ExtensionErrorBoundary />
          <PerformanceMonitor />
          {children}
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  )
}