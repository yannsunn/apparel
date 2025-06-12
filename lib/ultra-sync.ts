/**
 * 🚀 ULTRA SYNC SYSTEM
 * 限界突破・完璧なアパレルECサイト統一システム
 * ナビゲーション・文言・UX・パフォーマンスの完全同期
 */

'use client'

// 🎯 APPAREL EC ブランド統一設定
export const ULTRA_BRAND_CONFIG = {
  name: 'APPAREL EC',
  tagline: 'プロフェッショナルなアパレルソリューション',
  logo: '👔',
  colors: {
    primary: '#3b82f6',
    secondary: '#ef4444', 
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#dc2626',
    neutral: '#6b7280'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500', 
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    base: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  }
} as const

// 🧭 統一ナビゲーション設定
export const ULTRA_NAVIGATION = {
  main: [
    { 
      label: 'ホーム', 
      href: '/', 
      icon: '🏠',
      description: 'トップページ'
    },
    { 
      label: '商品一覧', 
      href: '/products', 
      icon: '👕',
      description: 'すべての商品を見る'
    },
    {
      label: 'サービス',
      href: '/services',
      icon: '⚙️',
      description: 'OEM・小ロット対応',
      submenu: [
        { label: 'OEM・ODM', href: '/services/oem', icon: '🏭' },
        { label: '小ロット対応', href: '/services/small-lot', icon: '📦' }
      ]
    },
    {
      label: 'サポート',
      href: '/support',
      icon: '🛠️', 
      description: 'お客様サポート',
      submenu: [
        { label: 'よくある質問', href: '/support/faq', icon: '❓' },
        { label: 'お問い合わせ', href: '/support/contact', icon: '📧' },
        { label: '配送について', href: '/support/shipping', icon: '🚚' }
      ]
    },
    { 
      label: 'カート', 
      href: '/cart', 
      icon: '🛒',
      description: 'ショッピングカート',
      special: 'cart'
    }
  ]
} as const

// 🎨 統一スタイルシステム
export const ULTRA_STYLES = {
  // 共通レイアウト
  layout: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  
  // ヘッダー統一スタイル
  header: {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    padding: '1rem 2rem',
    position: 'sticky' as const,
    top: 0,
    zIndex: 40,
    transition: 'all 0.3s ease'
  },
  
  // ボタン統一スタイル
  button: {
    primary: {
      background: ULTRA_BRAND_CONFIG.colors.primary,
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontWeight: ULTRA_BRAND_CONFIG.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: ULTRA_BRAND_CONFIG.typography.fontSize.base
    },
    secondary: {
      background: 'transparent',
      color: ULTRA_BRAND_CONFIG.colors.primary,
      padding: '0.75rem 1.5rem',
      borderRadius: '8px', 
      border: `2px solid ${ULTRA_BRAND_CONFIG.colors.primary}`,
      fontWeight: ULTRA_BRAND_CONFIG.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }
  },
  
  // カード統一スタイル
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s ease'
  }
} as const

// 📊 パフォーマンス監視システム
export class UltraSyncMonitor {
  private static instance: UltraSyncMonitor
  private metrics: Map<string, number> = new Map()
  private startTime: number = Date.now()

  static getInstance(): UltraSyncMonitor {
    if (!UltraSyncMonitor.instance) {
      UltraSyncMonitor.instance = new UltraSyncMonitor()
    }
    return UltraSyncMonitor.instance
  }

  // ページロード時間測定
  measurePageLoad(pageName: string) {
    const loadTime = Date.now() - this.startTime
    this.metrics.set(`page_load_${pageName}`, loadTime)
    
    if (typeof window !== 'undefined') {
      console.log(`📊 ${pageName} ページロード: ${loadTime}ms`)
    }
  }

  // ナビゲーション遷移測定
  measureNavigation(from: string, to: string) {
    const navTime = Date.now()
    this.metrics.set(`nav_${from}_to_${to}`, navTime)
    
    if (typeof window !== 'undefined') {
      console.log(`🧭 ナビゲーション: ${from} → ${to}`)
    }
  }

  // パフォーマンススコア取得
  getPerformanceScore(): number {
    const pageLoads = Array.from(this.metrics.entries())
      .filter(([key]) => key.startsWith('page_load_'))
      .map(([, value]) => value)
    
    if (pageLoads.length === 0) return 100
    
    const avgLoadTime = pageLoads.reduce((a, b) => a + b, 0) / pageLoads.length
    
    // 1秒以下 = 100点、2秒 = 80点、3秒 = 60点
    if (avgLoadTime < 1000) return 100
    if (avgLoadTime < 2000) return Math.max(80, 100 - (avgLoadTime - 1000) / 50)
    if (avgLoadTime < 3000) return Math.max(60, 80 - (avgLoadTime - 2000) / 50)
    return Math.max(30, 60 - (avgLoadTime - 3000) / 100)
  }
}

// 🔄 ナビゲーション同期システム
export class UltraNavigationSync {
  private static currentPage: string = '/'
  private static listeners: Set<(page: string) => void> = new Set()

  // 現在ページ設定
  static setCurrentPage(page: string) {
    const prevPage = this.currentPage
    this.currentPage = page
    
    // 監視システムに記録
    UltraSyncMonitor.getInstance().measureNavigation(prevPage, page)
    
    // リスナーに通知
    this.listeners.forEach(listener => listener(page))
  }

  // 現在ページ取得
  static getCurrentPage(): string {
    return this.currentPage
  }

  // ページ変更リスナー追加
  static addPageChangeListener(listener: (page: string) => void) {
    this.listeners.add(listener)
    
    return () => {
      this.listeners.delete(listener)
    }
  }

  // 安全なナビゲーション
  static navigateTo(href: string, options: { replace?: boolean } = {}) {
    if (typeof window !== 'undefined') {
      if (options.replace) {
        window.history.replaceState(null, '', href)
      } else {
        window.history.pushState(null, '', href)
      }
      
      this.setCurrentPage(href)
      
      // Next.js router 互換
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }
}

// 🎯 統一状態管理
export class UltraStateSync {
  private static state: Map<string, any> = new Map()
  private static subscribers: Map<string, Set<(value: any) => void>> = new Map()

  // 状態設定
  static setState<T>(key: string, value: T) {
    this.state.set(key, value)
    
    const subs = this.subscribers.get(key)
    if (subs) {
      subs.forEach(callback => callback(value))
    }
  }

  // 状態取得
  static getState<T>(key: string, defaultValue?: T): T {
    return this.state.get(key) ?? defaultValue
  }

  // 状態購読
  static subscribe<T>(key: string, callback: (value: T) => void): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set())
    }
    
    this.subscribers.get(key)!.add(callback)
    
    // 現在の値を即座に通知
    const currentValue = this.state.get(key)
    if (currentValue !== undefined) {
      callback(currentValue)
    }
    
    return () => {
      this.subscribers.get(key)?.delete(callback)
    }
  }
}

// 🚀 メインエクスポート
export const UltraSync = {
  Brand: ULTRA_BRAND_CONFIG,
  Navigation: ULTRA_NAVIGATION,
  Styles: ULTRA_STYLES,
  Monitor: UltraSyncMonitor.getInstance(),
  NavigationSync: UltraNavigationSync,
  StateSync: UltraStateSync
}

export default UltraSync