import { JapanPostClient } from '../../../utils/carriers/japan-post';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('JapanPostClient', () => {
  let japanPostClient: JapanPostClient;

  beforeEach(() => {
    jest.clearAllMocks();
    japanPostClient = new JapanPostClient();
  });

  describe('getTrackingInfo', () => {
    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = '123456789012';
      const result = await japanPostClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('currentLocation');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('estimatedDelivery');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`日本郵便の配送状況を取得: ${trackingNumber}`);
    });

    test('配達予定日が現在から5日以内', async () => {
      const trackingNumber = '123456789012';
      const result = await japanPostClient.getTrackingInfo(trackingNumber);
      
      const now = new Date();
      const estimatedDelivery = new Date(result.estimatedDelivery);
      const timeDiff = estimatedDelivery.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      expect(daysDiff).toBeGreaterThan(0);
      expect(daysDiff).toBeLessThanOrEqual(6); // 当日含む最大6日
    });

    test('追跡状況の説明文が正しいフォーマット', async () => {
      const trackingNumber = '123456789012';
      const result = await japanPostClient.getTrackingInfo(trackingNumber);
      
      // 「[配送場所]で[ステータス]になりました」の形式であることを確認
      expect(result.description).toMatch(/^.+で.+になりました$/);
      expect(result.description).toContain(result.currentLocation);
      expect(result.description).toContain(result.status);
    });

    test('APIエラー時に適切にエラーをスローする', async () => {
      // APIエラーをシミュレート
      jest.spyOn(japanPostClient as any, 'getTrackingInfo').mockImplementationOnce(() => {
        throw new Error('APIエラー');
      });

      const trackingNumber = '123456789012';
      
      await expect(japanPostClient.getTrackingInfo(trackingNumber)).rejects.toThrow();
      
      // エラーログが記録されることを期待
      expect(logger.error).toHaveBeenCalled();
    });
  });
}); 