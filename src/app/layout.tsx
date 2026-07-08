import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import WhatsAppButton from '@/components/WhatsAppButton';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Reusing Syne as a display font fallback since we'll configure Clash later if needed
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

export const metadata: Metadata = {
  title: 'Autonomek Web & IA | Tecnología Implacable',
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
          <Footer />
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-W5P7806J2F"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-W5P7806J2F');
              `,
            }}
          />
          <Script
            id="chatwoot-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.chatwootSettings = {"position":"right","type":"standard","launcherTitle":""};
                (function(d,t) {
                  var BASE_URL="https://chatwoot.autonomek.com";
                  var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                  g.src=BASE_URL+"/packs/js/sdk.js";
                  g.async = true;
                  s.parentNode.insertBefore(g,s);
                  g.onload=function(){
                    window.chatwootSDK.run({
                      websiteToken: 'sgKYEgxKz4TFe6LqbeTCupQA',
                      baseUrl: BASE_URL
                    })
                  }
                })(document,"script");
              `,
            }}
          />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
