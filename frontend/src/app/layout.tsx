import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Sidebar from './components/sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk', 
});

export const metadata: Metadata = {
  title: 'Ecommers',
  description: 'Dashboard built with Efforts and hardwork',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={`flex h-screen bg-gray-100`}>
        <AuthProvider>
          <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#F0F0F8] flex-col">
            <Header />
          {children}
          <Footer/>
        </main>
        </AuthProvider>
      </body>
    </html>
  );
}