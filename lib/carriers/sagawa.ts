import { CarrierClient, TrackingInfo } from '../../types/tracking';

export class SagawaClient implements CarrierClient {
  private baseUrl = 'https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    // モック実装 - 実際のAPIが利用可能になったら置き換えてください
    return {
      trackingNumber,
      status: '配送中',
      currentLocation: '大阪府大阪市',
      description: '配送センターから出荷されました',
      timestamp: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      carrier: 'sagawa',
      additionalInfo: {
        deliveryType: '通常配送',
        signatureRequired: true,
        weight: '1.8kg',
        dimensions: '25cm x 18cm x 12cm'
      }
    };
  }

  getTrackingUrl(trackingNumber: string): string {
    return `${this.baseUrl}?tracking_number=${trackingNumber}`;
  }
} 

export class SagawaClient implements CarrierClient {
  private baseUrl = 'https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    // モック実装 - 実際のAPIが利用可能になったら置き換えてください
    return {
      trackingNumber,
      status: '配送中',
      currentLocation: '大阪府大阪市',
      description: '配送センターから出荷されました',
      timestamp: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      carrier: 'sagawa',
      additionalInfo: {
        deliveryType: '通常配送',
        signatureRequired: true,
        weight: '1.8kg',
        dimensions: '25cm x 18cm x 12cm'
      }
    };
  }

  getTrackingUrl(trackingNumber: string): string {
    return `${this.baseUrl}?tracking_number=${trackingNumber}`;
  }
} 

export class SagawaClient implements CarrierClient {
  private baseUrl = 'https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    // モック実装 - 実際のAPIが利用可能になったら置き換えてください
    return {
      trackingNumber,
      status: '配送中',
      currentLocation: '大阪府大阪市',
      description: '配送センターから出荷されました',
      timestamp: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      carrier: 'sagawa',
      additionalInfo: {
        deliveryType: '通常配送',
        signatureRequired: true,
        weight: '1.8kg',
        dimensions: '25cm x 18cm x 12cm'
      }
    };
  }

  getTrackingUrl(trackingNumber: string): string {
    return `${this.baseUrl}?tracking_number=${trackingNumber}`;
  }
} 

export class SagawaClient implements CarrierClient {
  private baseUrl = 'https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do';

  async getTrackingInfo(trackingNumber: string): Promise<TrackingInfo> {
    // モック実装 - 実際のAPIが利用可能になったら置き換えてください
    return {
      trackingNumber,
      status: '配送中',
      currentLocation: '大阪府大阪市',
      description: '配送センターから出荷されました',
      timestamp: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      carrier: 'sagawa',
      additionalInfo: {
        deliveryType: '通常配送',
        signatureRequired: true,
        weight: '1.8kg',
        dimensions: '25cm x 18cm x 12cm'
      }
    };
  }

  getTrackingUrl(trackingNumber: string): string {
    return `${this.baseUrl}?tracking_number=${trackingNumber}`;
  }
} 