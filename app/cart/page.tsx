'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroButton, NeuroStyles } from '@/components/neuro/neuro-components'

export default function CartPage() {
  // カートストア
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

  // 状態管理
  const [isProcessing, setIsProcessing] = useState(false)
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

  const handleCheckout = async () => {
    setIsProcessing(true)
    
    // チェックアウトシミュレーション
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    alert('注文が完了しました！')
    clearCart()
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <NeuroStyles />
        <UltraHeader />

        {/* 空のカート */}
        <main style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: isMobile ? '3rem 1rem' : '4rem 2rem', 
          textAlign: 'center' 
        }}>
          <div style={{ marginBottom: '2rem', fontSize: isMobile ? '4rem' : '6rem' }}>🛍️</div>
          <h1 style={{ 
            fontSize: isMobile ? '1.75rem' : '2rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem', 
            color: '#111827' 
          }}>
            カートが空です
          </h1>
          <p style={{ 
            color: '#6b7280', 
            marginBottom: '3rem', 
            fontSize: isMobile ? '1rem' : '1.1rem' 
          }}>
            素敵な商品を見つけて、カートに追加してみませんか？
          </p>
          
          <Link href="/products">
            <NeuroButton 
              mood="dopamine" 
              size="large"
              style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                minHeight: isMobile ? '48px' : 'auto'
              }}
            >
              🛍️ ショッピングを始める
            </NeuroButton>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <NeuroStyles />
      <UltraHeader />

      {/* メインコンテンツ */}
      <main style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: isMobile ? '1rem' : '2rem', 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: isMobile ? '1rem' : '2rem' 
      }}>
        {/* カートアイテム */}
        <section style={{ order: isMobile ? 2 : 1 }}>
          <h1 style={{ 
            fontSize: isMobile ? '1.75rem' : '2rem', 
            fontWeight: 'bold', 
            marginBottom: isMobile ? '1.5rem' : '2rem', 
            color: '#111827',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            🛍️ ショッピングカート
          </h1>

          <div style={{ 
            background: '#ffffff', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
            border: '1px solid #e5e7eb' 
          }}>
            {items.map((item, index) => (
              <div key={item.id} style={{
                padding: isMobile ? '1rem' : '1.5rem',
                borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                gap: isMobile ? '0.75rem' : '1rem',
                alignItems: isMobile ? 'flex-start' : 'center',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                {/* モバイル用上部：画像と商品情報 */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '0.75rem' : '1rem',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  {/* 商品画像 */}
                  <div style={{
                    width: isMobile ? '60px' : '80px',
                    height: isMobile ? '60px' : '80px',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    flexShrink: 0
                  }}>
                    👕
                  </div>

                  {/* 商品情報 */}
                  <div style={{ 
                    flex: 1, 
                    textAlign: isMobile ? 'left' : 'left' 
                  }}>
                    <h3 style={{ 
                      fontWeight: '600', 
                      marginBottom: '0.5rem', 
                      color: '#111827',
                      fontSize: isMobile ? '1rem' : '1.1rem'
                    }}>
                      {item.product?.name || 'Unknown Product'}
                    </h3>
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: isMobile ? '0.85rem' : '0.9rem', 
                      marginBottom: '0.5rem' 
                    }}>
                      {item.product?.brand} • サイズ: {item.sizeId} • カラー: {item.colorId}
                    </div>
                    <div style={{ 
                      color: '#ef4444', 
                      fontWeight: 'bold',
                      fontSize: isMobile ? '1.1rem' : '1.2rem'
                    }}>
                      ¥{item.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* コントロール */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '1rem' : '1rem',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: isMobile ? 'space-between' : 'flex-end'
                }}>
                  {/* 数量コントロール */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{
                        width: isMobile ? '44px' : '32px',
                        height: isMobile ? '44px' : '32px',
                        border: '2px solid #3b82f6',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#3b82f6',
                        cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: isMobile ? '1.2rem' : '1rem',
                        opacity: item.quantity <= 1 ? 0.5 : 1
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      minWidth: isMobile ? '48px' : '40px', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      fontSize: isMobile ? '1.2rem' : '1.1rem',
                      color: '#111827'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: isMobile ? '44px' : '32px',
                        height: isMobile ? '44px' : '32px',
                        border: '2px solid #3b82f6',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: isMobile ? '1.2rem' : '1rem'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* 削除ボタン */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: isMobile ? '0.625rem' : '0.5rem',
                      border: 'none',
                      background: '#ef4444',
                      color: '#ffffff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: isMobile ? '1.2rem' : '1rem',
                      minWidth: isMobile ? '44px' : '32px',
                      minHeight: isMobile ? '44px' : '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* サイドバー - 注文サマリー */}
        <aside style={{ order: isMobile ? 1 : 2 }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: isMobile ? '1rem' : '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            position: isMobile ? 'relative' : 'sticky',
            top: isMobile ? 'auto' : '100px'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '1.25rem' : '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              color: '#111827',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              📋 注文サマリー
            </h2>

            {/* 価格詳細 */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '0.5rem',
                fontSize: isMobile ? '0.95rem' : '1rem'
              }}>
                <span>小計:</span>
                <span style={{ fontWeight: '600' }}>¥{subtotal().toLocaleString()}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '0.5rem',
                fontSize: isMobile ? '0.95rem' : '1rem'
              }}>
                <span>税金:</span>
                <span style={{ fontWeight: '600' }}>¥{tax().toLocaleString()}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '0.5rem',
                fontSize: isMobile ? '0.95rem' : '1rem'
              }}>
                <span>配送料:</span>
                <span style={{ 
                  fontWeight: '600',
                  color: shipping() === 0 ? '#10b981' : '#111827'
                }}>
                  {shipping() === 0 ? '無料' : `¥${shipping().toLocaleString()}`}
                </span>
              </div>
              <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: isMobile ? '1.1rem' : '1.2rem', 
                fontWeight: 'bold' 
              }}>
                <span>合計:</span>
                <span style={{ color: '#ef4444' }}>¥{total().toLocaleString()}</span>
              </div>
            </div>

            {/* チェックアウトボタン */}
            <NeuroButton
              mood="dopamine"
              size="large"
              onClick={handleCheckout}
              loading={isProcessing}
              style={{ 
                width: '100%', 
                marginBottom: '1rem',
                fontSize: isMobile ? '1rem' : '1.1rem',
                padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                minHeight: isMobile ? '48px' : 'auto'
              }}
            >
              {isProcessing ? '処理中...' : '🚀 チェックアウト'}
            </NeuroButton>

            {/* カート全削除ボタン */}
            <button
              onClick={() => {
                if (window.confirm('カート内の全商品を削除しますか？')) {
                  clearCart()
                }
              }}
              style={{
                width: '100%',
                padding: isMobile ? '0.75rem' : '0.625rem',
                border: '2px solid #ef4444',
                borderRadius: '8px',
                background: '#ffffff',
                color: '#ef4444',
                fontSize: isMobile ? '0.95rem' : '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '1rem',
                minHeight: isMobile ? '44px' : 'auto'
              }}
            >
              🗑️ カートを空にする
            </button>

            {/* セキュリティバッジ */}
            <div style={{
              background: '#f0f9ff',
              padding: isMobile ? '0.625rem' : '0.75rem',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: isMobile ? '0.8rem' : '0.85rem',
              color: '#3b82f6',
              fontWeight: '600',
              border: '1px solid #e0f2fe'
            }}>
              🔒 SSL暗号化で安全な決済
            </div>
          </div>
        </aside>
      </main>

      {/* フッター */}
      <footer style={{ 
        background: '#111827',
        color: '#ffffff', 
        padding: isMobile ? '1.5rem 1rem' : '2rem',
        marginTop: isMobile ? '2rem' : '4rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.25rem' : '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem'
            }}>
              APPAREL EC
            </h3>
          </Link>
          <p style={{ 
            color: '#9ca3af', 
            marginBottom: '2rem',
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}>
            現代のライフスタイルに合わせたアパレルファッション
          </p>
          
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '2rem',
            color: '#9ca3af',
            fontSize: isMobile ? '0.8rem' : '0.875rem'
          }}>
            © 2024 アパレルEC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}