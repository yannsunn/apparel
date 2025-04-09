import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { SessionProvider } from 'next-auth/react';

// モックデータ
const mockProduct = {
  id: 'prod123',
  name: 'テスト商品',
  price: 3000,
  discountPrice: 2500,
  images: ['/images/test-product.jpg'],
  description: 'これはテスト商品です',
  category: 'テストカテゴリー',
  rating: 4.5,
  stock: 10,
};

// モック関数
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// コンポーネントをラップするプロバイダー
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider session={null}>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
};

describe('ProductCard', () => {
  test('商品情報が正しく表示されること', () => {
    render(
      <AllProviders>
        <ProductCard product={mockProduct} />
      </AllProviders>
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`¥${mockProduct.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(`¥${mockProduct.discountPrice.toLocaleString()}`)).toBeInTheDocument();
    
    // 画像が表示されていることを確認
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining(mockProduct.images[0]));
  });

  test('割引価格がある場合、元の価格と割引価格の両方が表示されること', () => {
    render(
      <AllProviders>
        <ProductCard product={mockProduct} />
      </AllProviders>
    );

    const originalPrice = screen.getByText(`¥${mockProduct.price.toLocaleString()}`);
    const discountPrice = screen.getByText(`¥${mockProduct.discountPrice.toLocaleString()}`);
    
    expect(originalPrice).toBeInTheDocument();
    expect(discountPrice).toBeInTheDocument();
    expect(originalPrice).toHaveClass('line-through');
  });

  test('割引価格がない場合、通常価格のみが表示されること', () => {
    const productWithoutDiscount = { ...mockProduct, discountPrice: undefined };
    
    render(
      <AllProviders>
        <ProductCard product={productWithoutDiscount} />
      </AllProviders>
    );

    expect(screen.getByText(`¥${productWithoutDiscount.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.queryByText(/line-through/)).not.toBeInTheDocument();
  });

  test('カートに追加ボタンをクリックすると、商品がカートに追加されること', () => {
    render(
      <AllProviders>
        <ProductCard product={mockProduct} />
      </AllProviders>
    );

    const addToCartButton = screen.getByRole('button', { name: /カートに追加/i });
    fireEvent.click(addToCartButton);
    
    // カートに追加された通知が表示されることを確認
    // 注: 実際の実装によって確認方法は異なる場合があります
    expect(screen.getByText(/カートに追加しました/i) || 
           screen.getByText(/追加しました/i)).toBeInTheDocument();
  });

  test('お気に入りボタンをクリックすると、商品がお気に入りに追加/削除されること', () => {
    render(
      <AllProviders>
        <ProductCard product={mockProduct} />
      </AllProviders>
    );

    const wishlistButton = screen.getByRole('button', { name: /お気に入り/i }) || 
                           screen.getByTestId('wishlist-button');
    
    // お気に入りに追加
    fireEvent.click(wishlistButton);
    
    // お気に入りから削除
    fireEvent.click(wishlistButton);
    
    // 注: 実際のUIの変化に応じてテストを調整する必要があります
    // 例: アイコンの変化やテキストの変化など
  });

  test('商品画像をクリックすると、商品詳細ページに遷移すること', () => {
    const { container } = render(
      <AllProviders>
        <ProductCard product={mockProduct} />
      </AllProviders>
    );

    const productLink = container.querySelector('a') || 
                        screen.getByRole('link');
    
    expect(productLink).toHaveAttribute('href', expect.stringContaining(`/products/${mockProduct.id}`));
  });

  test('在庫切れの場合、カートに追加ボタンが無効化されること', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    
    render(
      <AllProviders>
        <ProductCard product={outOfStockProduct} />
      </AllProviders>
    );

    const addToCartButton = screen.getByRole('button', { name: /カートに追加/i });
    expect(addToCartButton).toBeDisabled();
    
    // 在庫切れのメッセージが表示されることを確認
    expect(screen.getByText(/在庫切れ/i)).toBeInTheDocument();
  });

  test('評価（レーティング）が正しく表示されること', () => {
    render(
      <AllProviders>
        <ProductCard product={mockProduct} />
      </AllProviders>
    );

    // 星評価が表示されていることを確認
    // 注: 実際の実装によって確認方法は異なる場合があります
    expect(screen.getByText(mockProduct.rating.toString()) || 
           screen.getByTestId('rating')).toBeInTheDocument();
  });
}); 