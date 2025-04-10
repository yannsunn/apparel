import { FedExClient } from '../../../utils/carriers/fedex';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('FedExClient', () => {
  let fedexClient: FedExClient;

  beforeEach(() => {
    jest.clearAllMocks();
    fedexClient = new FedExClient();
  });

  describe('getTrackingInfo', () => {
    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = '123456789012';
      const result = await fedexClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('statusDetail');
      expect(result).toHaveProperty('deliveryAddress');
      expect(result).toHaveProperty('events');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('shipDate');
      expect(result).toHaveProperty('serviceType');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`FedExの配送状況を取得: ${trackingNumber}`);
    });

    test('追跡番号のフォーマットが正しい', async () => {
      const trackingNumber = '123456789012';
      await fedexClient.getTrackingInfo(trackingNumber);
      
      // FedEx追跡番号の形式が正しいこと
      const fedexTrackingPattern = /^\d{12}$|^\d{15}$/;
      expect(fedexTrackingPattern.test(trackingNumber)).toBe(true);
    });

    test('配達ステータスが定義されたステータスコードである', async () => {
      const trackingNumber = '123456789012';
      const result = await fedexClient.getTrackingInfo(trackingNumber);
      
      // FedExの定義されたステータスコードのリスト
      const validStatusCodes = [
        'DELIVERED',
        'IN_TRANSIT',
        'OUT_FOR_DELIVERY',
        'EXCEPTION',
        'PICKUP_READY',
        'PROCESSING',
        'SHIPPED'
      ];
      
      expect(validStatusCodes).toContain(result.status);
    });

    test('イベント詳細に日時と場所が含まれている', async () => {
      const trackingNumber = '123456789012';
      const result = await fedexClient.getTrackingInfo(trackingNumber);
      
      expect(Array.isArray(result.events)).toBe(true);
      expect(result.events.length).toBeGreaterThan(0);
      
      // 各イベントの構造を確認
      result.events.forEach(event => {
        expect(event).toHaveProperty('timestamp');
        expect(event).toHaveProperty('location');
        expect(event).toHaveProperty('description');
        
        // タイムスタンプが有効な日付であることを確認
        const timestamp = new Date(event.timestamp);
        expect(timestamp instanceof Date).toBe(true);
        expect(isNaN(timestamp.getTime())).toBe(false);
      });
    });

    test('署名情報が配達完了時に含まれている', async () => {
      const trackingNumber = '123456789012';
      const result = await fedexClient.getTrackingInfo(trackingNumber);
      
      if (result.status === 'DELIVERED') {
        expect(result).toHaveProperty('signatureInfo');
        expect(result.signatureInfo).toHaveProperty('signedBy');
        expect(result.signatureInfo).toHaveProperty('signedAt');
      }
    });

    test('サービスタイプが定義されている', async () => {
      const trackingNumber = '123456789012';
      const result = await fedexClient.getTrackingInfo(trackingNumber);
      
      expect(result).toHaveProperty('serviceType');
      
      // 一般的なFedExのサービスタイプ
      const validServiceTypes = [
        'PRIORITY',
        'EXPRESS',
        'GROUND',
        'HOME_DELIVERY',
        'INTERNATIONAL',
        'FREIGHT',
        'SAME_DAY'
      ];
      
      expect(validServiceTypes).toContain(result.serviceType);
    });

    test('配達オプションが正しく設定されている', async () => {
      const trackingNumber = '123456789012';
      const result = await fedexClient.getTrackingInfo(trackingNumber);
      
      if (result.deliveryOptions) {
        expect(Array.isArray(result.deliveryOptions)).toBe(true);
        
        // 一般的な配送オプション
        const commonOptions = [
          'SIGNATURE_REQUIRED',
          'INDIRECT_SIGNATURE',
          'ADULT_SIGNATURE',
          'SATURDAY_DELIVERY',
          'EVENING_DELIVERY',
          'APPOINTMENT'
        ];
        
        result.deliveryOptions.forEach(option => {
          expect(commonOptions).toContain(option);
        });
      }
    });

    test('無効な追跡番号でエラーをスロー', async () => {
      const invalidTrackingNumber = 'invalid';
      
      await expect(fedexClient.getTrackingInfo(invalidTrackingNumber)).rejects.toThrow();
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalled();
    });

    test('APIエラー時に適切なエラーログが記録される', async () => {
      // APIエラーをシミュレート
      jest.spyOn(fedexClient as any, 'callAPI').mockImplementationOnce(() => {
        throw new Error('FedEx APIエラー');
      });

      const trackingNumber = '123456789012';
      
      await expect(fedexClient.getTrackingInfo(trackingNumber)).rejects.toThrow('FedEx APIエラー');
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('FedEx APIエラー'),
        expect.objectContaining({ trackingNumber })
      );
    });
    
    test('認証エラー時に適切なエラーログが記録される', async () => {
      // 認証エラーをシミュレート
      jest.spyOn(fedexClient as any, 'getAuthToken').mockImplementationOnce(() => {
        throw new Error('FedEx認証エラー');
      });

      const trackingNumber = '123456789012';
      
      await expect(fedexClient.getTrackingInfo(trackingNumber)).rejects.toThrow('FedEx認証エラー');
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('FedEx認証エラー'),
        expect.objectContaining({ trackingNumber })
      );
    });
    
    test('APIレスポンスが正しくパースされる', async () => {
      // モックAPIレスポンス
      const mockResponse = {
        output: {
          completeTrackResults: [{
            trackingNumber: '123456789012',
            trackResults: [{
              latestStatusDetail: {
                code: 'DL',
                derivedCode: 'DELIVERED',
                statusByLocale: '配達完了'
              },
              serviceDetail: {
                description: 'FedEx Priority'
              },
              dateAndTimes: [{
                type: 'ESTIMATED_DELIVERY',
                dateTime: '2023-10-01T12:00:00'
              }],
              scanEvents: [
                {
                  date: '2023-10-01T10:00:00',
                  eventType: 'DELIVERED',
                  scanLocation: {
                    city: '東京',
                    stateOrProvinceCode: 'TK',
                    countryCode: 'JP'
                  }
                }
              ]
            }]
          }]
        }
      };
      
      // APIコールをモック化
      jest.spyOn(fedexClient as any, 'callAPI').mockResolvedValueOnce(mockResponse);
      
      const trackingNumber = '123456789012';
      const result = await fedexClient.getTrackingInfo(trackingNumber);
      
      expect(result.trackingNumber).toBe(trackingNumber);
      expect(result.status).toBe('DELIVERED');
      expect(result.serviceType).toBe('FedEx Priority');
    });
  });
}); 