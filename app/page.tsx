'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* シンプルヘッダー */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Link href="/" style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#111827',
            textDecoration: 'none'
          }}>
            APPAREL EC
          </Link>
          
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/products" style={{ 
              color: '#111827', 
              textDecoration: 'none', 
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}>
              商品一覧
            </Link>
            <Link href="/cart" style={{ 
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              padding: '0.5rem 1rem', 
              borderRadius: '8px',
              textDecoration: 'none', 
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}>
              🛒 カート
            </Link>
          </nav>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section style={{
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '8rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            padding: '4rem 3rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            color: '#111827'
          }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              lineHeight: '1.1'
            }}>
              アパレルブランドの<br />
              <span style={{ color: '#dc2626' }}>企画・製造・OEM</span><br />
              を革命的に
            </h1>
            
            <div style={{
              backgroundColor: '#fef3c7',
              padding: '1.5rem',
              borderRadius: '16px',
              marginBottom: '3rem',
              border: '2px dashed #f59e0b'
            }}>
              <p style={{
                fontSize: '1.8rem',
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                トレンド商品を1枚から、
              </p>
              <p style={{
                fontSize: '2.5rem',
                margin: 0,
                color: '#dc2626',
                fontWeight: '800'
              }}>
                『欲しいときに欲しいぶんだけ』
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <Link href="/products" style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                padding: '1.25rem 3rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}>
                🚀 今すぐ商品を見る
              </Link>
              <Link href="/support/contact" style={{
                backgroundColor: 'transparent',
                color: '#3b82f6',
                padding: '1.25rem 3rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.2rem',
                border: '3px solid #3b82f6',
                transition: 'all 0.3s ease'
              }}>
                💬 無料相談する
              </Link>
            </div>

            {/* 統計表示 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              {[
                { label: '現在の利用者', value: '127', suffix: '人', icon: '👥' },
                { label: '本日の注文', value: '89', suffix: '件', icon: '📦' },
                { label: '満足度', value: '98.2', suffix: '%', icon: '⭐' }
              ].map((stat, index) => (
                <div key={stat.label} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#3b82f6',
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

      {/* 特徴セクション */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '3rem',
            color: '#111827'
          }}>
            選ばれる理由
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                icon: '🏭',
                title: '企画から製造まで',
                description: 'アパレルブランドの企画・デザインから製造・OEMまで一貫サポート'
              },
              {
                icon: '📦',
                title: '小ロット対応',
                description: '1枚からの小ロット生産で在庫リスクを最小化'
              },
              {
                icon: '⚡',
                title: '短納期対応',
                description: 'トレンドに素早く対応できる短納期での製造体制'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: '#111827'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6' 
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer style={{ 
        backgroundColor: '#111827', 
        color: '#ffffff', 
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            APPAREL EC
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
            現代のライフスタイルに合わせたプレミアムファッション
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              商品一覧
            </Link>
            <Link href="/cart" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              カート
            </Link>
            <Link href="/support/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              お問い合わせ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}