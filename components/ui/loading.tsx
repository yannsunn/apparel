'use client'

import { memo } from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
  variant?: 'spinner' | 'skeleton' | 'fullscreen'
  skeletonType?: 'products' | 'default'
}

export const Loading = memo<LoadingProps>(function Loading({ 
  size = 'md', 
  text = '読み込み中...', 
  className = '',
  variant = 'spinner',
  skeletonType = 'default'
}) {
  const sizeMap = {
    sm: { spinner: '20px', text: '0.875rem' },
    md: { spinner: '32px', text: '1rem' },
    lg: { spinner: '48px', text: '1.125rem' }
  }

  const dimensions = sizeMap[size]

  if (variant === 'fullscreen') {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'rotate 1s linear infinite'
        }}>
        </div>
        <style jsx>{`
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (variant === 'skeleton' && skeletonType === 'products') {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Header Skeleton */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 2rem'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '150px', height: '24px', background: '#f3f4f6', borderRadius: '4px' }} />
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ width: '80px', height: '20px', background: '#f3f4f6', borderRadius: '4px' }} />
              <div style={{ width: '100px', height: '20px', background: '#f3f4f6', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
          {/* Page Title Skeleton */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ width: '200px', height: '40px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '0.5rem' }} />
            <div style={{ width: '120px', height: '20px', background: '#f3f4f6', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
            {/* Filters Skeleton */}
            <aside style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              height: 'fit-content',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ width: '80px', height: '24px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '1.5rem' }} />
              
              {[1, 2, 3].map(i => (
                <div key={i} style={{ marginBottom: '2rem' }}>
                  <div style={{ width: '100px', height: '20px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '1rem' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[1, 2, 3].map(j => (
                      <div key={j} style={{ width: '80%', height: '16px', background: '#f3f4f6', borderRadius: '4px' }} />
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Products Grid Skeleton */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    animation: 'pulse 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div style={{ width: '100%', height: '320px', background: '#f3f4f6' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ height: '24px', background: '#f3f4f6', marginBottom: '0.5rem', borderRadius: '4px' }} />
                    <div style={{ height: '16px', background: '#f3f4f6', marginBottom: '1rem', borderRadius: '4px', width: '60%' }} />
                    <div style={{ height: '20px', background: '#f3f4f6', borderRadius: '4px', width: '40%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </div>
    )
  }

  // Default spinner
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem'
      }}
    >
      <div
        style={{
          width: dimensions.spinner,
          height: dimensions.spinner,
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      {text && (
        <p style={{
          margin: 0,
          color: '#6b7280',
          fontSize: dimensions.text
        }}>
          {text}
        </p>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
})

Loading.displayName = 'Loading'