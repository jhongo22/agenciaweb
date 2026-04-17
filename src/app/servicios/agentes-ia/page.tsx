'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AgentesIAPage() {
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([]);
  
  useEffect(() => {
    const sequence = [
      { text: "Hola, me interesa implementar IA en mi clínica. ¿Cómo funciona?", isBot: false, delay: 1000 },
      { text: "¡Hola! Analizamos los PDFs y servicios de tu clínica para entrenar un agente RAG. Él responderá 24/7 en WhatsApp, agendará citas y cualificará tus leads.", isBot: true, delay: 3500 },
      { text: "¿Y puede integrarse con nuestro sistema actual?", isBot: false, delay: 6500 },
      { text: "Exacto. Se conecta vía API a tu CRM o Google Calendar, asegurando que ninguna solicitud manual quede pendiente. 🚀", isBot: true, delay: 9000 }
    ];

    let timeouts: NodeJS.Timeout[] = [];
    sequence.forEach((msg) => {
      const t = setTimeout(() => {
        setMessages(prev => [...prev, msg]);
      }, msg.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[30%] left-[-10%] w-[50vw] h-[50vh] bg-[#D62828]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-[-10%] w-[40vw] h-[40vh] bg-white/5 blur-[120px] pointer-events-none rounded-full" />
      
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
          <span className="text-[#D62828] font-bold">Agentes I.A.</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full mb-6 bg-white/5">
              <span className="w-2 h-2 rounded-full bg-[#00CC66] animate-pulse"></span>
              <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">Atención 24/7 Activa</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-[1.1]">
              Empleados Digitales <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#FF4D4D] animate-shimmer bg-[length:200%_auto]">
                Interactivos.
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              No más menús telefónicos aburridos. Entrenamos modelos avanzados (OpenAI, Claude) con la información de tu negocio. El agente responde por WhatsApp como un humano especializado, cualifica el lead y cierra el trato.
            </p>
            
            <Link href="/start" className="inline-block px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[#080808] transition-all text-center magnetic-area shadow-[0_0_20px_rgba(214,40,40,0.3)]">
              Desplegar Agente
            </Link>
          </motion.div>

          {/* Visual: Chat Interface Mock */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-sm mx-auto bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] relative"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#D62828]/10 to-transparent pointer-events-none"></div>

            {/* Header */}
            <div className="bg-[#1A1A1A] p-4 border-b border-white/5 flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D62828] to-red-900 flex items-center justify-center shadow-[0_0_15px_rgba(214,40,40,0.4)]">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">Zenit AI Agent</h3>
                <p className="font-mono text-[9px] text-[#00CC66] uppercase tracking-widest">En línea</p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-[350px] overflow-y-auto flex flex-col gap-4 relative z-10 bg-[#0A0A0A]">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] p-3 text-sm rounded-2xl ${msg.isBot ? 'bg-[#1A1A1A] border border-white/5 text-white/90 rounded-tl-sm self-start' : 'bg-[#D62828] text-white rounded-tr-sm self-end'}`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {messages.length < 4 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#1A1A1A] border border-white/5 self-start p-3 rounded-full rounded-tl-sm flex gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </motion.div>
              )}
            </div>
            
            {/* Input area */}
            <div className="p-3 border-t border-white/5 bg-[#1A1A1A] flex gap-2">
              <div className="flex-1 bg-[#222] rounded-full border border-white/5 h-10 px-4 flex items-center">
                <span className="text-white/20 text-xs font-mono">Escribiendo...</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#D62828] flex items-center justify-center">
                 <svg className="w-4 h-4 text-white transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
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
            className="border border-[#D62828]/20 bg-[#111] p-10 hover:bg-[#D62828]/5 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D62828]/10 blur-[50px] rounded-full group-hover:bg-[#D62828]/20 transition-colors"></div>
            <h3 className="font-display text-2xl font-bold mb-4">RAG: Memoria Corporativa</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              El agente no inventa respuestas. Lo alimentamos con tus manuales en PDF, el inventario de tu web y las políticas de tu negocio para que responda con la verdad (Retrieval-Augmented Generation).
            </p>
            <div className="w-full flex items-center justify-between opacity-50 font-mono text-xs">
              <span className="px-2 py-1 bg-white/10 rounded">Documentos</span>
              <span>→</span>
              <span className="px-2 py-1 bg-[#D62828]/20 rounded">Vector DB</span>
              <span>→</span>
              <span className="px-2 py-1 bg-white/10 rounded">Respuesta</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-[#D62828]/20 bg-[#111] p-10 hover:bg-[#D62828]/5 transition-colors group relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D62828]/10 blur-[50px] rounded-full group-hover:bg-[#D62828]/20 transition-colors"></div>
            <h3 className="font-display text-2xl font-bold mb-4">Cualificación Inteligente</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Instruimos a la I.A. para que sutilmente obtenga datos clave del cliente (presupuesto, email, zona) antes de derivarlo a un operador humano o agendar la cita.
            </p>
            <div className="w-full flex items-center justify-between opacity-50 font-mono text-[10px] md:text-xs">
              <span className="px-2 py-1 bg-white/10 rounded">Lead Anónimo</span>
              <span>→</span>
              <span className="px-2 py-1 border border-[#D62828]/50 text-[#D62828] rounded">Validación IA</span>
              <span>→</span>
              <span className="px-2 py-1 bg-[#00CC66]/20 text-[#00CC66] rounded">Lead Caliente</span>
            </div>
          </motion.div>
        </div>
        
      </div>
    </main>
  );
}
