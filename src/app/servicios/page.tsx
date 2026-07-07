'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2, Cpu, Zap, Globe, Shield, BarChart3, Layers } from 'lucide-react';

const SERVICES = [
  {
    id: "01",
    title: "Páginas Web de Alto Rendimiento",
    desc: "Sitios web optimizados para una velocidad de carga ultra rápida y Posicionamiento Web en Google (SEO) de alto impacto.",
    href: "/servicios/paginas-web-alto-rendimiento",
    icon: <Globe className="text-[#D62828]" size={32} />,
    tags: ["Carga Ultra Rápida", "Diseño Exclusivo", "Posicionamiento Google (SEO)"]
  },
  {
    id: "02",
    title: "Agentes de Inteligencia Artificial",
    desc: "Sistemas inteligentes que automatizan la atención al cliente y responden a tus prospectos de forma autónoma.",
    href: "/servicios/agentes-inteligencia-artificial",
    icon: <Cpu className="text-[#D62828]" size={32} />,
    tags: ["Atención 24/7", "Chat Inteligente", "Incremento de Ventas"]
  },
  {
    id: "03",
    title: "Automatización de Procesos",
    desc: "Eliminamos las tareas repetitivas conectando y sincronizando todas tus herramientas de trabajo en piloto automático.",
    href: "/servicios/automatizacion-de-procesos",
    icon: <Zap className="text-[#D62828]" size={32} />,
    tags: ["Ahorro de Tiempo", "Sistemas Conectados", "Cero Errores"]
  },
  {
    id: "04",
    title: "Software a Medida",
    desc: "Sistemas digitales y software corporativo personalizado para potenciar el crecimiento y orden de tu empresa.",
    href: "/servicios/software-a-medida",
    icon: <Layers className="text-[#D62828]" size={32} />,
    tags: ["Sistemas a Medida", "Gestión Integrada", "Acceso Seguro (Nube)"]
  }
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-[-10%] w-[50vw] h-[50vh] bg-white/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6">/ Capacidades Autonomek</p>
          <h1 className="font-display text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Nuestros <br /> <span className="text-white/20">Sistemas.</span>
          </h1>
          <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
            No somos generalistas. Nos especializamos en soluciones digitales que multiplican la eficiencia y la visibilidad de tu negocio a través de la ingeniería de precisión.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 md:mb-40">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={service.href}
                className="group block p-6 sm:p-12 bg-[#111] border border-white/5 rounded-[2.5rem] hover:border-[#D62828]/40 transition-all relative overflow-hidden h-full shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-[#D62828]/10 transition-colors pointer-events-none">
                   <span className="font-display text-7xl md:text-9xl font-black">{service.id}</span>
                </div>

                <div className="relative z-10">
                  <div className="mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">{service.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                    {service.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 rounded-full font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-white/40 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-[#D62828] font-bold text-xs uppercase tracking-widest group-hover:gap-5 transition-all">
                    Explorar Servicio <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Final CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl md:rounded-[3rem] bg-white p-8 md:p-24 overflow-hidden text-center"
        >
           <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
           <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-7xl font-black uppercase text-[#080808] mb-8 leading-none tracking-tighter">
                ¿Listo para el <br /> siguiente nivel?
              </h2>
              <p className="text-[#080808]/60 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto">
                Agenda una sesión estratégica hoy mismo y descubre cómo podemos transformar tu flujo de trabajo.
              </p>
              <Link href="/start" className="inline-flex items-center gap-4 px-8 py-4 md:px-12 md:py-6 bg-[#D62828] text-white font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl">
                COMENZAR PROYECTO <ArrowRight size={20} />
              </Link>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
