export interface TrackingUrl {
  url: string;
  label: string;
}

/**
 * 配送業者と追跡番号からトラッキングURLを生成する
 * @param carrier 配送業者名
 * @param trackingNumber 追跡番号
 * @returns トラッキングURL情報
 */
export function getTrackingUrl(carrier: string, trackingNumber: string): TrackingUrl | null {
  if (!carrier || !trackingNumber) {
    return null;
  }

  const carrierLower = carrier.toLowerCase();

  switch (true) {
    case carrierLower.includes('yamato') || carrierLower.includes('ヤマト'):
      return {
        url: `https://toi.kuronekoyamato.co.jp/cgi-bin/tneko?number=${trackingNumber}`,
        label: 'ヤマト運輸で追跡'
      };
    case carrierLower.includes('sagawa') || carrierLower.includes('佐川'):
      return {
        url: `https://k2k.sagawa-exp.co.jp/p/sagawa/web/okurijoinput.jsp?okurijoNo=${trackingNumber}`,
        label: '佐川急便で追跡'
      };
    case carrierLower.includes('japanpost') || carrierLower.includes('郵便'):
      return {
        url: `https://trackings.post.japanpost.jp/services/srv/search/?requestNo1=${trackingNumber}&search=追跡スタート`,
        label: '日本郵便で追跡'
      };
    case carrierLower.includes('fukuyama') || carrierLower.includes('福山'):
      return {
        url: `https://corp.fukuyama-trans.co.jp/situation/tracking_no_hunt/${trackingNumber}`,
        label: '福山通運で追跡'
      };
    case carrierLower.includes('seino') || carrierLower.includes('西濃'):
      return {
        url: `https://track.seino.co.jp/cgi-bin/gnpquery.pgm?GNPNO=${trackingNumber}`,
        label: '西濃運輸で追跡'
      };
    case carrierLower.includes('dhl'):
      return {
        url: `https://www.dhl.com/jp-ja/home/tracking/tracking-express.html?submit=1&tracking-id=${trackingNumber}`,
        label: 'DHLで追跡'
      };
    case carrierLower.includes('ups'):
      return {
        url: `https://www.ups.com/track?tracknum=${trackingNumber}&requester=WT/trackdetails`,
        label: 'UPSで追跡'
      };
    case carrierLower.includes('fedex'):
      return {
        url: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
        label: 'FedExで追跡'
      };
    default:
      return null;
  }
} 