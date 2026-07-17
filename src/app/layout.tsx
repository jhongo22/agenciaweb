import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import WhatsAppButton from '@/components/widgets/WhatsAppButton';
import AiChatWidget from '@/components/widgets/AiChatWidget';
import CustomCursor from '@/components/effects/CustomCursor';
import Preloader from '@/components/effects/Preloader';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Reusing Syne as a display font fallback since we'll configure Clash later if needed
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

export const metadata: Metadata = {
  metadataBase: new URL('https://autonomek.com'),
  title: {
    default: 'Autonomek Web & IA | Tecnología Implacable',
    template: '%s | Autonomek'
  },
  description: 'Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes. Diseñamos tus webs de alto rendimiento y agentes de IA.',
  icons: {
    icon: [
      {
        url: '/logo_pestaña.png',
        sizes: '96x96',
        type: 'image/png',
      }
    ],
    shortcut: '/logo_pestaña.png',
    apple: '/logo_pestaña.png',
  },
  openGraph: {
    title: 'Autonomek Web & IA | Tecnología Implacable',
    description: 'Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes. Diseñamos tus webs de alto rendimiento y agentes de IA.',
    url: 'https://autonomek.com',
    siteName: 'Autonomek',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 401,
        alt: 'Autonomek Logo - Inteligencia Artificial y Desarrollo Web',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autonomek Web & IA | Tecnología Implacable',
    description: 'Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes. Diseñamos tus webs de alto rendimiento y agentes de IA.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${syne.variable} bg-background text-foreground antialiased`}>
      <head>
        <link rel="preconnect" href="https://chatwoot.autonomek.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://chatwoot.autonomek.com" />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden selection:bg-accent selection:text-background">
        <Preloader />
        <CustomCursor />
        <SmoothScrollProvider>
          <Navigation />
          {children}
          <Footer />
          <AiChatWidget />
          <Script
            id="lazy-third-parties"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.chatwootSettings = {"position":"right","type":"standard","launcherTitle":""};
                
                (function() {
                  var initialized = false;
                  function initThirdParties() {
                    if (initialized) return;
                    initialized = true;
                    
                    // Remove event listeners
                    window.removeEventListener('pointermove', initThirdParties);
                    window.removeEventListener('scroll', initThirdParties);
                    window.removeEventListener('touchstart', initThirdParties);
                    window.removeEventListener('keydown', initThirdParties);
                    
                    // 1. Load Google Analytics
                    var gaScript = document.createElement('script');
                    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-W5P7806J2F';
                    gaScript.async = true;
                    document.head.appendChild(gaScript);
                    
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-W5P7806J2F');
                    
                    // 2. Load Chatwoot
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
                  }
                  
                  // Listen to first user interaction
                  window.addEventListener('pointermove', initThirdParties, { passive: true });
                  window.addEventListener('scroll', initThirdParties, { passive: true });
                  window.addEventListener('touchstart', initThirdParties, { passive: true });
                  window.addEventListener('keydown', initThirdParties, { passive: true });
                  
                  // Fallback: load after 5 seconds if no interaction
                  setTimeout(initThirdParties, 5000);
                })();
              `,
            }}
          />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
