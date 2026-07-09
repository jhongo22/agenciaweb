'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Link as LinkIcon, Database, Share2, ShieldCheck, Clock, TrendingUp, ArrowRight, Settings, Smartphone, Mail, CreditCard, Plus } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';

export default function AutomatizacionPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const autoProjects = useMemo(() => {
    return PROJECTS.filter(p => p.category === 'Automatización').slice(0, 4);
  }, []);

  const tools = [
    { name: "WhatsApp API", icon: <Smartphone size={20} /> },
    { name: "HubSpot / CRM", icon: <Settings size={20} /> },
    { name: "Stripe / Pagos", icon: <CreditCard size={20} /> },
    { name: "Google Workspace", icon: <Mail size={20} /> },
    { name: "Bases de Datos", icon: <Database size={20} /> },
    { name: "ERP / Custom", icon: <Share2 size={20} /> }
  ];

  const benefits = [
    {
      title: "Eliminación de Errores",
      desc: "Los humanos se cansan, las automatizaciones no. Asegura que cada dato llegue a su destino sin fallos manuales.",
      icon: <ShieldCheck className="text-[#00CC66]" />
    },
    {
      title: "Escalabilidad Infinita",
      desc: "Procesa 10 o 10,000 leads al día con el mismo costo operativo. Tu infraestructura crece contigo.",
      icon: <TrendingUp className="text-[#00CC66]" />
    },
    {
      title: "Tiempo de Respuesta",
      desc: "Responde a tus clientes en milisegundos. La velocidad es el factor #1 en la conversión de ventas hoy.",
      icon: <Clock className="text-[#00CC66]" />
    }
  ];

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vh] bg-[#00CC66]/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-[-10%] w-[40vw] h-[40vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-mono text-xs text-white/40 mb-12 uppercase tracking-widest"
        >
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-[#00CC66] font-bold">Automatización</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00CC66]/30 rounded-full mb-8 bg-[#00CC66]/5">
              <span className="w-2 h-2 rounded-full bg-[#00CC66] animate-pulse"></span>
              <span className="font-mono text-[10px] text-[#00CC66] uppercase tracking-widest font-bold font-mono">Ecosistemas Hiperconectados</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Tu Negocio en <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-[#00CC66]">
                Piloto Automático.
              </span>
            </h1>
            
            <p className="font-sans text-base md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              Eliminamos las tareas repetitivas de tu equipo mediante flujos de trabajo autónomos. Conectamos todas tus herramientas para que la información fluya sin intervención humana.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/start" className="px-8 py-4 bg-[#00CC66] text-[#080808] font-bold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(0,204,102,0.2)] rounded-xl">
                Auditar Mis Procesos
              </Link>
              <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                <Zap size={14} className="text-[#00CC66]" />
                <span>Ahorro promedio: 15h / semana</span>
              </div>
            </div>
          </motion.div>

          {/* Workflow Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-square bg-[#0A0A0A] border border-white/5 rounded-2xl md:rounded-[2rem] p-6 md:p-12 relative overflow-hidden flex flex-col justify-center shadow-2xl"
          >
             <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
             
             <div className="relative z-10 space-y-12 ml-4 md:ml-12 border-l-2 border-white/5 pl-8 md:pl-12">
                 {[
                   { name: "Inicio", detail: "Formulario Web de Contacto", color: "#DFDFDF" },
                   { name: "Procesamiento", detail: "Clasificación Inteligente", color: "#D62828" },
                   { name: "Acción", detail: "Envío a tu Base de Datos y Alertas", color: "#00CC66" }
                 ].map((step, i) => (
                   <motion.div 
                     key={i}
                     initial={{ x: -20, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: i * 0.2 }}
                     className="bg-[#111] border border-white/10 rounded-2xl p-4 w-full max-w-[280px] flex items-center gap-4 relative shadow-xl group hover:border-white/20 transition-all"
                   >
                     <div className={`absolute -left-[45px] md:-left-[61px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-[#080808] z-10 transition-colors`} style={{ backgroundColor: step.color }}>
                        {i === 0 && <div className="w-full h-full bg-white/40 rounded-full animate-ping"></div>}
                     </div>
                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                       {i === 0 ? <LinkIcon size={18} /> : i === 1 ? <Settings size={18} /> : <Share2 size={18} />}
                     </div>
                     <div>
                       <h4 className="text-white text-xs font-bold uppercase tracking-widest">{step.name}</h4>
                       <p className="text-white/40 text-[10px] font-mono">{step.detail}</p>
                     </div>
                   </motion.div>
                 ))}
             </div>
          </motion.div>
        </div>

        {/* Integration Grid */}
        <section className="mb-24 md:mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
            <div className="max-w-xl">
              <p className="font-mono text-[#00CC66] text-xs tracking-[0.3em] uppercase mb-4">Conectividad Total</p>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight">Cualquier App, <br /> un solo Flujo.</h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs font-light">
              No importa qué software uses. Si tus herramientas permiten comunicación, podemos automatizarlas y conectarlas en un solo flujo.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="p-4 md:p-8 bg-[#111] border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 text-center transition-all"
              >
                <div className="text-[#00CC66]">{tool.icon}</div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Efficiency Stats */}
        <section className="mb-24 md:mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-10 bg-[#111] border-t-4 border-[#00CC66] rounded-2xl shadow-xl"
            >
              <div className="mb-6">{b.icon}</div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-4">{b.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Use Cases Horizontal */}
        <section className="mb-24 md:mb-40 relative overflow-hidden rounded-2xl md:rounded-[3rem] bg-gradient-to-br from-[#111] to-black border border-white/5 p-6 md:p-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
               <h2 className="font-display text-3xl md:text-6xl font-black uppercase mb-12">Casos de <br /> <span className="text-[#00CC66]">Impacto.</span></h2>
               <div className="space-y-12">
                  <div className="group cursor-pointer">
                    <h4 className="font-mono text-[#00CC66] text-[10px] mb-2 uppercase tracking-widest">Ventas & CRM</h4>
                    <p className="text-lg md:text-xl text-white/80 group-hover:text-white transition-colors">Sincronización automática de facturas desde pasarelas de pago hacia tu sistema contable.</p>
                  </div>
                  <div className="group cursor-pointer">
                    <h4 className="font-mono text-[#00CC66] text-[10px] mb-2 uppercase tracking-widest">Atención al Cliente</h4>
                    <p className="text-lg md:text-xl text-white/80 group-hover:text-white transition-colors">Sistema de tickets que auto-responde vía WhatsApp y notifica en tiempo real al equipo en casos críticos.</p>
                  </div>
                  <div className="group cursor-pointer">
                    <h4 className="font-mono text-[#00CC66] text-[10px] mb-2 uppercase tracking-widest">Operaciones</h4>
                    <p className="text-lg md:text-xl text-white/80 group-hover:text-white transition-colors">Generación de reportes automáticos semanales sobre el estado de tu negocio directos a tu email.</p>
                  </div>
               </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#00CC66]/10 blur-[100px] rounded-full animate-pulse"></div>
              <div className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-[10px] md:text-xs text-white/40 space-y-4">
                  <p className="text-[#00CC66]">{">"} Initializing Autonomek_Engine_v2...</p>
                  <p>{">"} Scanning connected applications: 42 found.</p>
                  <p>{">"} Deploying automation servers... [OK]</p>
                  <p>{">"} Latency: 4ms</p>
                  <p>{">"} Status: Running_Autopilot</p>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-8">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-[#00CC66]"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED PROJECTS SECTION */}
        <section className="mb-24 md:mb-40 border-t border-white/5 pt-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Integraciones Activas</p>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase">Automatizaciones Destacadas</h2>
            </div>
            <Link href="/proyectos" className="font-mono text-xs uppercase tracking-widest text-[#D62828] hover:text-white transition-colors border-b border-[#D62828]/20 pb-1">
              Ver Todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {autoProjects.map((project) => (
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
                    <span>Ver Detalles</span>
                    <Plus size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-10 md:py-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-1 bg-gradient-to-r from-[#00CC66] to-[#D62828] rounded-2xl md:rounded-[2rem]"
          >
            <div className="bg-[#080808] px-6 py-10 md:px-24 rounded-[1.9rem]">
              <h2 className="font-display text-3xl md:text-6xl font-black uppercase mb-8">Libera a tu Equipo.</h2>
              <p className="text-white/50 text-base md:text-xl mb-8 md:mb-12 max-w-xl mx-auto">
                No contrates más personas para tareas que un servidor puede hacer mejor, más rápido y sin errores.
              </p>
              <Link href="/start" className="inline-flex items-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-[#00CC66] text-[#080808] font-black text-xs md:text-sm tracking-widest uppercase hover:bg-white transition-all shadow-2xl rounded-xl">
                COMENZAR AUDITORÍA <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
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
