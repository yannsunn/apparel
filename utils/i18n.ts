import { useRouter } from 'next/router';

/**
 * 日付を指定された言語でフォーマットします
 */
export const formatDate = (date: Date | string, locale: string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString(locale === 'en' ? 'en-US' : 'ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * 数値を指定された言語でフォーマットします
 */
export const formatNumber = (num: number, locale: string): string => {
  return num.toLocaleString(locale === 'en' ? 'en-US' : 'ja-JP');
};

/**
 * 現在の言語を取得するフック
 */
export const useLocale = () => {
  const { locale, defaultLocale } = useRouter();
  return locale || defaultLocale || 'ja';
}; 