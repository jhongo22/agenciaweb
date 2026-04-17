'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CanvasBackground from '@/components/CanvasBackground';
import Link from 'next/link';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textBgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <main ref={containerRef} className="relative w-full text-foreground bg-[#080808]">
      {/* 1. Base Layer: The Interactive Canvas */}
      <CanvasBackground />

      {/* 2. Middle Layer: Giant Distorted Background Text (Lacruss style) */}
      <motion.div 
         style={{ y: textBgY }}
        className="absolute top-[10%] md:top-[20%] left-[-10%] w-[120vw] h-[60vh] overflow-hidden pointer-events-none z-[1] opacity-20 select-none rotate-[-6deg]"
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap items-center h-full"
        >
          <span className="font-display text-[25vw] font-black leading-none text-white tracking-tighter pr-16">
            ZENIT<span className="text-[#D62828]">.</span>
          </span>
          <span className="font-display text-[25vw] font-black leading-none text-white tracking-tighter pr-16">
            ZENIT<span className="text-[#D62828]">.</span>
          </span>
          <span className="font-display text-[25vw] font-black leading-none text-white tracking-tighter pr-16">
            ZENIT<span className="text-[#D62828]">.</span>
          </span>
          <span className="font-display text-[25vw] font-black leading-none text-white tracking-tighter pr-16">
            ZENIT<span className="text-[#D62828]">.</span>
          </span>
        </motion.div>
      </motion.div>

      {/* 3. Top Layer: ELEGANT HERO SECTION */}
      <motion.section 
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 relative z-10 pt-32 pb-24"
      >
        <div className="max-w-6xl w-full text-center relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center justify-center gap-4 w-full"
          >
            <span className="w-8 md:w-12 h-[1px] bg-[#D62828]"></span>
            <p className="font-mono text-[#D62828] text-[10px] md:text-xs tracking-[0.2em] uppercase">
              Transformando Negocios con I.A.
            </p>
            <span className="w-8 md:w-12 h-[1px] bg-[#D62828]"></span>
          </motion.div>
          
          <h1 className="font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] font-black tracking-tighter text-white drop-shadow-2xl uppercase relative">
            {/* Added ambient glow behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#D62828]/20 blur-[100px] -z-10 animate-pulse-slow"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Tecnología de élite.
            </motion.div>
            <motion.div 
              className="mt-2 lg:mt-0 relative overflow-hidden inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D62828] to-white bg-[length:200%_auto] animate-shimmer">
                Resultados implacables.
              </span>
            </motion.div>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-white/50 font-sans max-w-2xl text-base md:text-xl font-light leading-relaxed mx-auto"
          >
            Sistemas web de altísimo rendimiento escalados por Inteligencia Artificial. <strong className="text-white font-medium">Construimos infraestructura digital para empresas que dominan su sector.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto"
          >
            <Link href="/start" className="w-full sm:w-auto px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[#080808] transition-all text-center magnetic-area shadow-[0_0_20px_rgba(214,40,40,0.3)]">
              Construir Sistema
            </Link>
            <Link href="/servicios" className="group w-full sm:w-auto px-8 py-4 text-white font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-4 hover:opacity-80 transition-all magnetic-area">
              Ver Servicios
              <span className="w-8 h-[1px] bg-[#D62828] group-hover:w-12 transition-all"></span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* THE MANIFESTO */}
      <section className="min-h-[70vh] w-full bg-[#111111] relative z-10 py-24 md:py-40 px-6 md:px-12 flex items-center border-t border-[#D62828]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid-scroll pointer-events-none"></div>
        {/* Subtle red glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D62828]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-[1px] bg-[#D62828] mb-8 origin-left"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-8 flex items-center gap-4"
          >
            El Paradigma Zenit
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.2] font-semibold tracking-tight text-white"
          >
            Una agencia convencional te entrega una web. <br/>
            <span className="text-white/40 italic font-light">Nosotros diseñamos ecosistemas autónomos.</span> 
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-white/70 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            Reemplazamos el trabajo manual obsoleto con procesos automatizados e integraciones de IA. Desde sitios web ultrarrápidos en Next.js hasta agentes que operan tu negocio 24/7.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Link href="/servicios" className="group mt-16 inline-flex items-center gap-4 font-mono uppercase tracking-widest text-sm text-[#D62828] hover:text-white transition-colors magnetic-area">
              [ EXPLORAR ARQUITECTURA ]
              <span className="w-8 h-[1px] bg-[#D62828] group-hover:bg-white group-hover:w-16 transition-all duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK & 3D ARCHITECTURE CUBE */}
      <section className="min-h-screen w-full bg-[#080808] relative z-10 py-24 md:py-40 px-6 md:px-12 flex items-center border-t border-white/5 overflow-hidden">
        {/* Floating cross decorations */}
        <div className="absolute top-[10%] left-[5%] text-white/10 font-mono text-sm pointer-events-none animate-pulse">+</div>
        <div className="absolute bottom-[20%] right-[10%] text-white/10 font-mono text-sm pointer-events-none animate-pulse-slow">+</div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
          
          {/* SEO Optimized Content Side */}
          <div className="flex flex-col">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-[#D62828]"></span> Stack Tecnológico
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black tracking-tight text-white mb-8"
            >
              Arquitectura de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D62828]">Alto Rendimiento.</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#D62828]">01</span> Next.js & React
                </h3>
                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                  Desarrollo de interfaces de usuario ultrarrápidas y optimizadas para SEO. Arquitecturas headless que garantizan tiempos de carga milisegundos y retención de usuarios.
                </p>
              </div>

              <div className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#D62828]">02</span> Inteligencia Artificial
                </h3>
                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                  Implementación de modelos LLM, agentes autónomos y análisis de datos en tiempo real para personalizar la experiencia, cualificar leads y escalar operaciones de venta.
                </p>
              </div>

              <div className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#D62828]">03</span> n8n & Automatización
                </h3>
                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                  Conexión total del ecosistema digital. Sustituimos tareas operativas manuales mediante flujos de trabajo hiperconectados que operan tu negocio en piloto automático.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Corrected 3D Isometric Stack Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="visual-side relative h-[400px] md:h-[500px] w-full flex items-center justify-center p-0 md:p-10"
          >
            {/* Ambient Red Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D62828]/20 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>
            
            <div className="iso-stack translate-y-16 lg:translate-y-28" id="stack-3d">
              {/* Layer 1: Base */}
              <div className="iso-layer layer-base">
                <div className="face face-top base-top">
                  <span className="icon-center text-white/50 font-mono text-xl tracking-widest">&lt;WEB/&gt;</span>
                </div>
                <div className="face face-s1"></div>
                <div className="face face-s2"><span style={{ transform: "rotate(270deg)", display: "block", letterSpacing: "3px" }}>API</span></div>
                <div className="face face-s3"></div>
                <div className="face face-s4"><span style={{ transform: "rotate(90deg)",display: "block", letterSpacing: "3px" }}>DB</span></div>
              </div>
              
              {/* Layer 2: Mid */}
              <div className="iso-layer layer-mid">
                <div className="face face-top mid-top flex items-center justify-center shadow-[inset_0_0_20px_rgba(214,40,40,0.1)]">
                  <span className="icon-center text-[#D62828] font-bold text-3xl font-display">IA</span>
                </div>
                <div className="face face-s1"></div>
                <div className="face face-s2"><span style={{ transform: "rotate(270deg)", display: "block", letterSpacing: "3px" }}>BOT</span></div>
                <div className="face face-s3"></div>
                <div className="face face-s4"><span style={{ transform: "rotate(90deg)",display: "block", letterSpacing: "3px" }}>A.I.</span></div>
              </div>
              
              {/* Layer 3: Top */}
              <div className="iso-layer layer-top">
                <div className="face face-top top-top flex items-center justify-center">
                  {/* Chat interface mock */}
                  <div className="ui-mock bg-[#111] border border-white/10 rounded-t-xl rounded-bl-sm rounded-br-xl w-[70%] h-[55%] relative flex flex-col p-2 gap-2 shadow-[0_0_15px_rgba(214,40,40,0.1)]">
                    <div className="flex gap-1.5 items-center">
                       <div className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse"></div>
                       <div className="w-[60%] h-1 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="w-[85%] h-1.5 bg-white/10 rounded-full mt-1"></div>
                    <div className="w-[45%] h-1.5 bg-white/10 rounded-full"></div>
                    {/* User response mock */}
                    <div className="w-[70%] h-2 bg-[#D62828]/40 rounded-full self-end mt-auto mb-1"></div>
                  </div>
                </div>
                <div className="face face-s1"></div>
                <div className="face face-s2"><span style={{ transform: "rotate(270deg)", display: "block", letterSpacing: "3px" }}>WEB</span></div>
                <div className="face face-s3"></div>
                <div className="face face-s4"><span style={{ transform: "rotate(90deg)", display: "block", letterSpacing: "3px" }}>APP</span></div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Core Architecture CSS exactly ported from user's old portfolio */}
        <style dangerouslySetInnerHTML={{__html: `
          .visual-side {
              perspective: 1200px; 
              will-change: transform;
          }
          
          .iso-stack {
              position: relative; 
              width: 220px; 
              height: 220px;
              transform-style: preserve-3d;
              animation: spin3D 20s linear infinite;
              cursor: crosshair;
          }
          
          /* Layers */
          .iso-layer { 
              position: absolute; 
              inset: 0; 
              transform-style: preserve-3d; 
              transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
          }
          
          .face {
              position: absolute; 
              background: rgba(20, 20, 20, 0.6); 
              border: 1px solid rgba(255,255,255,0.08);
              backdrop-filter: blur(4px); 
              -webkit-backdrop-filter: blur(4px);
              display: flex; 
              align-items: center; 
              justify-content: center;
              font-family: inherit; 
              font-weight: 700; 
              color: rgba(255,255,255,0.3); 
              font-size: 0.75rem;
              letter-spacing: 1px;
          }
          
          /* Face positioning */
          .face-top { width: 100%; height: 100%; transform: translateZ(20px); }
          .face-s1  { width: 100%; height: 20px; top: 100%; left: 0; transform-origin: top; transform: rotateX(90deg); background: rgba(10,10,10,0.8); }
          .face-s2  { width: 20px; height: 100%; right: 0; top: 0; transform-origin: right; transform: rotateY(90deg); background: rgba(5,5,5,0.9); }
          .face-s3  { width: 100%; height: 20px; bottom: 92%; left: 0; transform-origin: top; transform: rotateX(90deg); background: rgba(10,10,10,0.8); }
          .face-s4  { width: 20px; height: 100%; left: 0; top: 0; transform-origin: left; transform: rotateY(-90deg); background: rgba(5,5,5,0.9); }

          /* Default layer positions */
          .layer-base { transform: translateZ(0px); }
          .base-top {
              background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
              background-size: 20px 20px;
          }
          
          .layer-mid { transform: translateZ(50px); }
          .mid-top { border-color: rgba(214,40,40,0.4); }
          
          .layer-top { transform: translateZ(100px); }

          /* Animations */
          @keyframes spin3D {
              0% { transform: rotateX(55deg) rotateZ(0deg); }
              100% { transform: rotateX(55deg) rotateZ(360deg); }
          }

          /* --- HOVER EXPANSION --- */
          /* Only apply hover separation on non-touch devices ideally, or at min-width */
          @media (min-width: 768px) {
              .iso-stack:hover .layer-base { transform: translateZ(-20px); }
              .iso-stack:hover .layer-mid { transform: translateZ(80px) rotateZ(5deg); }
              .iso-stack:hover .layer-top { transform: translateZ(180px) rotateZ(10deg); }
              
              .iso-stack {
                width: 260px;
                height: 260px;
              }
          }
        `}} />
      </section>

      {/* NEW: PROYECTOS DESTACADOS GALLERY */}
      <section className="w-full bg-[#080808] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
          >
            <div>
              <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Trabajo Reciente</p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Operaciones</h2>
            </div>
            <Link href="/work" className="mt-6 md:mt-0 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[#D62828] transition-colors border-b border-[#D62828]/30 pb-1">
              Ver Todos Los Proyectos →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full aspect-[4/3] bg-[#111111] overflow-hidden border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.3)] transition-all duration-500 cursor-pointer"
            >
              <img src="/projects/toxxic-main.webp" alt="Toxxic Project" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#D62828] mb-2 block">E-COMMERCE / NEXT.JS</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Toxxic.</h3>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 64 }} // translates to md:translate-y-16 equivalent (64px = 4rem) in normal state, so we animate to it
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full aspect-[4/3] bg-[#111111] overflow-hidden border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.3)] transition-all duration-500 cursor-pointer"
            >
              <img src="/projects/lamisia-1.webp" alt="Lamisia Project" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#D62828] mb-2 block">CORPORATIVO / IA</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Lamisia.</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="w-full bg-[#111111] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        {/* Floating decorations */}
        <div className="absolute top-[30%] right-[5%] text-white/10 font-mono text-sm pointer-events-none animate-pulse">+</div>
        <div className="absolute bottom-[10%] left-[8%] text-[#D62828]/30 font-mono text-sm pointer-events-none animate-blink">+</div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-between items-end mb-16 md:mb-24"
          >
            <div>
              <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Nuestras Áreas</p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Sistemas</h2>
            </div>
            <p className="font-sans text-sm text-white/50 hidden md:block max-w-xs text-right">
              Capacidades técnicas diseñadas para multiplicar tu tracción.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/servicios/desarrollo-web-alto-impacto" className="group h-full relative bg-[#080808] overflow-hidden p-10 md:p-14 border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.2)] transition-all duration-500 flex flex-col justify-between min-h-[400px]">
                {/* Background Image Reveal */}
                <div className="absolute inset-0 z-0">
                  <img src="/projects/lamisia-6.webp" alt="Desarrollo Web" className="w-full h-full object-cover opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent"></div>
                </div>
                
                <div className="relative z-10 flex justify-between items-start mb-12">
                  <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#D62828]">01 / DESARROLLO</span>
                  <svg className="w-6 h-6 text-white/30 group-hover:text-[#D62828] transition-colors transform group-hover:-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <div className="relative z-10 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                    Webs Next.js<br />Alto Rendimiento
                  </h3>
                  <p className="text-white/50 font-sans text-sm group-hover:text-white/80 transition-colors">Arquitecturas headless, 100% Core Web Vitals y diseño obsesivo para máxima conversión.</p>
                </div>
              </Link>
            </motion.div>

            <div className="grid grid-rows-2 gap-6">
              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/servicios/agentes-ia" className="group h-full relative bg-[#080808] overflow-hidden p-8 border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.2)] transition-all duration-500 flex flex-col justify-between min-h-[250px]">
                  <div className="absolute inset-0 z-0">
                    <img src="/projects/dashboard-ia-1.webp" alt="Agentes IA" className="w-full h-full object-cover opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent"></div>
                  </div>

                  <div className="relative z-10 flex justify-between items-start mb-6">
                    <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#D62828]">02 / I.A.</span>
                    <svg className="w-5 h-5 text-white/30 group-hover:text-[#D62828] transition-colors transform group-hover:-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                  <div className="relative z-10 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2">Agentes Inteligentes</h3>
                    <p className="text-white/50 font-sans text-sm group-hover:text-white/80 transition-colors">Atención 24/7 y cualificación de leads impulsada por modelos avanzados.</p>
                  </div>
                </Link>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/servicios/automatizacion-n8n" className="group h-full relative bg-[#080808] overflow-hidden p-8 border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.2)] transition-all duration-500 flex flex-col justify-between min-h-[250px]">
                  <div className="absolute inset-0 z-0">
                    <img src="/projects/dashboard-winners-1.webp" alt="Automatización" className="w-full h-full object-cover opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent"></div>
                  </div>

                  <div className="relative z-10 flex justify-between items-start mb-6">
                    <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#D62828]">03 / OP.</span>
                    <svg className="w-5 h-5 text-white/30 group-hover:text-[#D62828] transition-colors transform group-hover:-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                  <div className="relative z-10 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2">Automatización (n8n)</h3>
                    <p className="text-white/50 font-sans text-sm group-hover:text-white/80 transition-colors">Flujos de trabajo autónomos que eliminan errores y tareas repetitivas.</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ELEGANT FOOTER */}
      <footer className="w-full bg-[#080808] relative z-10 px-6 py-24 md:px-12 md:py-32 border-t border-[#D62828]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#D62828] mb-8 flex items-center gap-3"
          >
            <span className="w-6 h-[1px] bg-[#D62828]/50"></span> Llevando negocios al siguiente nivel <span className="w-6 h-[1px] bg-[#D62828]/50"></span>
          </motion.p>
          <Link href="/start" className="inline-block relative group">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display flex flex-col items-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-black uppercase tracking-tight text-white"
            >
              <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-4">CONTÁCTANOS</span>
            </motion.h2>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 md:h-2 bg-[#D62828] group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_15px_#D62828]"></div>
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-7xl mx-auto mt-24 md:mt-40 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40"
        >
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} ZENIT WEB & IA.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D62828] hover:-translate-y-1 transition-all">Instagram</a>
            <a href="#" className="hover:text-[#D62828] hover:-translate-y-1 transition-all">LinkedIn</a>
            <a href="#" className="hover:text-[#D62828] hover:-translate-y-1 transition-all">GitHub</a>
          </div>
        </motion.div>
      </footer>

    </main>
  );
}
