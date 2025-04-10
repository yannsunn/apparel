import logger from '../../lib/logger';
import { CarrierClient, TrackingInfo } from '../../types/tracking';

/**
 * ヤマト運輸の追跡APIクライアントモック実装
 */
export class YamatoClient implements CarrierClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.yamato.co.jp/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * ヤマト運輸の配送状況を取得する
   * 注: これはモック実装です
   */
  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    try {
      logger.info(`Requesting tracking info for Yamato tracking number: ${trackingNumber}`);

      // モックデータを生成
      const statuses = ['配送中', '配達完了', '集荷完了', '配送遅延'];
      const locations = ['東京都中央区', '大阪府大阪市', '愛知県名古屋市', '福岡県福岡市'];
      
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      const now = new Date();
      const estimatedDelivery = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);

      return {
        trackingNumber,
        status: randomStatus,
        currentLocation: randomLocation,
        description: `荷物は${randomLocation}にあります。${randomStatus}です。`,
        timestamp: now.toISOString(),
        estimatedDelivery: estimatedDelivery.toISOString(),
        carrier: 'yamato',
        additionalInfo: {
          deliveryTimeWindow: '14:00-16:00',
          packageSize: '60サイズ',
          weight: `${Math.floor(Math.random() * 10) + 1}kg`,
          deliveryType: '通常配送'
        }
      };
    } catch (error) {
      logger.error('Error fetching Yamato tracking info:', error);
      throw new Error('ヤマトの配送情報の取得に失敗しました');
    }
  }
} 