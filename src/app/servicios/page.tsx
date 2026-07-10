import { Metadata } from 'next';
import ServiciosClient from './servicios-client';

export const metadata: Metadata = {
  title: 'Nuestros Sistemas y Soluciones de Automatización | Autonomek',
  description: 'Descubre nuestros sistemas y empleados de ventas de IA, prospectores automáticos B2B y automatizaciones de flujos comerciales.',
  alternates: {
    canonical: 'https://autonomek.com/servicios',
    languages: {
      'es-CO': 'https://autonomek.com/servicios',
      'en-US': 'https://autonomek.com/us/services',
    }
  }
};

export default function Page() {
  return <ServiciosClient locale="es" />;
}
