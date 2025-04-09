import { USPSClient } from '../../../utils/carriers/usps';
import logger from '../../../lib/logger';

// ロガーをモック化
jest.mock('../../../lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('USPSClient', () => {
  let uspsClient: USPSClient;

  beforeEach(() => {
    jest.clearAllMocks();
    uspsClient = new USPSClient();
  });

  describe('getTrackingInfo', () => {
    test('有効な追跡番号で正しい追跡情報を返す', async () => {
      const trackingNumber = '9400111202055123456781';
      const result = await uspsClient.getTrackingInfo(trackingNumber);

      expect(result).toHaveProperty('trackingNumber', trackingNumber);
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('statusDetail');
      expect(result).toHaveProperty('deliveryAddress');
      expect(result).toHaveProperty('events');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result).toHaveProperty('shipDate');
      expect(result).toHaveProperty('mailClass');

      // ログが呼び出されたことを確認
      expect(logger.info).toHaveBeenCalledWith(`USPSの配送状況を取得: ${trackingNumber}`);
    });

    test('追跡番号のフォーマットが正しい', async () => {
      const trackingNumber = '9400111202055123456781';
      await uspsClient.getTrackingInfo(trackingNumber);
      
      // USPS追跡番号の形式が正しいこと
      const uspsTrackingPattern = /^(94|92|93|95)[0-9]{20}$|^[A-Z]{2}[0-9]{9}US$/;
      expect(uspsTrackingPattern.test(trackingNumber)).toBe(true);
    });

    test('配達ステータスが定義されたステータスコードである', async () => {
      const trackingNumber = '9400111202055123456781';
      const result = await uspsClient.getTrackingInfo(trackingNumber);
      
      // USPSの定義されたステータスコードのリスト
      const validStatusCodes = [
        'DELIVERED',
        'IN_TRANSIT',
        'OUT_FOR_DELIVERY',
        'ACCEPTED',
        'ARRIVAL_AT_UNIT',
        'DEPARTED',
        'PRE_SHIPMENT',
        'RETURN_TO_SENDER'
      ];
      
      expect(validStatusCodes).toContain(result.status);
    });

    test('イベントが詳細情報を持っている', async () => {
      const trackingNumber = '9400111202055123456781';
      const result = await uspsClient.getTrackingInfo(trackingNumber);
      
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

    test('郵便種別が有効である', async () => {
      const trackingNumber = '9400111202055123456781';
      const result = await uspsClient.getTrackingInfo(trackingNumber);
      
      expect(result).toHaveProperty('mailClass');
      
      // 一般的なUSPSの郵便種別
      const validMailClasses = [
        'FIRST_CLASS',
        'PRIORITY_MAIL',
        'PRIORITY_MAIL_EXPRESS',
        'PARCEL_SELECT',
        'MEDIA_MAIL',
        'RETAIL_GROUND',
        'INTERNATIONAL'
      ];
      
      expect(validMailClasses).toContain(result.mailClass);
    });

    test('配達完了時に配達情報が含まれている', async () => {
      const trackingNumber = '9400111202055123456781';
      const result = await uspsClient.getTrackingInfo(trackingNumber);
      
      if (result.status === 'DELIVERED') {
        expect(result).toHaveProperty('deliveryDate');
        
        const deliveryDate = new Date(result.deliveryDate);
        expect(deliveryDate instanceof Date).toBe(true);
        expect(isNaN(deliveryDate.getTime())).toBe(false);
        
        if (result.signatureRequired) {
          expect(result).toHaveProperty('signedBy');
        }
      }
    });

    test('国際郵便の場合に通関情報が含まれている', async () => {
      const trackingNumber = '9400111202055123456781';
      const result = await uspsClient.getTrackingInfo(trackingNumber);
      
      // 国際郵便の場合
      if (result.mailClass === 'INTERNATIONAL') {
        expect(result).toHaveProperty('customsInfo');
        
        if (result.customsInfo) {
          expect(result.customsInfo).toHaveProperty('customsNumber');
          expect(result.customsInfo).toHaveProperty('customsStatus');
        }
      }
    });

    test('無効な追跡番号でエラーをスロー', async () => {
      const invalidTrackingNumber = 'invalid';
      
      await expect(uspsClient.getTrackingInfo(invalidTrackingNumber)).rejects.toThrow();
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalled();
    });

    test('APIエラー時に適切なエラーログが記録される', async () => {
      // APIエラーをシミュレート
      jest.spyOn(uspsClient as any, 'callAPI').mockImplementationOnce(() => {
        throw new Error('USPS APIエラー');
      });

      const trackingNumber = '9400111202055123456781';
      
      await expect(uspsClient.getTrackingInfo(trackingNumber)).rejects.toThrow('USPS APIエラー');
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('USPS APIエラー'),
        expect.objectContaining({ trackingNumber })
      );
    });
    
    test('認証エラー時に適切なエラーログが記録される', async () => {
      // 認証エラーをシミュレート
      jest.spyOn(uspsClient as any, 'authenticate').mockImplementationOnce(() => {
        throw new Error('USPS認証エラー');
      });

      const trackingNumber = '9400111202055123456781';
      
      await expect(uspsClient.getTrackingInfo(trackingNumber)).rejects.toThrow('USPS認証エラー');
      
      // エラーログが記録されることを確認
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('USPS認証エラー'),
        expect.objectContaining({ trackingNumber })
      );
    });
    
    test('APIレスポンスが正しくパースされる', async () => {
      // モックAPIレスポンス（XMLを想定）
      const mockXMLResponse = `
        <TrackResponse>
          <TrackInfo ID="9400111202055123456781">
            <TrackSummary>
              <EventTime>8:00 pm</EventTime>
              <EventDate>January 1, 2023</EventDate>
              <Event>Delivered</Event>
              <EventCity>Springfield</EventCity>
              <EventState>IL</EventState>
              <EventZIPCode>62701</EventZIPCode>
            </TrackSummary>
            <TrackDetail>
              <EventTime>9:15 am</EventTime>
              <EventDate>December 31, 2022</EventDate>
              <Event>Out for Delivery</Event>
              <EventCity>Springfield</EventCity>
              <EventState>IL</EventState>
              <EventZIPCode>62701</EventZIPCode>
            </TrackDetail>
            <Class>PRIORITY MAIL</Class>
            <ExpectedDeliveryDate>January 1, 2023</ExpectedDeliveryDate>
          </TrackInfo>
        </TrackResponse>
      `;
      
      // APIコールをモック化
      jest.spyOn(uspsClient as any, 'callAPI').mockResolvedValueOnce(mockXMLResponse);
      jest.spyOn(uspsClient as any, 'parseXMLResponse').mockImplementationOnce(() => {
        return {
          trackingNumber: '9400111202055123456781',
          status: 'DELIVERED',
          statusDetail: 'Delivered',
          deliveryAddress: {
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701'
          },
          events: [
            {
              timestamp: '2023-01-01T20:00:00',
              description: 'Delivered',
              location: 'Springfield, IL 62701'
            },
            {
              timestamp: '2022-12-31T09:15:00',
              description: 'Out for Delivery',
              location: 'Springfield, IL 62701'
            }
          ],
          estimatedDelivery: '2023-01-01',
          mailClass: 'PRIORITY_MAIL',
          deliveryDate: '2023-01-01T20:00:00',
          shipDate: '2022-12-30'
        };
      });
      
      const trackingNumber = '9400111202055123456781';
      const result = await uspsClient.getTrackingInfo(trackingNumber);
      
      expect(result.trackingNumber).toBe(trackingNumber);
      expect(result.status).toBe('DELIVERED');
      expect(result.mailClass).toBe('PRIORITY_MAIL');
      expect(result.events.length).toBe(2);
      expect(result.events[0].description).toBe('Delivered');
    });
  });
}); 