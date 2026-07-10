import type { Metadata } from 'next';
import HomeClient from '../home-client';

export const metadata: Metadata = {
  title: 'AI Automation & Web Development Agency | Autonomek',
  description: 'We turn your WhatsApp flow, social networks, and web into a customer acquisition machine. We build your websites and custom AI agents.',
  alternates: {
    canonical: 'https://autonomek.com/us',
    languages: {
      'es-CO': 'https://autonomek.com',
      'es-MX': 'https://autonomek.com/mx',
      'es-ES': 'https://autonomek.com/es',
      'en-US': 'https://autonomek.com/us',
    },
  },
};

export default function Page() {
  return <HomeClient region="us" />;
}
