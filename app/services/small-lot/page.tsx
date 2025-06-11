import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '小ロット対応サービス | APPAREL EC',
  description: '1枚から対応可能な小ロット製造サービス。在庫リスクを最小限に抑え、テストマーケティングに最適。迅速な対応でビジネスチャンスを逃しません。',
  keywords: '小ロット, 少量生産, テストマーケティング, 在庫リスク, 1枚から',
}

export default function SmallLotPage() {
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
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
            小ロット対応サービス
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            1枚から始める新しいビジネス。<br />
            在庫リスクを最小限に抑えて、アイデアを形にしませんか？
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
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
              小ロット対応の強み
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem' }}>
                  リスク最小化
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  大量生産前のテストマーケティングが可能。市場の反応を見てから本格展開できるため、
                  在庫リスクを大幅に削減できます。
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem' }}>
                  スピード対応
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  少量生産のため、大量生産と比べて圧倒的に短い納期を実現。
                  急な需要にも柔軟に対応いたします。
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💡</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10b981', marginBottom: '1rem' }}>
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
                  background: '#10b981',
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
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            小ロットから始めてみませんか？
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            1枚からでも丁寧に対応いたします。<br />
            まずはお気軽にご相談ください。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/support/contact"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#ffffff',
                color: '#10b981',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.2s'
              }}
            >
              今すぐ相談する
            </Link>
            <Link
              href="/services/oem"
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
              OEMサービスも見る
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