'use client'

import { memo, useMemo, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/types/product'

interface ProductCardProps {
  product: Product
  onQuickAdd?: (product: Product) => void
  loading?: boolean
  index?: number
}

export const ProductCard = memo<ProductCardProps>(function ProductCard({ 
  product, 
  onQuickAdd,
  loading = false,
  index = 0
}) {
  // インタラクション状態
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 100) // ステージング効果

    return () => clearTimeout(timer)
  }, [index])

  const formatPrice = useMemo(() => {
    return `¥${product.price?.toLocaleString('ja-JP') || '0'}`
  }, [product.price])

  const discountPercentage = useMemo(() => {
    if (!product.originalPrice) return null
    return Math.round((1 - product.price / product.originalPrice) * 100)
  }, [product.price, product.originalPrice])

  const categoryIcon = useMemo(() => {
    const iconMap = {
      'トップス': '👔',
      'ボトムス': '👖', 
      'アウター': '🧥',
      'アクセサリー': '👟',
      'Tops': '👔',
      'Bottoms': '👖', 
      'Outerwear': '🧥',
      'Accessories': '👟'
    }
    return iconMap[product.category?.name as keyof typeof iconMap] || '👕'
  }, [product.category?.name])

  const totalStock = useMemo(() => 
    product.stock?.reduce((sum, item) => sum + item.quantity, 0) || 0, 
    [product.stock]
  )

  // ローディング状態
  if (loading) {
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        height: '440px',
        position: 'relative'
      }}>
        {/* スケルトンローディング */}
        <div style={{ 
          width: '100%', 
          height: '260px', 
          background: '#f3f4f6',
          animation: 'shimmer 1.5s infinite'
        }} />
        <div style={{ padding: '1.5rem' }}>
          <div style={{ 
            height: '1.5rem', 
            background: '#f3f4f6',
            marginBottom: '0.5rem', 
            borderRadius: '4px' 
          }} />
          <div style={{ 
            height: '1rem', 
            background: '#f3f4f6',
            marginBottom: '1rem', 
            borderRadius: '4px', 
            width: '60%' 
          }} />
          <div style={{ 
            height: '1.25rem', 
            background: '#f3f4f6',
            borderRadius: '4px', 
            width: '40%' 
          }} />
        </div>
      </div>
    )
  }

  return (
    <article 
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: isHovered ? '2px solid #3b82f6' : '2px solid #e5e7eb',
        transition: 'all 0.4s ease',
        cursor: 'pointer',
        position: 'relative',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        boxShadow: isHovered 
          ? '0 20px 40px rgba(59, 130, 246, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1)' 
          : '0 4px 8px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <Link
        href={`/products/${product.id}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        aria-label={`View details for ${product.name}`}
      >
        {/* 商品画像エリア */}
        <div style={{
          width: '100%',
          height: '260px',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* バッジコンテナ */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 3 }}>
            {/* 特集バッジ */}
            {product.featured && (
              <div style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                marginBottom: '0.5rem'
              }}>
                ⭐ 売れ筋
              </div>
            )}
            
            {/* 割引バッジ */}
            {product.originalPrice && (
              <div style={{
                backgroundColor: '#f59e0b',
                color: '#000',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                marginBottom: '0.5rem'
              }}>
                -{discountPercentage}% OFF
              </div>
            )}

            {/* 在庫バッジ */}
            {totalStock <= 10 && totalStock > 0 && (
              <div style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700'
              }}>
                🔥 残り{totalStock}点
              </div>
            )}
          </div>

          {/* 商品画像 */}
          <img
            src={`/product${(index % 2) + 1}.jpg`}
            alt={product.name || 'アパレル商品'}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
              filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
            }}
            onError={(e) => {
              // フォールバック: アイコン表示
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          {/* フォールバックアイコン */}
          <div style={{ 
            fontSize: '5rem',
            opacity: 0.7,
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
            transition: 'all 0.3s ease',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
            {categoryIcon}
          </div>

          {/* ホバーオーバーレイ */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(59, 130, 246, 0.9)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: '700'
          }}>
            <div style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>👀</div>
            詳細を見る →
          </div>
        </div>

        {/* 商品情報エリア */}
        <div style={{ padding: '1.5rem' }}>
          {/* 商品名・ブランド */}
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              color: '#111827',
              lineHeight: '1.3',
              minHeight: '2.6rem'
            }}>
              {product.name || 'Sample Product'}
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: 0,
              fontWeight: '600'
            }}>
              {product.brand || 'Sample Brand'}
            </p>
          </div>

          {/* カラーパレット */}
          {product.colors && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                {product.colors.slice(0, 4).map(color => (
                  <div
                    key={color.id}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: color.hex,
                      border: '2px solid #fff',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.2s ease'
                    }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    marginLeft: '0.5rem',
                    fontWeight: '600'
                  }}>
                    +{product.colors.length - 4}色
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 価格エリア */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontSize: '1.6rem',
              fontWeight: '800',
              color: '#3b82f6'
            }}>
              {formatPrice}
            </span>
            {product.originalPrice && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: '1rem',
                  color: '#9ca3af',
                  textDecoration: 'line-through',
                  fontWeight: '500'
                }}>
                  ¥{product.originalPrice.toLocaleString('ja-JP')}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#3b82f6',
                  fontWeight: '600'
                }}>
                  ¥{(product.originalPrice - product.price).toLocaleString()}お得
                </span>
              </div>
            )}
          </div>

          {/* 在庫状況 */}
          <div style={{
            backgroundColor: totalStock > 50 ? '#dcfce7' : totalStock > 10 ? '#fef3c7' : '#fee2e2',
            color: totalStock > 50 ? '#15803d' : totalStock > 10 ? '#92400e' : '#dc2626',
            padding: '0.75rem',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            💫 {totalStock > 50 ? '豊富な在庫' : totalStock > 10 ? '在庫あり' : '在庫わずか'}
          </div>
        </div>
      </Link>

      {/* クイック追加ボタン */}
      {onQuickAdd && (
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onQuickAdd(product)
          }}
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.8)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s ease',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
          }}
          aria-label={`${product.name}をカートに追加`}
        >
          +
        </button>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </article>
  )
})

ProductCard.displayName = 'ProductCard'