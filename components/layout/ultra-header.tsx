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

  // スクロール状態監視
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  // 動的ヘッダースタイル - z-index 最適化
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
    boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
  }

  const navStyle = {
    ...UltraSync.Styles.layout,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative' as const
  }

  const logoStyle = {
    fontSize: UltraSync.Brand.typography.fontSize['2xl'],
    fontWeight: UltraSync.Brand.typography.fontWeight.extrabold,
    color: UltraSync.Brand.colors.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease'
  }

  const navLinksStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap' as const
  }

  const linkStyle = (isActive: boolean) => ({
    color: isActive 
      ? UltraSync.Brand.colors.primary
      : theme === 'light' ? '#374151' : '#d1d5db',
    textDecoration: 'none',
    fontWeight: isActive 
      ? UltraSync.Brand.typography.fontWeight.semibold
      : UltraSync.Brand.typography.fontWeight.medium,
    fontSize: UltraSync.Brand.typography.fontSize.sm,
    padding: '0.5rem 0.75rem',
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
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    cursor: 'pointer',
    pointerEvents: 'auto' as const,
    fontSize: UltraSync.Brand.typography.fontSize.sm,
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
          
          {/* ナビゲーション */}
          <div style={navLinksStyle}>
            {(UltraSync.Navigation.main as unknown as any[])
              .filter((item: any) => item.special !== 'cart')
              .slice(0, 4) // モバイル対応で4個に削減
              .map(renderNavItem)
            }
            
            {/* カート（常に最後に表示） */}
            {showCartIndicator && renderNavItem(
              (UltraSync.Navigation.main as unknown as any[]).find((item: any) => item.special === 'cart')!
            )}
          </div>
        </nav>
      </header>

      {/* CSS アニメーション＆レスポンシブ対応 */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        /* モバイル対応 */
        @media (max-width: 768px) {
          header nav {
            padding: 0.75rem 1rem !important;
          }
          
          header nav > div:last-child {
            gap: 0.75rem !important;
            flex-wrap: wrap;
            justify-content: flex-end;
          }
          
          header nav a {
            font-size: 0.8rem !important;
            padding: 0.4rem 0.6rem !important;
          }
          
          header nav a span:first-child {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 640px) {
          header nav > div:last-child {
            gap: 0.5rem !important;
          }
          
          header nav a {
            font-size: 0.75rem !important;
            padding: 0.3rem 0.5rem !important;
          }
        }
      `}</style>
    </>
  )
}