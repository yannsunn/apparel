'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'
import type { Session } from 'next-auth'
import { useEffect } from 'react'

type AppPropsWithSession = AppProps & {
  pageProps: {
    session?: Session
    [key: string]: any
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithSession) {
  useEffect(() => {
    // パッシブイベントリスナーの設定
    const wheelOpts = { passive: true }
    document.addEventListener('wheel', () => {}, wheelOpts)
  }, [])

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}