import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import Header from '@components/Header';

// next-authのモック
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('Header', () => {
  const mockSignOut = jest.fn();

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'テストユーザー',
          email: 'test@example.com',
        },
      },
      status: 'authenticated',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ログイン状態で正しくレンダリングされる', () => {
    render(<Header />);
    
    expect(screen.getByText('テストユーザー')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /カート/i })).toBeInTheDocument();
  });

  it('未ログイン状態で正しくレンダリングされる', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(<Header />);
    
    expect(screen.getByRole('link', { name: /ログイン/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /新規登録/i })).toBeInTheDocument();
  });

  it('カートリンクが正しく機能する', () => {
    render(<Header />);
    
    const cartLink = screen.getByRole('link', { name: /カート/i });
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
}); 