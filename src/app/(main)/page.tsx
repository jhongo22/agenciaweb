import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'Autonomek: Automatización & Desarrollo Web en Medellín | Posicionamiento Google & Agentes IA',
  description: 'Posicionamos tu página web en los primeros resultados de Google y convertimos tus prospectos en clientes con automatización de WhatsApp e IA en Medellín y Colombia.',
  alternates: {
    canonical: 'https://autonomek.com',
    languages: {
      'es-CO': 'https://autonomek.com',
      'es-MX': 'https://autonomek.com/mx',
      'es-ES': 'https://autonomek.com/es',
      'en-US': 'https://autonomek.com/us',
    },
  },
};

export default function Page() {
  return <HomeClient region="co" />;
}
