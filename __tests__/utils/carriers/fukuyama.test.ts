import { FukuyamaClient } from '../../../utils/carriers/fukuyama';
import logger from '../../../lib/logger';

// モックの設定
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('FukuyamaClient', () => {
  let fukuyamaClient: FukuyamaClient;
  
  beforeEach(() => {
    fukuyamaClient = new FukuyamaClient();
    jest.clearAllMocks();
  });
  
  describe('getTrackingInfo', () => {
    it('正しい追跡番号で追跡情報を返すこと', async () => {
      // テスト実行
      const trackingNumber = '123456789012';
      const result = await fukuyamaClient.getTrackingInfo(trackingNumber);
      
      // アサーション
      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('currentLocation');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('carrier', '福山通運');
      expect(result.additionalInfo).toHaveProperty('deliveryTimeWindow');
      expect(result.additionalInfo).toHaveProperty('weight');
      expect(result.additionalInfo).toHaveProperty('senderName');
      expect(result.additionalInfo).toHaveProperty('deliveryType');
      
      // ログ記録の確認
      expect(logger.info).toHaveBeenCalledWith(`福山通運の配送状況を取得: ${trackingNumber}`);
    });
    
    it('配達予定日が正しい日付範囲内であること', async () => {
      // テスト実行
      const result = await fukuyamaClient.getTrackingInfo('123456789012');
      
      // 現在の日付
      const now = new Date();
      
      // 配達予定日を取得して日付オブジェクトに変換
      const estimatedDelivery = new Date(result.estimatedDelivery);
      
      // 配達予定日が現在から1〜4日以内であることを確認
      const differenceInDays = Math.floor((estimatedDelivery.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      expect(differenceInDays).toBeGreaterThanOrEqual(1);
      expect(differenceInDays).toBeLessThanOrEqual(4);
    });
    
    it('API呼び出しエラー時に適切にエラーログを記録すること', async () => {
      // モックでエラーを発生させる
      jest.spyOn(fukuyamaClient, 'getTrackingInfo').mockImplementationOnce(() => {
        throw new Error('APIエラー');
      });
      
      // テスト実行とアサーション
      await expect(fukuyamaClient.getTrackingInfo('123456789012')).rejects.toThrow('配送状況の取得に失敗しました');
      expect(logger.error).toHaveBeenCalled();
    });
  });
}); 