import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Next.js Minimal',
  description: 'Welcome to our minimal Next.js application with enterprise-grade security and performance',
}

export default function HomePage() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '2rem',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🚀 Next.js 15
        </h1>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Enterprise-ready setup with security headers, error handling, and performance optimizations.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <strong>🔒 Secure</strong>
            <br />
            <small>CSP Headers</small>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <strong>⚡ Fast</strong>
            <br />
            <small>Optimized Build</small>
          </div>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <strong>🛡️ Robust</strong>
            <br />
            <small>Error Handling</small>
          </div>
        </div>
      </div>
    </main>
  )
}