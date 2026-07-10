import { Metadata } from 'next';
import SolucionesPageClient from '../../../servicios/software-a-medida/software-client';

export const metadata: Metadata = {
  title: 'Custom Software Development & Cloud Platforms | Autonomek',
  description: 'We design and build cloud platforms, corporate CRMs, and modular custom software systems tailored exactly to your business operations.',
  alternates: {
    canonical: 'https://autonomek.com/us/services/custom-software',
    languages: {
      'es-CO': 'https://autonomek.com/servicios/software-a-medida',
      'en-US': 'https://autonomek.com/us/services/custom-software',
    }
  }
};

export default function Page() {
  return <SolucionesPageClient locale="en" />;
}
