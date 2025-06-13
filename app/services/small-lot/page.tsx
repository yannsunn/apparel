import { Metadata } from 'next'
import Link from 'next/link'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroButton, ScarcityAlert, NeuroStyles } from '@/components/neuro/neuro-components'

export const metadata: Metadata = {
  title: '小ロット対応サービス | APPAREL EC',
  description: '1枚から対応可能な小ロット製造サービス。在庫リスクを最小限に抑え、テストマーケティングに最適。迅速な対応でビジネスチャンスを逃しません。',
  keywords: '小ロット, 少量生産, テストマーケティング, 在庫リスク, 1枚から',
}

export default function SmallLotPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <UltraHeader />
      <NeuroStyles />

      {/* Hero Section */}
      <section style={{
        background: '#ef4444',
        color: '#ffffff',
        padding: '4rem 2rem',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />
        
        {/* Background overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.85) 0%, rgba(220, 38, 38, 0.85) 100%)',
          zIndex: 1
        }} />
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 3
        }}>
          {/* Left content */}
          <div style={{ textAlign: 'left' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              小ロット対応サービス
            </h1>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              1枚から始める新しいビジネス。<br />
              在庫リスクを最小限に抑えて、アイデアを形にしませんか？
            </p>
            
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <Link href="/support/contact">
                <NeuroButton 
                  mood="dopamine" 
                  size="large"
                  style={{
                    background: '#ffffff',
                    color: '#ef4444',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    padding: '1rem 2rem'
                  }}
                >
                  1枚から相談
                </NeuroButton>
              </Link>
              <Link href="/products">
                <NeuroButton 
                  mood="trust" 
                  size="large" 
                  variant="secondary"
                  style={{
                    background: 'transparent',
                    color: '#ffffff',
                    border: '2px solid #ffffff',
                    fontWeight: '600',
                    fontSize: '1rem',
                    padding: '0.875rem 1.75rem'
                  }}
                >
                  製作事例を見る
                </NeuroButton>
              </Link>
            </div>
            
            {/* Urgency indicator */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '1.5rem 2rem',
              display: 'inline-block',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                ⚡ 今始めよう
              </div>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                最短1日で製作開始 | 在庫リスクゼロ
              </div>
            </div>
          </div>
          
          {/* Right side - Small lot visualization */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Small lot showcase image */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '100%',
              maxWidth: '400px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="小ロット製造イメージ"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  📊 リスク最小化
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  1枚からテストマーケティング
                </div>
              </div>
            </div>
            
            {/* Advantage highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              width: '100%',
              maxWidth: '400px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>ゼロ</div>
                <div style={{ fontSize: '0.8rem' }}>在庫リスク</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>即日</div>
                <div style={{ fontSize: '0.8rem' }}>対応可能</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* 小ロット製造プロセス画像セクション */}
        <section style={{ marginBottom: '4rem', padding: '3rem 2rem', background: '#f0f9ff', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            小ロット製造の流れ
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="テストマーケティング"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                📊 テストマーケティング
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                小ロットで市場反応をテストし、リスクを最小限に抑えて商品開発を進められます。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="クイック生産"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                ⚡ スピード製造
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                小ロット生産により、通常より短期間での製造・納品が可能です。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="カスタマイズ対応"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                🎨 カスタマイズ
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                小ロットならではの柔軟なカスタマイズ対応で、理想の商品を実現します。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="コスト効率"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                💰 コスト効率
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                初期投資を抑え、在庫リスクなしで事業を開始できます。
              </p>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            background: '#ffffff',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
              小ロット対応の強み
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ef4444', marginBottom: '1rem' }}>
                  リスク最小化
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  大量生産前のテストマーケティングが可能。市場の反応を見てから本格展開できるため、
                  在庫リスクを大幅に削減できます。
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ef4444', marginBottom: '1rem' }}>
                  スピード対応
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  少量生産のため、大量生産と比べて圧倒的に短い納期を実現。
                  急な需要にも柔軟に対応いたします。
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💡</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ef4444', marginBottom: '1rem' }}>
                  柔軟性
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  デザイン変更や仕様調整も小ロットなら気軽に実施可能。
                  完璧な商品を作り上げるまで何度でも調整できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Minimum Lot Sizes */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            最小ロット数
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { category: 'Tシャツ・カットソー', minLot: '1枚〜', icon: '👕', leadTime: '3-5営業日' },
              { category: 'ポロシャツ', minLot: '1枚〜', icon: '👔', leadTime: '5-7営業日' },
              { category: 'パーカー・スウェット', minLot: '1枚〜', icon: '🧥', leadTime: '7-10営業日' },
              { category: 'ジャケット・アウター', minLot: '1枚〜', icon: '🧥', leadTime: '10-14営業日' },
              { category: 'パンツ・ボトムス', minLot: '1枚〜', icon: '👖', leadTime: '7-10営業日' },
              { category: 'バッグ・小物', minLot: '1個〜', icon: '👜', leadTime: '5-7営業日' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '2px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                  {item.category}
                </h3>
                <div style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {item.minLot}
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  納期: {item.leadTime}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            活用シーン
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: '🎯 テストマーケティング',
                description: '新商品のアイデアを少量で試作し、市場の反応を確認。売れ行きが良ければ本格展開へ。',
                example: '例：新デザインのTシャツを10枚製作してECサイトでテスト販売'
              },
              {
                title: '🏢 イベント・展示会用',
                description: '展示会やイベント用の限定グッズ、ノベルティ制作に最適。',
                example: '例：展示会用のオリジナルポロシャツを30枚製作'
              },
              {
                title: '🎁 ギフト・記念品',
                description: '会社の周年記念、チーム用ユニフォームなど、特別な用途に。',
                example: '例：チーム用のオリジナルパーカーを15枚製作'
              },
              {
                title: '🛍️ 限定商品',
                description: 'プレミアム感のある限定商品として、希少性を演出。',
                example: '例：限定カラーのジャケットを5枚のみ製作'
              },
              {
                title: '🔄 追加生産',
                description: '在庫切れ商品の緊急補充や、サイズ・カラー追加に。',
                example: '例：人気商品のLサイズのみ20枚追加製作'
              },
              {
                title: '💼 サンプル作成',
                description: '営業用サンプル、商談用見本の製作に。',
                example: '例：営業用サンプルとして各サイズ1枚ずつ製作'
              }
            ].map((useCase, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                  {useCase.title}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {useCase.description}
                </p>
                <div style={{
                  background: '#f0f9ff',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #0ea5e9',
                  fontSize: '0.875rem',
                  color: '#0c4a6e'
                }}>
                  {useCase.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            小ロット価格表
          </h2>
          <div style={{
            background: '#f8fafc',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#2563eb', color: '#ffffff' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderRadius: '8px 0 0 0' }}>商品カテゴリ</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>1-9枚</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>10-29枚</th>
                    <th style={{ padding: '1rem', textAlign: 'center', borderRadius: '0 8px 0 0' }}>30-99枚</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { category: 'Tシャツ・カットソー', prices: ['¥1,200', '¥1,000', '¥850'] },
                    { category: 'ポロシャツ', prices: ['¥1,800', '¥1,500', '¥1,300'] },
                    { category: 'パーカー・スウェット', prices: ['¥2,800', '¥2,400', '¥2,100'] },
                    { category: 'ジャケット・アウター', prices: ['¥4,500', '¥4,000', '¥3,700'] }
                  ].map((row, index) => (
                    <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>{row.category}</td>
                      {row.prices.map((price, priceIndex) => (
                        <td key={priceIndex} style={{ padding: '1rem', textAlign: 'center', color: '#059669', fontWeight: '600' }}>
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ 
              marginTop: '1.5rem', 
              textAlign: 'center', 
              color: '#6b7280', 
              fontSize: '0.875rem' 
            }}>
              ※基本価格です。プリント・刺繍代は別途。素材・デザインにより価格は変動いたします。
            </p>
          </div>
        </section>

        {/* Process */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            簡単4ステップ
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: 'お問い合わせ', desc: 'ご希望をお聞かせください', icon: '📞' },
              { step: '02', title: 'お見積り', desc: '最適なプランをご提案', icon: '💰' },
              { step: '03', title: '製作開始', desc: '迅速に製作を開始', icon: '🏭' },
              { step: '04', title: 'お届け', desc: 'ご指定の場所へお届け', icon: '📦' }
            ].map((process, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  margin: '0 auto 1rem',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                }}>
                  {process.step}
                </div>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {process.icon}
                </div>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                  {process.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {process.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
        }}>
          {/* Animated background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            animation: 'shimmer 3s infinite'
          }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            小ロットから始めてみませんか？
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            1枚からでも丁寧に対応いたします。<br />
            まずはお気軽にご相談ください。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link href="/support/contact">
              <NeuroButton 
                mood="urgency" 
                size="large" 
                variant="secondary"
                style={{
                  background: '#ffffff',
                  color: '#ef4444',
                  border: '2px solid #ffffff'
                }}
              >
                今すぐ相談する
              </NeuroButton>
            </Link>
            <Link href="/services/oem">
              <NeuroButton 
                mood="trust" 
                size="large" 
                variant="accent"
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff'
                }}
              >
                OEMサービスも見る
              </NeuroButton>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#111827', color: '#ffffff', padding: '2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              APPAREL EC
            </h3>
          </Link>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
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