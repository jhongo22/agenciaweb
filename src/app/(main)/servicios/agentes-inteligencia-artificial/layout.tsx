import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agentes de Inteligencia Artificial para WhatsApp y Web | Autonomek',
  description: 'Implementamos agentes de IA autónomos y asistentes conversacionales en WhatsApp y sitios web. Automatiza respuestas, agenda citas y cotiza servicios 24/7.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/agentes-inteligencia-artificial',
  },
};

export default function AgentesIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
