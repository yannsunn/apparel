import logger from '../../lib/logger';
import { CarrierClient, TrackingInfo } from '../../types/tracking';

export class JapanPostClient implements CarrierClient {
  private apiKey: string;
  private baseUrl: string;

  /**
   * Initialize Japan Post client
   * @param apiKey API authentication key
   * @param baseUrl API base URL (optional)
   */
  constructor(apiKey: string, baseUrl: string = 'https://api.post.japanpost.jp/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Get tracking information
   * @param trackingNumber Tracking number
   * @returns Tracking information
   */
  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    try {
      logger.info(`Getting Japan Post tracking info: ${trackingNumber}`);
      
      // Check if tracking number matches Japan Post format
      // Japan Post tracking numbers are 11-13 characters
      const isValidFormat = /^\d{11,13}$/.test(trackingNumber);
      
      if (!isValidFormat) {
        throw new Error('Invalid Japan Post tracking number format');
      }
      
      // Generate random status for the mock
      const statuses = [
        '集荷完了',
        '配送中',
        '配達中',
        '配達完了',
        '保管中',
        '返送中'
      ];
      
      // Random locations for the mock
      const locations = [
        '東京中央郵便局',
        '大阪中央郵便局',
        '横浜中央郵便局',
        '名古屋中央郵便局',
        '福岡中央郵便局',
        '札幌中央郵便局',
        '仙台中央郵便局'
      ];
      
      // Current date and random status
      const now = new Date();
      const statusIndex = Math.floor(Math.random() * statuses.length);
      const randomStatus = statuses[statusIndex];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      // Estimated delivery date (0-3 days from now)
      // If delivered, use current date or slightly in the past
      let estimatedDelivery;
      if (randomStatus === '配達完了') {
        // Delivered items use a random time earlier today
        const deliveredDate = new Date();
        deliveredDate.setHours(deliveredDate.getHours() - Math.floor(Math.random() * 8));
        estimatedDelivery = deliveredDate.toISOString();
      } else {
        // For items in transit, estimate 1-3 days from now
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 1);
        estimatedDelivery = deliveryDate.toISOString();
      }
      
      return {
        trackingNumber,
        status: randomStatus,
        currentLocation: randomLocation,
        description: `荷物は${randomLocation}にあります。${randomStatus}です。`,
        timestamp: now.toISOString(),
        estimatedDelivery,
        carrier: 'japanpost',
        additionalInfo: {
          deliveryTimeWindow: '14:00-16:00',
          packageSize: '60サイズ',
          deliveryType: 'ゆうパック',
          senderName: '日本郵便株式会社'
        }
      };
    
    } catch (error) {
      logger.error(`Error getting Japan Post tracking information: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new Error(`日本郵便の配送情報の取得に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 