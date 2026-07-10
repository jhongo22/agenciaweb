import { Metadata } from 'next';
import ServiciosClient from '../../servicios/servicios-client';

export const metadata: Metadata = {
  title: 'Our Systems and AI Automation Solutions | Autonomek',
  description: 'Explore our AI sales agents, automated B2B prospectors, and custom workflow automation systems to optimize your business.',
  alternates: {
    canonical: 'https://autonomek.com/us/services',
    languages: {
      'es-CO': 'https://autonomek.com/servicios',
      'en-US': 'https://autonomek.com/us/services',
    }
  }
};

export default function Page() {
  return <ServiciosClient locale="en" />;
}
