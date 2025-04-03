import axios from 'axios';
import { BaseCarrierClient, TrackingData } from './base';

export class YamatoClient extends BaseCarrierClient {
  private readonly baseUrl = 'https://api.yamato.co.jp/tracking';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingData> {
    // キャッシュをチェック
    const cached = await this.getCachedTrackingInfo(trackingNumber);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/${trackingNumber}`, {
        headers: {
          'Authorization': `Bearer ${process.env.YAMATO_API_KEY}`,
        },
      });

      const data = response.data;
      const trackingData: TrackingData = {
        status: this.mapStatus(data.status),
        currentLocation: data.currentLocation,
        estimatedDelivery: data.estimatedDelivery,
        description: data.description,
        timestamp: new Date().toISOString(),
      };

      // キャッシュを更新
      this.setCache(trackingNumber, trackingData);

      return trackingData;
    } catch (error) {
      console.error('ヤマト運輸APIエラー:', error);
      throw new Error('配送状況の取得に失敗しました');
    }
  }

  private mapStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PICKUP': '集荷完了',
      'IN_TRANSIT': '配送中',
      'OUT_FOR_DELIVERY': '配達中',
      'DELIVERED': '配達完了',
      'EXCEPTION': '配送エラー',
    };

    return statusMap[status] || status;
  }
} 