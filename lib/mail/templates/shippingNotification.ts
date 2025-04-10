import { Order, Customer, TrackingInfo } from '@prisma/client';

export function generateShippingNotificationEmail(order: Order, customer: Customer, trackingInfo: TrackingInfo) {
  const subject = `発送完了のお知らせ - 注文番号: ${order.id}`;
  
  const text = `
${customer.name} 様

ご注文の商品を発送いたしました。

注文番号: ${order.id}
配送業者: ${trackingInfo.carrier}
追跡番号: ${trackingInfo.trackingNumber}

以下のURLから配送状況をご確認いただけます：
${trackingInfo.trackingUrl}

ご不明な点がございましたら、お気軽にお問い合わせください。

AparelEC
`;

  const html = `
<!DOCTYPE html>
<html>
<body>
  <p>${customer.name} 様</p>
  
  <p>ご注文の商品を発送いたしました。</p>
  
  <table>
    <tr>
      <td>注文番号:</td>
      <td>${order.id}</td>
    </tr>
    <tr>
      <td>配送業者:</td>
      <td>${trackingInfo.carrier}</td>
    </tr>
    <tr>
      <td>追跡番号:</td>
      <td>${trackingInfo.trackingNumber}</td>
    </tr>
  </table>
  
  <p>以下のURLから配送状況をご確認いただけます：<br>
  <a href="${trackingInfo.trackingUrl}">${trackingInfo.trackingUrl}</a></p>
  
  <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
  
  <p>AparelEC</p>
</body>
</html>
`;

  return {
    subject,
    text,
    html,
  };
} 
 

export function generateShippingNotificationEmail(order: Order, customer: Customer, trackingInfo: TrackingInfo) {
  const subject = `発送完了のお知らせ - 注文番号: ${order.id}`;
  
  const text = `
${customer.name} 様

ご注文の商品を発送いたしました。

注文番号: ${order.id}
配送業者: ${trackingInfo.carrier}
追跡番号: ${trackingInfo.trackingNumber}

以下のURLから配送状況をご確認いただけます：
${trackingInfo.trackingUrl}

ご不明な点がございましたら、お気軽にお問い合わせください。

AparelEC
`;

  const html = `
<!DOCTYPE html>
<html>
<body>
  <p>${customer.name} 様</p>
  
  <p>ご注文の商品を発送いたしました。</p>
  
  <table>
    <tr>
      <td>注文番号:</td>
      <td>${order.id}</td>
    </tr>
    <tr>
      <td>配送業者:</td>
      <td>${trackingInfo.carrier}</td>
    </tr>
    <tr>
      <td>追跡番号:</td>
      <td>${trackingInfo.trackingNumber}</td>
    </tr>
  </table>
  
  <p>以下のURLから配送状況をご確認いただけます：<br>
  <a href="${trackingInfo.trackingUrl}">${trackingInfo.trackingUrl}</a></p>
  
  <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
  
  <p>AparelEC</p>
</body>
</html>
`;

  return {
    subject,
    text,
    html,
  };
} 