'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Database, Shield, Server, Layers, Cpu, Code, Globe, Lock, Search, LifeBuoy, BarChart3, ArrowRight } from 'lucide-react';

export default function SolucionesPage() {
  const processSteps = [
    { title: "Auditoría Técnica", desc: "Analizamos tu flujo actual para detectar cuellos de botella y fugas de datos." },
    { title: "Arquitectura", desc: "Diseñamos un sistema escalable que soporte el crecimiento de tu empresa." },
    { title: "Desarrollo Ágil", desc: "Entregas iterativas cada dos semanas para validar cada módulo del software." },
    { title: "Soporte 24/7", desc: "Mantenimiento proactivo para asegurar que tu sistema nunca se detenga." }
  ];

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
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-[#D62828] font-bold">Soluciones a Medida</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full mb-8 bg-[#050505]">
               <Cpu size={14} className="text-[#D62828]" />
              <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">Escalabilidad Cloud</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Software de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-[#D62828]">
                Grado Militar.
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              Cuando el software comercial ya no es suficiente, construimos herramientas propias. ERPs ligeros, paneles de analítica y plataformas de gestión centralizadas para tu operación.
            </p>
            
            <Link href="/start" className="inline-flex items-center gap-4 px-8 py-4 border border-[#D62828]/50 text-white font-bold text-xs tracking-widest uppercase hover:bg-[#D62828] hover:text-[#080808] transition-all shadow-lg">
              Cotizar Infraestructura <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Visual: Private Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-square md:aspect-[4/3] bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col"
          >
             <div className="h-12 border-b border-white/5 bg-[#111] flex items-center px-6 gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex-1 max-w-[240px] mx-auto h-6 bg-[#050505] rounded-full border border-white/5 flex items-center px-4">
                  <span className="text-[10px] font-mono text-white/20 truncate tracking-widest">platform.zenit.cloud</span>
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
        <section className="mb-40">
           <div className="text-center mb-20">
             <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6">De la idea al despliegue</h2>
             <div className="w-20 h-1 bg-[#D62828] mx-auto"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                 <h3 className="font-bold text-xl mb-4 relative z-10">{step.title}</h3>
                 <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
               </motion.div>
             ))}
           </div>
        </section>

        {/* Capabilities Grid */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Lock className="text-[#D62828]" />, title: "Seguridad Bancaria", desc: "Cifrado de datos en reposo y tránsito, autenticación MFA y auditorías de seguridad." },
            { icon: <Server className="text-[#D62828]" />, title: "Infraestructura Cloud", desc: "Sistemas montados en AWS o Google Cloud para escalabilidad garantizada." },
            { icon: <BarChart3 className="text-[#D62828]" />, title: "BI & Analítica", desc: "Paneles de control a medida para visualizar cada KPI de tu negocio en tiempo real." },
            { icon: <Layers className="text-[#D62828]" />, title: "Microservicios", desc: "Arquitecturas modulares que permiten actualizar partes del sistema sin detener la operación." },
            { icon: <Globe className="text-[#D62828]" />, title: "APIs Propias", desc: "Creamos la documentación y la infraestructura para que otras apps se conecten a la tuya." },
            { icon: <LifeBuoy className="text-[#D62828]" />, title: "Mantenimiento", desc: "No te dejamos solo. Incluimos soporte técnico continuo para actualizaciones y mejoras." }
          ].map((cap, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-10 bg-[#111] border border-white/5 rounded-[2rem] hover:border-[#D62828]/20 transition-all"
            >
              <div className="mb-6">{cap.icon}</div>
              <h3 className="font-display text-2xl font-bold mb-4">{cap.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Final CTA */}
        <section className="relative py-32 rounded-[3rem] bg-gradient-to-br from-[#111] to-black border border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="font-display text-4xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter leading-none">
              Tu software es <br /> tu <span className="text-[#D62828]">activo</span> más valioso.
            </h2>
            <p className="text-white/40 text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto">
              Deja de adaptarte a las herramientas de otros. Crea la herramienta que se adapte perfectamente a tu forma de trabajar.
            </p>
            <Link href="/start" className="inline-flex items-center gap-4 px-12 py-6 bg-[#D62828] text-white font-black text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl">
              HABLAR CON UN ARQUITECTO <ArrowRight size={20} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
