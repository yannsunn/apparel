import { SeinoClient } from '../../../utils/carriers/seino';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('SeinoClient', () => {
  let seinoClient: SeinoClient;
  
  beforeEach(() => {
    seinoClient = new SeinoClient();
    jest.clearAllMocks();
  });
  
  describe('getTrackingInfo', () => {
    test('正しい追跡番号で配送情報を返す', async () => {
      const trackingNumber = '123456789012';
      const result = await seinoClient.getTrackingInfo(trackingNumber);
      
      // 基本的な構造の検証
      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('currentLocation');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('carrier', '西濃運輸');
      
      // 追加情報の検証
      expect(result).toHaveProperty('additionalInfo');
      expect(result.additionalInfo).toHaveProperty('deliveryTimeWindow');
      expect(result.additionalInfo).toHaveProperty('weight');
      expect(result.additionalInfo).toHaveProperty('cargoType');
      expect(result.additionalInfo).toHaveProperty('pickupAvailable');
      
      // ロガーが正しく呼び出されたか検証
      expect(logger.info).toHaveBeenCalledWith(`西濃運輸の配送状況を取得: ${trackingNumber}`);
    });
    
    test('配達予定日が適切な範囲内にある', async () => {
      const result = await seinoClient.getTrackingInfo('123456789012');
      
      // 配達予定日が現在から1〜6日後であることを確認
      const estimatedDelivery = new Date(result.estimatedDelivery);
      const now = new Date();
      const diffDays = Math.floor((estimatedDelivery.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      expect(diffDays).toBeGreaterThanOrEqual(1);
      expect(diffDays).toBeLessThanOrEqual(6);
    });
    
    test('APIエラー時に適切にエラーハンドリングする', async () => {
      // APIエラーをシミュレート
      jest.spyOn(seinoClient as any, 'getTrackingInfo').mockImplementationOnce(() => {
        throw new Error('API error');
      });
      
      const trackingNumber = '123456789012';
      
      await expect(seinoClient.getTrackingInfo(trackingNumber)).rejects.toThrow('配送状況の取得に失敗しました');
      expect(logger.error).toHaveBeenCalled();
    });
  });
}); 