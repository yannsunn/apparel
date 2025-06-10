'use client'

import { memo, useMemo } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/types/product'

interface ProductCardProps {
  product: Product
  onQuickAdd?: (product: Product) => void
  loading?: boolean
}

export const ProductCard = memo<ProductCardProps>(function ProductCard({ 
  product, 
  onQuickAdd,
  loading = false 
}) {
  const formatPrice = useMemo(() => {
    return `¥${product.price.toLocaleString('ja-JP')}`
  }, [product.price])

  const discountPercentage = useMemo(() => {
    if (!product.originalPrice) return null
    return Math.round((1 - product.price / product.originalPrice) * 100)
  }, [product.price, product.originalPrice])

  const categoryIcon = useMemo(() => {
    const iconMap = {
      'Tops': '👔',
      'Bottoms': '👖', 
      'Outerwear': '🧥',
      'Accessories': '👟'
    }
    return iconMap[product.category.name as keyof typeof iconMap] || '👕'
  }, [product.category.name])

  if (loading) {
    return (
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        <div style={{ width: '100%', height: '320px', background: '#f3f4f6' }} />
        <div style={{ padding: '1.5rem' }}>
          <div style={{ height: '1.5rem', background: '#f3f4f6', marginBottom: '0.5rem', borderRadius: '4px' }} />
          <div style={{ height: '1rem', background: '#f3f4f6', marginBottom: '1rem', borderRadius: '4px', width: '60%' }} />
          <div style={{ height: '1.25rem', background: '#f3f4f6', borderRadius: '4px', width: '40%' }} />
        </div>
      </div>
    )
  }

  return (
    <article style={{
      background: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)'
      e.currentTarget.style.boxShadow = 'none'
    }}
    >
      <Link
        href={`/products/${product.id}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        aria-label={`View details for ${product.name}`}
      >
        {/* Product Image */}
        <div style={{
          width: '100%',
          height: '320px',
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Badges */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
            {product.featured && (
              <span style={{
                background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                ⭐ Featured
              </span>
            )}
            {product.originalPrice && (
              <span style={{
                background: 'linear-gradient(45deg, #10b981, #059669)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
              }}>
                -{discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Product Icon */}
          <div style={{ 
            fontSize: '4rem',
            opacity: 0.6,
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
          }}>
            {categoryIcon}
          </div>

          {/* Hover Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(99, 102, 241, 0.9))',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0'
          }}
          >
            View Details →
          </div>
        </div>

        {/* Product Info */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#111827',
              lineHeight: '1.4'
            }}>
              {product.name}
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0,
              fontWeight: '500'
            }}>
              {product.brand}
            </p>
          </div>

          {/* Colors */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
              {product.colors.slice(0, 4).map(color => (
                <div
                  key={color.id}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: color.hex,
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginLeft: '0.25rem'
                }}>
                  +{product.colors.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              fontSize: '1.375rem',
              fontWeight: 'bold',
              color: '#111827'
            }}>
              {formatPrice}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '1rem',
                color: '#9ca3af',
                textDecoration: 'line-through',
                fontWeight: '500'
              }}>
                ¥{product.originalPrice.toLocaleString('ja-JP')}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add Button */}
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
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.2s ease',
            fontSize: '1.25rem',
            transform: 'translateY(60px)',
            opacity: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1.1)'
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.background = '#2563eb'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.background = '#3b82f6'
          }}
          aria-label={`Quick add ${product.name} to cart`}
        >
          +
        </button>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        article:hover button {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
      `}</style>
    </article>
  )
})

ProductCard.displayName = 'ProductCard'