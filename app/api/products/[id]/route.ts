import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/data/mock-products'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const product = getProductById(resolvedParams.id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      product
    }, {
      headers: {
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200',
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.error('Product API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}