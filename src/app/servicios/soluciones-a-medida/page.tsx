'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SolucionesPage() {
  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 px-6 md:px-12 relative overflow-hidden">
      {/* Dynamic Background - Removed overlay grain and reduced blur for perf. */}
      <div className="absolute top-[10%] left-[50%] w-[20vw] h-[20vh] bg-blue-900/10 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[20%] w-[20vw] h-[20vh] bg-[#D62828]/10 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-mono text-xs text-white/40 mb-8 md:mb-12 uppercase tracking-widest"
        >
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-[#D62828] font-bold">Soluciones a Medida</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full mb-6 bg-[#050505]">
               <svg className="w-3 h-3 text-[#D62828]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">Escalabilidad Cloud</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-[1.1]">
              Arquitectura <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-[#D62828] leading-[1.2]">de Software.</span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              Soluciones construidas desde cero para empresas que han superado el software comercial. Desarrollamos ERPs ligeros, sistemas de inventario en tiempo real y portales para clientes con máxima seguridad.
            </p>
            
            <Link href="/start" className="inline-block px-8 py-4 border border-[#D62828]/50 text-white font-bold text-xs tracking-widest uppercase hover:bg-[#D62828] hover:text-[#080808] transition-all text-center magnetic-area shadow-lg">
              Cotizar Sistema
            </Link>
          </motion.div>

          {/* Visual: Private Dashboard Mock (Static, non-3D to ensure 60fps) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full aspect-[4/3] bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden relative shadow-2xl flex flex-col"
          >
             {/* Dashboard Header UI */}
             <div className="h-10 border-b border-white/5 bg-[#111] flex items-center px-4 gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="w-1/2 max-w-[200px] mx-auto h-5 bg-[#050505] rounded border border-white/5 flex items-center px-3">
                  <span className="text-[9px] font-mono text-white/30 truncate">platform.zenit.com</span>
                </div>
             </div>

             {/* Dashboard Body UI */}
             <div className="flex-1 flex p-4 gap-4 bg-[#0A0A0A]">
                {/* Sidebar */}
                <div className="w-1/4 h-full flex flex-col gap-3">
                  <div className="w-full h-8 bg-white/5 rounded-sm mb-2"></div>
                  <div className="w-full h-4 bg-white/5 rounded-sm"></div>
                  <div className="w-full h-4 bg-white/5 rounded-sm"></div>
                  <div className="w-4/5 h-4 bg-white/5 rounded-sm"></div>
                  <div className="w-full h-4 bg-[#D62828]/20 border border-[#D62828]/30 rounded-sm mt-auto"></div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 h-full flex flex-col gap-4">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                     {[1,2].map(i => (
                       <div key={i} className="bg-[#111] border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                         <div className="w-10 h-2 bg-white/20 rounded-sm"></div>
                         <div className="flex justify-between items-end">
                            <div className="w-16 h-5 bg-white/80 rounded-sm"></div>
                            {i === 2 ? 
                              <div className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse"></div> 
                              : 
                              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            }
                         </div>
                       </div>
                     ))}
                  </div>

                  {/* Chart / Data View */}
                  <div className="flex-1 bg-[#111] border border-white/5 rounded-lg p-4 relative overflow-hidden flex flex-col">
                    <div className="w-24 h-3 bg-white/20 rounded-sm mb-auto"></div>
                    {/* Simulated Graph Lines (Using CSS to avoid heavy SVG calculation) */}
                    <div className="w-full h-16 flex items-end justify-between px-2 gap-2 mt-4">
                       <div className="w-full bg-[#D62828]/80 rounded-t-sm h-[40%]"></div>
                       <div className="w-full bg-[#D62828]/80 rounded-t-sm h-[60%]"></div>
                       <div className="w-full bg-[#D62828]/80 rounded-t-sm h-[30%]"></div>
                       <div className="w-full bg-[#D62828]/80 rounded-t-sm h-[80%]"></div>
                       <div className="w-full bg-[#D62828]/80 rounded-t-sm h-[50%]"></div>
                       <div className="w-full bg-[#D62828]/80 rounded-t-sm h-[100%]"></div>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8"
          >
             <h3 className="font-mono text-xs text-[#D62828] uppercase tracking-widest mb-4">/ Bases de Datos Modernas</h3>
             <h4 className="font-display text-3xl font-bold mb-4 text-white">Seguridad Empresarial</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Trabajamos con nubes robustas como AWS y Postgres. Tu infraestructura será capaz de escalar de 10 a miles de usuarios concurrentes de forma transparente, mientras garantizamos cifrado de máximo nivel en todas las transacciones.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-t border-white/10 pt-8"
          >
             <h3 className="font-mono text-xs text-blue-400 uppercase tracking-widest mb-4">/ Acceso Restringido</h3>
             <h4 className="font-display text-3xl font-bold mb-4 text-white">Roles y Autenticación Multi-Factor</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Asignamos jerarquías. Tu equipo de soporte solo verá la información necesaria para trabajar, mientras la gerencia centraliza las lógicas maestras y toda la analítica directiva del proyecto desde un panel inviolable.
            </p>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
