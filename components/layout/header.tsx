import { Suspense } from 'react'
import Link from 'next/link'
import { CartIndicator } from './cart-indicator'

export function Header() {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link 
          href="/" 
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          APPAREL EC
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link 
            href="/products" 
            style={{ 
              color: '#111827', 
              textDecoration: 'none', 
              fontWeight: '500',
              position: 'relative',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#3b82f6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#111827'
            }}
          >
            Products
          </Link>
          
          <Suspense fallback={
            <div style={{ 
              padding: '0.5rem 1rem',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              Cart (...)
            </div>
          }>
            <CartIndicator />
          </Suspense>
        </nav>
      </div>
    </header>
  )
}