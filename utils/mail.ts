import nodemailer from 'nodemailer';
import { AppError } from './error-handling';

let transporter: nodemailer.Transporter | null = null;

// メール送信用のトランスポーターを作成（サーバーサイドのみ）
const getTransporter = () => {
  if (typeof window === 'undefined' && !transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

// パスワードリセットメールを送信
export async function sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
  try {
    const response = await fetch('/api/mail/send-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, resetToken }),
    });

    if (!response.ok) {
      throw new Error('メール送信に失敗しました');
    }

    return true;
  } catch (error) {
    console.error('メール送信エラー:', error);
    return false;
  }
}

interface DeliveryUpdateEmailParams {
  to: string;
  orderId: string;
  status: string;
  location: string;
  estimatedDelivery?: Date;
}

// 配送状況更新メールを送信
export async function sendDeliveryUpdateEmail(
  email: string,
  orderId: string,
  status: string,
  estimatedDeliveryDate?: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/mail/send-delivery-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        orderId,
        status,
        estimatedDeliveryDate,
      }),
    });

    if (!response.ok) {
      throw new Error('メール送信に失敗しました');
    }

    return true;
  } catch (error) {
    console.error('メール送信エラー:', error);
    return false;
  }
}

export const sendMail = async (to: string, subject: string, text: string): Promise<void> => {
  try {
    const response = await fetch('/api/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, text }),
    });

    if (!response.ok) {
      throw new AppError(response.status, 'メール送信に失敗しました。');
    }
  } catch (error) {
    throw new AppError(500, 'メール送信中にエラーが発生しました。');
  }
}; 