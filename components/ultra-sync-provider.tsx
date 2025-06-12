/**
 * 🚀 ULTRA SYNC PROVIDER
 * 全アプリケーションの状態・ナビゲーション・パフォーマンスを統一管理
 */

'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { UltraSync } from '@/lib/ultra-sync'

interface UltraSyncContextType {
  currentPage: string
  performanceScore: number
  isLoading: boolean
  navigation: typeof UltraSync.Navigation
  brand: typeof UltraSync.Brand
}

const UltraSyncContext = createContext<UltraSyncContextType | null>(null)

interface UltraSyncProviderProps {
  children: ReactNode
}

export function UltraSyncProvider({ children }: UltraSyncProviderProps) {
  const pathname = usePathname()

  // ページ変更時の処理
  useEffect(() => {
    // ナビゲーション同期
    UltraSync.NavigationSync.setCurrentPage(pathname)
    
    // パフォーマンス測定
    UltraSync.Monitor.measurePageLoad(pathname)
    
    // グローバル状態更新
    UltraSync.StateSync.setState('currentPage', pathname)
    UltraSync.StateSync.setState('lastNavigationTime', Date.now())
    
    // ページタイトル更新
    const pageInfo = (UltraSync.Navigation.main as unknown as any[]).find(
      (item: any) => item.href === pathname || 
              (item.submenu && item.submenu.some((sub: any) => sub.href === pathname))
    )
    
    if (pageInfo) {
      document.title = `${pageInfo.label} | ${UltraSync.Brand.name}`
    }
    
    // メタ情報更新
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && pageInfo?.description) {
      metaDescription.setAttribute('content', 
        `${pageInfo.description} - ${UltraSync.Brand.tagline}`
      )
    }
    
  }, [pathname])

  // パフォーマンス監視
  useEffect(() => {
    const interval = setInterval(() => {
      const score = UltraSync.Monitor.getPerformanceScore()
      UltraSync.StateSync.setState('performanceScore', score)
      
      // パフォーマンスが低下した場合の警告
      if (score < 70) {
        console.warn(`⚠️ パフォーマンススコア低下: ${score}/100`)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // エラーハンドリング
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('🚨 UltraSync Error:', event.error)
      UltraSync.StateSync.setState('lastError', {
        message: event.error?.message || 'Unknown error',
        timestamp: Date.now(),
        page: pathname
      })
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [pathname])

  const contextValue: UltraSyncContextType = {
    currentPage: pathname,
    performanceScore: UltraSync.Monitor.getPerformanceScore(),
    isLoading: false,
    navigation: UltraSync.Navigation,
    brand: UltraSync.Brand
  }

  return (
    <UltraSyncContext.Provider value={contextValue}>
      {children}
      
      {/* 開発時パフォーマンス表示 */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          zIndex: 9999,
          pointerEvents: 'none'
        }}>
          📊 Score: {contextValue.performanceScore}/100<br/>
          📍 Page: {pathname}
        </div>
      )}
    </UltraSyncContext.Provider>
  )
}

// カスタムフック
export function useUltraSync() {
  const context = useContext(UltraSyncContext)
  if (!context) {
    throw new Error('useUltraSync must be used within UltraSyncProvider')
  }
  return context
}

// パフォーマンス監視フック
export function useUltraPerformance() {
  const { performanceScore } = useUltraSync()
  
  useEffect(() => {
    // Critical Performance Metrics のリアルタイム監視
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            UltraSync.StateSync.setState('lcp', entry.startTime)
          }
          if (entry.entryType === 'first-input') {
            UltraSync.StateSync.setState('fid', (entry as any).processingStart - entry.startTime)
          }
        }
      })
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
      } catch (e) {
        // ブラウザがサポートしていない場合は無視
      }
      
      return () => observer.disconnect()
    }
  }, [])
  
  return {
    score: performanceScore,
    isOptimal: performanceScore >= 90,
    needsImprovement: performanceScore < 70
  }
}

// ナビゲーション状態フック
export function useUltraNavigation() {
  const { currentPage, navigation } = useUltraSync()
  
  const isActivePage = (href: string) => {
    return currentPage === href
  }
  
  const isActiveSection = (item: any) => {
    return currentPage === item.href || 
           (item.submenu && item.submenu.some((sub: any) => currentPage === sub.href))
  }
  
  const navigateWithTracking = (href: string) => {
    UltraSync.NavigationSync.navigateTo(href)
  }
  
  return {
    currentPage,
    navigation: navigation.main,
    isActivePage,
    isActiveSection,
    navigateWithTracking
  }
}

export default UltraSyncProvider