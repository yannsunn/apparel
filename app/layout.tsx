import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Minimal',
  description: 'Minimal Next.js setup',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}