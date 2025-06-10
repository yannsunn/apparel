'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  mark(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(name)
    }
  }

  measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof performance === 'undefined') return null
    
    try {
      performance.measure(name, startMark, endMark)
      const measures = performance.getEntriesByName(name, 'measure')
      const lastMeasure = measures[measures.length - 1]
      
      if (lastMeasure) {
        const duration = lastMeasure.duration
        
        // Store metric
        const existing = this.metrics.get(name) || []
        existing.push(duration)
        this.metrics.set(name, existing.slice(-100)) // Keep last 100 measurements
        
        return duration
      }
    } catch (error) {
      console.warn('Performance measurement failed:', error)
    }
    
    return null
  }

  getMetrics(name: string): { avg: number; min: number; max: number; count: number } | null {
    const measurements = this.metrics.get(name)
    if (!measurements || measurements.length === 0) return null

    const avg = measurements.reduce((sum, val) => sum + val, 0) / measurements.length
    const min = Math.min(...measurements)
    const max = Math.max(...measurements)
    
    return { avg, min, max, count: measurements.length }
  }

  clear(name?: string): void {
    if (name) {
      this.metrics.delete(name)
      if (typeof performance !== 'undefined') {
        performance.clearMarks(name)
        performance.clearMeasures(name)
      }
    } else {
      this.metrics.clear()
      if (typeof performance !== 'undefined') {
        performance.clearMarks()
        performance.clearMeasures()
      }
    }
  }
}

// React hooks for performance monitoring
export function usePerformanceMark(name: string, dependency?: any) {
  const monitor = useRef(PerformanceMonitor.getInstance())
  
  useEffect(() => {
    const startMark = `${name}-start`
    const endMark = `${name}-end`
    
    monitor.current.mark(startMark)
    
    return () => {
      monitor.current.mark(endMark)
      const duration = monitor.current.measure(name, startMark, endMark)
      
      if (duration !== null && duration > 16) { // Longer than one frame
        console.warn(`Performance warning: ${name} took ${duration.toFixed(2)}ms`)
      }
    }
  }, [name, dependency])
}

export function usePerformanceCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  name: string
): T {
  const monitor = useRef(PerformanceMonitor.getInstance())
  
  return useCallback((...args: Parameters<T>) => {
    const startMark = `${name}-callback-start`
    const endMark = `${name}-callback-end`
    
    monitor.current.mark(startMark)
    const result = callback(...args)
    monitor.current.mark(endMark)
    
    const duration = monitor.current.measure(`${name}-callback`, startMark, endMark)
    if (duration !== null && duration > 8) {
      console.warn(`Slow callback: ${name} took ${duration.toFixed(2)}ms`)
    }
    
    return result
  }, deps) as T
}

// Intersection Observer for lazy loading optimization
export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) {
  const targetRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!targetRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(callback)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observerRef.current.observe(targetRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, options])

  return targetRef
}

// Debounce hook for performance optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttle hook
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number>(0)
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall.current >= delay) {
      lastCall.current = now
      return callback(...args)
    }
  }, [callback, delay]) as T
}

// Memory usage monitoring
export function useMemoryMonitor() {
  useEffect(() => {
    if (typeof performance === 'undefined' || !('memory' in performance)) {
      return
    }

    const checkMemory = () => {
      const memory = (performance as any).memory
      if (memory) {
        const used = memory.usedJSHeapSize / 1048576 // Convert to MB
        const total = memory.totalJSHeapSize / 1048576
        const limit = memory.jsHeapSizeLimit / 1048576

        if (used / limit > 0.8) {
          console.warn(`High memory usage: ${used.toFixed(2)}MB / ${limit.toFixed(2)}MB`)
        }
      }
    }

    const interval = setInterval(checkMemory, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])
}

// Bundle analyzer helper
export function logBundleInfo() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Bundle Info:', {
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      devicePixelRatio: window.devicePixelRatio,
      connection: (navigator as any).connection?.effectiveType,
      memory: (performance as any).memory ? {
        used: ((performance as any).memory.usedJSHeapSize / 1048576).toFixed(2) + 'MB',
        total: ((performance as any).memory.totalJSHeapSize / 1048576).toFixed(2) + 'MB'
      } : 'N/A'
    })
  }
}