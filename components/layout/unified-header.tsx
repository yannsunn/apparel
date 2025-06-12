'use client'

import Link from 'next/link'
import { useOptimisticCart } from '@/lib/hooks/use-optimistic-cart'

interface UnifiedHeaderProps {
  showCartIndicator?: boolean
  theme?: 'light' | 'dark'
}

export default function UnifiedHeader({ showCartIndicator = true, theme = 'light' }: UnifiedHeaderProps) {
  const { totalItems } = useOptimisticCart()

  const headerStyle = {
    background: theme === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(17,24,39,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${theme === 'light' ? 'rgba(226, 232, 240, 0.8)' : 'rgba(75, 85, 99, 0.3)'}`,
    padding: '1rem 2rem',
    position: 'sticky' as const,
    top: 0,
    zIndex: 40
  }

  const navStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#3b82f6',
    textDecoration: 'none'
  }

  const navLinksStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  }

  const linkStyle = {
    color: theme === 'light' ? '#374151' : '#d1d5db',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  }

  const cartStyle = {
    position: 'relative' as const,
    color: theme === 'light' ? '#374151' : '#d1d5db',
    textDecoration: 'none',
    fontWeight: '500'
  }

  const badgeStyle = {
    position: 'absolute' as const,
    top: '-8px',
    right: '-8px',
    background: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '600'
  }

  return (
    <header style={headerStyle}>
      <div style={navStyle}>
        <Link href="/" style={logoStyle}>
          APPAREL EC
        </Link>
        
        <nav style={navLinksStyle}>
          <Link href="/products" style={linkStyle}>
            商品一覧
          </Link>
          <Link href="/services/oem" style={linkStyle}>
            OEM
          </Link>
          <Link href="/services/small-lot" style={linkStyle}>
            小ロット
          </Link>
          <Link href="/support/faq" style={linkStyle}>
            サポート
          </Link>
          
          {showCartIndicator && (
            <Link href="/cart" style={cartStyle}>
              カート
              {totalItems() > 0 && (
                <span style={badgeStyle}>
                  {totalItems()}
                </span>
              )}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}