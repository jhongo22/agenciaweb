import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import AiChatWidget from '@/components/AiChatWidget';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Reusing Syne as a display font fallback since we'll configure Clash later if needed
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

export const metadata: Metadata = {
  title: 'Zenit Web & IA | Tecnología Implacable',
  description: 'Desarrollo web estratégico y sistemas de agentes IA para dominar tu mercado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${syne.variable} bg-background text-foreground antialiased`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden selection:bg-accent selection:text-background">
        <Preloader />
        <CustomCursor />
        <SmoothScrollProvider>
          <Navigation />
          {children}
          <AiChatWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
