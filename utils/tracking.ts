interface TrackingUrl {
  url: string;
  name: string;
}

export const getTrackingUrl = (carrier: string, trackingNumber: string): TrackingUrl | null => {
  const carriers: { [key: string]: (number: string) => TrackingUrl } = {
    'ヤマト運輸': (number) => ({
      name: 'ヤマト運輸',
      url: `https://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id=${number}`,
    }),
    '佐川急便': (number) => ({
      name: '佐川急便',
      url: `https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=${number}`,
    }),
    '日本郵便': (number) => ({
      name: '日本郵便',
      url: `https://trackings.post.japanpost.jp/services/srv/search/input?reqCodeNo1=${number}`,
    }),
    '福山通運': (number) => ({
      name: '福山通運',
      url: `https://corp.fukutsu.co.jp/situation/tracking_no_hinmei_kensaku?slipno=${number}`,
    }),
    '西濃運輸': (number) => ({
      name: '西濃運輸',
      url: `https://track.seino.co.jp/kamotsu/GempyoNoShokai.do?action=init&gempyoNo=${number}`,
    }),
  };

  const carrierKey = Object.keys(carriers).find(key => carrier.includes(key));
  if (!carrierKey) return null;

  return carriers[carrierKey](trackingNumber);
}; 