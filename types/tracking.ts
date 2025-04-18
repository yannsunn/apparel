export type TrackingHistory = {
  timestamp: string;
  status: string;
  location: string;
};

export type TrackingInfo = {
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: string | null;
  history: TrackingHistory[];
}; 