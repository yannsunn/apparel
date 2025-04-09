import { SagawaClient } from '../../../utils/carriers/sagawa';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('SagawaClient', () => {
  let sagawaClient: SagawaClient;

  beforeEach(() => {
    jest.clearAllMocks();
    sagawaClient = new SagawaClient();
  });

  describe('getTrackingInfo', () => {
    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = '123456789012';
      const result = await sagawaClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('currentLocation');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('carrier', '佐川急便');
      expect(result).toHaveProperty('additionalInfo');
      expect(result.additionalInfo).toHaveProperty('deliveryTimeWindow');
      expect(result.additionalInfo).toHaveProperty('weight');
      expect(result.additionalInfo).toHaveProperty('senderName', 'アパレルEC株式会社');
      expect(result.additionalInfo).toHaveProperty('deliveryType');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`佐川急便の配送状況を取得: ${trackingNumber}`);
    });

    test('配達予定日が現在から3日以内', async () => {
      const trackingNumber = '123456789012';
      const result = await sagawaClient.getTrackingInfo(trackingNumber);
      
      const now = new Date();
      const estimatedDelivery = new Date(result.estimatedDelivery);
      const timeDiff = estimatedDelivery.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      expect(daysDiff).toBeGreaterThan(0);
      expect(daysDiff).toBeLessThanOrEqual(4); // 当日含む最大4日
    });

    test('APIエラー時に適切にエラーをスローする', async () => {
      // APIエラーをシミュレート
      jest.spyOn(sagawaClient as any, 'getTrackingInfo').mockImplementationOnce(() => {
        throw new Error('APIエラー');
      });

      const trackingNumber = '123456789012';
      
      await expect(sagawaClient.getTrackingInfo(trackingNumber)).rejects.toThrow();
      
      // エラーログが記録されることを期待
      expect(logger.error).toHaveBeenCalled();
    });
  });
}); 