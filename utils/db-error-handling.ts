import { AppError } from './error-handling';

export const handleDatabaseError = (error: unknown): AppError => {
  console.error('Database error:', error);
  return new AppError(500, 'データベースエラーが発生しました。');
};

export const isDBError = (error: unknown): boolean => {
  // データベースエラーの判定ロジックを実装
  return error instanceof Error && error.message.includes('database');
}; 