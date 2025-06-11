export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#2563eb',
            margin: 0
          }}>
            APPAREL EC
          </h1>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              特徴
            </a>
            <a href="#testimonials" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              お客様の声
            </a>
            <a href="/products" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              商品一覧
            </a>
            <a href="/cart" style={{ 
              background: '#2563eb', 
              color: '#ffffff', 
              padding: '0.5rem 1rem', 
              borderRadius: '6px',
              textDecoration: 'none', 
              fontWeight: '500',
              transition: 'all 0.2s'
            }}>
              カート
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - CAB風 */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '4rem 3rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              color: '#1e293b'
            }}>
              アパレルブランドの
              <br />
              <span style={{ color: '#2563eb' }}>企画・製造・OEM</span>に
            </h1>
            <p style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#64748b',
              fontWeight: '500'
            }}>
              トレンド商品を1枚から、
            </p>
            <p style={{
              fontSize: '2rem',
              marginBottom: '3rem',
              color: '#dc2626',
              fontWeight: 'bold'
            }}>
              『欲しいときに欲しいぶんだけ』
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: '#eff6ff',
                color: '#1d4ed8',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                アパレルメーカー様
              </div>
              <div style={{
                background: '#f0fdf4',
                color: '#15803d',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                OEM/ODM企業様
              </div>
              <div style={{
                background: '#fef3c7',
                color: '#d97706',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                個人事業主様
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/products"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  background: '#2563eb',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.2s'
                }}
              >
                商品を見る
              </a>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  background: '#ffffff',
                  color: '#2563eb',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  border: '2px solid #2563eb',
                  transition: 'all 0.2s'
                }}
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3つの選ばれる理由セクション */}
      <section id="features" style={{ padding: '6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              選ばれる3つの理由
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              お客様に愛される理由があります
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '3rem' 
          }}>
            {[
              {
                number: '01',
                title: 'トレンドに沿ったアイテム群',
                description: '最新のファッショントレンドを反映した豊富な商品ラインナップ。市場のニーズに合わせて常にアップデートされるアイテムで、お客様のビジネスをサポートします。',
                icon: '📈',
                color: '#3b82f6'
              },
              {
                number: '02',
                title: '最短で当日出荷',
                description: '迅速な対応で最短当日出荷を実現。お急ぎのご注文にも柔軟に対応し、お客様のビジネスチャンスを逃しません。',
                icon: '🚀',
                color: '#10b981'
              },
              {
                number: '03',
                title: '在庫リスクを低減',
                description: '1枚からのオーダーが可能で、過剰在庫のリスクを大幅に削減。必要な分だけお求めいただけるため、効率的な事業運営を支援します。',
                icon: '💡',
                color: '#f59e0b'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: feature.color,
                  color: '#ffffff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.125rem'
                }}>
                  {feature.number}
                </div>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
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
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お客様の声セクション */}
      <section id="testimonials" style={{ 
        padding: '6rem 2rem', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              お客様の声
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              多くのお客様にご満足いただいています
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              {
                name: '田中様',
                company: 'アパレル小売店経営',
                comment: '小ロットから注文できるので、新しいデザインのテストマーケティングが気軽にできます。売れ筋が分かってから追加注文すれば在庫リスクがありません。',
                rating: 5
              },
              {
                name: '佐藤様',
                company: 'ECサイト運営者',
                comment: '当日出荷のスピード感が素晴らしい！お客様からの急な注文にも対応できるので、ビジネスチャンスを逃しません。品質も満足しています。',
                rating: 5
              },
              {
                name: '山田様',
                company: 'OEM企業',
                comment: 'トレンドを押さえた商品展開で、時代に合った提案ができています。営業の際の説得力も上がり、成約率が向上しました。',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  {'★'.repeat(testimonial.rating).split('').map((star, i) => (
                    <span key={i} style={{ color: '#fbbf24', fontSize: '1.25rem' }}>{star}</span>
                  ))}
                </div>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.6', 
                  color: '#374151',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.comment}"
                </p>
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                  <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                    {testimonial.name}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* おすすめ商品セクション */}
      <section style={{ padding: '6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '1rem' 
            }}>
              おすすめ商品
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              人気の高品質アパレルアイテムをご紹介
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              { name: 'トップス', icon: '👔', desc: 'Tシャツ・シャツなど', categoryId: '1' },
              { name: 'ボトムス', icon: '👖', desc: 'ジーンズ・パンツ・ショーツ', categoryId: '2' },
              { name: 'アウター', icon: '🧥', desc: 'ジャケット・コート', categoryId: '3' },
              { name: 'アクセサリー', icon: '👟', desc: 'シューズ・ベルトなど', categoryId: '4' }
            ].map(category => (
              <a
                key={category.name}
                href={`/products?category=${category.categoryId}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: '2px solid #e5e7eb',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    {category.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {category.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {category.desc}
                  </p>
                  <div style={{
                    background: '#2563eb',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'inline-block'
                  }}>
                    詳細を見る →
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="/products"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: '#2563eb',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.2s'
              }}
            >
              すべての商品を見る
            </a>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section id="contact" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem' 
          }}>
            今すぐ始めませんか？
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2.5rem',
            opacity: 0.9
          }}>
            高品質なアパレル商品を、必要な分だけ。<br />
            お気軽にお問い合わせください。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/products"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: '#ffffff',
                color: '#2563eb',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.2s'
              }}
            >
              商品カタログを見る
            </a>
            <a
              href="mailto:info@apparel-ec.com"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'transparent',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: '2px solid #ffffff',
                transition: 'all 0.2s'
              }}
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', color: '#ffffff', padding: '3rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                APPAREL EC
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
                現代のライフスタイルに合わせたプレミアムファッション
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Facebook</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Twitter</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Instagram</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>サービス</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>商品一覧</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>OEM・ODM</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>小ロット対応</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>サポート</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>よくある質問</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>お問い合わせ</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>配送について</a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid #374151', 
            paddingTop: '2rem',
            textAlign: 'center',
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