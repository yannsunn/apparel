'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import Layout from '@/components/Layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
} 