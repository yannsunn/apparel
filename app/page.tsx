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
        zIndex: 40
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            margin: 0
          }}>
            APPAREL EC
          </h1>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="/products" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              商品
            </a>
            <a href="/cart" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              カート
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            プレミアムファッション
            <br />
            <span style={{ color: '#fbbf24' }}>新たな定義</span>
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2.5rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            現代のライフスタイルに合わせて厳選された高品質アパレルコレクションをご覧ください。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/products"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#fbbf24',
                color: '#111827',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem'
              }}
            >
              今すぐショッピング
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '4rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              カテゴリーから探す
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              お探しの商品がきっと見つかります
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
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
                  background: '#f9fafb',
                  padding: '2rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {category.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {category.name}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {category.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', color: '#ffffff', padding: '2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              APPAREL EC
            </h3>
            <p style={{ color: '#9ca3af' }}>
              現代のライフスタイルに合わせたプレミアムファッション
            </p>
          </div>
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