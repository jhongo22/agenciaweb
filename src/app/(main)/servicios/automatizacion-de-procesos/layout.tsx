import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automatización de Procesos de Negocios e Integración API | Autonomek',
  description: 'Conectamos tus sistemas comerciales: formularios web, Google Sheets, Gmail, CRM y ERP. Sincroniza información de forma segura y elimina las tareas repetitivas.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/automatizacion-de-procesos',
  },
};

export default function AutomatizacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
