'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getProductById } from '@/lib/data/mock-products'
import { useCartStore } from '@/lib/store/cart'
import { Product, Size, Color } from '@/lib/types/product'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroSocialProof, NeuroScarcity, NeuroTrustBadge } from '@/components/neuro/neuro-components'

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const { totalItems } = useCartStore()
  
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>商品が見つかりません</h1>
          <Link href="/products" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
            商品一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString('ja-JP')}`
  }

  const getStock = () => {
    if (!selectedSize || !selectedColor) return null
    return product.stock.find(s => s.sizeId === selectedSize.id && s.colorId === selectedColor.id)
  }

  const isInStock = () => {
    const stock = getStock()
    return stock && stock.quantity > 0
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('サイズと色を選択してください')
      return
    }

    // Add to Zustand store
    const { addItem } = useCartStore.getState()
    addItem(product, selectedSize.id, selectedColor.id, quantity)

    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <UltraHeader />
      
      {/* ニューロマーケティング要素 */}
      <NeuroSocialProof 
        productId={params.id as string}
        type="purchases"
        position={isMobile ? 'top-left' : 'top-right'}
      />
      <NeuroTrustBadge 
        productId={params.id as string}
        type="reviews"
        position={isMobile ? 'bottom-left' : 'bottom-right'}
      />
      <NeuroScarcity 
        stock={selectedSize && selectedColor ? getStock()?.quantity || 0 : 0}
        threshold={5}
        animated={true}
      />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '1rem' : '2rem' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: isMobile ? '1rem' : '2rem' }}>
          <ol style={{ display: 'flex', gap: '0.5rem', fontSize: isMobile ? '1rem' : '0.875rem', color: '#6b7280', flexWrap: 'wrap' }}>
            <li><Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>ホーム</Link></li>
            <li>/</li>
            <li><Link href="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>商品</Link></li>
            <li>/</li>
            <li style={{ color: '#111827' }}>{product.name}</li>
          </ol>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1.5rem' : '3rem', background: '#ffffff', padding: isMobile ? '1rem' : '2rem', borderRadius: '8px' }}>
          {/* Images Section */}
          <div>
            <div style={{
              width: '100%',
              height: isMobile ? '300px' : '600px',
              background: '#f3f4f6',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '1rem',
              position: 'relative'
            }}>
              <img
                src={`/product${(activeImageIndex % 2) + 1}.jpg`}
                alt={`${product.name} - 画像 ${activeImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const parent = e.currentTarget.parentElement
                  if (parent) {
                    parent.style.display = 'flex'
                    parent.style.alignItems = 'center'
                    parent.style.justifyContent = 'center'
                    parent.style.color = '#9ca3af'
                    parent.style.textAlign = 'center'
                    
                    // 安全な DOM 操作でフォールバック表示
                    const iconDiv = document.createElement('div')
                    iconDiv.style.fontSize = '4rem'
                    iconDiv.style.marginBottom = '1rem'
                    iconDiv.textContent = '👔'
                    
                    const textDiv = document.createElement('div')
                    textDiv.textContent = `商品画像 ${activeImageIndex + 1}`
                    
                    parent.appendChild(iconDiv)
                    parent.appendChild(textDiv)
                  }
                }}
              />
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  style={{
                    width: isMobile ? '60px' : '80px',
                    height: isMobile ? '60px' : '80px',
                    background: '#f3f4f6',
                    border: activeImageIndex === index ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: '44px',
                    minWidth: '44px'
                  }}
                >
                  <img
                    src={`/product${(index % 2) + 1}.jpg`}
                    alt={`サムネイル ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div>
            <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
              <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {product.name}
              </h1>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: isMobile ? '1rem' : '1rem' }}>{product.brand}</p>
              <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: isMobile ? '1rem' : '1.25rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span style={{ background: '#dc2626', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: isMobile ? '1rem' : '0.875rem' }}>
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: isMobile ? '1rem' : '1.125rem' }}>商品説明</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: isMobile ? '1rem' : '1rem' }}>
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem', fontSize: isMobile ? '1rem' : '1.125rem' }}>
                色 {selectedColor && <span style={{ fontWeight: 'normal', color: '#6b7280', fontSize: isMobile ? '1rem' : '1rem' }}>- {selectedColor.name}</span>}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {product.colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: isMobile ? '44px' : '48px',
                      height: isMobile ? '44px' : '48px',
                      minHeight: '44px',
                      minWidth: '44px',
                      borderRadius: '50%',
                      background: color.hex,
                      border: selectedColor?.id === color.id ? '3px solid #3b82f6' : '2px solid #e5e7eb',
                      cursor: 'pointer',
                      outline: 'none',
                      position: 'relative'
                    }}
                    title={color.name}
                  >
                    {selectedColor?.id === color.id && (
                      <span style={{
                        position: 'absolute',
                        inset: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: color.hex === '#FFFFFF' ? '#000' : '#fff',
                        fontSize: '1.5rem'
                      }}>
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem', fontSize: isMobile ? '1rem' : '1.125rem' }}>サイズ</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map(size => {
                  const hasStock = selectedColor && product.stock.some(s => 
                    s.sizeId === size.id && s.colorId === selectedColor.id && s.quantity > 0
                  )
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      disabled={selectedColor ? !hasStock : false}
                      style={{
                        padding: isMobile ? '0.75rem 1rem' : '0.75rem 1.5rem',
                        minHeight: '44px',
                        minWidth: '44px',
                        border: selectedSize?.id === size.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                        borderRadius: '4px',
                        background: selectedSize?.id === size.id ? '#eff6ff' : '#ffffff',
                        cursor: selectedColor ? (!hasStock ? 'not-allowed' : 'pointer') : 'pointer',
                        opacity: selectedColor ? (!hasStock ? 0.5 : 1) : 1,
                        fontWeight: selectedSize?.id === size.id ? '600' : '400',
                        fontSize: isMobile ? '1rem' : '1rem'
                      }}
                    >
                      {size.code}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem', fontSize: isMobile ? '1rem' : '1.125rem' }}>数量</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: isMobile ? '44px' : '40px',
                    height: isMobile ? '44px' : '40px',
                    minHeight: '44px',
                    minWidth: '44px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontSize: isMobile ? '1.125rem' : '1.25rem'
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontSize: isMobile ? '1rem' : '1.125rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    const stock = getStock()
                    if (stock) {
                      setQuantity(Math.min(stock.quantity, quantity + 1))
                    } else {
                      setQuantity(quantity + 1)
                    }
                  }}
                  style={{
                    width: isMobile ? '44px' : '40px',
                    height: isMobile ? '44px' : '40px',
                    minHeight: '44px',
                    minWidth: '44px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontSize: isMobile ? '1.125rem' : '1.25rem'
                  }}
                >
                  +
                </button>
                {selectedSize && selectedColor && getStock() && (
                  <span style={{ color: '#6b7280', fontSize: isMobile ? '1rem' : '0.875rem' }}>
                    在庫 {getStock()!.quantity}点
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1rem', flexDirection: isMobile ? 'column' : 'row' }}>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || !isInStock()}
                style={{
                  flex: 1,
                  padding: isMobile ? '1rem' : '1rem',
                  minHeight: '44px',
                  background: (!selectedSize || !selectedColor || !isInStock()) ? '#e5e7eb' : '#3b82f6',
                  color: (!selectedSize || !selectedColor || !isInStock()) ? '#9ca3af' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: '600',
                  cursor: (!selectedSize || !selectedColor || !isInStock()) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {!selectedSize || !selectedColor ? 'オプションを選択' : !isInStock() ? '在庫切れ' : 'カートに追加'}
              </button>
              <button
                style={{
                  padding: isMobile ? '1rem' : '1rem',
                  minHeight: '44px',
                  minWidth: '44px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontSize: isMobile ? '1.25rem' : '1.5rem'
                }}
                title="お気に入りに追加"
              >
                ❤️
              </button>
            </div>

            {/* Added Message */}
            {showAddedMessage && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#10b981',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                ✓ カートに追加しました！
              </div>
            )}

            {/* Product Details */}
            <div style={{ marginTop: isMobile ? '1.5rem' : '2rem', paddingTop: isMobile ? '1.5rem' : '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem', fontSize: isMobile ? '1rem' : '1.125rem' }}>商品詳細</h3>
              <dl style={{ display: 'grid', gridTemplateColumns: isMobile ? '100px 1fr' : '120px 1fr', gap: '0.5rem', fontSize: isMobile ? '1rem' : '0.875rem' }}>
                <dt style={{ color: '#6b7280' }}>カテゴリー:</dt>
                <dd>{product.category.name}</dd>
                <dt style={{ color: '#6b7280' }}>ブランド:</dt>
                <dd>{product.brand}</dd>
                <dt style={{ color: '#6b7280' }}>タグ:</dt>
                <dd>{product.tags.join(', ')}</dd>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}