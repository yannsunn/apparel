export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  console.error('Unexpected error:', error);
  return new AppError(500, 'サーバーエラーが発生しました。');
};

export const handleApiError = (error: unknown): AppError => {
  console.error('API error:', error);
  if (error instanceof AppError) {
    return error;
  }
  return new AppError(500, 'APIエラーが発生しました。');
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
}; 