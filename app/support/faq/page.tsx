'use client'

import Link from 'next/link'
import UltraHeader from '@/components/layout/ultra-header'
import { NeuroButton, NeuroStyles } from '@/components/neuro/neuro-components'

export default function FAQPage() {
  const faqData = [
    {
      category: '🏭 OEM・ODMについて',
      questions: [
        {
          q: '最小ロット数はどのくらいですか？',
          a: '基本的に1枚から対応可能です。商品カテゴリーによって最適なロット数は異なりますが、小ロットでの製造も積極的に承っております。詳細は商品カテゴリーごとの価格表をご確認ください。'
        },
        {
          q: 'サンプル作成は可能ですか？',
          a: 'はい、可能です。サンプル作成は最短3営業日で対応いたします。サンプル代は本注文時に相殺いたしますので、実質無料でサンプルをご確認いただけます。'
        },
        {
          q: 'オリジナルデザインの持ち込みは可能ですか？',
          a: 'もちろん可能です。イラストレーター形式のデータが最適ですが、手描きのスケッチからでもデータ化いたします。デザイン製作費は別途お見積りいたします。'
        },
        {
          q: 'ブランドタグの取り付けは可能ですか？',
          a: 'はい、オリジナルブランドタグの製作・取り付けが可能です。織りネーム、プリントタグ等、ご要望に応じて対応いたします。'
        }
      ]
    },
    {
      category: '💰 価格・お支払いについて',
      questions: [
        {
          q: '価格表に記載されている以外の費用はかかりますか？',
          a: '基本的には表示価格以外の費用はかかりません。ただし、特殊な加工（刺繍、特殊プリント等）や送料は別途となります。お見積り時に全ての費用を明示いたします。'
        },
        {
          q: '支払い方法を教えてください。',
          a: '銀行振込、クレジットカード決済、代金引換に対応しております。法人様の場合は、月末締め翌月末払いの掛け売りも可能です。'
        },
        {
          q: 'キャンセルは可能ですか？',
          a: '製作開始前であればキャンセル可能です。製作開始後のキャンセルについては、進行状況により応相談とさせていただきます。'
        },
        {
          q: '数量による割引はありますか？',
          a: 'はい、ございます。100枚以上で5%、500枚以上で10%、1000枚以上で15%の数量割引を適用いたします。'
        }
      ]
    },
    {
      category: '📦 配送・納期について',
      questions: [
        {
          q: '配送料はいくらですか？',
          a: '全国一律880円です。10,000円以上のご注文で配送料無料となります。大口注文の場合は別途ご相談ください。'
        },
        {
          q: '納期はどのくらいかかりますか？',
          a: '商品により異なりますが、Tシャツ等の基本商品で3-5営業日、アウター類で7-14営業日が目安です。詳細は各商品ページをご確認ください。'
        },
        {
          q: '急ぎの対応は可能ですか？',
          a: '可能です。特急料金（商品代金の20%）をいただければ、通常納期の半分程度での対応が可能です。ただし、商品や時期により対応できない場合もございます。'
        },
        {
          q: '配送日時の指定はできますか？',
          a: 'はい、可能です。ヤマト運輸での配送となりますので、お届け日・時間帯の指定が可能です。'
        }
      ]
    },
    {
      category: '🔍 品質・仕様について',
      questions: [
        {
          q: '品質はどのように保証されていますか？',
          a: 'ISO9001認証を取得した自社工場及び提携工場で製造しており、厳格な品質管理体制を整えております。また、出荷前には必ず品質検査を実施しております。'
        },
        {
          q: '使用可能な素材を教えてください。',
          a: 'コットン、ポリエステル、ポリコットン混紡、ナイロン等、幅広い素材に対応しております。オーガニックコットンやリサイクル素材も取り扱っております。'
        },
        {
          q: 'サイズ展開はどうなっていますか？',
          a: 'XS〜XXLまでの基本サイズに加え、キッズサイズ、レディースサイズにも対応しております。特注サイズの製作も可能です。'
        },
        {
          q: 'プリント・刺繍の耐久性はどうですか？',
          a: '業界標準の耐洗濯性試験をクリアした加工方法を採用しております。通常の洗濯であれば50回以上の洗濯にも耐えうる品質を保証いたします。'
        }
      ]
    },
    {
      category: '📞 サポートについて',
      questions: [
        {
          q: '営業時間を教えてください。',
          a: '平日9:00〜18:00（土日祝日は休業）となっております。営業時間外のお問い合わせについては、翌営業日にご回答いたします。'
        },
        {
          q: '専任担当者は付きますか？',
          a: 'はい、ご注文時に専任担当者を配置いたします。企画から納品まで一貫してサポートいたしますので、安心してお任せください。'
        },
        {
          q: 'アフターサポートはありますか？',
          a: '納品後も1年間の品質保証を行っております。万が一品質に問題があった場合は、無償で交換または修理いたします。'
        },
        {
          q: '見学は可能ですか？',
          a: '工場見学も承っております。事前にご予約いただければ、製造現場をご見学いただけます。品質管理体制もご確認いただけます。'
        }
      ]
    }
  ]

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
          backgroundImage: 'url("https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
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
              よくある質問
            </h1>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              お客様からよくいただくご質問をまとめました。<br />
              解決しない場合はお気軽にお問い合わせください。
            </p>
            
            {/* Quick action buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
                  🙋‍♀️ 質問する
                </NeuroButton>
              </Link>
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
                📞 電話サポート
              </NeuroButton>
            </div>
          </div>
          
          {/* Right side - FAQ illustration */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* FAQ support image */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '100%',
              maxWidth: '400px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="よくある質問サポート"
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
                  ❓ 即座に解決
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  {faqData.reduce((total, cat) => total + cat.questions.length, 0)}の質問に回答
                </div>
              </div>
            </div>
            
            {/* Support stats */}
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
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>95%</div>
                <div style={{ fontSize: '0.8rem' }}>解決率</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>即時</div>
                <div style={{ fontSize: '0.8rem' }}>回答</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section style={{ padding: '2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#111827' }}>
            カテゴリから探す
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {faqData.map((category, index) => (
              <a
                key={index}
                href={`#category-${index}`}
                style={{
                  background: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  color: '#3b82f6',
                  border: '2px solid #3b82f6',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                {category.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* サポート画像セクション */}
      <section style={{ padding: '3rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#111827' }}>
            サポート体制
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="専門チーム"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                専門チームがサポート
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                経験豊富な専門スタッフが、お客様のご質問に迅速かつ的確にお答えします。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="24時間サポート"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                24時間受付
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                いつでもお問い合わせいただけます。営業時間外でも翌営業日には必ずご回答いたします。
              </p>
            </div>
            
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="品質保証"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                品質保証
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                徹底した品質管理により、お客様にご満足いただける製品をお届けします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        {faqData.map((category, categoryIndex) => (
          <section key={categoryIndex} id={`category-${categoryIndex}`} style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#111827',
              paddingBottom: '1rem',
              borderBottom: '2px solid #e5e7eb'
            }}>
              {category.category}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {category.questions.map((faq, questionIndex) => (
                <div
                  key={questionIndex}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{
                    background: '#f8fafc',
                    padding: '1.5rem',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#111827',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        background: '#3b82f6',
                        color: '#ffffff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        Q
                      </span>
                      {faq.q}
                    </h3>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{
                      color: '#374151',
                      lineHeight: '1.6',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        background: '#10b981',
                        color: '#ffffff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        A
                      </span>
                      <span>{faq.a}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Contact CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#ffffff',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center',
          marginTop: '4rem'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            問題は解決しましたか？
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            ご不明な点がございましたら、<br />
            お気軽にお問い合わせください。
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/support/contact">
              <NeuroButton 
                mood="trust" 
                size="large" 
                variant="secondary"
                style={{
                  background: '#ffffff',
                  color: '#f59e0b',
                  border: '2px solid #ffffff'
                }}
              >
                お問い合わせ
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
            現代のライフスタイルに合わせたアパレルファッション
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
      
      <style jsx>{`
        @media (max-width: 768px) {
          footer {
            padding: 1.5rem 1rem !important;
          }
          
          footer h3 {
            font-size: 1.25rem !important;
          }
          
          footer p {
            font-size: 0.875rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          /* フッターリンクがある場合の対応 */
          footer > div > div {
            gap: 1rem !important;
            flex-direction: column !important;
          }
          
          footer a {
            padding: 0.5rem !important;
            min-height: 44px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 640px) {
          footer {
            padding: 1rem 0.75rem !important;
          }
        }
      `}</style>
    </div>
  )
}