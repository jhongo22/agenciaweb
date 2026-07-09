import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo de Software a Medida y Plataformas Web | Autonomek',
  description: 'Desarrollamos software corporativo y sistemas a medida adaptados a los procesos únicos de tu empresa: integraciones API, Supabase, Next.js y bases de datos robustas.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/software-a-medida',
  },
};

export default function SoftwareMedidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
