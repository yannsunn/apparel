/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apparel-ec.netlify.app',
      },
    ],
    unoptimized: true,
    domains: ['placehold.co', 'picsum.photos'],
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
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/products/',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig 