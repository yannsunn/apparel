import { formatTrackingNumber, validateTrackingNumber } from '@utils/tracking';

describe('tracking utils', () => {
  describe('formatTrackingNumber', () => {
    it('正しく追跡番号をフォーマットする', () => {
      expect(formatTrackingNumber('123456789012')).toBe('1234-5678-9012');
      expect(formatTrackingNumber('1234567890')).toBe('1234-5678-90');
    });

    it('空の文字列を返す', () => {
      expect(formatTrackingNumber('')).toBe('');
    });

    it('無効な形式の追跡番号をそのまま返す', () => {
      expect(formatTrackingNumber('123')).toBe('123');
      expect(formatTrackingNumber('abc')).toBe('abc');
    });
  });

  describe('validateTrackingNumber', () => {
    it('有効な追跡番号を検証する', () => {
      expect(validateTrackingNumber('123456789012')).toBe(true);
      expect(validateTrackingNumber('1234567890')).toBe(true);
    });

    it('無効な追跡番号を検証する', () => {
      expect(validateTrackingNumber('123')).toBe(false);
      expect(validateTrackingNumber('abc')).toBe(false);
      expect(validateTrackingNumber('')).toBe(false);
    });
  });
}); 