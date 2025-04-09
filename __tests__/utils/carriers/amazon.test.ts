import { AmazonClient } from '../../../utils/carriers/amazon';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('AmazonClient', () => {
  let amazonClient: AmazonClient;

  beforeEach(() => {
    jest.clearAllMocks();
    amazonClient = new AmazonClient();
  });

  describe('getTrackingInfo', () => {
    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = 'TBA123456789XYZ';
      const result = await amazonClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('currentLocation');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('additionalInfo');
      expect(result.additionalInfo).toHaveProperty('deliveryWindow');
      expect(result.additionalInfo).toHaveProperty('packageCount');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`Amazonの配送状況を取得: ${trackingNumber}`);
    });

    test('配達予定ウィンドウが開始時間と終了時間を持つ', async () => {
      const trackingNumber = 'TBA123456789XYZ';
      const result = await amazonClient.getTrackingInfo(trackingNumber);
      
      expect(result.additionalInfo.deliveryWindow).toHaveProperty('start');
      expect(result.additionalInfo.deliveryWindow).toHaveProperty('end');
      
      const start = new Date(result.additionalInfo.deliveryWindow.start);
      const end = new Date(result.additionalInfo.deliveryWindow.end);
      
      // 開始時間が終了時間より前であることを確認
      expect(start.getTime()).toBeLessThan(end.getTime());
    });

    test('パッケージ数が正の整数である', async () => {
      const trackingNumber = 'TBA123456789XYZ';
      const result = await amazonClient.getTrackingInfo(trackingNumber);
      
      expect(result.additionalInfo.packageCount).toBeGreaterThan(0);
      expect(Number.isInteger(result.additionalInfo.packageCount)).toBe(true);
    });

    test('無効な追跡番号でもエラーなくレスポンスを返す', async () => {
      const trackingNumber = 'invalid';
      const result = await amazonClient.getTrackingInfo(trackingNumber);
      
      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      // その他のプロパティも確認
      
      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`Amazonの配送状況を取得: ${trackingNumber}`);
    });

    test('APIエラー時にエラーログが記録される', async () => {
      // APIエラーをシミュレート
      jest.spyOn(amazonClient as any, 'fetchFromApi').mockImplementationOnce(() => {
        throw new Error('APIエラー');
      });

      const trackingNumber = 'TBA123456789XYZ';
      
      try {
        await amazonClient.getTrackingInfo(trackingNumber);
      } catch (error) {
        // エラーをキャッチ
      }
      
      // エラーログが記録されることを期待
      expect(logger.error).toHaveBeenCalled();
    });
  });
}); 