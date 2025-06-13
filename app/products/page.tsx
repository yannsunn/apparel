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
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff'
    }}>
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
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)',
        color: '#ffffff',
        padding: '4rem 2rem',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />
        
        {/* Background overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%)',
          zIndex: 1
        }} />
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          textAlign: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}>
            プレミアム商品コレクション
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'
          }}>
            厳選されたアパレル商品を豊富に取り揃えています。<br />
            あなたの理想の一着を見つけてください。
          </p>
          
          {/* 統計表示 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              position: 'relative',
              zIndex: 5
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalProducts}</div>
              <div style={{ fontSize: '0.9rem' }}>総商品数</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              position: 'relative',
              zIndex: 5
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>¥{stats.averagePrice.toLocaleString()}</div>
              <div style={{ fontSize: '0.9rem' }}>平均価格</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              position: 'relative',
              zIndex: 5
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.featuredCount}</div>
              <div style={{ fontSize: '0.9rem' }}>おすすめ商品</div>
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

      {/* 商品特徴画像セクション */}
      <section style={{ 
        padding: '3rem 2rem', 
        background: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            商品の特徴
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="高品質素材"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                👕 高品質素材
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                厳選された素材のみを使用し、肌触りと耐久性を追求した商品をお届けします。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="豊富なバリエーション"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                🎨 豊富なバリエーション
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                サイズ・カラー・デザインを豊富に取り揃え、お客様のニーズにお応えします。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="スピード配送"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                🚚 スピード配送
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                注文から最短翌日お届け。迅速な配送でお客様をお待たせしません。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="安心の品質保証"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                ✅ 安心の品質保証
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                万が一の品質不良は無条件で交換・返品対応いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 商品グリッド */}
      <main style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '3rem 2rem',
        minHeight: '60vh',
        background: '#ffffff'
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