import axios from 'axios';

export interface TrackingData {
  status: string;
  currentLocation: string;
  estimatedDelivery: string | null;
  description: string;
  timestamp: string;
}

export abstract class BaseCarrierClient {
  protected cache: Map<string, { data: TrackingData; timestamp: number }> = new Map();
  protected readonly CACHE_TTL = 5 * 60 * 1000; // 5分

  protected async getCachedTrackingInfo(trackingNumber: string): Promise<TrackingData | null> {
    const cached = this.cache.get(trackingNumber);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    return null;
  }

  protected setCache(trackingNumber: string, data: TrackingData): void {
    this.cache.set(trackingNumber, {
      data,
      timestamp: Date.now(),
    });
  }

  protected clearCache(trackingNumber: string): void {
    this.cache.delete(trackingNumber);
  }

  abstract getTrackingInfo(trackingNumber: string): Promise<TrackingData>;
} 