'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Database, Shield, Server, Layers, Cpu, Code, Globe, Lock, Search, LifeBuoy, BarChart3, ArrowRight, Plus } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';

export default function SolucionesPageClient({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const isEn = locale === 'en';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customProjects = useMemo(() => {
    return PROJECTS.filter(p => [3, 1, 10, 14].includes(p.id));
  }, []);

  const processSteps = isEn ? [
    { title: "Technical Audit", desc: "We analyze your current pipeline to pinpoint bottlenecks and identify data leaks." },
    { title: "Architecture", desc: "We design a scalable blueprint engineered to support your company's expansion." },
    { title: "Agile Development", desc: "Iterative releases every two weeks to test and validate each software module." },
    { title: "24/7 Monitoring", desc: "Proactive maintenance ensuring your core systems never experience downtime." }
  ] : [
    { title: "Auditoría Técnica", desc: "Analizamos tu flujo actual para detectar cuellos de botella y fugas de datos." },
    { title: "Arquitectura", desc: "Diseñamos un sistema escalable que soporte el crecimiento de tu empresa." },
    { title: "Desarrollo Ágil", desc: "Entregas iterativas cada dos semanas para validar cada módulo del software." },
    { title: "Soporte 24/7", desc: "Mantenimiento proactivo para asegurar que tu sistema nunca se detenga." }
  ];

  const capabilities = isEn ? [
    { icon: <Lock className="text-[#D62828]" />, title: "Enterprise Security", desc: "Data encryption at rest and in transit, two-factor authentication, and regular security audits." },
    { icon: <Server className="text-[#D62828]" />, title: "Cloud Systems", desc: "Hosted systems safely deployed online for secure and fast access from any location." },
    { icon: <BarChart3 className="text-[#D62828]" />, title: "Reports & Analytics", desc: "Administration dashboards to visualize your core numbers and business health metrics in real time." },
    { icon: <Layers className="text-[#D62828]" />, title: "Modular Architecture", desc: "Systems engineered into independent blocks, allowing functionality upgrades without pausing operations." },
    { icon: <Globe className="text-[#D62828]" />, title: "External Connections", desc: "We build APIs and integration pipelines so other applications can communicate with yours." },
    { icon: <LifeBuoy className="text-[#D62828]" />, title: "Continuous Maintenance", desc: "We stick around. We include ongoing technical support for preventive security patches and updates." }
  ] : [
    { icon: <Lock className="text-[#D62828]" />, title: "Seguridad Corporativa", desc: "Cifrado de datos en reposo y tránsito, acceso protegido de dos pasos y auditorías de seguridad." },
    { icon: <Server className="text-[#D62828]" />, title: "Sistemas en la Nube", desc: "Sistemas alojados de forma segura en internet para acceder de forma rápida desde cualquier lugar." },
    { icon: <BarChart3 className="text-[#D62828]" />, title: "Reportes y Estadísticas", desc: "Paneles de control para visualizar el estado y los números clave de tu negocio en tiempo real." },
    { icon: <Layers className="text-[#D62828]" />, title: "Estructura Modular", desc: "Sistemas diseñados por partes independientes que permiten actualizar funciones sin detener tu operación." },
    { icon: <Globe className="text-[#D62828]" />, title: "Conexiones Externas", desc: "Preparamos la infraestructura para que otros sistemas o aplicaciones se conecten y hablen con el tuyo." },
    { icon: <LifeBuoy className="text-[#D62828]" />, title: "Mantenimiento Continuo", desc: "No te dejamos solo. Incluimos soporte técnico continuo para actualizaciones y mejoras preventivas." }
  ];

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const startUrl = isEn ? "/us/start" : "/start";
  const projectsUrl = isEn ? "/us/projects" : "/proyectos";

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[50%] w-[50vw] h-[50vh] bg-blue-900/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vh] bg-[#D62828]/10 blur-[120px] pointer-events-none rounded-full" />
      
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
          <span className="text-[#D62828] font-bold">{isEn ? "Custom Software" : "Software a Medida"}</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full mb-8 bg-[#050505]">
               <Cpu size={14} className="text-[#D62828]" />
              <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest font-bold font-mono">
                {isEn ? "High Availability" : "Alta Disponibilidad"}
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              {isEn ? "Military Grade" : "Software de"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-[#D62828]">
                {isEn ? "Software." : "Grado Militar."}
              </span>
            </h1>
            
            <p className="font-sans text-base md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              {isEn 
                ? "When commercial software is no longer enough, we build proprietary solutions. Custom CRM platforms, analytics dashboards, and centralized management tools for your business."
                : "Cuando el software comercial ya no es suficiente, construimos herramientas propias. Sistemas de gestión, paneles de analítica y plataformas de administración centralizadas para tu negocio."}
            </p>
            
            <Link href={startUrl} className="inline-flex items-center gap-4 px-8 py-4 border border-[#D62828]/50 text-white font-bold text-xs tracking-widest uppercase hover:bg-[#D62828] hover:text-[#080808] transition-all shadow-lg rounded-xl">
              {isEn ? "Quote Custom Software" : "Cotizar Software a Medida"} <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Visual: Private Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-square md:aspect-[4/3] bg-[#0A0A0A] border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl flex flex-col"
          >
             <div className="h-12 border-b border-white/5 bg-[#111] flex items-center px-6 gap-4">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                 </div>
                 <div className="flex-1 max-w-[240px] mx-auto h-6 bg-[#050505] rounded-full border border-white/5 flex items-center px-4">
                   <span className="text-[10px] font-mono text-white/20 truncate tracking-widest">platform.autonomek.com</span>
                 </div>
             </div>

             <div className="flex-1 flex p-6 gap-6 bg-[#0A0A0A]">
                 <div className="w-1/3 h-full flex flex-col gap-4">
                    <div className="w-full h-12 bg-white/5 rounded-xl border border-white/5"></div>
                    <div className="w-full h-4 bg-white/5 rounded-full"></div>
                    <div className="w-4/5 h-4 bg-white/5 rounded-full"></div>
                    <div className="w-full h-4 bg-[#D62828]/10 rounded-full mt-auto"></div>
                 </div>

                 <div className="flex-1 h-full flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                       {[1,2].map(i => (
                         <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
                           <div className="w-12 h-2 bg-white/10 rounded-full"></div>
                           <div className="flex justify-between items-end mt-2">
                              <div className="w-16 h-6 bg-white/60 rounded-full"></div>
                              <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-[#D62828] animate-pulse' : 'bg-blue-400'}`}></div>
                           </div>
                         </div>
                       ))}
                    </div>

                    <div className="flex-1 bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col">
                      <div className="w-32 h-3 bg-white/10 rounded-full mb-auto"></div>
                      <div className="w-full h-24 flex items-end justify-between px-2 gap-3 mt-4">
                         {[40, 60, 30, 85, 50, 100, 70, 90].map((h, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             transition={{ duration: 1, delay: i * 0.1 }}
                             className="w-full bg-gradient-to-t from-[#D62828]/50 to-[#D62828] rounded-t-lg"
                           ></motion.div>
                         ))}
                      </div>
                    </div>
                 </div>
              </div>
          </motion.div>
        </div>

        {/* Process Section */}
        <section className="mb-24 md:mb-40">
           <div className="text-center mb-16 md:mb-20">
             <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6">
               {isEn ? "From Idea to Deployment" : "De la idea al despliegue"}
             </h2>
             <div className="w-20 h-1 bg-[#D62828] mx-auto"></div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {processSteps.map((step, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="relative"
                 >
                   <div className="text-5xl font-display font-black text-white/5 absolute -top-8 -left-4">{i + 1}</div>
                   <h3 className="font-bold text-lg md:text-xl mb-4 relative z-10">{step.title}</h3>
                   <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                 </motion.div>
              ))}
           </div>
        </section>

        {/* Capabilities Grid */}
        <section className="mb-24 md:mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-6 md:p-10 bg-[#111] border border-white/5 rounded-2xl hover:border-[#D62828]/20 transition-all"
            >
              <div className="mb-6">{cap.icon}</div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-4">{cap.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* RELATED PROJECTS SECTION */}
        <section className="mb-24 md:mb-40 border-t border-white/5 pt-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">
                {isEn ? "/ Proprietary Systems" : "/ Sistemas Propios"}
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase">
                {isEn ? "Software Real Deployed" : "Software Real Desplegado"}
              </h2>
            </div>
            <Link href={projectsUrl} className="font-mono text-xs uppercase tracking-widest text-[#D62828] hover:text-white transition-colors border-b border-[#D62828]/20 pb-1">
              {isEn ? "See All →" : "Ver Todos →"}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customProjects.map((project) => (
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
        <section className="relative py-16 md:py-32 rounded-2xl md:rounded-[3rem] bg-gradient-to-br from-[#111] to-black border border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="font-display text-3xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter leading-none">
              {isEn ? "Your software is \n your most valuable asset." : "Tu software es \n tu activo más valioso."}
            </h2>
            <p className="text-white/40 text-base md:text-lg mb-8 md:mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              {isEn 
                ? "Stop adapting to other companies' software. Build the tool that adapts perfectly to the way you work."
                : "Deja de adaptarte a las herramientas de otros. Crea la herramienta que se adapte perfectamente a tu forma de trabajar."}
            </p>
            <Link href={startUrl} className="inline-flex items-center gap-4 px-8 py-4 md:px-12 md:py-6 bg-[#D62828] text-white font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl rounded-xl">
              {isEn ? "TALK TO AN ENGINEER" : "HABLAR CON UN INGENIERO"} <ArrowRight size={20} />
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
