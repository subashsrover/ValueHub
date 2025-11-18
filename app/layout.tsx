
import type { Metadata } from 'next';
import { Providers } from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import './globals.css';

export const metadata: Metadata = {
  title: 'Value Hub',
  description: 'A modern hub for browsing and discovering the best tools and software.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-dark-900 text-light-100 min-h-screen flex flex-col font-sans">
        <Providers>
          <Header />
          <main className="flex-grow transition-opacity duration-300">
            {children}
          </main>
          <Footer />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
