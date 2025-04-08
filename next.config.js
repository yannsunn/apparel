/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Static export for Netlify
  trailingSlash: true, // URL consistency
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
    unoptimized: true, // Required for static export
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
