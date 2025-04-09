import { renderHook, act } from '@testing-library/react-hooks';
import { useCart } from '@/hooks/useCart';
import { CartProvider } from '@/contexts/CartContext';
import { ReactNode } from 'react';

// テスト用のラッパーコンポーネント
const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('useCart', () => {
  // テスト用の商品データ
  const mockProduct = {
    id: 'prod123',
    name: 'テスト商品',
    price: 3000,
    images: ['/images/test-product.jpg'],
    description: 'これはテスト商品です',
    category: 'テストカテゴリー',
    rating: 4.5,
    stock: 10,
  };

  test('初期状態では空のカートが返されること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  test('商品をカートに追加できること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct, 1);
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].product).toEqual(mockProduct);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(3000);
  });

  test('同じ商品を追加すると数量が増えること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct, 1);
    });
    
    act(() => {
      result.current.addItem(mockProduct, 2);
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(9000);
  });

  test('商品の数量を更新できること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct, 1);
    });
    
    act(() => {
      result.current.updateItemQuantity(mockProduct.id, 5);
    });
    
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
    expect(result.current.totalPrice).toBe(15000);
  });

  test('商品をカートから削除できること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct, 2);
    });
    
    act(() => {
      result.current.removeItem(mockProduct.id);
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  test('カートを空にできること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct, 2);
      
      // 別の商品を追加
      result.current.addItem({
        ...mockProduct,
        id: 'prod456',
        name: '別のテスト商品',
      }, 1);
    });
    
    expect(result.current.items.length).toBe(2);
    
    act(() => {
      result.current.clearCart();
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  test('商品の数量が0以下になる場合は削除されること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct, 3);
    });
    
    act(() => {
      result.current.updateItemQuantity(mockProduct.id, 0);
    });
    
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
  });

  test('在庫以上の数量は追加できないこと', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addItem(mockProduct, mockProduct.stock);
    });
    
    // 在庫以上の数量を追加しようとする
    act(() => {
      result.current.addItem(mockProduct, 5);
    });
    
    // 追加されず在庫数で制限されること
    expect(result.current.items[0].quantity).toBe(mockProduct.stock);
    expect(result.current.totalItems).toBe(mockProduct.stock);
  });

  test('割引価格がある場合は割引価格が計算に使用されること', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const discountedProduct = {
      ...mockProduct,
      originalPrice: 5000,
      price: 3000, // 割引価格
    };
    
    act(() => {
      result.current.addItem(discountedProduct, 2);
    });
    
    expect(result.current.totalPrice).toBe(6000); // 3000 × 2
  });
}); 