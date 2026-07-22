import type { Metadata } from 'next';
import ProyectosClient from '../../proyectos/proyectos-client';

export const metadata: Metadata = {
  title: 'Success Stories & Real Projects | Autonomek',
  description: 'Explore our portfolio of custom software, high-performance web development, and AI agents in production.',
  alternates: {
    canonical: 'https://autonomek.com/us/projects',
    languages: {
      'es-CO': 'https://autonomek.com/proyectos',
      'en-US': 'https://autonomek.com/us/projects',
    },
  },
};

export default function Page() {
  return <ProyectosClient locale="en" />;
}
