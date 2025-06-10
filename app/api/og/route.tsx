import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Modern Web Application'
    const description = searchParams.get('description') || 'Built with Next.js 15 & React 19'
    const theme = searchParams.get('theme') || 'gradient'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme === 'gradient' 
              ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
              : theme === 'dark' 
              ? '#0a0a0a'
              : '#ffffff',
            fontFamily: 'system-ui',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '900px',
              textAlign: 'center',
              padding: '40px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: theme === 'dark' ? '#ffffff' : '#ffffff',
                marginBottom: '20px',
                lineHeight: '1.2',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: theme === 'dark' ? '#cccccc' : '#f0f0f0',
                margin: '0',
                opacity: 0.9,
                lineHeight: '1.4',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                gap: '20px',
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '20px',
                  color: '#ffffff',
                  fontWeight: '600',
                }}
              >
                Next.js 15
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '20px',
                  color: '#ffffff',
                  fontWeight: '600',
                }}
              >
                React 19
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '20px',
                  color: '#ffffff',
                  fontWeight: '600',
                }}
              >
                TypeScript
              </div>
            </div>
          </div>
          
          {/* Vercel Pro Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,0,0,0.8)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '16px',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#00ff88',
                borderRadius: '50%',
              }}
            />
            Vercel Pro
          </div>

          {/* Performance Indicators */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                background: 'rgba(0,255,136,0.9)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#000000',
                fontWeight: '600',
              }}
            >
              Edge Runtime
            </div>
            <div
              style={{
                background: 'rgba(255,165,0,0.9)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#000000',
                fontWeight: '600',
              }}
            >
              Ultra Performance
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
          'CDN-Cache-Control': 'public, max-age=31536000',
          'Vercel-CDN-Cache-Control': 'public, max-age=31536000',
        },
      }
    )
  } catch (error) {
    console.error('OG Image generation failed:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}

// Edge runtime optimized for dynamic OG generation