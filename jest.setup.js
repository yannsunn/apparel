import '@testing-library/jest-dom';

// モックの設定
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// グローバルなモックの設定
global.fetch = jest.fn();
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

// テストの前後でモックをリセット
beforeEach(() => {
  jest.clearAllMocks();
}); 