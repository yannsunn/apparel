import logger from '../../lib/logger';

/**
 * 西濃運輸のAPIクライアントモック実装
 */
export class SeinoClient {
  private apiKey: string;
  private baseUrl: string;

  /**
   * 西濃運輸クライアントのコンストラクタ
   * @param apiKey API認証キー（オプション）
   * @param baseUrl API基本URL（オプション）
   */
  constructor(apiKey: string = 'mock-api-key', baseUrl: string = 'https://api.seino.co.jp/tracking') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * 追跡番号から荷物の配送状況を取得する
   * @param trackingNumber 追跡番号
   * @returns 配送状況の詳細情報
   */
  async getTrackingInfo(trackingNumber: string) {
    try {
      logger.info(`西濃運輸の配送状況を取得: ${trackingNumber}`);

      // 配送ステータスをランダムに生成（モック）
      const statuses = ['配送準備中', '発送済み', '配送中', '配達完了'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      // 配送場所をランダムに生成（モック）
      const locations = ['東京営業所', '名古屋営業所', '大阪営業所', '福岡営業所', '仙台営業所'];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];

      // 現在の日時
      const now = new Date();
      
      // 配達予定日（1〜5日後をランダムに設定）
      const deliveryDate = new Date();
      deliveryDate.setDate(now.getDate() + Math.floor(Math.random() * 5) + 1);

      // 配達時間枠をランダムに生成
      const timeWindows = ['8:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'];
      const randomTimeWindow = timeWindows[Math.floor(Math.random() * timeWindows.length)];

      // 貨物種類をランダムに生成
      const cargoTypes = ['一般貨物', '精密機器', '冷蔵品', '冷凍品', '重量物'];
      const randomCargoType = cargoTypes[Math.floor(Math.random() * cargoTypes.length)];

      // モックレスポンスを返す
      return {
        trackingNumber,
        status: randomStatus,
        currentLocation: randomLocation,
        description: `お荷物は${randomLocation}で${randomStatus}です。`,
        timestamp: now.toISOString(),
        estimatedDelivery: deliveryDate.toISOString(),
        carrier: '西濃運輸',
        additionalInfo: {
          deliveryTimeWindow: randomTimeWindow,
          weight: `${Math.floor(Math.random() * 20) + 1}kg`,
          cargoType: randomCargoType,
          pickupAvailable: Math.random() > 0.5,
          specialHandling: Math.random() > 0.7 ? '要冷蔵' : null
        }
      };
    } catch (error) {
      logger.error(`西濃運輸の配送状況取得エラー: ${error.message}`, {
        trackingNumber,
        error
      });
      throw new Error('配送状況の取得に失敗しました');
    }
  }
} 