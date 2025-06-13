'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroButton, NeuroStyles } from '@/components/neuro/neuro-components'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#ffffff'
    }}>
      <UltraHeader />
      <NeuroStyles />

      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)',
        color: '#ffffff',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh',
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
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
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%)',
          zIndex: 1
        }} />
        
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Left content */}
          <div style={{ textAlign: 'left' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}>
              プレミアム<br />
              アパレルコレクション
            </h1>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.95,
              marginBottom: '2rem',
              lineHeight: '1.6',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'
            }}>
              最高品質の素材と革新的なデザインで、<br />
              あなたのスタイルを完璧に表現します。
            </p>
            
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <Link href="/products">
                <NeuroButton 
                  mood="dopamine" 
                  size="large"
                  style={{
                    background: '#ffffff',
                    color: '#ef4444',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '1.2rem',
                    padding: '1rem 2rem'
                  }}
                >
                  コレクションを見る
                </NeuroButton>
              </Link>
              <Link href="/services/oem">
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
                    padding: '0.75rem 1.5rem'
                  }}
                >
                  OEMサービス
                </NeuroButton>
              </Link>
            </div>
            
            {/* Stats */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '1.5rem 2rem',
              display: 'inline-block',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              position: 'relative',
              zIndex: 5
            }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                🏆 信頼の実績
              </div>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                累計販売実績 50,000点以上 | 顧客満足度 99.2%
              </div>
            </div>
          </div>
          
          {/* Right side - Hero image */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            alignItems: 'center'
          }}>
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
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="プレミアムアパレル"
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
                  ✨ 最高品質保証
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  厳選された素材とデザイン
                </div>
              </div>
            </div>
            
            {/* Quick stats */}
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
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>1枚〜</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>小ロット対応</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>即日</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>対応可能</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* プロフェッショナル画像セクション */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: '#ffffff'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#111827'
            }}>
              プロフェッショナルな製造環境
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              最新設備と熟練技術で、高品質なアパレル製品を製造しています
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="最新製造工場"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  最新製造工場
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6'
                }}>
                  ISO認証取得工場で品質管理を徹底し、安定した製品をお届けします。
                </p>
              </div>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="高品質素材"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  厳選された素材
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6'
                }}>
                  世界各地から厳選した高品質素材を使用し、耐久性と美しさを追求します。
                </p>
              </div>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="専門チーム"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  専門チーム
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6'
                }}>
                  経験豊富な専門スタッフが、企画から納品まで責任を持ってサポートします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* サービス特徴セクション */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#111827'
            }}>
              選ばれる理由
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              プロフェッショナルなサービスで、お客様のビジネスを成功に導きます
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              {
                icon: '🎯',
                title: 'プレミアム品質',
                description: '厳選された素材と最新技術で、最高品質の製品をお届けします。',
                color: '#3b82f6'
              },
              {
                icon: '⚡',
                title: 'スピード対応',
                description: '1枚から対応可能な小ロット生産で、迅速にご要望にお応えします。',
                color: '#10b981'
              },
              {
                icon: '💎',
                title: 'カスタマイズ',
                description: 'お客様のブランドに合わせた完全カスタマイズが可能です。',
                color: '#f59e0b'
              },
              {
                icon: '🤝',
                title: '専任サポート',
                description: '専門スタッフが企画から納品まで一貫してサポートします。',
                color: '#ef4444'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  color: feature.color
                }}>
                  {feature.title}
                </h3>
                
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div style={{
            textAlign: 'center',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '3rem 2rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#111827'
            }}>
              まずはお気軽にご相談ください
            </h3>
            
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              専門スタッフがお客様のご要望を詳しくお聞きし、最適なソリューションをご提案します。
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/support/contact">
                <NeuroButton 
                  mood="trust" 
                  size="large"
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    padding: '0.75rem 1.5rem'
                  }}
                >
                  お問い合わせ
                </NeuroButton>
              </Link>
              <Link href="/services/small-lot">
                <NeuroButton 
                  mood="calm" 
                  size="large" 
                  variant="secondary"
                  style={{
                    background: 'transparent',
                    color: '#3b82f6',
                    border: '2px solid #3b82f6',
                    fontWeight: '600',
                    fontSize: '1rem',
                    padding: '0.75rem 1.5rem'
                  }}
                >
                  小ロット対応
                </NeuroButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer style={{ 
        background: '#111827',
        color: '#ffffff', 
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem'
            }}>
              APPAREL EC
            </h3>
          </Link>
          <p style={{ 
            color: '#9ca3af', 
            marginBottom: '2rem'
          }}>
            現代のライフスタイルに合わせたプレミアムファッション
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            {[
              { href: '/products', label: '商品一覧' },
              { href: '/services/oem', label: 'OEMサービス' },
              { href: '/services/small-lot', label: '小ロット対応' },
              { href: '/support/contact', label: 'お問い合わせ' }
            ].map((link, index) => (
              <Link key={link.href} href={link.href} style={{ 
                color: '#d1d5db',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}>
                {link.label}
              </Link>
            ))}
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
      
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}