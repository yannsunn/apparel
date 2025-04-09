import { UPSClient } from '@/utils/carriers/ups';
import axios from 'axios';
import { PackageStatus } from '@/types/shipping';
import logger from '../../../lib/logger';

// axiosをモック化
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('UPSClient', () => {
  let upsClient: UPSClient;

  beforeEach(() => {
    upsClient = new UPSClient();
    jest.clearAllMocks();
  });

  describe('validateTrackingNumber', () => {
    test('有効なUPS追跡番号を検証する', () => {
      expect(upsClient.validateTrackingNumber('1Z12345E6205277936')).toBe(true);
      expect(upsClient.validateTrackingNumber('1Z999AA1234567890')).toBe(true);
    });

    test('無効なUPS追跡番号を検証する', () => {
      expect(upsClient.validateTrackingNumber('1Z123')).toBe(false);
      expect(upsClient.validateTrackingNumber('12345678901234')).toBe(false);
      expect(upsClient.validateTrackingNumber('')).toBe(false);
      expect(upsClient.validateTrackingNumber('ABC123456789')).toBe(false);
    });
  });

  describe('getTrackingInfo', () => {
    test('追跡情報を正常に取得する', async () => {
      // モックレスポンスの設定
      const mockResponse = {
        data: {
          trackResponse: {
            shipment: [
              {
                service: {
                  description: 'UPS Next Day Air'
                },
                estimatedDelivery: '2023-07-15T15:30:00Z',
                package: [
                  {
                    currentStatus: {
                      code: 'I',
                      description: 'In Transit'
                    },
                    activity: [
                      {
                        date: '2023-07-14T10:00:00Z',
                        location: {
                          city: 'Tokyo',
                          countryCode: 'JP'
                        },
                        status: {
                          code: 'I',
                          description: 'Package in transit'
                        }
                      },
                      {
                        date: '2023-07-13T08:30:00Z',
                        location: {
                          city: 'Osaka',
                          countryCode: 'JP'
                        },
                        status: {
                          code: 'P',
                          description: 'Package picked up'
                        }
                      }
                    ],
                    packageWeight: {
                      weight: '2.5',
                      unitOfMeasurement: 'kg'
                    },
                    packageDimensions: {
                      length: '30',
                      width: '20',
                      height: '10',
                      unitOfMeasurement: 'cm'
                    }
                  }
                ]
              }
            ]
          }
        }
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const trackingNumber = '1Z12345E6205277936';
      const result = await upsClient.getTrackingInfo(trackingNumber);

      // APIが正しく呼ばれたことを確認
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(trackingNumber),
        expect.any(Object)
      );

      // 結果の検証
      expect(result.trackingNumber).toBe(trackingNumber);
      expect(result.carrier).toBe('UPS');
      expect(result.status).toBe(PackageStatus.InTransit);
      expect(result.events.length).toBe(2);
      
      // イベントの検証
      expect(result.events[0].status).toBe(PackageStatus.InTransit);
      expect(result.events[1].status).toBe(PackageStatus.PickedUp);
      
      // 荷物情報の検証
      expect(result.packageInfo.weight?.value).toBe(2.5);
      expect(result.packageInfo.weight?.unit).toBe('kg');
      expect(result.packageInfo.dimensions?.length).toBe(30);
    });

    test('無効な追跡番号の場合はエラーをスローする', async () => {
      const invalidTrackingNumber = '12345';
      
      await expect(upsClient.getTrackingInfo(invalidTrackingNumber))
        .rejects
        .toThrow('Invalid UPS tracking number format');
      
      // APIが呼ばれていないことを確認
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    test('API呼び出しが失敗した場合はエラーをスローする', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API error'));
      
      const trackingNumber = '1Z12345E6205277936';
      
      await expect(upsClient.getTrackingInfo(trackingNumber))
        .rejects
        .toThrow('Failed to get tracking information from UPS: API error');
    });

    test('無効なレスポンスの場合はエラーをスローする', async () => {
      // 無効なレスポンスの設定
      mockedAxios.get.mockResolvedValueOnce({ data: {} });
      
      const trackingNumber = '1Z12345E6205277936';
      
      await expect(upsClient.getTrackingInfo(trackingNumber))
        .rejects
        .toThrow('Invalid response from UPS API');
    });

    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = '1Z999AA1234567890';
      const result = await upsClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('statusDetail');
      expect(result).toHaveProperty('deliveryAddress');
      expect(result).toHaveProperty('events');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('shipDate');
      expect(result).toHaveProperty('serviceType');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`UPSの配送状況を取得: ${trackingNumber}`);
    });

    test('追跡番号のフォーマットが正しい', async () => {
      const trackingNumber = '1Z999AA1234567890';
      await upsClient.getTrackingInfo(trackingNumber);
      
      // UPS追跡番号の形式が正しいこと
      const upsTrackingPattern = /^1Z[A-Z0-9]{16}$/;
      expect(upsTrackingPattern.test(trackingNumber)).toBe(true);
    });

    test('配達ステータスが定義されたステータスコードである', async () => {
      const trackingNumber = '1Z999AA1234567890';
      const result = await upsClient.getTrackingInfo(trackingNumber);
      
      // UPSの定義されたステータスコードのリスト
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

    test('イベントが時系列順に並んでいる', async () => {
      const trackingNumber = '1Z999AA1234567890';
      const result = await upsClient.getTrackingInfo(trackingNumber);
      
      expect(Array.isArray(result.events)).toBe(true);
      expect(result.events.length).toBeGreaterThan(0);
      
      // イベントが時系列順に並んでいることを確認（最新のイベントが先頭）
      const timestamps = result.events.map(event => new Date(event.timestamp).getTime());
      const sortedTimestamps = [...timestamps].sort((a, b) => b - a);
      expect(timestamps).toEqual(sortedTimestamps);
    });

    test('配達予定日が有効な日付形式である', async () => {
      const trackingNumber = '1Z999AA1234567890';
      const result = await upsClient.getTrackingInfo(trackingNumber);
      
      if (result.estimatedDelivery) {
        const estimatedDelivery = new Date(result.estimatedDelivery);
        expect(estimatedDelivery instanceof Date).toBe(true);
        expect(isNaN(estimatedDelivery.getTime())).toBe(false);
        
        // 配達予定日が過去の日付でない
        const now = new Date();
        if (result.status !== 'DELIVERED') {
          expect(estimatedDelivery.getTime()).toBeGreaterThanOrEqual(now.setHours(0, 0, 0, 0));
        }
      }
    });

    test('パッケージ情報が正しく設定されている', async () => {
      const trackingNumber = '1Z999AA1234567890';
      const result = await upsClient.getTrackingInfo(trackingNumber);
      
      if (result.packageInfo) {
        expect(result.packageInfo).toHaveProperty('weight');
        expect(result.packageInfo.weight).toBeGreaterThan(0);
        
        if (result.packageInfo.dimensions) {
          expect(result.packageInfo.dimensions).toHaveProperty('length');
          expect(result.packageInfo.dimensions).toHaveProperty('width');
          expect(result.packageInfo.dimensions).toHaveProperty('height');
          expect(result.packageInfo.dimensions).toHaveProperty('unit');
        }
      }
    });

    test('配送オプションが正しく設定されている', async () => {
      const trackingNumber = '1Z999AA1234567890';
      const result = await upsClient.getTrackingInfo(trackingNumber);
      
      if (result.deliveryOptions) {
        expect(Array.isArray(result.deliveryOptions)).toBe(true);
        
        // 一般的な配送オプション
        const commonOptions = [
          'SIGNATURE_REQUIRED',
          'SATURDAY_DELIVERY',
          'ADDRESS_CORRECTION',
          'DIRECT_DELIVERY',
          'HOLD_FOR_PICKUP'
        ];
        
        result.deliveryOptions.forEach(option => {
          expect(commonOptions).toContain(option);
        });
      }
    });

    test('無効な追跡番号でエラーをスロー', async () => {
      const invalidTrackingNumber = 'invalid';
      
      await expect(upsClient.getTrackingInfo(invalidTrackingNumber)).rejects.toThrow();
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalled();
    });

    test('APIエラー時に適切なエラーログが記録される', async () => {
      // APIエラーをシミュレート
      jest.spyOn(upsClient as any, 'callAPI').mockImplementationOnce(() => {
        throw new Error('UPS APIエラー');
      });

      const trackingNumber = '1Z999AA1234567890';
      
      await expect(upsClient.getTrackingInfo(trackingNumber)).rejects.toThrow('UPS APIエラー');
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('UPS APIエラー'),
        expect.objectContaining({ trackingNumber })
      );
    });
    
    test('認証エラー時に適切なエラーログが記録される', async () => {
      // 認証エラーをシミュレート
      jest.spyOn(upsClient as any, 'getAuthToken').mockImplementationOnce(() => {
        throw new Error('UPS認証エラー');
      });

      const trackingNumber = '1Z999AA1234567890';
      
      await expect(upsClient.getTrackingInfo(trackingNumber)).rejects.toThrow('UPS認証エラー');
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('UPS認証エラー'),
        expect.objectContaining({ trackingNumber })
      );
    });
  });
}); 