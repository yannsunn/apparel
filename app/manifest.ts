import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Modern Web Application',
    short_name: 'ModernApp',
    description: 'Professional web application built with Next.js 15, React 19, and TypeScript',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e3c72',
    theme_color: '#2a5298',
    orientation: 'portrait-primary',
    categories: ['productivity', 'business', 'technology'],
    lang: 'en',
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