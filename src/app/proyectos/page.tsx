import type { Metadata } from 'next';
import ProyectosClient from './proyectos-client';

export const metadata: Metadata = {
  title: 'Casos de Éxito y Proyectos Reales | Autonomek',
  description: 'Explora nuestro portafolio de software a medida, desarrollo web y agentes de IA en producción.',
  alternates: {
    canonical: 'https://autonomek.com/proyectos',
    languages: {
      'es-CO': 'https://autonomek.com/proyectos',
      'en-US': 'https://autonomek.com/us/projects',
    },
  },
};

export default function Page() {
  return <ProyectosClient locale="es" />;
}
