import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Footer from './Footer';

const Header = dynamic(() => import('./Header'), {
  ssr: false
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
} 