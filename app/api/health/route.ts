import { NextResponse } from 'next/server'

export async function GET() {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      memory: process.memoryUsage(),
    },
    checks: {
      database: 'healthy', // Future: Add actual database check
      cache: 'healthy',    // Future: Add cache check
      external: 'healthy', // Future: Add external service checks
    }
  }

  // Add performance timing if available
  if (typeof performance !== 'undefined') {
    const system = healthCheck.system as any
    system.performanceNow = performance.now()
  }

  return NextResponse.json(healthCheck, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json',
    },
  })
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}