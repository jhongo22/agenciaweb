import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios de Automatización, Agentes IA y Desarrollo Web | Autonomek',
  description: 'Descubre nuestras 6 soluciones tecnológicas de alto rendimiento. Creamos empleados de ventas IA, automatizaciones y webs premium para optimizar tu negocio y captar más clientes.',
  alternates: {
    canonical: 'https://autonomek.com/servicios',
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
