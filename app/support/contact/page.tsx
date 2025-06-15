'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroButton, NeuroStyles } from '@/components/neuro/neuro-components'

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  })
  
  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('お問い合わせを受け付けました。2営業日以内にご返信いたします。')
    setFormData({ name: '', email: '', category: '', message: '' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <UltraHeader />
      <NeuroStyles />

      {/* Hero Section */}
      <section style={{
        background: '#ef4444',
        color: '#ffffff',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
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
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: isMobile ? '2rem' : '3rem',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 3
        }}>
          {/* Left content */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              お問い合わせ
            </h1>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              ご質問・ご相談は何でもお気軽にお寄せください。<br />
              専門スタッフが迅速に対応いたします。
            </p>
            
            {/* Quick contact buttons */}
            <div style={{ 
              display: 'flex', 
              gap: isMobile ? '0.75rem' : '1rem', 
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'flex-start'
            }}>
              <NeuroButton 
                mood="dopamine" 
                size="large"
                style={{
                  background: '#ffffff',
                  color: '#ef4444',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                  minHeight: isMobile ? '48px' : 'auto'
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
                  border: '2px solid #ffffff',
                  fontWeight: '600',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  padding: isMobile ? '0.825rem 1.5rem' : '0.875rem 1.75rem',
                  minHeight: isMobile ? '48px' : 'auto'
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
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '100%',
              maxWidth: isMobile ? '100%' : '400px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="お問い合わせサポート"
                style={{
                  width: '100%',
                  height: isMobile ? '160px' : '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '1rem' : '0.9rem', marginBottom: '0.5rem' }}>
                  💬 24時間受付
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  迅速・丁寧にサポート
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* コンタクトフォームセクション */}
      <section style={{ 
        padding: isMobile ? '3rem 1rem' : '4rem 2rem', 
        background: '#f8fafc' 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'start'
          }}>
            {/* 左側：お問い合わせフォーム */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.5rem' : '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#111827',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                📝 お問い合わせフォーム
              </h2>

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    お名前 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem 1rem' : '0.75rem 1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: isMobile ? '1rem' : '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      minHeight: isMobile ? '48px' : 'auto'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem 1rem' : '0.75rem 1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: isMobile ? '1rem' : '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      minHeight: isMobile ? '48px' : 'auto'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    お問い合わせカテゴリ *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem 1rem' : '0.75rem 1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: isMobile ? '1rem' : '0.95rem',
                      outline: 'none',
                      background: '#ffffff',
                      cursor: 'pointer',
                      minHeight: isMobile ? '48px' : 'auto'
                    }}
                  >
                    <option value="">選択してください</option>
                    <option value="product">商品について</option>
                    <option value="order">注文について</option>
                    <option value="shipping">配送について</option>
                    <option value="oem">OEM・ODMについて</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    お問い合わせ内容 *
                  </label>
                  <textarea
                    required
                    rows={isMobile ? 4 : 5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="詳細な内容をお書きください..."
                    style={{
                      width: '100%',
                      padding: isMobile ? '0.875rem 1rem' : '0.75rem 1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: isMobile ? '1rem' : '0.95rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      lineHeight: '1.5'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                    minHeight: isMobile ? '48px' : 'auto',
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#dc2626'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ef4444'
                  }}
                >
                  📨 送信する
                </button>
              </form>
            </div>

            {/* 右側：お問い合わせ情報 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* 連絡先情報 */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: isMobile ? '1.5rem' : '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#111827'
                }}>
                  📞 連絡先情報
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: isMobile ? '0.95rem' : '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    営業時間
                  </div>
                  <div style={{ color: '#6b7280', fontSize: isMobile ? '1rem' : '0.95rem' }}>
                    平日 9:00 - 18:00<br />
                    土日祝日はお休みです
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: isMobile ? '0.95rem' : '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    お電話でのお問い合わせ
                  </div>
                  <div style={{ color: '#3b82f6', fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight: 'bold' }}>
                    0120-123-456
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? '0.95rem' : '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    メールでのお問い合わせ
                  </div>
                  <div style={{ color: '#3b82f6', fontSize: isMobile ? '1rem' : '1rem' }}>
                    info@apparel-ec.com
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: isMobile ? '1.5rem' : '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#111827'
                }}>
                  ❓ よくある質問
                </h3>
                <div style={{ fontSize: isMobile ? '1rem' : '0.95rem', color: '#6b7280', marginBottom: '1rem' }}>
                  お問い合わせの前に、よくある質問もご確認ください。
                </div>
                <Link 
                  href="/support/faq"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontSize: isMobile ? '0.95rem' : '1rem',
                    fontWeight: '600',
                    padding: isMobile ? '0.625rem 1rem' : '0.5rem 0.75rem',
                    border: '2px solid #3b82f6',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    minHeight: isMobile ? '44px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3b82f6'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#3b82f6'
                  }}
                >
                  FAQを見る →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer style={{ 
        background: '#111827', 
        color: '#ffffff', 
        padding: isMobile ? '1.5rem 1rem' : '2rem',
        textAlign: 'center'
      }}>
        <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
          <h3 style={{ 
            fontSize: isMobile ? '1.25rem' : '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem' 
          }}>
            APPAREL EC
          </h3>
        </Link>
        <p style={{ 
          color: '#9ca3af',
          fontSize: isMobile ? '0.875rem' : '1rem'
        }}>
          現代のライフスタイルに合わせたアパレルファッション
        </p>
      </footer>
    </div>
  )
}