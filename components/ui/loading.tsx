import { memo } from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export const Loading = memo<LoadingProps>(function Loading({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) {
  const sizeMap = {
    sm: { spinner: '20px', text: '0.875rem' },
    md: { spinner: '32px', text: '1rem' },
    lg: { spinner: '48px', text: '1.125rem' }
  }

  const dimensions = sizeMap[size]

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