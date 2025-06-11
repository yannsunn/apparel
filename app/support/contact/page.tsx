import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ | APPAREL EC',
  description: 'アパレルECサービスに関するお問い合わせはこちら。OEM・ODM、小ロット対応、商品に関するご質問やご相談を承ります。専門スタッフが迅速に対応いたします。',
  keywords: 'お問い合わせ, 連絡先, OEM相談, 見積もり依頼, サポート',
}

export default function ContactPage() {
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
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
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
            お問い合わせ
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            ご質問・ご相談は何でもお気軽にお寄せください。<br />
            専門スタッフが迅速に対応いたします。
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Contact Form */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            background: '#ffffff',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
              お問い合わせフォーム
            </h2>
            <form style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  お問い合わせ種別 <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  background: '#ffffff'
                }}>
                  <option value="">選択してください</option>
                  <option value="general">一般的なお問い合わせ</option>
                  <option value="oem">OEM・ODMについて</option>
                  <option value="small-lot">小ロット対応について</option>
                  <option value="pricing">価格・見積もりについて</option>
                  <option value="quality">品質・仕様について</option>
                  <option value="shipping">配送・納期について</option>
                  <option value="support">サポート・アフターサービス</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                    会社名・屋号
                  </label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    placeholder="株式会社○○"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                    お名前 <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    placeholder="山田 太郎"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                    メールアドレス <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    placeholder="example@company.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                    お電話番号
                  </label>
                  <input
                    type="tel"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  お問い合わせ内容 <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="お問い合わせ内容を詳しくお書きください。&#10;・希望商品カテゴリ&#10;・想定数量&#10;・希望納期&#10;・その他ご要望など"
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <input
                    type="checkbox"
                    required
                    style={{ marginTop: '0.125rem' }}
                  />
                  <span>
                    <a href="#" style={{ color: '#2563eb', textDecoration: 'underline' }}>プライバシーポリシー</a>
                    に同意します <span style={{ color: '#dc2626' }}>*</span>
                  </span>
                </label>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    background: '#6366f1',
                    color: '#ffffff',
                    padding: '1rem 3rem',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 6px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  送信する
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Contact Information */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            その他のお問い合わせ方法
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: '📞',
                title: 'お電話でのお問い合わせ',
                content: '03-1234-5678',
                description: '営業時間：平日 9:00〜18:00（土日祝除く）',
                action: 'tel:03-1234-5678'
              },
              {
                icon: '✉️',
                title: 'メールでのお問い合わせ',
                content: 'info@apparel-ec.com',
                description: '24時間受付（返信は営業時間内）',
                action: 'mailto:info@apparel-ec.com'
              },
              {
                icon: '💬',
                title: 'チャットサポート',
                content: 'オンラインチャット',
                description: '平日 9:00〜17:00（リアルタイム対応）',
                action: '#'
              }
            ].map((contact, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {contact.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                  {contact.title}
                </h3>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#6366f1',
                  marginBottom: '0.5rem'
                }}>
                  <a href={contact.action} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {contact.content}
                  </a>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {contact.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Response Time */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0c4a6e', marginBottom: '1rem' }}>
              📅 回答までの目安時間
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#0c4a6e' }}>一般的なお問い合わせ</div>
                <div style={{ color: '#0369a1', fontSize: '0.875rem' }}>1営業日以内</div>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#0c4a6e' }}>見積もり依頼</div>
                <div style={{ color: '#0369a1', fontSize: '0.875rem' }}>2〜3営業日以内</div>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#0c4a6e' }}>技術的なご相談</div>
                <div style={{ color: '#0369a1', fontSize: '0.875rem' }}>3〜5営業日以内</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          color: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            よくある質問もご確認ください
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            お急ぎの場合は、よくある質問で<br />
            解決方法が見つかるかもしれません。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/support/faq"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#ffffff',
                color: '#6366f1',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.2s'
              }}
            >
              よくある質問を見る
            </Link>
            <Link
              href="/support/shipping"
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
              配送について
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