import { Metadata } from 'next';
import AgentesIAPageClient from './agentes-client';

export const metadata: Metadata = {
  title: 'Agentes de Inteligencia Artificial & Chatbots | Autonomek',
  description: 'Desarrollamos empleados de ventas y asistentes virtuales inteligentes integrados con tu conocimiento corporativo, bases de datos y WhatsApp Cloud API.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/agentes-inteligencia-artificial',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/agentes-inteligencia-artificial',
      'en-US': 'https://autonomek.com/us/services/ai-agents',
    }
  }
};

export default function Page() {
  return <AgentesIAPageClient locale="es" />;
}
