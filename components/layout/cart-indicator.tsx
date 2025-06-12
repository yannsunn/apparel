'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'

export function CartIndicator() {
  const { totalItems } = useCartStore()
  const count = totalItems()
  const isPending = false // Simplified for UltraHeader integration

  return (
    <Link 
      href="/cart" 
      style={{ 
        color: '#111827', 
        textDecoration: 'none', 
        fontWeight: '500',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s ease',
        padding: '0.5rem 1rem',
        borderRadius: '8px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#3b82f6'
        e.currentTarget.style.background = '#f8fafc'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#111827'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <span>🛒</span>
      <span>カート</span>
      
      {/* Animated Count Badge */}
      <div
        style={{
          background: count > 0 ? '#ef4444' : '#9ca3af',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: '600',
          padding: '0.125rem 0.5rem',
          borderRadius: '12px',
          minWidth: '20px',
          textAlign: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isPending ? 'scale(1.2)' : 'scale(1)',
          boxShadow: count > 0 ? '0 2px 4px rgba(239, 68, 68, 0.3)' : 'none'
        }}
      >
        {count}
      </div>
      
      {/* Loading Indicator */}
      {isPending && (
        <div
          style={{
            width: '8px',
            height: '8px',
            background: '#3b82f6',
            borderRadius: '50%',
            animation: 'pulse 1s infinite'
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Link>
  )
}