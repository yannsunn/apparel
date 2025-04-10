/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['apparel-ec.netlify.app']
  },
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  env: {
    NETLIFY: process.env.NETLIFY ?? 'false',
    NEXT_PUBLIC_API_URL: process.env.NETLIFY === 'true' 
      ? '/.netlify/functions'
      : 'http://localhost:8888/.netlify/functions',
    NEXT_PUBLIC_BASE_URL: process.env.NETLIFY === 'true'
      ? ''
      : 'http://localhost:3002'
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client'
    ]
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