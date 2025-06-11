import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '配送について | APPAREL EC',
  description: 'アパレルECサービスの配送に関する詳細情報。配送料、配送エリア、納期、お届け方法について詳しくご案内いたします。',
  keywords: '配送, 送料, 納期, お届け, ヤマト運輸, 配送エリア',
}

export default function ShippingPage() {
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
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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
            配送について
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            安心・安全・迅速にお届けいたします。<br />
            配送に関する詳細情報をご確認ください。
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Shipping Overview */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            background: '#ffffff',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
              配送サービス概要
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {[
                {
                  icon: '🚚',
                  title: '配送業者',
                  content: 'ヤマト運輸',
                  description: '信頼性の高い宅急便でお届け'
                },
                {
                  icon: '📦',
                  title: '配送エリア',
                  content: '全国対応',
                  description: '離島・一部地域も配送可能'
                },
                {
                  icon: '💰',
                  title: '配送料',
                  content: '全国一律880円',
                  description: '10,000円以上で送料無料'
                },
                {
                  icon: '⏰',
                  title: '配送時間',
                  content: '時間指定可能',
                  description: '午前・午後・夜間から選択'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: '#f8fafc'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                    {item.title}
                  </h3>
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#059669',
                    marginBottom: '0.5rem'
                  }}>
                    {item.content}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Rates */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            配送料金
          </h2>
          <div style={{
            background: '#f8fafc',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid #059669',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#059669', marginBottom: '1rem' }}>
                  標準配送
                </h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                  ¥880
                </div>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  全国一律（離島・一部地域含む）
                </p>
                <div style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  ¥10,000以上で送料無料
                </div>
              </div>
              <div style={{
                background: '#ffffff',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid #f59e0b',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f59e0b', marginBottom: '1rem' }}>
                  特急配送
                </h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                  ¥1,500
                </div>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  最短翌日お届け
                </p>
                <div style={{
                  background: '#fef3c7',
                  color: '#d97706',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  14時までの注文で翌日配送
                </div>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
            ※沖縄・離島の場合は、追加料金をいただく場合がございます。
          </p>
        </section>

        {/* Delivery Time */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            お届け時間指定
          </h2>
          <div style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {[
                { time: '午前中', period: '8:00〜12:00' },
                { time: '14時〜16時', period: '14:00〜16:00' },
                { time: '16時〜18時', period: '16:00〜18:00' },
                { time: '18時〜20時', period: '18:00〜20:00' },
                { time: '19時〜21時', period: '19:00〜21:00' }
              ].map((slot, index) => (
                <div
                  key={index}
                  style={{
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                    {slot.time}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {slot.period}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ 
              marginTop: '1.5rem', 
              textAlign: 'center', 
              color: '#6b7280', 
              fontSize: '0.875rem' 
            }}>
              ※配送地域により、一部時間指定をお受けできない場合がございます。
            </p>
          </div>
        </section>

        {/* Lead Times */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            商品別納期
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
                  <tr style={{ background: '#059669', color: '#ffffff' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderRadius: '8px 0 0 0' }}>商品カテゴリ</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>在庫商品</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>受注生産</th>
                    <th style={{ padding: '1rem', textAlign: 'center', borderRadius: '0 8px 0 0' }}>特急対応</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { category: 'Tシャツ・カットソー', stock: '1〜2営業日', custom: '3〜5営業日', express: '当日〜翌日' },
                    { category: 'ポロシャツ', stock: '1〜2営業日', custom: '5〜7営業日', express: '翌日〜2日' },
                    { category: 'パーカー・スウェット', stock: '2〜3営業日', custom: '7〜10営業日', express: '2〜3日' },
                    { category: 'ジャケット・アウター', stock: '2〜3営業日', custom: '10〜14営業日', express: '3〜5日' },
                    { category: 'ボトムス', stock: '2〜3営業日', custom: '7〜10営業日', express: '2〜3日' },
                    { category: 'アクセサリー', stock: '1〜2営業日', custom: '5〜7営業日', express: '当日〜翌日' }
                  ].map((row, index) => (
                    <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>{row.category}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#059669', fontWeight: '500' }}>
                        {row.stock}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#0ea5e9', fontWeight: '500' }}>
                        {row.custom}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#f59e0b', fontWeight: '500' }}>
                        {row.express}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                📝 納期に関する注意事項
              </h4>
              <ul style={{ color: '#6b7280', fontSize: '0.875rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>土日祝日は営業日に含まれません</li>
                <li>繁忙期（年末年始、GW等）は納期が延長される場合があります</li>
                <li>特急対応は別途料金（商品代金の20%）が発生します</li>
                <li>大量注文の場合は別途ご相談ください</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Packaging */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            梱包について
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: '📦',
                title: '環境配慮包装',
                description: 'リサイクル可能な材料を使用した環境に優しい梱包材を採用。商品を安全に保護しながら環境負荷を軽減しています。'
              },
              {
                icon: '🛡️',
                title: '丁寧な梱包',
                description: '商品の特性に応じて最適な梱包方法を選択。シワや汚れから商品を守り、お客様にベストコンディションでお届けします。'
              },
              {
                icon: '🏷️',
                title: 'ブランド包装',
                description: 'OEMのお客様には、オリジナルブランドの包装材での梱包も承ります。ブランドイメージを大切にしたお届けが可能です。'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center'
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

        {/* Tracking */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            background: '#ffffff',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
              📍 配送状況の確認
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              {[
                { step: '1', title: '注文確定', desc: 'ご注文を承りました' },
                { step: '2', title: '商品準備', desc: '商品の準備を開始' },
                { step: '3', title: '発送完了', desc: '追跡番号をお知らせ' },
                { step: '4', title: 'お届け', desc: 'ご指定の場所へお届け' }
              ].map((process, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    background: '#059669',
                    color: '#ffffff',
                    width: '50px',
                    height: '50px',
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
                </div>
              ))}
            </div>
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #16a34a',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <p style={{ color: '#15803d', fontWeight: '600', marginBottom: '0.5rem' }}>
                🔍 追跡サービス
              </p>
              <p style={{ color: '#166534', fontSize: '0.875rem' }}>
                商品発送後、ヤマト運輸の追跡番号をメールでお知らせいたします。<br />
                ヤマト運輸公式サイトから配送状況をリアルタイムでご確認いただけます。
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            配送に関するご質問はありませんか？
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            お気軽にお問い合わせください。<br />
            専門スタッフが丁寧にお答えいたします。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/support/contact"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#ffffff',
                color: '#059669',
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
              href="/support/faq"
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
              よくある質問
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