import { Metadata } from 'next'
import Link from 'next/link'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroButton, NeuroStyles } from '@/components/neuro/neuro-components'

export const metadata: Metadata = {
  title: 'お問い合わせ | APPAREL EC',
  description: 'アパレルECサービスに関するお問い合わせはこちら。OEM・ODM、小ロット対応、商品に関するご質問やご相談を承ります。専門スタッフが迅速に対応いたします。',
  keywords: 'お問い合わせ, 連絡先, OEM相談, 見積もり依頼, サポート',
}

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <UltraHeader />
      <NeuroStyles />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(79, 70, 229, 0.9) 100%)',
        color: '#ffffff',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
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
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.85) 0%, rgba(79, 70, 229, 0.85) 100%)',
          zIndex: 1
        }} />
        
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm40 0c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.2,
          zIndex: 2
        }} />
        
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 3,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Left content */}
          <div style={{ textAlign: 'left' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              お問い合わせ
            </h1>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.95,
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              ご質問・ご相談は何でもお気軽にお寄せください。<br />
              専門スタッフが迅速に対応いたします。
            </p>
            
            {/* Quick contact buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <NeuroButton 
                mood="dopamine" 
                size="large"
                style={{
                  background: '#ffffff',
                  color: '#6366f1',
                  border: 'none',
                  fontWeight: 'bold'
                }}
              >
                📞 電話で相談
              </NeuroButton>
              <NeuroButton 
                mood="trust" 
                size="large" 
                variant="secondary"
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff'
                }}
              >
                ✉️ メールで相談
              </NeuroButton>
            </div>
          </div>
          
          {/* Right side - Contact illustration */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Contact support image */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '100%',
              maxWidth: '400px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="お問い合わせサポート"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  💬 24時間受付
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  迅速・丁寧にサポート
                </div>
              </div>
            </div>
            
            {/* Response time indicators */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              width: '100%',
              maxWidth: '400px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>1日</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>回答目安</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>専門</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>スタッフ</div>
              </div>
            </div>
          </div>
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
                <NeuroButton 
                  mood="trust" 
                  size="large" 
                  variant="primary"
                  style={{
                    fontSize: '1.125rem',
                    padding: '1rem 3rem'
                  }}
                >
                  送信する
                </NeuroButton>
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
                  color: '#3b82f6',
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
          borderRadius: '20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
        }}>
          {/* Background effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            よくある質問もご確認ください
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            お急ぎの場合は、よくある質問で<br />
            解決方法が見つかるかもしれません。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link href="/support/faq">
              <NeuroButton 
                mood="trust" 
                size="large" 
                variant="secondary"
                style={{
                  background: '#ffffff',
                  color: '#6366f1',
                  border: '2px solid #ffffff'
                }}
              >
                よくある質問を見る
              </NeuroButton>
            </Link>
            <Link href="/support/shipping">
              <NeuroButton 
                mood="calm" 
                size="large" 
                variant="accent"
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #ffffff'
                }}
              >
                配送について
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