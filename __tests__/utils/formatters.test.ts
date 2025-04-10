import { 
  formatCurrency, 
  formatDate, 
  formatPhoneNumber, 
  formatTrackingNumber 
} from '@/utils/formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    test('金額を日本円形式でフォーマットする', () => {
      expect(formatCurrency(1000)).toBe('¥1,000');
      expect(formatCurrency(1500.5)).toBe('¥1,501');
      expect(formatCurrency(0)).toBe('¥0');
    });

    test('負の値を正しくフォーマットする', () => {
      expect(formatCurrency(-1000)).toBe('-¥1,000');
      expect(formatCurrency(-1500.5)).toBe('-¥1,501');
    });

    test('異なる通貨コードでフォーマットする', () => {
      expect(formatCurrency(1000, 'USD')).toBe('$1,000');
      expect(formatCurrency(1500.5, 'EUR')).toBe('€1,501');
      expect(formatCurrency(1000, 'GBP')).toBe('£1,000');
    });

    test('小数点以下を指定してフォーマットする', () => {
      expect(formatCurrency(1000.56, 'USD', 2)).toBe('$1,000.56');
      expect(formatCurrency(1500.5, 'JPY', 0)).toBe('¥1,501');
    });
  });

  describe('formatDate', () => {
    test('日付を標準形式でフォーマットする', () => {
      const date = new Date('2023-07-15T12:30:45');
      expect(formatDate(date)).toBe('2023年7月15日');
    });

    test('タイムスタンプを日付形式でフォーマットする', () => {
      const timestamp = 1689422445000; // 2023-07-15T12:30:45
      expect(formatDate(timestamp)).toBe('2023年7月15日');
    });

    test('日付文字列をフォーマットする', () => {
      expect(formatDate('2023-07-15T12:30:45')).toBe('2023年7月15日');
    });

    test('異なるフォーマットオプションで日付をフォーマットする', () => {
      const date = new Date('2023-07-15T12:30:45');
      expect(formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' })).toBe('2023年7月15日');
      expect(formatDate(date, { year: 'numeric', month: '2-digit', day: '2-digit' })).toBe('2023/07/15');
    });

    test('無効な入力に対して空の文字列を返す', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
      expect(formatDate('invalid-date')).toBe('');
    });
  });

  describe('formatPhoneNumber', () => {
    test('日本の電話番号をフォーマットする', () => {
      expect(formatPhoneNumber('08012345678')).toBe('080-1234-5678');
      expect(formatPhoneNumber('0312345678')).toBe('03-1234-5678');
      expect(formatPhoneNumber('0112345678')).toBe('011-234-5678');
    });

    test('ダッシュを含む電話番号を正しくフォーマットする', () => {
      expect(formatPhoneNumber('080-1234-5678')).toBe('080-1234-5678');
      expect(formatPhoneNumber('03-1234-5678')).toBe('03-1234-5678');
    });

    test('無効な電話番号には元の値を返す', () => {
      expect(formatPhoneNumber('123')).toBe('123');
      expect(formatPhoneNumber('')).toBe('');
      expect(formatPhoneNumber(null)).toBe('');
      expect(formatPhoneNumber(undefined)).toBe('');
    });
  });

  describe('formatTrackingNumber', () => {
    test('追跡番号をキャリア別にフォーマットする', () => {
      // 日本郵便
      expect(formatTrackingNumber('123456789012')).toBe('1234-5678-9012');
      
      // ヤマト運輸
      expect(formatTrackingNumber('123456789012')).toBe('1234-5678-9012');
      
      // 佐川急便
      expect(formatTrackingNumber('123456789012')).toBe('1234-5678-9012');
      
      // UPS
      expect(formatTrackingNumber('1Z12345E6205277936')).toBe('1Z 1234 5E62 0527 7936');
    });

    test('異なる長さの追跡番号をフォーマットする', () => {
      expect(formatTrackingNumber('1234567890')).toBe('1234567890');
      expect(formatTrackingNumber('12345678901234567890')).toBe('12345678901234567890');
    });

    test('空の追跡番号には空文字列を返す', () => {
      expect(formatTrackingNumber('')).toBe('');
      expect(formatTrackingNumber(null)).toBe('');
      expect(formatTrackingNumber(undefined)).toBe('');
    });
  });
}); 