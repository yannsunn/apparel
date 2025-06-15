/**
 * 🚀 ULTRA HEADER COMPONENT
 * 完璧に統一された限界突破ヘッダー
 * 全ページで一貫したナビゲーション体験を提供
 */

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useOptimisticCart } from '@/lib/hooks/use-optimistic-cart'
import { UltraSync } from '@/lib/ultra-sync'

interface UltraHeaderProps {
  showCartIndicator?: boolean
  theme?: 'light' | 'dark'
  transparent?: boolean
}

export default function UltraHeader({ 
  showCartIndicator = true, 
  theme = 'light',
  transparent = false 
}: UltraHeaderProps) {
  const pathname = usePathname()
  const { totalItems } = useOptimisticCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentCartCount, setCurrentCartCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // スクロール状態監視
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // カート数監視
  useEffect(() => {
    setCurrentCartCount(totalItems())
  }, [totalItems])

  // ページ変更を記録
  useEffect(() => {
    UltraSync.NavigationSync.setCurrentPage(pathname)
    UltraSync.Monitor.measurePageLoad(pathname)
  }, [pathname])

  // 動的ヘッダースタイル - 薄型対応
  const headerStyle = {
    ...UltraSync.Styles.header,
    background: transparent && !isScrolled 
      ? 'rgba(255,255,255,0.1)' 
      : theme === 'light' 
        ? 'rgba(255,255,255,0.95)' 
        : 'rgba(17,24,39,0.95)',
    zIndex: 50,
    pointerEvents: 'auto' as const,
    borderBottom: transparent && !isScrolled 
      ? 'none' 
      : `1px solid ${theme === 'light' ? 'rgba(226, 232, 240, 0.8)' : 'rgba(75, 85, 99, 0.3)'}`,
    boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
    padding: isMobile ? '0.5rem 1rem' : '1rem 2rem',
    height: isMobile ? 'auto' : 'auto',
    minHeight: isMobile ? '60px' : '80px'
  }

  const navStyle = {
    ...UltraSync.Styles.layout,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative' as const
  }

  const logoStyle = {
    fontSize: isMobile ? '1.25rem' : UltraSync.Brand.typography.fontSize['2xl'],
    fontWeight: UltraSync.Brand.typography.fontWeight.extrabold,
    color: UltraSync.Brand.colors.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease'
  }

  const navLinksStyle = {
    display: isMobile ? (isMenuOpen ? 'flex' : 'none') : 'flex',
    gap: isMobile ? '0.75rem' : '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    flexDirection: isMobile ? ('column' as const) : ('row' as const),
    position: isMobile ? ('absolute' as const) : ('relative' as const),
    top: isMobile ? '100%' : 'auto',
    left: isMobile ? '0' : 'auto',
    right: isMobile ? '0' : 'auto',
    background: isMobile ? 'rgba(255,255,255,0.98)' : 'transparent',
    padding: isMobile ? '1rem' : '0',
    borderRadius: isMobile ? '0 0 8px 8px' : '0',
    boxShadow: isMobile && isMenuOpen ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
    backdropFilter: isMobile ? 'blur(10px)' : 'none'
  }

  const linkStyle = (isActive: boolean) => ({
    color: isActive 
      ? UltraSync.Brand.colors.primary
      : theme === 'light' ? '#374151' : '#d1d5db',
    textDecoration: 'none',
    fontWeight: isActive 
      ? UltraSync.Brand.typography.fontWeight.semibold
      : UltraSync.Brand.typography.fontWeight.medium,
    fontSize: isMobile ? '1rem' : UltraSync.Brand.typography.fontSize.sm,
    padding: isMobile ? '0.75rem 1rem' : '0.5rem 0.75rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    cursor: 'pointer',
    pointerEvents: 'auto' as const,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap' as const,
    minWidth: 'fit-content'
  })

  const cartStyle = {
    position: 'relative' as const,
    color: theme === 'light' ? '#374151' : '#d1d5db',
    textDecoration: 'none',
    fontWeight: UltraSync.Brand.typography.fontWeight.semibold,
    padding: isMobile ? '0.75rem 1rem' : '0.5rem 0.75rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    cursor: 'pointer',
    pointerEvents: 'auto' as const,
    fontSize: isMobile ? '1rem' : UltraSync.Brand.typography.fontSize.sm,
    whiteSpace: 'nowrap' as const,
    minWidth: 'fit-content'
  }

  const badgeStyle = {
    position: 'absolute' as const,
    top: '-2px',
    right: '-2px',
    background: UltraSync.Brand.colors.secondary,
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: UltraSync.Brand.typography.fontSize.xs,
    fontWeight: UltraSync.Brand.typography.fontWeight.bold,
    animation: currentCartCount > 0 ? 'pulse 0.5s ease-in-out' : 'none'
  }

  // ナビゲーションアイテムの生成
  const renderNavItem = (item: any) => {
    const isActive = pathname === item.href || 
                    (item.submenu && Array.isArray(item.submenu) && item.submenu.some((sub: any) => pathname === sub.href))

    if (item.special === 'cart' && showCartIndicator) {
      return (
        <Link 
          key={item.href}
          href={item.href} 
          style={cartStyle}
          onClick={(e) => {
            e.preventDefault()
            window.location.href = item.href
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
            e.currentTarget.style.color = UltraSync.Brand.colors.primary
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = theme === 'light' ? '#374151' : '#d1d5db'
          }}
        >
          <span>{item.icon}</span>
          {item.label}
          {currentCartCount > 0 && (
            <span style={badgeStyle}>
              {currentCartCount}
            </span>
          )}
        </Link>
      )
    }

    return (
      <Link 
        key={item.href}
        href={item.href} 
        style={linkStyle(isActive)}
        onClick={(e) => {
          e.preventDefault()
          window.location.href = item.href
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
            e.currentTarget.style.color = UltraSync.Brand.colors.primary
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = theme === 'light' ? '#374151' : '#d1d5db'
          }
        }}
        title={item.description}
      >
        <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
        {item.label}
        {isActive && (
          <span style={{
            position: 'absolute',
            bottom: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '4px',
            background: UltraSync.Brand.colors.primary,
            borderRadius: '50%'
          }} />
        )}
      </Link>
    )
  }

  return (
    <>
      <header style={headerStyle} role="banner">
        <nav style={navStyle} role="navigation" aria-label="メインナビゲーション">
          {/* ロゴ */}
          <Link 
            href="/" 
            style={logoStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{UltraSync.Brand.logo}</span>
            {UltraSync.Brand.name}
          </Link>
          
          {/* モバイルメニューボタン */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: UltraSync.Brand.colors.primary,
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="メニューを開く"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          )}

          {/* ナビゲーション */}
          <div style={navLinksStyle}>
            {(UltraSync.Navigation.main as unknown as any[])
              .filter((item: any) => item.special !== 'cart')
              .slice(0, isMobile ? 3 : 4) // モバイルでさらに削減
              .map(renderNavItem)
            }
            
            {/* カート（常に最後に表示） */}
            {showCartIndicator && renderNavItem(
              (UltraSync.Navigation.main as unknown as any[]).find((item: any) => item.special === 'cart')!
            )}
          </div>
        </nav>
      </header>

      {/* CSS アニメーション＆薄型ヘッダー対応 */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        /* 薄型ヘッダー対応 */
        header {
          transition: all 0.3s ease !important;
        }
        
        /* モバイルメニューアニメーション */
        header nav > div:last-child {
          animation: ${isMenuOpen && isMobile ? 'slideDown 0.3s ease' : 'none'};
        }
        
        /* モバイル対応 */
        @media (max-width: 768px) {
          header {
            min-height: 60px !important;
          }
          
          header nav {
            padding: 0.5rem 1rem !important;
            min-height: 60px !important;
          }
          
          header nav a {
            font-size: 1rem !important;
            padding: 0.875rem 1.25rem !important;
            min-height: 44px !important;
            width: 100%;
            justify-content: center;
            border-bottom: 1px solid #f3f4f6;
          }
          
          header nav a:last-child {
            border-bottom: none;
          }
        }
        
        @media (max-width: 640px) {
          header {
            min-height: 56px !important;
          }
          
          header nav {
            min-height: 56px !important;
          }
        }
      `}</style>
    </>
  )
}