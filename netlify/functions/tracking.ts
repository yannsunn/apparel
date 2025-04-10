import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'
import { YamatoClient } from '../../../lib/carriers/yamato'
import { SagawaClient } from '../../../lib/carriers/sagawa'
import { CarrierClient } from '../../../types/tracking'

interface ErrorResponse {
  error: {
    message: string
    code: string
    statusCode: number
  }
}

const prisma = new PrismaClient()

const errorMessages = {
  METHOD_NOT_ALLOWED: 'このメソッドは許可されていません',
  MISSING_ORDER_ID: '注文IDが必要です',
  ORDER_NOT_FOUND: '注文が見つかりません',
  TRACKING_NOT_FOUND: '配送情報が見つかりません',
  UNSUPPORTED_CARRIER: '未対応の配送業者です',
  INTERNAL_SERVER_ERROR: 'サーバーエラーが発生しました'
} as const;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    const error: ErrorResponse = {
      error: {
        message: errorMessages.METHOD_NOT_ALLOWED,
        code: 'METHOD_NOT_ALLOWED',
        statusCode: 405
      }
    }
    return {
      statusCode: 405,
      body: JSON.stringify(error)
    }
  }

  const orderId = event.queryStringParameters?.orderId
  if (!orderId) {
    const error: ErrorResponse = {
      error: {
        message: errorMessages.MISSING_ORDER_ID,
        code: 'MISSING_ORDER_ID',
        statusCode: 400
      }
    }
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { tracking: true }
    })

    if (!order) {
      const error: ErrorResponse = {
        error: {
          message: errorMessages.ORDER_NOT_FOUND,
          code: 'ORDER_NOT_FOUND',
          statusCode: 404
        }
      }
      return {
        statusCode: 404,
        body: JSON.stringify(error)
      }
    }

    if (!order.tracking) {
      const error: ErrorResponse = {
        error: {
          message: errorMessages.TRACKING_NOT_FOUND,
          code: 'TRACKING_NOT_FOUND',
          statusCode: 404
        }
      }
      return {
        statusCode: 404,
        body: JSON.stringify(error)
      }
    }

    let client: CarrierClient
    switch (order.tracking.carrier) {
      case 'YAMATO':
        client = new YamatoClient()
        break
      case 'SAGAWA':
        client = new SagawaClient()
        break
      default:
        const error: ErrorResponse = {
          error: {
            message: `${errorMessages.UNSUPPORTED_CARRIER}: ${order.tracking.carrier}`,
            code: 'UNSUPPORTED_CARRIER',
            statusCode: 400
          }
        }
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        }
    }

    const trackingInfo = await client.getTrackingInfo(order.tracking.trackingNumber)

    return {
      statusCode: 200,
      body: JSON.stringify(trackingInfo)
    }
  } catch (error) {
    console.error('Error fetching tracking info:', error)
    const errorResponse: ErrorResponse = {
      error: {
        message: errorMessages.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify(errorResponse)
    }
  } finally {
    await prisma.$disconnect()
  }
} 
 
import { PrismaClient } from '@prisma/client'
import { YamatoClient } from '../../../lib/carriers/yamato'
import { SagawaClient } from '../../../lib/carriers/sagawa'
import { CarrierClient } from '../../../types/tracking'

interface ErrorResponse {
  error: {
    message: string
    code: string
    statusCode: number
  }
}

const prisma = new PrismaClient()

const errorMessages = {
  METHOD_NOT_ALLOWED: 'このメソッドは許可されていません',
  MISSING_ORDER_ID: '注文IDが必要です',
  ORDER_NOT_FOUND: '注文が見つかりません',
  TRACKING_NOT_FOUND: '配送情報が見つかりません',
  UNSUPPORTED_CARRIER: '未対応の配送業者です',
  INTERNAL_SERVER_ERROR: 'サーバーエラーが発生しました'
} as const;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    const error: ErrorResponse = {
      error: {
        message: errorMessages.METHOD_NOT_ALLOWED,
        code: 'METHOD_NOT_ALLOWED',
        statusCode: 405
      }
    }
    return {
      statusCode: 405,
      body: JSON.stringify(error)
    }
  }

  const orderId = event.queryStringParameters?.orderId
  if (!orderId) {
    const error: ErrorResponse = {
      error: {
        message: errorMessages.MISSING_ORDER_ID,
        code: 'MISSING_ORDER_ID',
        statusCode: 400
      }
    }
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { tracking: true }
    })

    if (!order) {
      const error: ErrorResponse = {
        error: {
          message: errorMessages.ORDER_NOT_FOUND,
          code: 'ORDER_NOT_FOUND',
          statusCode: 404
        }
      }
      return {
        statusCode: 404,
        body: JSON.stringify(error)
      }
    }

    if (!order.tracking) {
      const error: ErrorResponse = {
        error: {
          message: errorMessages.TRACKING_NOT_FOUND,
          code: 'TRACKING_NOT_FOUND',
          statusCode: 404
        }
      }
      return {
        statusCode: 404,
        body: JSON.stringify(error)
      }
    }

    let client: CarrierClient
    switch (order.tracking.carrier) {
      case 'YAMATO':
        client = new YamatoClient()
        break
      case 'SAGAWA':
        client = new SagawaClient()
        break
      default:
        const error: ErrorResponse = {
          error: {
            message: `${errorMessages.UNSUPPORTED_CARRIER}: ${order.tracking.carrier}`,
            code: 'UNSUPPORTED_CARRIER',
            statusCode: 400
          }
        }
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        }
    }

    const trackingInfo = await client.getTrackingInfo(order.tracking.trackingNumber)

    return {
      statusCode: 200,
      body: JSON.stringify(trackingInfo)
    }
  } catch (error) {
    console.error('Error fetching tracking info:', error)
    const errorResponse: ErrorResponse = {
      error: {
        message: errorMessages.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify(errorResponse)
    }
  } finally {
    await prisma.$disconnect()
  }
} 