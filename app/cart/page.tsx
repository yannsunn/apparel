'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    tax,
    shipping,
    total
  } = useCartStore()

  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString('ja-JP')}`
  }

  const getSizeLabel = (sizeId: string) => {
    const sizeMap: { [key: string]: string } = {
      '1': 'XS', '2': 'S', '3': 'M', '4': 'L', '5': 'XL', '6': 'XXL',
      '7': '25cm', '8': '26cm', '9': '27cm', '10': '28cm',
      '11': '80cm', '12': '85cm', '13': '90cm', '14': '95cm'
    }
    return sizeMap[sizeId] || sizeId
  }

  const getColorLabel = (colorId: string) => {
    const colorMap: { [key: string]: string } = {
      '1': 'Black', '2': 'White', '3': 'Navy', '4': 'Gray', '5': 'Beige', '6': 'Brown'
    }
    return colorMap[colorId] || colorId
  }

  if (items.length === 0) {
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
              <Link href="/cart" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                Cart ({totalItems()})
              </Link>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
              Your cart is empty
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#3b82f6',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              Start Shopping
            </Link>
          </div>
        </main>
      </div>
    )
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
            <Link href="/cart" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
              Cart ({totalItems()})
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Shopping Cart
          </h1>
          <p style={{ color: '#6b7280' }}>
            {totalItems()} {totalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Cart Items */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Items</h2>
              <button
                onClick={() => setShowClearConfirm(true)}
                style={{
                  color: '#dc2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  textDecoration: 'underline'
                }}
              >
                Clear all
              </button>
            </div>

            <div style={{ padding: '0' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  {/* Product Image */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#f3f4f6',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    👔
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      {item.product?.name}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {item.product?.brand}
                    </p>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Size: {getSizeLabel(item.sizeId)} • Color: {getColorLabel(item.colorId)}
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: '0.5rem' }}>
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '40px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        color: '#dc2626',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        textDecoration: 'underline'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            height: 'fit-content',
            position: 'sticky',
            top: '6rem'
          }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Order Summary</h2>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span>Tax</span>
                <span>{formatPrice(tax())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Shipping</span>
                <span>{shipping() === 0 ? 'Free' : formatPrice(shipping())}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb',
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <button
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '1rem'
                }}
              >
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Clear Cart Confirmation */}
        {showClearConfirm && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Clear Cart?
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Are you sure you want to remove all items from your cart? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    background: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearCart()
                    setShowClearConfirm(false)
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}