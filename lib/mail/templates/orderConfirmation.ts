import { Order, Customer } from '@prisma/client';

export function generateOrderConfirmationEmail(order: Order, customer: Customer) {
  const subject = `注文確認 - 注文番号: ${order.id}`;
  
  const text = `
${customer.name} 様

ご注文ありがとうございます。
以下の内容で注文を承りました。

注文番号: ${order.id}
注文日時: ${order.createdAt.toLocaleString('ja-JP')}
合計金額: ¥${order.totalAmount.toLocaleString()}

商品の発送準備が整い次第、発送完了メールをお送りいたします。

ご不明な点がございましたら、お気軽にお問い合わせください。

AparelEC
`;

  const html = `
<!DOCTYPE html>
<html>
<body>
  <p>${customer.name} 様</p>
  
  <p>ご注文ありがとうございます。<br>
  以下の内容で注文を承りました。</p>
  
  <table>
    <tr>
      <td>注文番号:</td>
      <td>${order.id}</td>
    </tr>
    <tr>
      <td>注文日時:</td>
      <td>${order.createdAt.toLocaleString('ja-JP')}</td>
    </tr>
    <tr>
      <td>合計金額:</td>
      <td>¥${order.totalAmount.toLocaleString()}</td>
    </tr>
  </table>
  
  <p>商品の発送準備が整い次第、発送完了メールをお送りいたします。</p>
  
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
 

export function generateOrderConfirmationEmail(order: Order, customer: Customer) {
  const subject = `注文確認 - 注文番号: ${order.id}`;
  
  const text = `
${customer.name} 様

ご注文ありがとうございます。
以下の内容で注文を承りました。

注文番号: ${order.id}
注文日時: ${order.createdAt.toLocaleString('ja-JP')}
合計金額: ¥${order.totalAmount.toLocaleString()}

商品の発送準備が整い次第、発送完了メールをお送りいたします。

ご不明な点がございましたら、お気軽にお問い合わせください。

AparelEC
`;

  const html = `
<!DOCTYPE html>
<html>
<body>
  <p>${customer.name} 様</p>
  
  <p>ご注文ありがとうございます。<br>
  以下の内容で注文を承りました。</p>
  
  <table>
    <tr>
      <td>注文番号:</td>
      <td>${order.id}</td>
    </tr>
    <tr>
      <td>注文日時:</td>
      <td>${order.createdAt.toLocaleString('ja-JP')}</td>
    </tr>
    <tr>
      <td>合計金額:</td>
      <td>¥${order.totalAmount.toLocaleString()}</td>
    </tr>
  </table>
  
  <p>商品の発送準備が整い次第、発送完了メールをお送りいたします。</p>
  
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