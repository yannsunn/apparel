'use client'

import { useEffect } from 'react'

export default function ExtensionErrorBoundary() {
  useEffect(() => {
    // Suppress extension-related console errors
    const originalError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      
      // Filter out known extension errors
      if (
        message.includes('runtime.lastError') ||
        message.includes('content-script') ||
        message.includes('message port closed') ||
        message.includes('document.write')
      ) {
        // Silently ignore extension errors
        return
      }
      
      // Pass through actual application errors
      originalError.apply(console, args)
    }

    // Add passive event listeners to improve performance
    const addPassiveListeners = () => {
      const events = ['wheel', 'touchstart', 'touchmove']
      events.forEach(event => {
        document.addEventListener(event, () => {}, { passive: true })
      })
    }

    // Override document.write to prevent extension violations
    const originalWrite = document.write
    document.write = function(...args) {
      console.warn('document.write() call intercepted and ignored for performance')
      // Don't execute document.write
    }

    addPassiveListeners()

    return () => {
      console.error = originalError
      document.write = originalWrite
    }
  }, [])

  return null
}