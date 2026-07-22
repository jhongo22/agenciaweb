import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

export const metadata: Metadata = {
  metadataBase: new URL('https://autonomek.com'),
  title: {
    default: 'Autonomek: Automatización & Desarrollo Web | Posicionamiento SEO & Agentes IA',
    template: '%s | Autonomek'
  },
  description: 'Posicionamos tu página web en los primeros resultados de Google y convertimos tus visitas en clientes con WhatsApp y Agentes IA 24/7. Automatización de procesos comerciales y desarrollo web para tu negocio.',
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
    title: 'Autonomek: Automatización & Desarrollo Web | Posicionamiento SEO & Agentes IA',
    description: 'Posicionamos tu página web en los primeros resultados de Google y convertimos tus visitas en clientes con WhatsApp y Agentes IA 24/7. Automatización de procesos comerciales y desarrollo web para tu negocio.',
    url: 'https://autonomek.com',
    siteName: 'Autonomek',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 401,
        alt: 'Autonomek - Agencia de Automatización de Procesos y Desarrollo Web con IA',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autonomek: Automatización & Desarrollo Web | Posicionamiento SEO & Agentes IA',
    description: 'Posicionamos tu página web en los primeros resultados de Google y convertimos tus visitas en clientes con WhatsApp y Agentes IA 24/7.',
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
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="Autonomek LLM & AI Documentation" />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden selection:bg-accent selection:text-background">
        {children}
      </body>
    </html>
  );
}
