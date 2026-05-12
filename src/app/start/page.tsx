'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle2, ArrowRight, MessageSquare, Mail, User, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function StartPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen w-full bg-[#080808] text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md"
        >
          <CheckCircle2 className="text-[#D62828] w-20 h-20 mx-auto mb-8" />
          <h1 className="font-display text-4xl font-black uppercase mb-4">¡Recibido!</h1>
          <p className="text-white/50 mb-12">Nuestro equipo de arquitectura analizará tu solicitud y te contactaremos en menos de 24 horas.</p>
          <Link href="/" className="inline-flex items-center gap-3 text-[#D62828] font-bold text-xs uppercase tracking-widest hover:gap-5 transition-all">
            Volver al inicio <ArrowRight size={16} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vh] bg-[#D62828]/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6">/ Sesión Estratégica</p>
          <h1 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
            Inicia tu <br /> <span className="text-white/20">Ascenso.</span>
          </h1>
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-[#D62828]">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Escríbenos</h3>
                <p className="text-white/40 text-sm">hola@zenit.cloud</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-[#D62828]">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Chat Directo</h3>
                <p className="text-white/40 text-sm">Disponibles 24/7 vía Agente IA</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#111] border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="Escribe tu nombre..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-[#D62828] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">Correo Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="email@tuempresa.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-[#D62828] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">Tu Proyecto / Desafío</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-4 text-white/20" size={18} />
                <textarea 
                  required
                  rows={4}
                  placeholder="Cuéntanos brevemente qué necesitas..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-[#D62828] transition-colors resize-none"
                ></textarea>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-[#D62828] text-white font-black text-sm tracking-widest uppercase hover:bg-white hover:text-[#080808] transition-all shadow-2xl flex items-center justify-center gap-4 rounded-2xl"
            >
              ENVIAR SOLICITUD <Send size={18} />
            </button>
          </form>
        </motion.div>

      </div>
    </main>
  );
}
