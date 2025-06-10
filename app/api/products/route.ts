import { NextRequest, NextResponse } from 'next/server'
import { products, searchProducts, getProductsByCategory } from '@/lib/data/mock-products'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    let filteredProducts = [...products]

    // Apply search filter
    if (search) {
      filteredProducts = searchProducts(search)
    }

    // Apply category filter
    if (category) {
      filteredProducts = getProductsByCategory(category)
    }

    // Apply featured filter
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured)
    }

    // Apply pagination
    const limitNum = limit ? parseInt(limit) : undefined
    const offsetNum = offset ? parseInt(offset) : 0

    const total = filteredProducts.length
    
    if (limitNum) {
      filteredProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum)
    }

    return NextResponse.json({
      products: filteredProducts,
      pagination: {
        total,
        limit: limitNum || total,
        offset: offsetNum,
        hasMore: limitNum ? (offsetNum + limitNum) < total : false
      }
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}