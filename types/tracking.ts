export interface TrackingInfo {
  trackingNumber: string;
  status: string;
  currentLocation: string;
  description: string;
  timestamp: string;
  estimatedDelivery: string;
  carrier: string;
  additionalInfo?: {
    deliveryTimeWindow?: string;
    packageSize?: string;
    coolDelivery?: string;
    deliveryType?: string;
    weight?: string;
    senderName?: string;
  };
}

export interface TrackingHistoryEntry {
  status: string;
  location: string;
  description: string;
  timestamp: string;
}

export interface ExtendedError extends Error {
  code?: string;
  statusCode?: number;
  data?: any;
}

export interface CarrierClient {
  getTrackingInfo(trackingNumber: string): Promise<TrackingInfo>;
  getTrackingUrl?(trackingNumber: string): string;
}

export interface DbTrackingInfo {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  currentLocation: string;
  description: string;
  timestamp: string;
  estimatedDelivery: string;
  history: TrackingHistoryEntry[];
  additionalInfo?: Record<string, string>;
  updatedAt: Date;
}

export function convertToDbTrackingInfo(trackingInfo: TrackingInfo, orderId: string): Omit<DbTrackingInfo, 'id' | 'updatedAt'> {
  return {
    orderId,
    trackingNumber: trackingInfo.trackingNumber,
    carrier: trackingInfo.carrier,
    status: trackingInfo.status,
    currentLocation: trackingInfo.currentLocation,
    description: trackingInfo.description,
    timestamp: trackingInfo.timestamp,
    estimatedDelivery: trackingInfo.estimatedDelivery,
    history: [],
    additionalInfo: trackingInfo.additionalInfo
  };
} 
  description: string;
  timestamp: string;
}

export interface ExtendedError extends Error {
  code?: string;
  statusCode?: number;
  data?: any;
}

export interface CarrierClient {
  getTrackingInfo(trackingNumber: string): Promise<TrackingInfo>;
  getTrackingUrl?(trackingNumber: string): string;
}

export interface DbTrackingInfo {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  currentLocation: string;
  description: string;
  timestamp: string;
  estimatedDelivery: string;
  history: TrackingHistoryEntry[];
  additionalInfo?: Record<string, string>;
  updatedAt: Date;
}

export function convertToDbTrackingInfo(trackingInfo: TrackingInfo, orderId: string): Omit<DbTrackingInfo, 'id' | 'updatedAt'> {
  return {
    orderId,
    trackingNumber: trackingInfo.trackingNumber,
    carrier: trackingInfo.carrier,
    status: trackingInfo.status,
    currentLocation: trackingInfo.currentLocation,
    description: trackingInfo.description,
    timestamp: trackingInfo.timestamp,
    estimatedDelivery: trackingInfo.estimatedDelivery,
    history: [],
    additionalInfo: trackingInfo.additionalInfo
  };
} 
  description: string;
  timestamp: string;
}

export interface ExtendedError extends Error {
  code?: string;
  statusCode?: number;
  data?: any;
}

export interface CarrierClient {
  getTrackingInfo(trackingNumber: string): Promise<TrackingInfo>;
  getTrackingUrl?(trackingNumber: string): string;
}

export interface DbTrackingInfo {
  id: string;
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  currentLocation: string;
  description: string;
  timestamp: string;
  estimatedDelivery: string;
  history: TrackingHistoryEntry[];
  additionalInfo?: Record<string, string>;
  updatedAt: Date;
}

export function convertToDbTrackingInfo(trackingInfo: TrackingInfo, orderId: string): Omit<DbTrackingInfo, 'id' | 'updatedAt'> {
  return {
    orderId,
    trackingNumber: trackingInfo.trackingNumber,
    carrier: trackingInfo.carrier,
    status: trackingInfo.status,
    currentLocation: trackingInfo.currentLocation,
    description: trackingInfo.description,
    timestamp: trackingInfo.timestamp,
    estimatedDelivery: trackingInfo.estimatedDelivery,
    history: [],
    additionalInfo: trackingInfo.additionalInfo
  };
} 
  description: string;
  timestamp: string;
}

export interface ExtendedError extends Error {
  code?: string;
  statusCode?: number;
  data?: any;
}

export interface CarrierClient {
  getTrackingInfo(trackingNumber: string): Promise<TrackingInfo>;