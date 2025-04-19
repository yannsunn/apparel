declare module 'next-auth' {
  export default function NextAuth(options: any): any;
  export interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: string;
  }
}

declare module 'next-auth/react' {
  import type { ReactNode } from 'react';
  import type { Session } from 'next-auth';
  export function useSession(options?: any): { data: Session | null; status: 'loading' | 'authenticated' | 'unauthenticated' };
  export function signIn(providerId?: string, options?: any): Promise<any>;
  export function signOut(options?: any): Promise<any>;
  export const SessionProvider: ({ children, session }: { children: ReactNode; session?: Session }) => JSX.Element;
}

declare module 'next-auth/providers/credentials' {
  const CredentialsProvider: any;
  export default CredentialsProvider;
} 