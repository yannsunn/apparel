/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apparel-ec.netlify.app',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production',
    domains: ['placehold.co', 'picsum.photos'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          },
          {
            key: 'Set-Cookie',
            value: 'SameSite=Strict; Secure'
          }
        ]
      }
    ];
  },
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NETLIFY: process.env.NETLIFY ?? 'false',
    NEXT_PUBLIC_API_URL: process.env.NETLIFY === 'true' 
      ? '/.netlify/functions'
      : 'http://localhost:3003/.netlify/functions',
    NEXT_PUBLIC_BASE_URL: process.env.NETLIFY === 'true'
      ? ''
      : 'http://localhost:3003'
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // クライアントサイドビルドでnode.jsモジュールをスキップ
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        path: false,
        stream: false,
        crypto: false,
        http: false,
        https: false,
        zlib: false,
        querystring: false,
        nodemailer: false,
        child_process: false
      };
    }
    return config;
  }
}

module.exports = nextConfig 