import { Metadata } from 'next';
import AgentesIAPageClient from '../../../servicios/agentes-inteligencia-artificial/agentes-client';

export const metadata: Metadata = {
  title: 'Artificial Intelligence Agents & Chatbots | Autonomek',
  description: 'We develop intelligent sales employees and virtual assistants integrated with your corporate knowledge base, database, and WhatsApp Cloud API.',
  alternates: {
    canonical: 'https://autonomek.com/us/services/ai-agents',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/agentes-inteligencia-artificial',
      'en-US': 'https://autonomek.com/us/services/ai-agents',
    }
  }
};

export default function Page() {
  return <AgentesIAPageClient locale="en" />;
}
