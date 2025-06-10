import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { event, data } = await request.json()
    
    // Ultra-fast edge processing
    const analyticsData = {
      timestamp: Date.now(),
      event,
      data,
      userAgent: request.headers.get('user-agent'),
      ip: (request as any).ip || 'unknown',
      country: (request as any).geo?.country || 'unknown',
      city: (request as any).geo?.city || 'unknown',
      region: (request as any).geo?.region || 'unknown',
    }

    // In production, send to your analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: await sendToAnalytics(analyticsData)
      console.log('Edge Analytics:', analyticsData)
    }

    return NextResponse.json({ 
      success: true, 
      processed: true,
      location: {
        country: (request as any).geo?.country,
        city: (request as any).geo?.city,
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache',
        'X-Edge-Location': (request as any).geo?.region || 'unknown',
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Processing failed' 
    }, { status: 400 })
  }
}