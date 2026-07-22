import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo de Páginas Web de Alto Rendimiento y SEO | Autonomek',
  description: 'Diseñamos y desarrollamos páginas web y landing pages ultra rápidas, optimizadas para SEO local/nacional en Google y enfocadas en la conversión de clientes.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/paginas-web-alto-rendimiento',
  },
};

export default function PaginasWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
