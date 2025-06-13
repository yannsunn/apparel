'use client'

import { useState } from 'react'
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
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem', fontSize: '6rem' }}>🛍️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
            カートが空です
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '3rem', fontSize: '1.1rem' }}>
            素敵な商品を見つけて、カートに追加してみませんか？
          </p>
          
          <Link href="/products">
            <NeuroButton 
              mood="dopamine" 
              size="large"
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
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* カートアイテム */}
        <section>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
            🛍️ ショッピングカート
          </h1>

          <div style={{ background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
            {items.map((item, index) => (
              <div key={item.id} style={{
                padding: '1.5rem',
                borderBottom: index < items.length - 1 ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                {/* 商品画像 */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  👕
                </div>

                {/* 商品情報 */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                    {item.product?.name || 'Unknown Product'}
                  </h3>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {item.product?.brand} • サイズ: {item.sizeId} • カラー: {item.colorId}
                  </div>
                  <div style={{ color: '#ef4444', fontWeight: 'bold' }}>
                    ¥{item.price.toLocaleString()}
                  </div>
                </div>

                {/* 数量コントロール */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '2px solid #3b82f6',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#3b82f6',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      minWidth: '40px', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      color: '#111827'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '2px solid #3b82f6',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* 削除ボタン */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: '0.5rem',
                      border: 'none',
                      background: '#ef4444',
                      color: '#ffffff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem'
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
        <aside>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            position: 'sticky',
            top: '100px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
              📋 注文サマリー
            </h2>

            {/* 価格詳細 */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>小計:</span>
                <span style={{ fontWeight: '600' }}>¥{subtotal().toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>税金:</span>
                <span style={{ fontWeight: '600' }}>¥{tax().toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>配送料:</span>
                <span style={{ 
                  fontWeight: '600',
                  color: shipping() === 0 ? '#10b981' : '#111827'
                }}>
                  {shipping() === 0 ? '無料' : `¥${shipping().toLocaleString()}`}
                </span>
              </div>
              <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
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
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {isProcessing ? '処理中...' : '🚀 チェックアウト'}
            </NeuroButton>

            {/* セキュリティバッジ */}
            <div style={{
              background: '#f0f9ff',
              padding: '0.75rem',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '0.85rem',
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
        padding: '2rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem'
            }}>
              APPAREL EC
            </h3>
          </Link>
          <p style={{ 
            color: '#9ca3af', 
            marginBottom: '2rem'
          }}>
            現代のライフスタイルに合わせたプレミアムファッション
          </p>
          
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '2rem',
            color: '#9ca3af',
            fontSize: '0.875rem'
          }}>
            © 2024 アパレルEC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}