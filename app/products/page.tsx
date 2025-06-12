'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { products, categories } from '@/lib/data/mock-products'
import { ProductCard } from '@/components/product/product-card'
import { useCartStore } from '@/lib/store/cart'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroSocialProof, NeuroScarcity } from '@/components/neuro/neuro-components'

export default function ProductsPage() {
  // カートストア
  const { addItem } = useCartStore()
  
  // 状態管理
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // 商品フィルタリング
  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    
    // カテゴリフィルタ
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category.id === selectedCategory)
    }
    
    // 検索フィルタ
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // ソート
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
        break
    }
    
    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  // ページネーション
  const itemsPerPage = 12
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // 統計情報
  const stats = useMemo(() => ({
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    averagePrice: Math.round(filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length || 0),
    featuredCount: filteredProducts.filter(p => p.featured).length
  }), [filteredProducts])

  // フィルタ変更ハンドラ
  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true)
    setSelectedCategory(categoryId)
    setCurrentPage(1)
    
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const handleSortChange = (sort: string) => {
    setIsLoading(true)
    setSortBy(sort)
    
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <UltraHeader />
      
      {/* ニューロマーケティング要素 */}
      <NeuroSocialProof 
        productId="general"
        type="viewers"
        position="top-right"
      />
      <NeuroScarcity 
        stock={15}
        threshold={20}
        animated={true}
      />

      {/* ヒーローセクション */}
      <section style={{
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            商品一覧
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            厳選されたアパレル商品をお探しください
          </p>
          
          {/* 統計表示 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '1rem 1.5rem',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.totalProducts}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>総商品数</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '1rem 1.5rem',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>¥{stats.averagePrice.toLocaleString()}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>平均価格</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '1rem 1.5rem',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.featuredCount}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>おすすめ商品</div>
            </div>
          </div>
        </div>
      </section>

      {/* フィルタエリア */}
      <section style={{
        background: '#ffffff',
        padding: '2rem',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: '80px',
        zIndex: 25 // UltraHeaderより低く設定
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* 検索バー */}
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="🔍 商品を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '0.75rem 1rem',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
            {/* カテゴリフィルタ */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ 
                color: '#6b7280', 
                fontWeight: '600', 
                marginRight: '0.5rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                📂 カテゴリ:
              </span>
              {[{ id: 'all', name: '全て' }, ...categories].slice(0, 7).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: selectedCategory === category.id 
                      ? '2px solid #3b82f6' 
                      : '2px solid #e5e7eb',
                    borderRadius: '20px',
                    background: selectedCategory === category.id 
                      ? '#3b82f6' 
                      : '#ffffff',
                    color: selectedCategory === category.id 
                      ? '#ffffff' 
                      : '#374151',
                    fontWeight: selectedCategory === category.id ? '600' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                >
                  {category.name}
                  {category.id !== 'all' && (
                    <span style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.8rem',
                      opacity: 0.7
                    }}>
                      ({products.filter(p => p.category.id === category.id).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ソートフィルタ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#6b7280', fontWeight: '600' }}>🔄 並び順:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">おすすめ順</option>
                <option value="price-low">価格: 安い順</option>
                <option value="price-high">価格: 高い順</option>
                <option value="name">名前順</option>
              </select>
            </div>
          </div>

          {/* 検索結果統計 */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: stats.filteredCount < stats.totalProducts 
              ? '#fef3c7' 
              : '#e0f2fe',
            borderRadius: '8px',
            color: '#374151',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {stats.filteredCount < stats.totalProducts ? (
              <>🔍 {stats.filteredCount}件の商品が見つかりました（全{stats.totalProducts}件中）</>
            ) : (
              <>✨ 全{stats.totalProducts}件の商品を表示中</>
            )}
          </div>
        </div>
      </section>

      {/* 商品グリッド */}
      <main style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '3rem 2rem',
        minHeight: '60vh'
      }}>
        {isLoading ? (
          /* ローディング状態 */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <ProductCard
                key={`skeleton-${index}`}
                product={{} as any}
                loading={true}
                index={index}
              />
            ))}
          </div>
        ) : currentProducts.length > 0 ? (
          <>
            {/* 商品グリッド */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onQuickAdd={(product) => {
                    // デフォルトサイズ・カラーでカートに追加
                    const defaultSize = product.sizes[0]?.id || 'M'
                    const defaultColor = product.colors[0]?.id || 'default'
                    addItem(product, defaultSize, defaultColor, 1)
                    alert(`${product.name}をカートに追加しました！`)
                  }}
                />
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '3rem'
              }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: currentPage === 1 ? '#e5e7eb' : '#3b82f6',
                    color: currentPage === 1 ? '#9ca3af' : '#ffffff',
                    fontWeight: '600',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ← 前へ
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{
                        padding: '0.75rem 1rem',
                        border: 'none',
                        borderRadius: '8px',
                        background: currentPage === pageNum 
                          ? '#f59e0b' 
                          : '#ffffff',
                        color: currentPage === pageNum 
                          ? '#ffffff' 
                          : '#3b82f6',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        minWidth: '40px'
                      }}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: currentPage === totalPages ? '#e5e7eb' : '#3b82f6',
                    color: currentPage === totalPages ? '#9ca3af' : '#ffffff',
                    fontWeight: '600',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  次へ →
                </button>
              </div>
            )}
          </>
        ) : (
          /* 商品が見つからない場合 */
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              商品が見つかりませんでした
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              検索条件を変更するか、カテゴリを「全て」に戻してお試しください。
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSortBy('featured')
              }}
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              🔄 検索条件をリセット
            </button>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer style={{ 
        background: '#111827', 
        color: '#ffffff', 
        padding: '2rem',
        textAlign: 'center'
      }}>
        <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            APPAREL EC
          </h3>
        </Link>
        <p style={{ color: '#9ca3af' }}>
          現代のライフスタイルに合わせたプレミアムファッション
        </p>
      </footer>
    </div>
  )
}