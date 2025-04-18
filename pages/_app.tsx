import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import { Session } from 'next-auth'

type AppPropsWithSession = AppProps & {
  pageProps: {
    session?: Session
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}