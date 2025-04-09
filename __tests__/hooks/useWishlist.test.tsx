import { renderHook, act } from '@testing-library/react-hooks';
import { useWishlist } from '@/hooks/useWishlist';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ReactNode } from 'react';

// テスト用のラッパーコンポーネント
const wrapper = ({ children }: { children: ReactNode }) => (
  <WishlistProvider>{children}</WishlistProvider>
);

describe('useWishlist', () => {
  // テスト用の商品データ
  const mockProduct1 = {
    id: 'prod123',
    name: 'テスト商品1',
    price: 3000,
    images: ['/images/test-product-1.jpg'],
    description: 'これはテスト商品1です',
    category: 'テストカテゴリー',
    rating: 4.5,
    stock: 10,
  };

  const mockProduct2 = {
    id: 'prod456',
    name: 'テスト商品2',
    price: 5000,
    images: ['/images/test-product-2.jpg'],
    description: 'これはテスト商品2です',
    category: 'テストカテゴリー',
    rating: 4.0,
    stock: 5,
  };

  test('初期状態では空のお気に入りリストが返されること', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
  });

  test('商品をお気に入りに追加できること', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct1);
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0]).toEqual(mockProduct1);
    expect(result.current.totalItems).toBe(1);
  });

  test('同じ商品は重複して追加されないこと', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct1);
    });
    
    act(() => {
      result.current.addItem(mockProduct1);
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.totalItems).toBe(1);
  });

  test('複数の商品を追加できること', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct1);
      result.current.addItem(mockProduct2);
    });
    
    expect(result.current.items.length).toBe(2);
    expect(result.current.items).toEqual([mockProduct1, mockProduct2]);
    expect(result.current.totalItems).toBe(2);
  });

  test('商品をお気に入りから削除できること', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct1);
      result.current.addItem(mockProduct2);
    });
    
    act(() => {
      result.current.removeItem(mockProduct1.id);
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0]).toEqual(mockProduct2);
    expect(result.current.totalItems).toBe(1);
  });

  test('お気に入りリストを空にできること', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct1);
      result.current.addItem(mockProduct2);
    });
    
    expect(result.current.items.length).toBe(2);
    
    act(() => {
      result.current.clearWishlist();
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
  });

  test('商品がお気に入りに含まれているか確認できること', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct1);
    });
    
    expect(result.current.isInWishlist(mockProduct1.id)).toBe(true);
    expect(result.current.isInWishlist(mockProduct2.id)).toBe(false);
  });

  test('お気に入りの商品をトグルできること（追加と削除）', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    
    // 追加
    act(() => {
      result.current.toggleWishlist(mockProduct1);
    });
    
    expect(result.current.isInWishlist(mockProduct1.id)).toBe(true);
    
    // 削除
    act(() => {
      result.current.toggleWishlist(mockProduct1);
    });
    
    expect(result.current.isInWishlist(mockProduct1.id)).toBe(false);
    
    // 再度追加
    act(() => {
      result.current.toggleWishlist(mockProduct1);
    });
    
    expect(result.current.isInWishlist(mockProduct1.id)).toBe(true);
  });
}); 