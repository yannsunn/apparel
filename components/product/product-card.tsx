'use client'

import { memo, useMemo, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Product } from '@/lib/types/product'
import { 
  useNeuroUX, 
  useSocialProof, 
  useScarcityAlert, 
  useEmotionalStyling,
  useAnchoring,
  useMimicryTrigger
} from '@/lib/neuro/neuro-hooks'
import { 
  NeuroColors, 
  generateNeuroStyles, 
  createAttentionAnimation,
  NeuroFeedback 
} from '@/lib/neuro/neuro-design'

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
  // ニューロUX統合
  const neuroUX = useNeuroUX(`product-card-${product.id}`, {
    trackAttention: true,
    enableSocialProof: true,
    monitorPerformance: true
  })

  // 感情的スタイリング
  const primaryEmotion = useEmotionalStyling('dopamine')
  const urgencyEmotion = useEmotionalStyling('urgency')
  
  // 社会的証明
  const socialProof = useSocialProof(product.id)
  
  // 希少性アラート
  const totalStock = useMemo(() => 
    product.stock.reduce((sum, item) => sum + item.quantity, 0), 
    [product.stock]
  )
  const scarcity = useScarcityAlert(totalStock, 10)
  
  // 価格アンカリング
  const pricing = useAnchoring(product.originalPrice ? [product.originalPrice, product.price] : [product.price])
  
  // ミラーニューロン活用
  const mimicry = useMimicryTrigger(neuroUX.elementRef as any)

  // インタラクション状態
  const [isHovered, setIsHovered] = useState(false)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  // 遅延ローディング効果
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 100) // ステージング効果

    return () => clearTimeout(timer)
  }, [index])

  // ビューポート検知
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true)
          NeuroFeedback.recordInteraction(`product-card-${product.id}`, 'viewed')
          
          // 注意喚起アニメーション（初回のみ）
          if (neuroUX.elementRef.current) {
            createAttentionAnimation(neuroUX.elementRef.current, 'glow')
          }
        }
      },
      { threshold: 0.5 }
    )

    if (neuroUX.elementRef.current) {
      observer.observe(neuroUX.elementRef.current)
    }

    return () => observer.disconnect()
  }, [hasBeenViewed, product.id, neuroUX.elementRef])

  const formatPrice = useMemo(() => {
    return `¥${product.price.toLocaleString('ja-JP')}`
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
    return iconMap[product.category.name as keyof typeof iconMap] || '👕'
  }, [product.category.name])

  // インタラクション記録
  const recordInteraction = (action: string) => {
    setInteractionCount(prev => prev + 1)
    NeuroFeedback.recordInteraction(`product-card-${product.id}`, action)
  }

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
        {/* スケルトンローディング - ニューロ最適化 */}
        <div style={{ 
          width: '100%', 
          height: '260px', 
          background: `linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }} />
        <div style={{ padding: '1.5rem' }}>
          <div style={{ 
            height: '1.5rem', 
            background: `linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            marginBottom: '0.5rem', 
            borderRadius: '4px' 
          }} />
          <div style={{ 
            height: '1rem', 
            background: `linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            marginBottom: '1rem', 
            borderRadius: '4px', 
            width: '60%' 
          }} />
          <div style={{ 
            height: '1.25rem', 
            background: `linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '4px', 
            width: '40%' 
          }} />
        </div>
      </div>
    )
  }

  return (
    <article 
      ref={neuroUX.elementRef}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: isHovered ? `2px solid ${NeuroColors.dopamine.primary}` : '2px solid #e5e7eb',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        boxShadow: isHovered 
          ? `0 20px 40px ${NeuroColors.dopamine.primary}20, 0 8px 16px rgba(0, 0, 0, 0.1)` 
          : '0 4px 8px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        recordInteraction('hover')
        mimicry.triggerMimicry('hover')
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      onClick={() => recordInteraction('click')}
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
                ...generateNeuroStyles('urgency', 'primary'),
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                animation: 'pulse 2s infinite'
              }}>
                ⭐ 売れ筋
              </div>
            )}
            
            {/* 割引バッジ */}
            {product.originalPrice && (
              <div style={{
                ...generateNeuroStyles('dopamine', 'accent'),
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

            {/* 希少性バッジ */}
            {scarcity.isScarcityActive && (
              <div style={{
                background: scarcity.alertLevel === 'critical' 
                  ? NeuroColors.urgency.primary 
                  : NeuroColors.urgency.secondary,
                color: 'white',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                animation: scarcity.alertLevel === 'critical' ? 'pulse 1s infinite' : 'none'
              }}>
                🔥 {scarcity.message}
              </div>
            )}
          </div>

          {/* 社会的証明 */}
          {socialProof.visibleProof.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(16, 185, 129, 0.9)',
              color: 'white',
              padding: '0.3rem 0.6rem',
              borderRadius: '12px',
              fontSize: '0.7rem',
              fontWeight: '600',
              backdropFilter: 'blur(10px)'
            }}>
              👥 {socialProof.visibleProof[0]}
            </div>
          )}

          {/* 商品アイコン */}
          <div style={{ 
            fontSize: '5rem',
            opacity: 0.7,
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
            transition: 'all 0.3s ease'
          }}>
            {categoryIcon}
          </div>

          {/* ホバーオーバーレイ - ミラーニューロン活用 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: `${NeuroColors.dopamine.primary}90`,
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
            <div style={{ 
              fontSize: '0.9rem', 
              marginTop: '0.5rem',
              opacity: 0.9
            }}>
              {interactionCount > 0 && `${interactionCount}回閲覧`}
            </div>
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
              {product.name}
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              margin: 0,
              fontWeight: '600'
            }}>
              {product.brand}
            </p>
          </div>

          {/* カラーパレット */}
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

          {/* 価格エリア - アンカリング効果 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontSize: '1.6rem',
              fontWeight: '800',
              color: NeuroColors.dopamine.primary
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
                  color: NeuroColors.dopamine.primary,
                  fontWeight: '600'
                }}>
                  ¥{(product.originalPrice - product.price).toLocaleString()}お得
                </span>
              </div>
            )}
          </div>

          {/* 行動促進要素 */}
          <div style={{
            backgroundColor: `${NeuroColors.calm.primary}10`,
            padding: '0.75rem',
            borderRadius: '12px',
            fontSize: '0.8rem',
            color: NeuroColors.trust.primary,
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
            recordInteraction('quick-add')
          }}
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            backgroundColor: NeuroColors.dopamine.primary,
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10
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

      {/* ニューロスコア表示（開発環境のみ） */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.7rem',
          zIndex: 20
        }}>
          🧠{neuroUX.neuroScore}
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
      `}</style>
    </article>
  )
})

ProductCard.displayName = 'ProductCard'