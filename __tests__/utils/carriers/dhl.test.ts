import { DHLClient } from '../../../utils/carriers/dhl';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('DHLClient', () => {
  let dhlClient: DHLClient;

  beforeEach(() => {
    jest.clearAllMocks();
    dhlClient = new DHLClient();
  });

  describe('getTrackingInfo', () => {
    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = 'JD123456789';
      const result = await dhlClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('currentLocation');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('serviceType');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`DHLの配送状況を取得: ${trackingNumber}`);
    });

    test('サービスタイプが設定され、文字列である', async () => {
      const trackingNumber = 'JD123456789';
      const result = await dhlClient.getTrackingInfo(trackingNumber);
      
      expect(result.serviceType).toBeDefined();
      expect(typeof result.serviceType).toBe('string');
    });

    test('国際配送の場合は税関情報が含まれている', async () => {
      const trackingNumber = 'JD123456789';
      const result = await dhlClient.getTrackingInfo(trackingNumber);
      
      if (result.isInternational) {
        expect(result).toHaveProperty('customsStatus');
        expect(typeof result.customsStatus).toBe('string');
      }
    });

    test('配達予定日が将来の日付である', async () => {
      const trackingNumber = 'JD123456789';
      const result = await dhlClient.getTrackingInfo(trackingNumber);
      
      // 配達予定日が有効な日付であることを確認
      const estimatedDelivery = new Date(result.estimatedDelivery);
      expect(estimatedDelivery instanceof Date).toBe(true);
      expect(isNaN(estimatedDelivery.getTime())).toBe(false);
      
      // 配達予定日が現在より後であることを確認
      const now = new Date();
      expect(estimatedDelivery.getTime()).toBeGreaterThanOrEqual(now.getTime());
    });

    test('配送履歴が正確なタイムスタンプで時系列順に並んでいる', async () => {
      const trackingNumber = 'JD123456789';
      const result = await dhlClient.getTrackingInfo(trackingNumber);
      
      expect(Array.isArray(result.events)).toBe(true);
      expect(result.events.length).toBeGreaterThan(0);
      
      // イベントが時系列順に並んでいるか確認（最新のものが先頭）
      for (let i = 0; i < result.events.length - 1; i++) {
        const currentEventTime = new Date(result.events[i].timestamp).getTime();
        const nextEventTime = new Date(result.events[i+1].timestamp).getTime();
        expect(currentEventTime).toBeGreaterThanOrEqual(nextEventTime);
      }
    });

    test('無効な追跡番号でエラーをスロー', async () => {
      const invalidTrackingNumber = 'invalid';
      
      await expect(dhlClient.getTrackingInfo(invalidTrackingNumber)).rejects.toThrow();
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalled();
    });

    test('APIエラー時に適切なエラーログが記録される', async () => {
      // APIエラーをシミュレート
      jest.spyOn(dhlClient as any, 'fetchFromApi').mockImplementationOnce(() => {
        throw new Error('DHL APIエラー');
      });

      const trackingNumber = 'JD123456789';
      
      await expect(dhlClient.getTrackingInfo(trackingNumber)).rejects.toThrow('DHL APIエラー');
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('DHL APIエラー'),
        expect.objectContaining({ trackingNumber })
      );
    });
  });
}); 