import { logger } from '../../lib/logger';
import { CarrierClient, TrackingInfo } from '../../types/tracking';

export class FukuyamaClient implements CarrierClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.fukuyama.co.jp') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    try {
      logger.info(`Requesting tracking info for Fukuyama tracking number: ${trackingNumber}`);

      // モックデータを生成
      const statuses = ['配送中', '集荷完了', '配達完了', '配送所到着'];
      const locations = ['東京', '大阪', '名古屋', '福山'];
      
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      const now = new Date();
      const estimatedDelivery = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);

      return {
        trackingNumber,
        status: randomStatus,
        currentLocation: randomLocation,
        description: `荷物は${randomLocation}にて${randomStatus}です。`,
        timestamp: now.toISOString(),
        estimatedDelivery: estimatedDelivery.toISOString(),
        carrier: 'fukuyama',
        additionalInfo: {
          weight: `${Math.floor(Math.random() * 20) + 1}kg`,
          deliveryType: '通常配送',
          senderName: '福山運輸株式会社'
        }
      };

    } catch (error) {
      logger.error(`Error fetching Fukuyama tracking info for ${trackingNumber}:`, error);
      throw new Error(`福山運輸の追跡情報の取得に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 