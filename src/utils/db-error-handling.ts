import { Prisma } from '@prisma/client';
import { AppError } from './error-handling';

export const handleDatabaseError = (error: unknown): AppError => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new AppError('DUPLICATE_ENTRY', '重複するデータが存在します');
      case 'P2025':
        return new AppError('NOT_FOUND', 'データが見つかりません');
      case 'P2003':
        return new AppError('FOREIGN_KEY_CONSTRAINT', '関連するデータが存在しません');
      case 'P2006':
        return new AppError('INVALID_DATA', '無効なデータが入力されました');
      case 'P2011':
        return new AppError('NULL_CONSTRAINT', '必須項目が入力されていません');
      default:
        return new AppError('DATABASE_ERROR', 'データベースエラーが発生しました');
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new AppError('VALIDATION_ERROR', 'データの形式が正しくありません');
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new AppError('DATABASE_CONNECTION_ERROR', 'データベースへの接続に失敗しました');
  }

  console.error('予期せぬデータベースエラー:', error);
  return new AppError('DATABASE_ERROR', 'データベースで予期せぬエラーが発生しました');
}; 