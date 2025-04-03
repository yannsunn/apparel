import axios from 'axios';

interface TrackingData {
  status: string;
  currentLocation: string;
  estimatedDelivery: string | null;
  description: string;
}

export class JapanPostClient {
  private readonly baseUrl = 'https://api.post.japanpost.jp/tracking';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingData> {
    try {
      // 実際のAPIエンドポイントとパラメータに置き換えてください
      const response = await axios.get(`${this.baseUrl}/${trackingNumber}`, {
        headers: {
          'Authorization': `Bearer ${process.env.JAPAN_POST_API_KEY}`,
        },
      });

      const data = response.data;

      // APIレスポンスを標準形式に変換
      return {
        status: this.mapStatus(data.status),
        currentLocation: data.currentLocation,
        estimatedDelivery: data.estimatedDelivery,
        description: data.description,
      };
    } catch (error) {
      console.error('日本郵便APIエラー:', error);
      throw new Error('配送状況の取得に失敗しました');
    }
  }

  private mapStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ACCEPTED': '受付完了',
      'IN_TRANSIT': '配送中',
      'OUT_FOR_DELIVERY': '配達中',
      'DELIVERED': '配達完了',
      'EXCEPTION': '配送エラー',
    };

    return statusMap[status] || status;
  }
} 