import nodemailer from 'nodemailer';

// メール送信用のトランスポーターを作成
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// パスワードリセットメールを送信
export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'パスワードリセット',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">パスワードリセット</h1>
        <p style="color: #666; line-height: 1.6;">
          パスワードリセットのリクエストを受け付けました。<br>
          以下のリンクをクリックして、新しいパスワードを設定してください。
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            パスワードをリセット
          </a>
        </div>
        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          このリンクは1時間のみ有効です。<br>
          パスワードリセットをリクエストしていない場合は、このメールを無視してください。
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('メール送信エラー:', error);
    return false;
  }
}; 