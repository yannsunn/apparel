'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NeuroColorPsychology, MirrorNeuronActivation, DopamineRewardSystem } from '@/lib/neuro/advanced-neuro-system'

export default function HomePage() {
  // 🧠 ニューロマーケティング状態管理
  const [viewerCount, setViewerCount] = useState(47)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 37, seconds: 24 })
  const [salesCount, setSalesCount] = useState(189)
  const [isVisible, setIsVisible] = useState(false)
  const [dopamineBoost, setDopamineBoost] = useState(0)

  // ⚡ ドーパミン誘発タイマー
  useEffect(() => {
    setIsVisible(true)
    
    // リアルタイム希少性タイマー
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)

    // 社会的証明カウンター
    const socialProofTimer = setInterval(() => {
      setViewerCount(prev => Math.max(15, prev + Math.floor(Math.random() * 3) - 1))
      if (Math.random() > 0.7) {
        setSalesCount(prev => prev + 1)
        setDopamineBoost(prev => prev + 1)
      }
    }, 4000)

    return () => {
      clearInterval(timer)
      clearInterval(socialProofTimer)
    }
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff',
      position: 'relative'
    }}>
      {/* 🧬 ニューロデザイン最適化ヘッダー */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: `3px solid ${NeuroColorPsychology.dopamine.primary}`,
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          {/* 🎯 ブランド認知最適化 */}
          <Link href="/" style={{
            fontSize: '2.2rem',
            fontWeight: '900',
            color: '#111827',
            textDecoration: 'none',
            letterSpacing: '-0.02em'
          }}>
            APPAREL PRO
          </Link>
          
          {/* 🚀 緊急性ナビゲーション */}
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* ⏰ 希少性タイマー */}
            <div style={{
              background: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '700'
            }}>
              ⚡ 限定セール終了まで {timeLeft.hours}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
            
            <Link href="/products" style={{ 
              background: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              textDecoration: 'none', 
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              🎯 今すぐ商品を見る
            </Link>
            
            <Link href="/cart" style={{ 
              background: '#ef4444',
              color: 'white',
              padding: '0.75rem 1.5rem', 
              borderRadius: '25px',
              textDecoration: 'none', 
              fontWeight: '700',
              transition: 'all 0.3s ease'
            }}>
              🛒 カート {dopamineBoost > 0 && `(+${dopamineBoost})`}
            </Link>
          </nav>
        </div>
      </header>

      {/* 🧠 ニューロマーケティング最適化ヒーローセクション */}
      <section style={{
        position: 'relative',
        padding: '4rem 2rem',
        background: '#f9fafb',
        overflow: 'hidden'
      }}>
        {/* 🌟 背景パーティクル効果 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255, 71, 87, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          zIndex: 0
        }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* 🎯 F字パターン最適化レイアウト */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'center' }}>
            
            {/* 👁️ 左側：メインコンテンツ（F字パターン上部水平） */}
            <div>
              {/* 🚨 緊急性アラート */}
              <div style={{
                background: '#dc2626',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                animation: 'pulse 2s infinite'
              }}>
                🔥 {viewerCount}人が今このページを見ています！
              </div>
              
              {/* 🧬 ドーパミン誘発ヘッドライン */}
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: '900',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                color: '#111827',
                letterSpacing: '-0.02em',
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s ease-out'
              }}>
                {MirrorNeuronActivation.actionVerbs.ja[0]}<br />
                <span style={{ color: '#3b82f6' }}>プレミアム</span><br />
                <span style={{ color: '#dc2626' }}>アパレルコレクション</span>
              </h1>
              
              {/* 💎 価値提案（ニューロ最適化） */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '3px solid #ef4444',
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '2.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  opacity: 0.1,
                  animation: 'rotate 20s linear infinite'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#111827'
                  }}>
                    🎯 {MirrorNeuronActivation.actionVerbs.emotional[0]}
                  </p>
                  <p style={{
                    fontSize: '2.2rem',
                    fontWeight: '800',
                    margin: 0,
                    background: '#dc2626',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: '#dc2626'
                  }}>
                    限定74%OFF で{MirrorNeuronActivation.actionVerbs.ja[2]}
                  </p>
                </div>
              </div>
              
              {/* 🚀 ドーパミン誘発CTA群 */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <Link href="/products" style={{
                  background: '#ef4444',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '800',
                  fontSize: '1.2rem',
                  boxShadow: '0 8px 25px rgba(255, 71, 87, 0.4)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>{
                  <>⚡ {MirrorNeuronActivation.actionVerbs.ja[0]}</>}
                </Link>
                
                <Link href="/products?filter=limited" style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#ef4444',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  border: '3px solid #ef4444',
                  transition: 'all 0.3s ease'
                }}>
                  👑 限定コレクション
                </Link>
              </div>
            </div>
            
            {/* 📊 右側：社会的証明＋希少性（F字パターン右端） */}
            <div>
              {/* 🏆 リアルタイム社会的証明 */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '2rem',
                marginBottom: '1.5rem',
                border: `2px solid ${NeuroColorPsychology.trust.primary}`,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700', 
                  marginBottom: '1.5rem',
                  color: '#3b82f6'
                }}>
                  🔥 リアルタイム実績
                </h3>
                
                {[
                  { label: '今日の購入者', value: salesCount.toString(), suffix: '人', icon: '🛒', color: '#ef4444' },
                  { label: '現在の閲覧者', value: viewerCount.toString(), suffix: '人', icon: '👀', color: '#3b82f6' },
                  { label: '在庫残り', value: '7', suffix: '点のみ', icon: '📦', color: '#dc2626' },
                  { label: '満足度', value: '99.2', suffix: '%', icon: '⭐', color: '#059669' }
                ].map((stat, index) => (
                  <div key={stat.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: index < 3 ? '1px solid rgba(0,0,0,0.1)' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{stat.label}</span>
                    </div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      color: stat.color
                    }}>
                      {stat.value}{stat.suffix}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* ⏰ 希少性カウントダウン */}
              <div style={{
                background: '#dc2626',
                color: 'white',
                borderRadius: '20px',
                padding: '1.5rem',
                textAlign: 'center',
                animation: timeLeft.minutes < 10 ? 'shake 0.5s infinite' : 'none'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  ⚡ 限定セール終了まで
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em'
                }}>
                  {timeLeft.hours}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  このチャンスを逃すと次は30日後です
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧠 ニューロマーケティング特徴セクション */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,1) 100%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* 🎯 認知負荷最適化ヘッダー */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              color: '#3b82f6',
              fontSize: '0.9rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem'
            }}>
              💎 圧倒的差別化ポイント
            </div>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '900', 
              marginBottom: '1rem',
              color: '#111827',
              lineHeight: '1.2'
            }}>
              なぜ{salesCount}人が選んだのか？
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              科学的に実証された{MirrorNeuronActivation.actionVerbs.emotional[4]}
            </p>
          </div>
          
          {/* 🧬 Miller's 7±2法則に基づく特徴グリッド */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              {
                icon: '🚀',
                title: MirrorNeuronActivation.actionVerbs.ja[4],
                description: 'AI駆動の次世代デザインで業界を革命的に変革',
                color: '#ef4444',
                benefit: '売上300%アップ',
                proof: '実績97社で証明済み'
              },
              {
                icon: '💎',
                title: MirrorNeuronActivation.actionVerbs.ja[1],
                description: '限定素材とプレミアム品質で圧倒的な差別化を実現',
                color: NeuroColorPsychology.trust.primary,
                benefit: 'コスト50%削減',
                proof: '顧客満足度99.2%'
              },
              {
                icon: '⚡',
                title: MirrorNeuronActivation.actionVerbs.ja[6],
                description: '1枚から対応可能な超小ロット生産システム',
                color: NeuroColorPsychology.urgency.primary,
                benefit: '在庫リスク0%',
                proof: '最短48時間納期'
              },
              {
                icon: '🎯',
                title: MirrorNeuronActivation.actionVerbs.ja[3],
                description: 'VIP専用ルートでトレンド情報を独占的に先取り',
                color: NeuroColorPsychology.safety.primary,
                benefit: 'トレンド3ヶ月先取り',
                proof: '業界シェア第1位'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: `2px solid ${feature.color}`,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                {/* 🌟 背景グラデーション */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: feature.color,
                  opacity: 0.1,
                  borderRadius: '50%',
                  transform: 'translate(30px, -30px)'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* 🎯 アイコン＋即効性バッジ */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{ 
                      fontSize: '3.5rem', 
                      lineHeight: 1,
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }}>
                      {feature.icon}
                    </div>
                    <div style={{
                      background: feature.color,
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      fontSize: '0.7rem',
                      fontWeight: '700'
                    }}>
                      {feature.benefit}
                    </div>
                  </div>
                  
                  {/* 📝 タイトル */}
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: '800', 
                    marginBottom: '1rem',
                    color: feature.color,
                    lineHeight: '1.3'
                  }}>
                    {feature.title}
                  </h3>
                  
                  {/* 📖 説明 */}
                  <p style={{ 
                    color: '#4b5563', 
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {feature.description}
                  </p>
                  
                  {/* 🏆 社会的証明 */}
                  <div style={{
                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}25)`,
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: `1px solid ${feature.color}40`
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: feature.color
                    }}>
                      ✓ {feature.proof}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 🎯 最終ドーパミン誘発CTA */}
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            border: `3px solid ${NeuroColorPsychology.dopamine.primary}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: `conic-gradient(from 0deg, ${NeuroColorPsychology.dopamine.primary}20, ${NeuroColorPsychology.trust.primary}20, ${NeuroColorPsychology.dopamine.primary}20)`,
              animation: 'rotate 30s linear infinite',
              opacity: 0.3
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: '2.2rem',
                fontWeight: '900',
                marginBottom: '1rem',
                background: '#ef4444',
                color: 'transparent'
              }}>
                🔥 {timeLeft.hours === 0 && timeLeft.minutes < 30 ? '最後のチャンス！' : '今だけ特別価格'}
              </h3>
              
              <p style={{
                fontSize: '1.3rem',
                color: '#4b5563',
                marginBottom: '2rem',
                fontWeight: '600'
              }}>
                {viewerCount}人が検討中。残り{timeLeft.minutes}分で
                <span style={{ color: '#dc2626', fontWeight: '800' }}>74%OFF</span>
                終了します
              </p>
              
              <Link href="/products" style={{
                background: '#ef4444',
                color: 'white',
                padding: '1.25rem 3rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '900',
                fontSize: '1.3rem',
                boxShadow: '0 10px 30px rgba(255, 71, 87, 0.4)',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                position: 'relative',
                overflow: 'hidden'
              }}>
                ⚡ {MirrorNeuronActivation.actionVerbs.ja[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🧠 ニューロマーケティング最適化フッター */}
      <footer style={{ 
        background: '#111827',
        color: '#ffffff', 
        padding: '4rem 2rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 🌟 背景効果 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 71, 87, 0.1) 0%, transparent 50%)',
          zIndex: 0
        }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* 🎯 最終ドーパミン誘発 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '900', 
              marginBottom: '1rem',
              background: NeuroColorPsychology.dopamine.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              ⚡ APPAREL PRO
            </h3>
            <p style={{ 
              color: '#d1d5db', 
              marginBottom: '1.5rem',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              {MirrorNeuronActivation.actionVerbs.emotional[4]}を{MirrorNeuronActivation.actionVerbs.ja[2]}
            </p>
            
            {/* 🏆 最終実績アピール */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              {[
                { label: '累計販売数', value: `${salesCount * 47}`, suffix: '点', icon: '📦' },
                { label: '継続利用率', value: '98.7', suffix: '%', icon: '💎' },
                { label: '平均評価', value: '4.9', suffix: '/5.0', icon: '⭐' }
              ].map((stat, index) => (
                <div key={stat.label} style={{
                  textAlign: 'center',
                  minWidth: '120px'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#ef4444',
                    marginBottom: '0.25rem'
                  }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#9ca3af',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 🔗 ナビゲーション */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '3rem', 
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            {[
              { href: '/products', label: '🎯 商品一覧', color: '#3b82f6' },
              { href: '/cart', label: '🛒 カート', color: '#ef4444' },
              { href: '/support/contact', label: '💬 VIPサポート', color: '#059669' }
            ].map((link, index) => (
              <Link key={link.href} href={link.href} style={{ 
                color: link.color,
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${link.color}40`,
                transition: 'all 0.3s ease'
              }}>
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* 📄 コピーライト */}
          <div style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#9ca3af',
            fontSize: '0.9rem'
          }}>
            © 2024 APPAREL PRO. 全ての革命的体験を独占提供.
          </div>
        </div>
      </footer>
      
      {/* 🎨 ニューロマーケティングアニメーション */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}