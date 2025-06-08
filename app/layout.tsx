import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Minimal',
  description: 'Minimal Next.js setup with security and performance optimizations',
  metadataBase: new URL('https://apparel-roan.vercel.app'),
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Claude Code' }],
  creator: 'Claude Code',
  publisher: 'Vercel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
  colorScheme: 'light',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}