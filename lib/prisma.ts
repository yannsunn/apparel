import { PrismaClient } from '@prisma/client'
import { logger } from './logger'

// PrismaClientのグローバルインスタンス
declare global {
  var prisma: PrismaClient | undefined
}

// 環境変数からデータベースURLを取得
const databaseUrl = process.env.DATABASE_URL

// 接続時間を最適化するオプション
const prismaOptions = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  // サーバーレス環境でのコネクションプールを最適化
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
}

// 開発環境ではホットリロードによる複数接続を防ぐため、グローバル変数を使用
// 本番環境では新しいインスタンスを作成
const prisma = global.prisma || new PrismaClient(prismaOptions)

// クエリログを設定
prisma.$on('query', (e) => {
  logger.debug('Prisma Query', {
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`,
  })
})

// エラーハンドリングの設定
prisma.$use(async (params, next) => {
  const before = Date.now()
  try {
    return await next(params)
  } catch (error) {
    logger.error('Prisma Error', {
      model: params.model,
      action: params.action,
      error: error instanceof Error ? error.message : String(error),
    })
    throw error
  } finally {
    const after = Date.now()
    logger.debug('Prisma Query Time', {
      model: params.model,
      action: params.action,
      duration: `${after - before}ms`,
    })
  }
})

// 開発環境の場合はグローバル変数にインスタンスを保存
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma 