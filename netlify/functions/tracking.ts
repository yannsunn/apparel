import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'
import { YamatoClient } from '../../utils/carriers/yamato'
import { SagawaClient } from '../../utils/carriers/sagawa'
import { ExtendedError, TrackingInfo } from '../../types/tracking'

const prisma = new PrismaClient()

export const handler: Handler = async (event, context) => {
  // CORSヘッダーを追加
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  }

  // OPTIONSリクエストの処理
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  const orderId = event.path.split('/').pop()
  if (!orderId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Order ID is required' })
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { trackingInfo: true }
    })

    if (!order) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Order not found' })
      }
    }

    if (!order.trackingInfo) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Tracking information not found' })
      }
    }

    let carrierClient
    switch (order.trackingInfo.carrier.toLowerCase()) {
      case 'yamato':
        carrierClient = new YamatoClient(process.env.YAMATO_API_KEY || '')
        break
      case 'sagawa':
        carrierClient = new SagawaClient(process.env.SAGAWA_API_KEY || '')
        break
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Unsupported carrier' })
        }
    }

    const trackingInfo = await carrierClient.getTrackingInfo(order.trackingInfo.trackingNumber)
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: trackingInfo
      })
    }
  } catch (error) {
    const e = error as ExtendedError
    return {
      statusCode: e.statusCode || 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: {
          message: e.message,
          code: e.code,
          data: e.data
        }
      })
    }
  } finally {
    await prisma.$disconnect()
  }
} 