import { Prisma } from '@prisma/client';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown) => {
  console.error('APIエラー:', error);

  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      body: JSON.stringify({
        error: error.message,
        code: error.code,
      }),
    };
  }

  return {
    status: 500,
    body: JSON.stringify({
      error: '予期せぬエラーが発生しました',
      code: 'INTERNAL_SERVER_ERROR',
    }),
  };
};

export const handleDatabaseError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new AppError('DUPLICATE_ENTRY', '重複するデータが存在します');
      case 'P2025':
        return new AppError('NOT_FOUND', 'データが見つかりません');
      default:
        return new AppError('DATABASE_ERROR', 'データベースエラーが発生しました');
    }
  }
  return error;
}; 