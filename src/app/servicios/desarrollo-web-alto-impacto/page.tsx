'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Zap, Search, Layout, Code2, Cpu, Globe, Rocket, Shield, ArrowRight, Smartphone, Gauge } from 'lucide-react';

export default function DesarrolloWebPage() {
  const lighthouseStats = [
    { label: "Performance", value: 100, color: "#00CC66" },
    { label: "Accessibility", value: 100, color: "#00CC66" },
    { label: "Best Practices", value: 100, color: "#00CC66" },
    { label: "SEO", value: 100, color: "#00CC66" }
  ];

  const techStack = [
    { name: "Next.js", desc: "El framework de React para la web de alto rendimiento.", icon: <Rocket /> },
    { name: "Tailwind CSS", desc: "Estilizado preciso y optimizado para carga rápida.", icon: <Layout /> },
    { name: "TypeScript", desc: "Código robusto y libre de errores de ejecución.", icon: <Code2 /> },
    { name: "Vercel Edge", desc: "Despliegue global en milisegundos cerca del usuario.", icon: <Globe /> }
  ];

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 pb-24 relative overflow-hidden">
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
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-[#D62828] font-bold">Web Headless</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D62828]/30 rounded-full mb-8 bg-[#D62828]/5">
              <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse"></span>
              <span className="font-mono text-[10px] text-[#D62828] uppercase tracking-widest">Ingeniería Web de Élite</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Webs que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">
                Dominan la Red.
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              No hacemos sitios web comunes. Construimos infraestructuras digitales de altísimo rendimiento con Next.js y React, diseñadas para convertir visitas en ingresos.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/start" className="px-8 py-4 bg-white text-[#080808] font-bold text-xs tracking-widest uppercase hover:bg-[#D62828] hover:text-white transition-all shadow-2xl">
                Cotizar Proyecto
              </Link>
              <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                <Zap size={14} className="text-[#D62828]" />
                <span>Carga en menos de 1s</span>
              </div>
            </div>
          </motion.div>

          {/* Performance Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D62828]/10 blur-[80px] -z-10"></div>
            <div className="flex items-center gap-4 mb-12">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
               <span className="ml-4 font-mono text-[10px] text-white/20 uppercase tracking-widest">lighthouse_report_v2.log</span>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {lighthouseStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <motion.circle 
                        cx="50%" cy="50%" r="45%" fill="transparent" stroke={stat.color} strokeWidth="8" 
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 + i * 0.1 }}
                      />
                    </svg>
                    <span className="absolute font-display text-2xl md:text-3xl font-bold">{stat.value}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Grid */}
        <section className="mb-40">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6">Stack Tecnológico</h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">Built for scale</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all group"
              >
                <div className="text-[#D62828] mb-6 transform group-hover:scale-110 transition-transform">
                  {React.cloneElement(tech.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="font-bold text-xl mb-4 group-hover:text-[#D62828] transition-colors">{tech.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Architecture Detail */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-video bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D62828]/20 to-transparent"></div>
              <div className="p-8 font-mono text-[10px] md:text-xs text-white/40">
                <p className="text-[#00CC66] mb-4">{"//"} Next.js Server Side Rendering</p>
                <p className="text-white">export async function generateStaticParams() {"{"}</p>
                <p className="pl-4 text-white/60">return posts.map((post) ={">"} ({"{"}</p>
                <p className="pl-8 text-white/60">slug: post.slug,</p>
                <p className="pl-4 text-white/60">{"}"}));</p>
                <p className="text-white">{"}"}</p>
                
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                   <p className="text-white mb-2 uppercase tracking-widest text-[9px] font-bold">Build Statistics</p>
                   <div className="flex justify-between items-center text-[10px]">
                      <span>Page Size (gzip)</span>
                      <span className="text-[#00CC66]">12.4 kB</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] mt-2">
                      <span>TTFB (Global)</span>
                      <span className="text-[#00CC66]">42ms</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-4">La Diferencia Zenit</p>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase mb-8 leading-[0.9]">Webs que <br /> No se Rompen.</h2>
            <div className="space-y-8">
               {[
                 { title: "SEO Semántico", desc: "Estructuramos cada etiqueta para que los motores de búsqueda amen tu sitio.", icon: <Search size={20} /> },
                 { title: "Mobile First", desc: "Interfaces adaptativas que se sienten como apps nativas en cualquier dispositivo.", icon: <Smartphone size={20} /> },
                 { title: "Seguridad Robusta", desc: "Arquitecturas desacopladas que eliminan los vectores de ataque comunes.", icon: <Shield size={20} /> }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6">
                   <div className="mt-1 text-[#D62828]">{item.icon}</div>
                   <div>
                     <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                     <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32 rounded-[4rem] bg-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-8 font-black">Tu Visión, Nuestra Ingeniería</p>
            <h2 className="font-display text-4xl md:text-8xl font-black uppercase text-[#080808] mb-12 tracking-tighter leading-none">
              Construyamos <br /> tu Ecosistema.
            </h2>
            <Link href="/start" className="inline-flex items-center gap-4 px-12 py-6 bg-[#D62828] text-white font-black text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl">
              INICIAR PROYECTO <ArrowRight size={20} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
