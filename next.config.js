/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: '.next',
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig 