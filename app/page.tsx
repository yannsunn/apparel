'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { 
  useNeuroUX, 
  useSocialProof, 
  useScarcityAlert, 
  useEmotionalStyling,
  useAnchoring,
  useCognitiveLoad
} from '@/lib/neuro/neuro-hooks'
import { 
  NeuroColors, 
  generateNeuroStyles, 
  createAttentionAnimation,
  NeuroFeedback 
} from '@/lib/neuro/neuro-design'

export default function NeuroHomePage() {
  // ニューロUX統合フック
  const heroNeuro = useNeuroUX('hero-section', {
    trackAttention: true,
    enableSocialProof: true,
    monitorPerformance: true
  })

  // 感情的スタイリング
  const heroEmotion = useEmotionalStyling('dopamine')
  const trustEmotion = useEmotionalStyling('trust')
  const urgencyEmotion = useEmotionalStyling('urgency')

  // 社会的証明
  const socialProof = useSocialProof('homepage')
  
  // 認知負荷管理
  const categoryLoad = useCognitiveLoad(4) // 4つのカテゴリ
  
  // 価格アンカリング
  const pricing = useAnchoring([2980, 8900, 12800, 6900])

  // リアルタイム統計（SSR対応）
  const [stats, setStats] = useState({
    activeUsers: 127,
    todayOrders: 89,
    satisfaction: 98.2
  })
  const [mounted, setMounted] = useState(false)

  // 動的要素の更新
  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setStats(prev => ({
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
          todayOrders: prev.todayOrders + (Math.random() > 0.7 ? 1 : 0),
          satisfaction: Math.min(prev.satisfaction + (Math.random() * 0.2 - 0.1), 100)
        }))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [])

  // インタラクション記録
  const recordInteraction = (element: string, action: string) => {
    NeuroFeedback.recordInteraction(element, action)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', position: 'relative' }}>
      {/* ニューロ分析ダッシュボード（開発環境のみ） */}
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
          <h4>🧠 ニューロ分析</h4>
          <div>注意レベル: {heroNeuro.attention.attentionLevel}</div>
          <div>ニューロスコア: {heroNeuro.neuroScore}/100</div>
          <div>認知負荷: {categoryLoad.isOverloaded ? '⚠️ 過負荷' : '✅ 最適'}</div>
          <div>アクティブユーザー: {stats.activeUsers}</div>
        </div>
      )}

      {/* ヘッダー - F字パターン最適化 */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* ロゴ - 視線誘導起点 */}
          <Link 
            href="/"
            style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${NeuroColors.dopamine.primary}, ${NeuroColors.trust.primary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              position: 'relative'
            }}
            onClick={() => recordInteraction('logo', 'click')}
          >
            APPAREL EC
            {/* 新着通知ドット */}
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              width: '8px',
              height: '8px',
              background: NeuroColors.urgency.primary,
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
          </Link>
          
          {/* ナビゲーション - 認知負荷最適化 */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {/* 社会的証明表示 */}
            {socialProof.visibleProof.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                color: '#15803d',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                animation: 'slideIn 0.5s ease-out'
              }}>
                🔥 {socialProof.visibleProof[0]}
              </div>
            )}

            <Link 
              href="/products" 
              style={{ 
                color: '#111827', 
                textDecoration: 'none', 
                fontWeight: '500',
                position: 'relative',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
                e.currentTarget.style.color = NeuroColors.trust.primary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#111827'
              }}
              onClick={() => recordInteraction('products-nav', 'click')}
            >
              商品一覧
            </Link>
            
            {/* CTAボタン - ドーパミン刺激色 */}
            <Link 
              href="/cart" 
              style={{ 
                ...generateNeuroStyles('dopamine', 'primary'),
                padding: '0.75rem 1.5rem', 
                borderRadius: '25px',
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '0.95rem',
                position: 'relative',
                overflow: 'hidden',
                transform: 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                e.currentTarget.style.boxShadow = `0 8px 25px ${NeuroColors.dopamine.primary}50`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = `0 4px 12px ${NeuroColors.dopamine.primary}40`
              }}
              onClick={() => recordInteraction('cart-cta', 'click')}
            >
              🛒 カート
              {/* カート内アイテム数（社会的証明） */}
              {mounted && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: NeuroColors.urgency.primary,
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {Math.floor(Math.random() * 9) + 1}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* ヒーローセクション - ニューロ最適化 */}
      <section 
        ref={heroNeuro.elementRef as any}
        style={{
          backgroundColor: NeuroColors.trust.primary,
          padding: '8rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 背景アニメーション要素 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* 緊急性アラート */}
          <div style={{
            backgroundColor: NeuroColors.urgency.primary,
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'inline-block',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            animation: 'pulse 2s infinite'
          }}>
            ⚡ 限定キャンペーン実施中！今なら最大50%OFF
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            padding: '4rem 3rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* メインヘッドライン - 感情トリガー */}
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              color: '#111827'
            }}>
              アパレルブランドの
              <br />
              <span style={{ 
                color: NeuroColors.urgency.primary,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}>
                企画・製造・OEM
              </span>
              を革命的に
            </h1>
            
            {/* 価値提案 - アンカリング効果 */}
            <div style={{
              backgroundColor: `${NeuroColors.dopamine.accent}20`,
              padding: '1.5rem',
              borderRadius: '16px',
              marginBottom: '2rem',
              border: `2px dashed ${NeuroColors.dopamine.primary}`
            }}>
              <p style={{
                fontSize: '1.8rem',
                marginBottom: '0.5rem',
                color: '#1f2937',
                fontWeight: '600'
              }}>
                トレンド商品を1枚から、
              </p>
              <p style={{
                fontSize: '2.5rem',
                margin: 0,
                color: NeuroColors.urgency.primary,
                fontWeight: '800',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
                『欲しいときに欲しいぶんだけ』
              </p>
            </div>

            {/* ターゲット顧客バッジ - 社会的認証 */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              {[
                { label: 'アパレルメーカー様', icon: '🏭', users: '2,300+' },
                { label: 'OEM/ODM企業様', icon: '⚙️', users: '890+' },
                { label: '個人事業主様', icon: '💼', users: '5,600+' }
              ].map((badge, index) => (
                <div key={badge.label} style={{
                  backgroundColor: `${Object.values(NeuroColors)[index % 4].primary}15`,
                  color: Object.values(NeuroColors)[index % 4].primary,
                  padding: '1rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: `2px solid ${Object.values(NeuroColors)[index % 4].primary}30`,
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.borderColor = Object.values(NeuroColors)[index % 4].primary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.borderColor = Object.values(NeuroColors)[index % 4].primary + '30'
                }}>
                  {badge.icon} {badge.label}
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: NeuroColors.urgency.primary,
                    color: 'white',
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontWeight: 'bold'
                  }}>
                    {badge.users}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA群 - 意思決定アーキテクチャ */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* プライマリCTA */}
              <Link
                href="/products"
                style={{
                  ...generateNeuroStyles('dopamine', 'primary'),
                  padding: '1.25rem 3rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'
                  e.currentTarget.style.boxShadow = `0 12px 30px ${NeuroColors.dopamine.primary}50`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = `0 4px 12px ${NeuroColors.dopamine.primary}40`
                }}
                onClick={() => recordInteraction('hero-primary-cta', 'click')}
              >
                🚀 今すぐ商品を見る
                {/* 内部グロー効果 */}
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmer 2s infinite'
                }} />
              </Link>

              {/* セカンダリCTA */}
              <Link
                href="/support/contact"
                style={{
                  background: 'transparent',
                  color: NeuroColors.trust.primary,
                  padding: '1.25rem 3rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.2rem',
                  border: `3px solid ${NeuroColors.trust.primary}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = NeuroColors.trust.primary
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = NeuroColors.trust.primary
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                onClick={() => recordInteraction('hero-secondary-cta', 'click')}
              >
                💬 無料相談する
              </Link>
            </div>

            {/* リアルタイム統計 - 社会的証明 */}
            <div style={{
              marginTop: '3rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              {[
                { label: '現在の利用者', value: stats.activeUsers, suffix: '人', icon: '👥' },
                { label: '本日の注文', value: stats.todayOrders, suffix: '件', icon: '📦' },
                { label: '満足度', value: stats.satisfaction.toFixed(1), suffix: '%', icon: '⭐' }
              ].map((stat, index) => (
                <div key={stat.label} style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: NeuroColors.trust.primary,
                    marginBottom: '0.25rem'
                  }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px ${NeuroColors.dopamine.primary}; }
          50% { box-shadow: 0 0 20px ${NeuroColors.dopamine.primary}, 0 0 30px ${NeuroColors.dopamine.secondary}; }
        }
      `}</style>
    </div>
  )
}