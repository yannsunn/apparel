'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const { name, value } = entry as any
          
          // Log performance metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 ${name}: ${Math.round(value)}ms`)
          }
          
          // Send to analytics in production
          if (process.env.NODE_ENV === 'production') {
            // Replace with your analytics service
            // analytics.track(name, { value, url: window.location.href })
          }
        }
      })

      // Observe all performance entries
      try {
        observer.observe({ entryTypes: ['measure', 'navigation', 'paint', 'largest-contentful-paint'] })
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        observer.observe({ entryTypes: ['measure', 'navigation'] })
      }

      // Memory usage monitoring (Chrome only)
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory
        if (process.env.NODE_ENV === 'development') {
          console.log('🧠 Memory Usage:', {
            used: Math.round(memoryInfo.usedJSHeapSize / 1048576) + 'MB',
            total: Math.round(memoryInfo.totalJSHeapSize / 1048576) + 'MB',
            limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576) + 'MB'
          })
        }
      }

      return () => observer.disconnect()
    }
  }, [])

  return null
}