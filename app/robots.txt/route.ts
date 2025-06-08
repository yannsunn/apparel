export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://apparel-roan.vercel.app/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  )
}