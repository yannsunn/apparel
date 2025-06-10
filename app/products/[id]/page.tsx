'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getProductById } from '@/lib/data/mock-products'
import { useCartStore } from '@/lib/store/cart'
import { Product, Size, Color } from '@/lib/types/product'

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const { totalItems } = useCartStore()
  
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showAddedMessage, setShowAddedMessage] = useState(false)

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product not found</h1>
          <Link href="/products" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
            Back to products
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
      alert('Please select size and color')
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
      {/* Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            textDecoration: 'none'
          }}>
            APPAREL EC
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/products" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              Products
            </Link>
            <Link href="/cart" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              Cart ({totalItems()})
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem' }}>
          <ol style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <li><Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link></li>
            <li>/</li>
            <li><Link href="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>Products</Link></li>
            <li>/</li>
            <li style={{ color: '#111827' }}>{product.name}</li>
          </ol>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', background: '#ffffff', padding: '2rem', borderRadius: '8px' }}>
          {/* Images Section */}
          <div>
            <div style={{
              width: '100%',
              height: '600px',
              background: '#f3f4f6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{ color: '#9ca3af', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👔</div>
                <div>Product Image {activeImageIndex + 1}</div>
              </div>
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    background: '#f3f4f6',
                    border: activeImageIndex === index ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {product.name}
              </h1>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{product.brand}</p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span style={{ fontSize: '1.25rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span style={{ background: '#dc2626', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Description</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>
                Color {selectedColor && <span style={{ fontWeight: 'normal', color: '#6b7280' }}>- {selectedColor.name}</span>}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {product.colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '48px',
                      height: '48px',
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
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Size</h3>
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
                        padding: '0.75rem 1.5rem',
                        border: selectedSize?.id === size.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                        borderRadius: '4px',
                        background: selectedSize?.id === size.id ? '#eff6ff' : '#ffffff',
                        cursor: selectedColor ? (!hasStock ? 'not-allowed' : 'pointer') : 'pointer',
                        opacity: selectedColor ? (!hasStock ? 0.5 : 1) : 1,
                        fontWeight: selectedSize?.id === size.id ? '600' : '400'
                      }}
                    >
                      {size.code}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Quantity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontSize: '1.125rem' }}>
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
                    width: '40px',
                    height: '40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}
                >
                  +
                </button>
                {selectedSize && selectedColor && getStock() && (
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {getStock()!.quantity} in stock
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || !isInStock()}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: (!selectedSize || !selectedColor || !isInStock()) ? '#e5e7eb' : '#3b82f6',
                  color: (!selectedSize || !selectedColor || !isInStock()) ? '#9ca3af' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: (!selectedSize || !selectedColor || !isInStock()) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {!selectedSize || !selectedColor ? 'Select Options' : !isInStock() ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                style={{
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: '#ffffff',
                  cursor: 'pointer'
                }}
                title="Add to wishlist"
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
                ✓ Added to cart successfully!
              </div>
            )}

            {/* Product Details */}
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Product Details</h3>
              <dl style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                <dt style={{ color: '#6b7280' }}>Category:</dt>
                <dd>{product.category.name}</dd>
                <dt style={{ color: '#6b7280' }}>Brand:</dt>
                <dd>{product.brand}</dd>
                <dt style={{ color: '#6b7280' }}>Tags:</dt>
                <dd>{product.tags.join(', ')}</dd>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}