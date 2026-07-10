import type { Metadata } from 'next';
import HomeClient from '../home-client';

export const metadata: Metadata = {
  title: 'Agencia de Automatización & Desarrollo Web en Ciudad de México | Autonomek',
  description: 'Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes en Ciudad de México y todo el país. Diseñamos tus webs y agentes de IA.',
  alternates: {
    canonical: 'https://autonomek.com/mx',
    languages: {
      'es-CO': 'https://autonomek.com',
      'es-MX': 'https://autonomek.com/mx',
      'es-ES': 'https://autonomek.com/es',
      'en-US': 'https://autonomek.com/us',
    },
  },
};

export default function Page() {
  return <HomeClient region="mx" />;
}
