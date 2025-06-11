'use client'

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { products, categories, colors, sizes } from '@/lib/data/mock-products'
import { useOptimisticCart } from '@/lib/hooks/use-optimistic-cart'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { ProductCard } from '@/components/product/product-card'
import { Header } from '@/components/layout/header'
import { Product } from '@/lib/types/product'

export default function ProductsPage() {
  const { addToCart } = useOptimisticCart()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedColor, setSelectedColor] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Memoized filtering logic for performance
  const computedFilteredProducts = useMemo(() => {
    let filtered = [...products]

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.id === selectedCategory)
    }

    // Color filter
    if (selectedColor !== 'all') {
      filtered = filtered.filter(p => 
        p.colors.some(c => c.id === selectedColor)
      )
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [selectedCategory, selectedColor, priceRange, sortBy])

  useEffect(() => {
    setFilteredProducts(computedFilteredProducts)
  }, [computedFilteredProducts])

  const formatPrice = useCallback((price: number) => {
    return `¥${price.toLocaleString('ja-JP')}`
  }, [])

  const handleQuickAdd = useCallback((product: Product) => {
    // Quick add with default size and color
    const defaultSize = product.sizes[0]?.id
    const defaultColor = product.colors[0]?.id
    
    if (defaultSize && defaultColor) {
      addToCart(product, defaultSize, defaultColor, 1)
    }
  }, [addToCart])

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <Header />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            すべての商品
          </h1>
          <p style={{ color: '#6b7280' }}>
            {filteredProducts.length}件の商品が見つかりました
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
          {/* Filters Sidebar */}
          <aside style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: '8px',
            height: 'fit-content',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              絞り込み
            </h2>

            {/* Category Filter */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>カテゴリー</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>すべてのカテゴリー</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>色</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  onClick={() => setSelectedColor('all')}
                  style={{
                    padding: '0.25rem',
                    border: selectedColor === 'all' ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '4px',
                    background: '#ffffff',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  すべて
                </button>
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    style={{
                      width: '100%',
                      height: '40px',
                      border: selectedColor === color.id ? '3px solid #3b82f6' : '1px solid #e5e7eb',
                      borderRadius: '4px',
                      background: color.hex,
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>価格帯</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px'
                  }}
                  placeholder="最低価格"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 20000])}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px'
                  }}
                  placeholder="最高価格"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>並び替え</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  background: '#ffffff'
                }}
              >
                <option value="featured">おすすめ順</option>
                <option value="name">商品名順</option>
                <option value="price-low">価格: 安い順</option>
                <option value="price-high">価格: 高い順</option>
              </select>
            </div>
          </aside>

          {/* Products Grid */}
          <Suspense fallback={
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCard key={i} product={{} as Product} loading={true} />
              ))}
            </div>
          }>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          </Suspense>
        </div>
      </main>
      </div>
    </ErrorBoundary>
  )
}