import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'OEM・ODMサービス | APPAREL EC',
  description: 'アパレルブランドの企画・製造・OEMサービス。1枚から対応可能な柔軟性と迅速な納期で、お客様のビジネスを強力にサポートします。',
  keywords: 'OEM, ODM, アパレル製造, ブランド企画, 小ロット対応',
}

export default function OEMPage() {
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
          <Link href="/" style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#2563eb',
            textDecoration: 'none'
          }}>
            APPAREL EC
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              ホーム
            </Link>
            <Link href="/products" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500' }}>
              商品一覧
            </Link>
            <Link href="/cart" style={{ 
              background: '#2563eb', 
              color: '#ffffff', 
              padding: '0.5rem 1rem', 
              borderRadius: '6px',
              textDecoration: 'none', 
              fontWeight: '500'
            }}>
              カート
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: '#ffffff',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            OEM・ODMサービス
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            あなたのブランドを形にします。企画から製造まで、<br />
            トータルサポートでビジネスを成功に導きます。
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Service Overview */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            background: '#ffffff',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
              OEM・ODMサービスとは
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2563eb', marginBottom: '1rem' }}>
                  🏭 OEM（受託製造）
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  お客様のデザイン・仕様書に基づいて、高品質なアパレル製品を製造いたします。
                  ブランドタグやオリジナルパッケージングも対応可能です。
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2563eb', marginBottom: '1rem' }}>
                  💡 ODM（企画・設計・製造）
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  商品企画から設計、製造まで一貫してサポート。
                  市場トレンドを反映した魅力的な商品を共同開発いたします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            サービスの特徴
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: '📏',
                title: '完全カスタマイズ対応',
                description: 'サイズ、カラー、素材、デザインまで、お客様のご要望に合わせて完全カスタマイズ。ブランドイメージを忠実に再現します。'
              },
              {
                icon: '⚡',
                title: '短納期対応',
                description: '企画から製造まで最短2週間。サンプル作成は最短3営業日で対応いたします。'
              },
              {
                icon: '🔢',
                title: '小ロット対応',
                description: '最少1枚から製造可能。大量生産前のテストマーケティングに最適です。'
              },
              {
                icon: '🎯',
                title: '品質保証',
                description: 'ISO認証工場での製造により、安定した品質を保証。厳格な品質管理体制でお届けします。'
              },
              {
                icon: '💰',
                title: '透明な価格設定',
                description: '数量に応じた明確な価格体系。隠れたコストは一切なく、安心してご利用いただけます。'
              },
              {
                icon: '🤝',
                title: '専任担当制',
                description: '専任の担当者が企画から納品まで一貫してサポート。きめ細かいサービスを提供します。'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '0.875rem' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Flow */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            製造フロー
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            alignItems: 'center'
          }}>
            {[
              { step: '01', title: 'お問い合わせ', desc: 'ご要望をヒアリング' },
              { step: '02', title: '企画・提案', desc: 'デザイン・仕様提案' },
              { step: '03', title: 'サンプル作成', desc: '試作品の製作' },
              { step: '04', title: '量産開始', desc: '本格的な製造開始' },
              { step: '05', title: '品質検査', desc: '厳格な品質チェック' },
              { step: '06', title: '納品', desc: 'ご指定場所へお届け' }
            ].map((process, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  margin: '0 auto 1rem'
                }}>
                  {process.step}
                </div>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                  {process.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {process.desc}
                </p>
                {index < 5 && (
                  <div style={{
                    width: '100%',
                    height: '2px',
                    background: '#e5e7eb',
                    margin: '1rem 0',
                    display: 'none'
                  }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Price Guide */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            価格ガイド
          </h2>
          <div style={{
            background: '#f8fafc',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {[
                { category: 'Tシャツ・カットソー', price: '¥800〜', quantity: '100枚〜' },
                { category: 'ポロシャツ', price: '¥1,200〜', quantity: '50枚〜' },
                { category: 'パーカー・スウェット', price: '¥1,800〜', quantity: '30枚〜' },
                { category: 'ジャケット・アウター', price: '¥3,500〜', quantity: '20枚〜' }
              ].map((item, index) => (
                <div key={index} style={{
                  background: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                    {item.category}
                  </h4>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.25rem' }}>
                    {item.price}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ 
              marginTop: '2rem', 
              textAlign: 'center', 
              color: '#6b7280', 
              fontSize: '0.875rem' 
            }}>
              ※価格は参考価格です。素材・デザイン・数量により変動いたします。詳細はお問い合わせください。
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            まずはお気軽にご相談ください
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            専門スタッフがお客様のご要望を詳しくお聞きし、<br />
            最適なソリューションをご提案いたします。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/support/contact"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#ffffff',
                color: '#2563eb',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.2s'
              }}
            >
              お問い合わせ
            </Link>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
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
              商品サンプルを見る
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