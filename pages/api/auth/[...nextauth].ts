import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'メールアドレス', type: 'email' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials: Record<string, string> | undefined) {
        // デモ用の簡易的な認証
        if (credentials?.email === 'test@example.com' && credentials?.password === 'password') {
          return { id: '1', email: 'test@example.com', name: 'テストユーザー' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) { token.id = user.id; }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) { session.user.id = token.id as string; }
      return session;
    }
  }
};

export default NextAuth(authOptions); 