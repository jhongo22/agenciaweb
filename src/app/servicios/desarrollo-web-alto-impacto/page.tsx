'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DesarrolloWebPage() {
  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 px-6 md:px-12 relative overflow-hidden">
      {/* Dynamic Background - performance optimized */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[#D62828]/5 blur-[100px] pointer-events-none rounded-full" />

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
          <span className="text-[#D62828] font-bold">Web Headless</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D62828]/30 rounded-full mb-6 bg-[#D62828]/5">
              <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse"></span>
              <span className="font-mono text-[10px] text-[#D62828] uppercase tracking-widest">Performance Absoluto</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-[1.1]">
              Ingeniería Web de <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Alto Impacto.</span>
                <span className="absolute bottom-1 left-0 w-full h-3 md:h-5 bg-[#D62828]/80 -z-10 -rotate-2"></span>
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              Construimos ecosistemas web premium con React y Next.js. Velocidad de carga al milisegundo y arquitecturas diseñadas obsesivamente para la conversión y el posicionamiento (SEO).
            </p>
            
            <Link href="/start" className="inline-block px-8 py-4 bg-white text-[#080808] font-bold text-xs tracking-widest uppercase hover:bg-[#D62828] hover:text-white transition-all text-center magnetic-area shadow-lg">
              Cotizar Infraestructura
            </Link>
          </motion.div>

          {/* Visual: Sleek Server/Deployment Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full aspect-square md:aspect-video lg:aspect-square bg-[#050505] border border-white/10 p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-[#D62828]/5 to-transparent pointer-events-none"></div>
             
             <div className="w-full max-w-md bg-[#111111] border border-white/5 rounded-xl flex flex-col font-mono text-xs text-white/60 relative overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 bg-[#0A0A0A]">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                  </div>
                  <div className="ml-4 px-2 py-0.5 bg-white/5 rounded text-[10px] uppercase text-white/40">production_deploy</div>
                </div>
                
                {/* Body */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">STATUS</span>
                    <span className="flex items-center gap-2 text-[#D62828] px-2 py-1 bg-[#D62828]/10 rounded border border-[#D62828]/20">
                      <div className="w-1.5 h-1.5 bg-[#D62828] rounded-full animate-pulse"></div> LIVE
                    </span>
                  </div>

                  <div className="h-[1px] w-full bg-white/5 my-1"></div>

                  <div className="flex justify-between">
                    <span>Edge Network</span>
                    <span className="text-white">Global (Vercel)</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Server Response</span>
                    <span className="text-white">{'<'} 50ms</span>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] mb-2 uppercase">
                        <span>LCP Optimization</span>
                        <span className="text-white">100%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          className="h-full bg-[#D62828]"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                     <div className="flex-1">
                      <div className="flex justify-between text-[10px] mb-2 uppercase">
                        <span>SEO Core Vitals</span>
                        <span className="text-white">100/100</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                          className="h-full bg-white"
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                </div>
             </div>
          </motion.div>
        </div>

        {/* Feature Sections */}
        <div className="border-t border-white/10 pt-24 mb-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="w-12 h-12 border border-[#D62828]/50 flex items-center justify-center mb-6 group-hover:bg-[#D62828] transition-colors">
              <span className="font-mono text-xs text-[#D62828] group-hover:text-white transition-colors">01</span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Arquitectura Headless</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Separamos el frontend del backend. Utilizamos Next.js para servir páginas pre-renderizadas a velocidad luz globalmente, integradas a CMS modernos para administración total.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="w-12 h-12 border border-[#D62828]/50 flex items-center justify-center mb-6 group-hover:bg-[#D62828] transition-colors">
              <span className="font-mono text-xs text-[#D62828] group-hover:text-white transition-colors">02</span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Diseño Operativo</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Funnels de venta orgánicos integrados en la UI. Analizamos profundamente el comportamiento de tus usuarios para posicionar llamadas a la acción irresistibles.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group"
          >
            <div className="w-12 h-12 border border-[#D62828]/50 flex items-center justify-center mb-6 group-hover:bg-[#D62828] transition-colors">
              <span className="font-mono text-xs text-[#D62828] group-hover:text-white transition-colors">03</span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">SEO Técnico Preciso</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Estructuramos todos los metadatos y etiquetas desde la raíz. Tu sitio "hablará" el idioma de los algoritmos de búsqueda desde el primer día que salga a producción.
            </p>
          </motion.div>
        </div>
        
      </div>
    </main>
  );
}
