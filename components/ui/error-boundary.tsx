'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  variant?: 'simple' | 'detailed' | 'page'
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const { variant = 'simple' } = this.props

      if (variant === 'page') {
        return (
          <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Header */}
            <header style={{
              background: '#ffffff',
              borderBottom: '1px solid #e5e7eb',
              padding: '1rem 2rem'
            }}>
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/" style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  textDecoration: 'none'
                }}>
                  APPAREL EC
                </a>
              </div>
            </header>

            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '3rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>😵</div>
                
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '1rem'
                }}>
                  エラーが発生しました
                </h1>
                
                <p style={{
                  color: '#6b7280',
                  fontSize: '1.125rem',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  申し訳ございません。予期しないエラーが発生しました。
                </p>
                
                {this.state.error?.message && (
                  <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '2rem',
                    textAlign: 'left'
                  }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.5rem' }}>
                      エラー詳細:
                    </h3>
                    <code style={{ fontSize: '0.875rem', color: '#7f1d1d', wordBreak: 'break-word' }}>
                      {this.state.error.message}
                    </code>
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => this.setState({ hasError: false, error: undefined })}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#3b82f6',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 再試行
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/'}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🏠 ホームに戻る
                  </button>
                </div>
                
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    問題が解決しない場合は、サポートまでお問い合わせください。
                  </p>
                </div>
              </div>
            </main>
          </div>
        )
      }

      if (variant === 'detailed') {
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>エラーが発生しました</h2>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              予期しないエラーが発生しました。再度お試しください。
            </p>
            {this.state.error?.message && (
              <p style={{ marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              再試行
            </button>
          </div>
        )
      }

      // Simple variant
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '1rem'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            ❌ エラーが発生しました
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            {this.state.error?.message || '予期しないエラーが発生しました'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            再試行
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Next.js App Router用エラーコンポーネント
interface ErrorComponentProps {
  error: Error & { digest?: string }
  reset: () => void
  variant?: 'simple' | 'detailed' | 'page'
}

export function ErrorComponent({ error, reset, variant = 'detailed' }: ErrorComponentProps) {
  if (variant === 'page') {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Header */}
        <header style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 2rem'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#111827',
              textDecoration: 'none'
            }}>
              APPAREL EC
            </a>
          </div>
        </header>

        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '3rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>😵</div>
            
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              エラーが発生しました
            </h1>
            
            <p style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              申し訳ございません。予期しないエラーが発生しました。
            </p>
            
            {error.message && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.5rem' }}>
                  エラー詳細:
                </h3>
                <code style={{ fontSize: '0.875rem', color: '#7f1d1d', wordBreak: 'break-word' }}>
                  {error.message}
                </code>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🔄 再試行
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🏠 ホームに戻る
              </button>
            </div>
            
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                問題が解決しない場合は、サポートまでお問い合わせください。
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (variant === 'simple') {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        margin: '1rem'
      }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>
          ❌ エラーが発生しました
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          {error.message || '予期しないエラーが発生しました'}
        </p>
        <button
          onClick={reset}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          再試行
        </button>
      </div>
    )
  }

  // Detailed variant (default)
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>エラーが発生しました</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        予期しないエラーが発生しました。再度お試しください。
      </p>
      {error.message && (
        <p style={{ marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>
          {error.message}
        </p>
      )}
      <button
        onClick={reset}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        再試行
      </button>
    </div>
  )
}