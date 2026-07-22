'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Zap, Search, Layout, Code2, Cpu, Globe, Rocket, Shield, ArrowRight, Smartphone, Gauge, Plus } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';

export default function DesarrolloWebPageClient({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const isEn = locale === 'en';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const webProjects = useMemo(() => {
    return PROJECTS.filter(p => p.category === 'Web').slice(0, 4);
  }, []);

  const lighthouseStats = [
    { label: isEn ? "Performance" : "Rendimiento", value: 100, color: "#00CC66" },
    { label: isEn ? "Accessibility" : "Accesibilidad", value: 100, color: "#00CC66" },
    { label: isEn ? "Best Practices" : "Calidad", value: 100, color: "#00CC66" },
    { label: isEn ? "SEO Positioning" : "Posicionamiento (SEO)", value: 100, color: "#00CC66" }
  ];

  const techStack = isEn ? [
    { name: "Instant Load", desc: "Optimized down to the millisecond to keep users engaged.", icon: <Rocket /> },
    { name: "Responsive Design", desc: "Precise rendering customized to fit any screen size.", icon: <Layout /> },
    { name: "Total Stability", desc: "Solid architectures built to handle traffic surges without breaking.", icon: <Code2 /> },
    { name: "Advanced Security", desc: "Enterprise protection to guard your transactions and user records.", icon: <Globe /> }
  ] : [
    { name: "Carga Instantánea", desc: "Optimizada al milisegundo para retener clientes.", icon: <Rocket /> },
    { name: "Diseño Inteligente", desc: "Preciso y adaptado a cualquier dispositivo y pantalla.", icon: <Layout /> },
    { name: "Estabilidad Total", desc: "Estructuras sólidas que no se rompen ante picos de tráfico.", icon: <Code2 /> },
    { name: "Seguridad Robusta", desc: "Protección avanzada para resguardar tus datos y transacciones.", icon: <Globe /> }
  ];

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const startUrl = isEn ? "/us/start" : "/start";
  const projectsUrl = isEn ? "/us/projects" : "/proyectos";

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vh] bg-[#D62828]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vh] bg-white/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-mono text-xs text-white/40 mb-12 uppercase tracking-widest"
        >
          <Link href={isEn ? "/us" : "/"} className="hover:text-white transition-colors">{isEn ? "Home" : "Inicio"}</Link>
          <span>/</span>
          <Link href={isEn ? "/us/services" : "/servicios"} className="hover:text-white transition-colors">{isEn ? "Services" : "Servicios"}</Link>
          <span>/</span>
          <span className="text-[#D62828] font-bold">{isEn ? "Websites" : "Páginas Web"}</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D62828]/30 rounded-full mb-8 bg-[#D62828]/5">
              <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse"></span>
              <span className="font-mono text-[10px] text-[#D62828] uppercase tracking-widest font-bold">
                {isEn ? "Client Acquisition Machine" : "Máquina de Adquisición de Clientes"}
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              {isEn ? "Web Development" : "Desarrollo Web"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                {isEn ? "Premium & SEO." : "Premium & SEO."}
              </span>
            </h1>
            
            <p className="font-sans text-base md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              {isEn 
                ? "We don't build generic informational websites. We engineer ultra-fast, Google SEO-optimized pages designed to act as your primary customer acquisition channel."
                : "No hacemos sitios web informativos estáticos. Diseñamos páginas ultra rápidas y optimizadas para Google que operan como tu principal canal de atracción de clientes y ventas."}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href={startUrl} className="px-8 py-4 bg-white text-[#080808] font-bold text-xs tracking-widest uppercase hover:bg-[#D62828] hover:text-white transition-all shadow-2xl rounded-xl">
                {isEn ? "Design My Website" : "Diseñar Mi Web"}
              </Link>
              <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                <Zap size={14} className="text-[#D62828]" />
                <span>{isEn ? "Load time under 1s" : "Carga en menos de 1s"}</span>
              </div>
            </div>
          </motion.div>

          {/* Performance Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#111] border border-white/10 rounded-2xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D62828]/10 blur-[80px] -z-10"></div>
            <div className="flex items-center gap-4 mb-8 md:mb-12">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
               <span className="ml-4 font-mono text-[10px] text-white/20 uppercase tracking-widest">performance_web.log</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {lighthouseStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                      <motion.circle 
                        cx="50%" cy="50%" r="45%" fill="transparent" stroke={stat.color} strokeWidth="6" 
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 + i * 0.1 }}
                      />
                    </svg>
                    <span className="absolute font-display text-xl md:text-3xl font-bold">{stat.value}</span>
                  </div>
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Grid */}
        <section className="mb-24 md:mb-40">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6">
              {isEn ? "Quality Pillars" : "Pilares de Calidad"}
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] font-bold">
              {isEn ? "Engineered to Sell" : "Diseñado para Vender"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-6 md:p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all group"
              >
                <div className="text-[#D62828] mb-6 transform group-hover:scale-110 transition-transform">
                  {React.cloneElement(tech.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="font-bold text-lg md:text-xl mb-4 group-hover:text-[#D62828] transition-colors">{tech.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Architecture Detail */}
        <section className="mb-24 md:mb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-video bg-[#0A0A0A] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D62828]/20 to-transparent"></div>
              <div className="p-6 md:p-8 font-mono text-[10px] md:text-xs text-white/40">
                <p className="text-[#00CC66] mb-4">
                  {isEn ? "// Analyzing speed and performance" : "// Analizando velocidad y rendimiento"}
                </p>
                <p className="text-white">
                  {isEn ? "Simulated concurrent traffic: 1,500 users/min" : "Simulación de tráfico concurrente: 1,500 usuarios/min"}
                </p>
                <p className="pl-4 text-white/60">
                  {isEn ? "Loading static resources... [OK]" : "Carga inicial de recursos... [OK]"}
                </p>
                <p className="pl-8 text-white/60">
                  {isEn ? "Cloud image optimizations... [OK]" : "Optimización de imágenes en la nube... [OK]"}
                </p>
                <p className="pl-4 text-white/60">
                  {isEn ? "Data compression... [OK]" : "Compresión de datos... [OK]"}
                </p>
                <p className="text-white">{isEn ? "Status: Perfect" : "Resultado: Excelente"}</p>
                
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                   <p className="text-white mb-2 uppercase tracking-widest text-[9px] font-bold">
                     {isEn ? "Load Metrics" : "Estadísticas de Carga"}
                   </p>
                   <div className="flex justify-between items-center text-[10px]">
                      <span>{isEn ? "Load Time" : "Tiempo de carga"}</span>
                      <span className="text-[#00CC66]">{isEn ? "0.4 seconds" : "0.4 segundos"}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] mt-2">
                      <span>{isEn ? "Response speed" : "Velocidad de respuesta"}</span>
                      <span className="text-[#00CC66]">{isEn ? "Ultra Fast" : "Muy rápido"}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-4 font-bold">
              {isEn ? "The Autonomek Edge" : "La Diferencia Autonomek"}
            </p>
            <h2 className="font-display text-3xl md:text-6xl font-black uppercase mb-8 leading-[0.9]">
              {isEn ? "Websites that \n Do Not Break." : "Webs que \n No se Rompen."}
            </h2>
            <div className="space-y-8">
               {(isEn ? [
                 { title: "Google Search Engine Positioning (SEO)", desc: "We optimize every technical detail of your website to ensure your business ranks high on search engine result pages, capturing organic traffic for free.", icon: <Search size={20} /> },
                 { title: "Mobile-First Design", desc: "Responsive layouts that look stunning and load instantly on any smartphone screen.", icon: <Smartphone size={20} /> },
                 { title: "Watertight Security", desc: "Advanced systems locked against security threats to shield your business records.", icon: <Shield size={20} /> }
               ] : [
                 { title: "Posicionamiento Web en Google (SEO)", desc: "Optimizamos cada detalle técnico del sitio para que tu negocio aparezca en los primeros lugares de Google y capte tráfico sin costo por clic.", icon: <Search size={20} /> },
                 { title: "Diseño para Celulares (Mobile First)", desc: "Interfaces adaptativas que se ven espectaculares y cargan de forma instantánea en cualquier smartphone.", icon: <Smartphone size={20} /> },
                 { title: "Seguridad Inviolable", desc: "Sistemas avanzados y blindados contra intrusos para proteger la información de tu negocio.", icon: <Shield size={20} /> }
               ]).map((item, i) => (
                 <div key={i} className="flex gap-6">
                   <div className="mt-1 text-[#D62828]">{item.icon}</div>
                   <div>
                     <h4 className="font-bold text-base md:text-lg mb-2">{item.title}</h4>
                     <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* RELATED PROJECTS SECTION */}
        <section className="mb-24 md:mb-40 border-t border-white/5 pt-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">
                {isEn ? "/ Related Portfolio" : "/ Portafolio Relacionado"}
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase">
                {isEn ? "Featured Websites" : "Casos Web Destacados"}
              </h2>
            </div>
            <Link href={projectsUrl} className="font-mono text-xs uppercase tracking-widest text-[#D62828] hover:text-white transition-colors border-b border-[#D62828]/20 pb-1">
              {isEn ? "See All →" : "Ver Todos →"}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenDetails(project)}
                className="group relative bg-[#111]/60 border border-white/5 rounded-3xl overflow-hidden hover:border-[#D62828]/40 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={`/projects/${project.folder}/${project.images[0]}`}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-65 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-[9px] text-[#D62828] uppercase tracking-widest mb-1.5 block font-bold">{project.client}</span>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-[#D62828]">
                    <span>{isEn ? "View Details" : "Ver Detalles"}</span>
                    <Plus size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-16 md:py-32 rounded-2xl md:rounded-[4rem] bg-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-8 font-black">
              {isEn ? "Your Vision, Our Engineering" : "Tu Visión, Nuestra Ingeniería"}
            </p>
            <h2 className="font-display text-3xl md:text-8xl font-black uppercase text-[#080808] mb-8 md:mb-12 tracking-tighter leading-none">
              {isEn ? "Let's Build \n Your Ecosystem." : "Construyamos \n tu Ecosistema."}
            </h2>
            <Link href={startUrl} className="inline-flex items-center gap-4 px-8 py-4 md:px-12 md:py-6 bg-[#D62828] text-white font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl rounded-xl">
              {isEn ? "START PROJECT" : "INICIAR PROYECTO"} <ArrowRight size={20} />
            </Link>
          </div>
        </section>

      </div>

      <ProjectDetailsModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </main>
  );
}
