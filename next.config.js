/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  experimental: {
    turbo: {
      enabled: true
    },
  },
  images: {
    domains: ['192.168.1.15', 'localhost'],
    formats: ['image/avif', 'image/webp'], // パフォーマンス向上
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  }
}

module.exports = nextConfig
