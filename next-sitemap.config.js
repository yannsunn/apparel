/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://apparel-ec.netlify.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  },
  exclude: ['/404', '/500', '/_error'],
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  generateIndexSitemap: false,
  outDir: '.next',
} 