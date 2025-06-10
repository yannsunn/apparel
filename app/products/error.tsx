'use client'

import { useEffect } from 'react'
import { ErrorComponent } from '@/components/ui/error-boundary'

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Products page error:', error)
  }, [error])

  return <ErrorComponent error={error} reset={reset} variant="page" />
}