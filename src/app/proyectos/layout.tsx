import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casos de Éxito y Proyectos de IA & Web | Autonomek',
  description: 'Explora nuestro portafolio de proyectos reales: agentes de inteligencia artificial en WhatsApp, automatizaciones de procesos y desarrollo web premium.',
  alternates: {
    canonical: 'https://autonomek.com/proyectos',
  },
};

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
