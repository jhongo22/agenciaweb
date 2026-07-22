import { Metadata } from 'next';
import DesarrolloWebPageClient from '../../../servicios/paginas-web-alto-rendimiento/paginas-web-client';

export const metadata: Metadata = {
  title: 'Premium Web Development & Technical SEO | Autonomek',
  description: 'We develop high-performance websites using Next.js and TailwindCSS, fully optimized for Google SEO and Core Web Vitals.',
  alternates: {
    canonical: 'https://autonomek.com/us/services/high-performance-websites',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/paginas-web-alto-rendimiento',
      'en-US': 'https://autonomek.com/us/services/high-performance-websites',
    }
  }
};

export default function Page() {
  return <DesarrolloWebPageClient locale="en" />;
}
