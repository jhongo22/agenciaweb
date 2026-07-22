import { Metadata } from 'next';
import DesarrolloWebPageClient from './paginas-web-client';

export const metadata: Metadata = {
  title: 'Desarrollo Web Premium & SEO Técnico | Autonomek',
  description: 'Desarrollamos páginas web de alto rendimiento con Next.js y TailwindCSS, optimizadas al 100% para SEO técnico y Core Web Vitals.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/paginas-web-alto-rendimiento',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/paginas-web-alto-rendimiento',
      'en-US': 'https://autonomek.com/us/services/high-performance-websites',
    }
  }
};

export default function Page() {
  return <DesarrolloWebPageClient locale="es" />;
}
