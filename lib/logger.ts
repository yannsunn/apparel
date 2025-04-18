type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, ...data: any[]): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data: data.length > 0 ? data : undefined
    };

    this.logs.push(entry);
    
    if (process.env.NODE_ENV === 'development') {
      switch (level) {
        case 'info':
          console.log(`[${entry.timestamp}] INFO:`, message, ...data);
          break;
        case 'warn':
          console.warn(`[${entry.timestamp}] WARN:`, message, ...data);
          break;
        case 'error':
          console.error(`[${entry.timestamp}] ERROR:`, message, ...data);
          break;
      }
    }

    // 本番環境では外部のログサービスに送信することを想定
    if (process.env.NODE_ENV === 'production') {
      // TODO: 外部ログサービスへの送信処理を実装
    }
  }

  info(message: string, ...data: any[]): void {
    this.log('info', message, ...data);
  }

  warn(message: string, ...data: any[]): void {
    this.log('warn', message, ...data);
  }

  error(message: string, ...data: any[]): void {
    this.log('error', message, ...data);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }
}

const logger = Logger.getInstance();
export default logger; 