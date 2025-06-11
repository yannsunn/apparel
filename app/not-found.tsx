import Link from 'next/link'

export default function NotFound() {
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
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - ページが見つかりません</h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        お探しのページは存在しません。
      </p>
      <Link 
        href="/" 
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        ホームに戻る
      </Link>
    </div>
  )
}