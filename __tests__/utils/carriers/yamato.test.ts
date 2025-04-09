import { YamatoClient } from '@utils/carriers/yamato';
import { jest } from '@jest/globals';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('YamatoClient', () => {
  let yamatoClient: YamatoClient;
  
  beforeEach(() => {
    // モックの日付を固定
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-01-01'));
    
    yamatoClient = new YamatoClient('test-api-key');
  });
  
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  
  describe('getTrackingInfo', () => {
    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = '123456789012';
      const result = await yamatoClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('currentLocation');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('carrier', 'ヤマト運輸');
      expect(result).toHaveProperty('additionalInfo');
      expect(result.additionalInfo).toHaveProperty('deliveryTimeWindow');
      expect(result.additionalInfo).toHaveProperty('packageSize');
      expect(result.additionalInfo).toHaveProperty('coolDelivery');
      expect(result.additionalInfo).toHaveProperty('deliveryType');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`ヤマト運輸の配送状況を取得: ${trackingNumber}`);
    });

    test('同じ追跡番号で複数回呼び出しても異なる結果を返す可能性がある', async () => {
      const trackingNumber = '123456789012';
      const result1 = await yamatoClient.getTrackingInfo(trackingNumber);
      
      // キャッシュをクリアするために少し待機
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const result2 = await yamatoClient.getTrackingInfo(trackingNumber);
      
      // タイムスタンプが異なることを確認 (ランダム性の検証)
      expect(result1.timestamp).not.toBe(result2.timestamp);
      
      // ログが2回呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledTimes(2);
    });

    test('不正な追跡番号でもエラーにならない', async () => {
      const invalidTrackingNumber = 'invalid';
      
      // エラーがスローされないことを確認
      await expect(yamatoClient.getTrackingInfo(invalidTrackingNumber)).resolves.not.toThrow();
      
      const result = await yamatoClient.getTrackingInfo(invalidTrackingNumber);
      expect(result).toHaveProperty('trackingNumber', invalidTrackingNumber);
    });

    test('有効な追跡番号で正しいトラッキング情報の構造を返す', async () => {
      const trackingNumber = '123456789012';
      const result = await yamatoClient.getTrackingInfo(trackingNumber);
      
      // ステータスが定義された配列の中の値であることを確認
      const validStatuses = ['発送完了', 'ベース店到着', '配達店到着', '配達準備中', '配達中', 'お届け完了', '持ち戻り'];
      expect(validStatuses).toContain(result.status);
      
      // 場所が定義された配列の中の値であることを確認
      const validLocations = ['東京ベース', '新東京ターミナル', '大阪ベース', '名古屋ベース', '福岡ベース', '札幌ベース'];
      expect(validLocations).toContain(result.currentLocation);
      
      // 配達時間枠が定義された配列の中の値であることを確認
      const validTimeWindows = ['指定なし', '午前中', '14時-16時', '16時-18時', '18時-20時', '19時-21時'];
      expect(validTimeWindows).toContain(result.additionalInfo.deliveryTimeWindow);
    });

    test('配達予定日が現在から3日以内', async () => {
      const trackingNumber = '123456789012';
      const result = await yamatoClient.getTrackingInfo(trackingNumber);
      
      const now = new Date();
      const estimatedDelivery = new Date(result.estimatedDelivery);
      const timeDiff = estimatedDelivery.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      expect(daysDiff).toBeGreaterThan(0);
      expect(daysDiff).toBeLessThanOrEqual(4); // 当日含む最大4日
    });

    test('追跡状況の説明文が正しいフォーマット', async () => {
      const trackingNumber = '123456789012';
      const result = await yamatoClient.getTrackingInfo(trackingNumber);
      
      // 「お荷物は[配送場所]で[ステータス]になりました」の形式であることを確認
      expect(result.description).toBe(`お荷物は${result.currentLocation}で${result.status}になりました`);
    });

    test('APIエラー時に適切にエラーをスローする', async () => {
      // APIエラーをシミュレート
      jest.spyOn(yamatoClient as any, 'getTrackingInfo').mockImplementationOnce(() => {
        throw new Error('APIエラー');
      });

      const trackingNumber = '123456789012';
      
      await expect(yamatoClient.getTrackingInfo(trackingNumber)).rejects.toThrow();
      
      // エラーログが記録されることを期待
      expect(logger.error).toHaveBeenCalled();
    });
  });
}); 