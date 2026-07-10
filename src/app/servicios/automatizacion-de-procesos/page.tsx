import { Metadata } from 'next';
import AutomatizacionPageClient from './automatizacion-client';

export const metadata: Metadata = {
  title: 'Automatización de Procesos y Workflows con IA | Autonomek',
  description: 'Conectamos tus sistemas (CRMs, ERPs, Google Sheets y bases de datos) mediante orquestadores de software y flujos lógicos para operar en piloto automático.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/automatizacion-de-procesos',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/automatizacion-de-procesos',
      'en-US': 'https://autonomek.com/us/services/process-automation',
    }
  }
};

export default function Page() {
  return <AutomatizacionPageClient locale="es" />;
}
