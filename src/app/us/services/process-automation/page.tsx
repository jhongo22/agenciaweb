import { Metadata } from 'next';
import AutomatizacionPageClient from '../../../servicios/automatizacion-de-procesos/automatizacion-client';

export const metadata: Metadata = {
  title: 'Process Automation & AI Workflows | Autonomek',
  description: 'We connect your systems (CRMs, ERPs, Google Sheets, and databases) through workflow orchestrators and logic flows to run your business on autopilot.',
  alternates: {
    canonical: 'https://autonomek.com/us/services/process-automation',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/automatizacion-de-procesos',
      'en-US': 'https://autonomek.com/us/services/process-automation',
    }
  }
};

export default function Page() {
  return <AutomatizacionPageClient locale="en" />;
}
