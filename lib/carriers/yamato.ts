import { CarrierClient, TrackingInfo } from '../../types/tracking';

export class YamatoClient implements CarrierClient {
  private baseUrl = 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    // モック実装 - 実際のAPIが利用可能になったら置き換えてください
    return {
      trackingNumber,
      status: '配送中',
      currentLocation: '東京都新宿区',
      description: 'お届け先に向けて配送中です',
      timestamp: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      carrier: 'yamato',
      additionalInfo: {
        deliveryType: '通常配送',
        signatureRequired: true,
        weight: '2.5kg',
        dimensions: '30cm x 20cm x 15cm'
      }
    };
  }

  getTrackingUrl(trackingNumber: string): string {
    return `${this.baseUrl}?number=${trackingNumber}`;
  }
} 
 

export class YamatoClient implements CarrierClient {
  private baseUrl = 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    // モック実装 - 実際のAPIが利用可能になったら置き換えてください
    return {
      trackingNumber,
      status: '配送中',
      currentLocation: '東京都新宿区',
      description: 'お届け先に向けて配送中です',
      timestamp: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      carrier: 'yamato',
      additionalInfo: {
        deliveryType: '通常配送',
        signatureRequired: true,
        weight: '2.5kg',
        dimensions: '30cm x 20cm x 15cm'
      }
    };
  }

  getTrackingUrl(trackingNumber: string): string {
    return `${this.baseUrl}?number=${trackingNumber}`;
  }
} 