import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'アパレルEC - ファッション通販',
    short_name: 'アパレルEC',
    description: 'トレンドファッションを手軽にお買い物できるアパレル専門通販サイト',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e3c72',
    theme_color: '#2a5298',
    orientation: 'portrait-primary',
    categories: ['shopping', 'lifestyle', 'fashion'],
    lang: 'ja',
    dir: 'ltr',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  }
}