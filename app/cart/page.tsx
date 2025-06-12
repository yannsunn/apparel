'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import UltraHeader from '@/components/layout/ultra-header'
import { 
  useNeuroUX, 
  useChoiceArchitecture, 
  useAnchoring, 
  useEmotionalStyling,
  useMimicryTrigger
} from '@/lib/neuro/neuro-hooks'
import { 
  NeuroButton, 
  ScarcityAlert, 
  PricingAnchor, 
  NeuroProgress,
  EmpathyStory,
  NeuroStyles
} from '@/components/neuro/neuro-components'
import { 
  NeuroColors, 
  generateNeuroStyles, 
  NeuroFeedback 
} from '@/lib/neuro/neuro-design'

export default function NeuroCartPage() {
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

  // ニューロUX統合
  const cartNeuro = useNeuroUX('cart-page', {
    trackAttention: true,
    enableSocialProof: true,
    monitorPerformance: true
  })

  // 感情的スタイリング
  const primaryEmotion = useEmotionalStyling('trust')
  const urgencyEmotion = useEmotionalStyling('urgency')
  const calmEmotion = useEmotionalStyling('calm')

  // 意思決定アーキテクチャ
  const shippingChoice = useChoiceArchitecture([
    { id: 'standard', name: '通常配送（無料）', days: '3-5営業日', price: 0 },
    { id: 'express', name: '特急配送', days: '1-2営業日', price: 1500 },
    { id: 'premium', name: 'プレミアム配送', days: '当日-翌日', price: 2500 }
  ])

  const paymentChoice = useChoiceArchitecture([
    { id: 'card', name: 'クレジットカード', icon: '💳', secure: true },
    { id: 'bank', name: '銀行振込', icon: '🏦', secure: true },
    { id: 'cod', name: '代金引換', icon: '📦', secure: false }
  ])

  // 価格アンカリング
  const pricing = useAnchoring([total() + 5000, total()]) // 仮想的な高価格をアンカーに

  // 状態管理
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirm'>('cart')
  const [isProcessing, setIsProcessing] = useState(false)
  const [abandonmentRisk, setAbandonmentRisk] = useState(false)

  // 離脱リスク検知
  useEffect(() => {
    let timer: NodeJS.Timeout
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setAbandonmentRisk(true)
        NeuroFeedback.recordInteraction('cart-abandonment', 'risk-detected')
      }
    }

    if (items.length > 0) {
      document.addEventListener('mouseleave', handleMouseLeave)
      
      // 5分後に離脱リスク警告
      timer = setTimeout(() => {
        setAbandonmentRisk(true)
      }, 300000)
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (timer) clearTimeout(timer)
    }
  }, [items.length])

  // 推奨商品（クロスセル）
  const recommendedProducts = useMemo(() => [
    { id: 'rec1', name: 'プレミアムベルト', price: 4500, image: '👔', reason: 'よく一緒に購入されています' },
    { id: 'rec2', name: 'カジュアルシューズ', price: 5900, image: '👟', reason: 'この商品を見た人が購入' },
    { id: 'rec3', name: 'スタイリッシュウォッチ', price: 12800, image: '⌚', reason: 'コーディネートに最適' }
  ], [])

  // 顧客の声（社会的証明）
  const testimonials = [
    {
      avatar: '👨‍💼',
      name: '田中様',
      role: 'アパレル店舗オーナー',
      content: 'カートシステムが使いやすく、商品の品質も期待以上でした。リピート確定です！',
      emotion: 'satisfied' as const
    },
    {
      avatar: '👩‍💻',
      name: '佐藤様',
      role: 'ECサイト運営者',
      content: '配送が早くて助かります。急な注文にも柔軟に対応していただけるのが嬉しいです。',
      emotion: 'happy' as const
    }
  ]

  // プログレス計算
  const progressValue = useMemo(() => {
    const steps = { cart: 25, shipping: 50, payment: 75, confirm: 100 }
    return steps[checkoutStep]
  }, [checkoutStep])

  // カート合計の心理的効果
  const savingsMessage = useMemo(() => {
    const freeShippingThreshold = 10000
    if (subtotal() >= freeShippingThreshold) {
      return {
        type: 'achievement',
        message: `🎉 ${freeShippingThreshold.toLocaleString()}円以上で送料無料達成！`,
        color: NeuroColors.dopamine.primary
      }
    } else {
      const remaining = freeShippingThreshold - subtotal()
      return {
        type: 'incentive',
        message: `あと¥${remaining.toLocaleString()}で送料無料！`,
        color: NeuroColors.urgency.primary
      }
    }
  }, [subtotal])

  const handleCheckout = async () => {
    setIsProcessing(true)
    NeuroFeedback.recordInteraction('checkout', 'initiated')
    
    // チェックアウトシミュレーション
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    alert('注文が完了しました！ニューロデザインの効果を実感いただけましたでしょうか？')
    clearCart()
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafafa' }}>
        <NeuroStyles />
        <UltraHeader />

        {/* 空のカート */}
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem', fontSize: '6rem' }}>🛒</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
            カートが空です
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '3rem', fontSize: '1.1rem' }}>
            素敵な商品を見つけて、カートに追加してみませんか？
          </p>
          
          <NeuroButton 
            mood="dopamine" 
            size="large"
            onClick={() => window.location.href = '/products'}
          >
            🛍️ ショッピングを始める
          </NeuroButton>

          {/* 推奨商品セクション */}
          <section style={{ marginTop: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#111827' }}>
              おすすめ商品
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {recommendedProducts.map((product) => (
                <div key={product.id} style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{product.image}</div>
                  <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>{product.name}</h3>
                  <div style={{ color: NeuroColors.dopamine.primary, fontWeight: 'bold', marginBottom: '1rem' }}>
                    ¥{product.price.toLocaleString()}
                  </div>
                  <NeuroButton mood="trust" size="small">
                    詳細を見る
                  </NeuroButton>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div ref={cartNeuro.elementRef as any} style={{ minHeight: '100vh', background: '#fafafa' }}>
      <NeuroStyles />
      
      {/* ニューロ分析ダッシュボード（開発環境） */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          zIndex: 1000,
          minWidth: '200px'
        }}>
          <h4>🧠 カート分析</h4>
          <div>アイテム数: {totalItems()}</div>
          <div>合計金額: ¥{total().toLocaleString()}</div>
          <div>離脱リスク: {abandonmentRisk ? '⚠️ 高' : '✅ 低'}</div>
          <div>チェックアウト段階: {checkoutStep}</div>
          <div>ニューロスコア: {cartNeuro.neuroScore}/100</div>
        </div>
      )}

      {/* 離脱防止モーダル */}
      {abandonmentRisk && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            maxWidth: '400px',
            textAlign: 'center',
            animation: 'slideInBounce 0.5s ease-out'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😢</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
              お待ちください！
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              カートの商品をお忘れではありませんか？<br />
              今だけ特別に<strong style={{ color: NeuroColors.urgency.primary }}>5%OFF</strong>でご提供します！
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <NeuroButton 
                mood="dopamine" 
                onClick={() => {
                  setAbandonmentRisk(false)
                  NeuroFeedback.recordInteraction('abandonment-prevention', 'accepted')
                }}
              >
                🎁 特典を受け取る
              </NeuroButton>
              <NeuroButton 
                mood="calm" 
                variant="secondary"
                onClick={() => {
                  setAbandonmentRisk(false)
                  NeuroFeedback.recordInteraction('abandonment-prevention', 'declined')
                }}
              >
                後で決める
              </NeuroButton>
            </div>
          </div>
        </div>
      )}

      <UltraHeader />

      {/* プログレスバー */}
      <div style={{ background: '#ffffff', padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <NeuroProgress 
            value={progressValue} 
            max={100} 
            label={`チェックアウト進行状況 (${checkoutStep})`}
            color="trust"
            animated={true}
          />
        </div>
      </div>

      {/* メインコンテンツ */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* カートアイテム */}
        <section>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
            🛒 ショッピングカート
          </h1>

          <div style={{ background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
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
                  background: `linear-gradient(135deg, ${NeuroColors.calm.secondary}30, ${NeuroColors.trust.secondary}20)`,
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
                  <PricingAnchor 
                    originalPrice={item.product?.originalPrice || item.price}
                    currentPrice={item.price}
                    size="small"
                  />
                </div>

                {/* 数量コントロール */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: `2px solid ${NeuroColors.calm.primary}`,
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: NeuroColors.calm.primary,
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
                        border: `2px solid ${NeuroColors.dopamine.primary}`,
                        borderRadius: '50%',
                        background: NeuroColors.dopamine.primary,
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
                      background: NeuroColors.urgency.primary,
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

          {/* クロスセル推奨商品 */}
          <section style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
              🎯 一緒に購入されている商品
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {recommendedProducts.slice(0, 3).map((product) => (
                <div key={product.id} style={{
                  background: '#ffffff',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = NeuroColors.dopamine.primary
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.image}</div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{product.name}</div>
                  <div style={{ color: NeuroColors.dopamine.primary, fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    ¥{product.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                    {product.reason}
                  </div>
                  <NeuroButton mood="dopamine" size="small">
                    追加
                  </NeuroButton>
                </div>
              ))}
            </div>
          </section>
        </section>

        {/* サイドバー - 注文サマリー */}
        <aside>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '120px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
              📋 注文サマリー
            </h2>

            {/* 送料無料メッセージ */}
            <div style={{
              background: savingsMessage.type === 'achievement' 
                ? `${NeuroColors.dopamine.accent}20`
                : `${NeuroColors.urgency.accent}20`,
              color: savingsMessage.color,
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontWeight: '600',
              textAlign: 'center',
              border: `2px dashed ${savingsMessage.color}`
            }}>
              {savingsMessage.message}
            </div>

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
                  color: shipping() === 0 ? NeuroColors.dopamine.primary : '#111827'
                }}>
                  {shipping() === 0 ? '無料' : `¥${shipping().toLocaleString()}`}
                </span>
              </div>
              <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>合計:</span>
                <span style={{ color: NeuroColors.dopamine.primary }}>¥{total().toLocaleString()}</span>
              </div>
            </div>

            {/* チェックアウトボタン */}
            <NeuroButton
              mood="dopamine"
              size="large"
              onClick={handleCheckout}
              loading={isProcessing}
              mimicry={true}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {isProcessing ? '処理中...' : '🚀 チェックアウト'}
            </NeuroButton>

            {/* セキュリティバッジ */}
            <div style={{
              background: `${NeuroColors.trust.primary}10`,
              padding: '0.75rem',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: NeuroColors.trust.primary,
              fontWeight: '600'
            }}>
              🔒 SSL暗号化で安全な決済
            </div>
          </div>

          {/* 顧客の声 */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
              💬 お客様の声
            </h3>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <EmpathyStory story={testimonial} />
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  )
}