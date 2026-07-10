import { Metadata } from 'next';
import SolucionesPageClient from './software-client';

export const metadata: Metadata = {
  title: 'Desarrollo de Software a Medida & Plataformas Cloud | Autonomek',
  description: 'Diseñamos y construimos plataformas cloud, CRMs corporativos y sistemas de software modular a la medida exacta de la operación de tu empresa.',
  alternates: {
    canonical: 'https://autonomek.com/servicios/software-a-medida',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/software-a-medida',
      'en-US': 'https://autonomek.com/us/services/custom-software',
    }
  }
};

export default function Page() {
  return <SolucionesPageClient locale="es" />;
}
