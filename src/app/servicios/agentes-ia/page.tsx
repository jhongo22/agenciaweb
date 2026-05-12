'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bot, Cpu, Database, Zap, CheckCircle2, MessageSquare, ShieldCheck, Users, TrendingUp, ArrowRight } from 'lucide-react';

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

  const features = [
    {
      icon: <Database className="text-[#D62828]" />,
      title: "RAG (Memoria de Negocio)",
      desc: "Alimentamos a la IA con tus documentos, PDFs y bases de datos para que responda con precisión absoluta sobre tu negocio."
    },
    {
      icon: <TrendingUp className="text-[#D62828]" />,
      title: "Cualificación de Leads",
      desc: "El agente detecta el interés y presupuesto del cliente antes de pasarlo a un humano, ahorrando horas de filtrado manual."
    },
    {
      icon: <Zap className="text-[#D62828]" />,
      title: "Integración Omnicanal",
      desc: "WhatsApp, Instagram, Web o Telegram. Tu agente está donde tus clientes están, con una sola base de conocimiento."
    },
    {
      icon: <ShieldCheck className="text-[#D62828]" />,
      title: "Seguridad Corporativa",
      desc: "Implementamos capas de seguridad para evitar alucinaciones y asegurar que la IA se mantenga siempre dentro del tono de tu marca."
    }
  ];

  const useCases = [
    {
      title: "Clínicas y Salud",
      items: ["Agendamiento de citas", "Preguntas sobre tratamientos", "Seguimiento post-consulta"]
    },
    {
      title: "Inmobiliarias",
      items: ["Filtrado de presupuesto", "Envío de catálogos", "Coordinación de visitas"]
    },
    {
      title: "E-commerce & SaaS",
      items: ["Soporte técnico nivel 1", "Estado de pedidos", "Recomendaciones personalizadas"]
    }
  ];

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[-10%] w-[60vw] h-[60vh] bg-[#D62828]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
      
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
          <span className="text-[#D62828] font-bold">Agentes I.A.</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full mb-8 bg-white/5">
              <span className="w-2 h-2 rounded-full bg-[#00CC66] animate-pulse"></span>
              <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">Sistemas de Respuesta Autónoma</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Agentes que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] via-[#FF4D4D] to-[#D62828] animate-shimmer bg-[length:200%_auto]">
                Piensan y Venden.
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              No construimos chatbots básicos. Desarrollamos empleados digitales entrenados con tu conocimiento corporativo para cerrar ventas y atender clientes con precisión humana.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/start" className="px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[#080808] transition-all shadow-[0_0_30px_rgba(214,40,40,0.3)]">
                Solicitar Demo
              </Link>
              <div className="flex items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080808] bg-[#111] flex items-center justify-center">
                      <Users size={14} />
                    </div>
                  ))}
                </div>
                <span>+50 sistemas desplegados</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Chat Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md mx-auto bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="bg-[#1A1A1A] p-5 border-b border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D62828] to-[#ff4d4d] flex items-center justify-center text-white shadow-lg shadow-[#D62828]/20">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-base">Zenit AI Agent</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Conexión Segura</p>
                </div>
              </div>
            </div>

            <div className="p-6 h-[400px] overflow-y-auto flex flex-col gap-6 bg-black/20">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.isBot 
                      ? 'bg-[#1A1A1A] border border-white/5 text-white/90 rounded-2xl rounded-tl-sm self-start shadow-sm' 
                      : 'bg-[#D62828] text-white rounded-2xl rounded-tr-sm self-end shadow-md shadow-[#D62828]/10'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {messages.length < 4 && (
                <div className="flex gap-2 p-4 bg-[#1A1A1A] rounded-2xl rounded-tl-sm self-start w-16">
                  <span className="w-1.5 h-1.5 bg-[#D62828] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#D62828] rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-[#D62828] rounded-full animate-bounce delay-150"></span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <section className="mb-40">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6">Capacidades de Élite</h2>
            <div className="w-20 h-1 bg-[#D62828] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[#111] border border-white/5 hover:border-[#D62828]/30 transition-all group rounded-2xl"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-bold text-xl mb-4 text-white group-hover:text-[#D62828] transition-colors">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-40 bg-[#111] rounded-3xl p-10 md:p-20 border border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D62828]/5 blur-[100px] -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                El fin de los <br />
                <span className="text-white/20 italic">Chatbots Torpes.</span>
              </h2>
              <p className="text-white/60 text-lg mb-12">
                Los sistemas basados en árboles de decisión están muertos. Bienvenido a la era de la IA generativa con contexto infinito.
              </p>
              <div className="space-y-6">
                {[
                  "Respuestas naturales y conversacionales",
                  "Integración profunda con tus datos reales",
                  "Capacidad de resolución de problemas",
                  "Evolución y aprendizaje constante"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="text-[#00CC66]" size={20} />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square bg-black/40 rounded-2xl border border-white/10 p-8 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="p-4 bg-white/5 border-l-4 border-white/20 opacity-40">
                  <p className="text-xs font-mono text-white/40 mb-2">BOT TRADICIONAL</p>
                  <p className="text-sm">"No entiendo tu pregunta. Por favor, selecciona una opción del menú: 1) Precios, 2) Horarios..."</p>
                </div>
                <div className="p-6 bg-[#D62828]/10 border-l-4 border-[#D62828] shadow-lg shadow-[#D62828]/5">
                  <p className="text-xs font-mono text-[#D62828] mb-2 uppercase tracking-widest font-bold">ZENIT AI AGENT</p>
                  <p className="text-sm leading-relaxed italic">
                    "Claro, entiendo que buscas una solución personalizada para tu clínica en Madrid. Basado en tus requerimientos, el plan Pro de automatización n8n sería el ideal. ¿Te gustaría que te agende una llamada con un consultor para mañana a las 10:00?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="mb-40">
          <div className="text-center mb-20">
             <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-4">Adaptabilidad Total</p>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight">Casos de Éxito</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-[#111] p-10 rounded-2xl border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D62828]/5 group-hover:bg-[#D62828]/20 transition-all duration-500 rounded-bl-full"></div>
                <h3 className="font-display text-2xl font-bold mb-8">{uc.title}</h3>
                <ul className="space-y-4">
                  {uc.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-white/50 group-hover:text-white/80 transition-colors">
                      <span className="w-1.5 h-1.5 bg-[#D62828] rounded-full mt-1.5"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32 rounded-[3rem] bg-[#D62828] overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="font-display text-4xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter leading-none">
              ¿Listo para el <br /> Siguiente Nivel?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 font-light">
              Tus competidores ya están usando IA. No te quedes atrás en la carrera por la eficiencia.
            </p>
            <Link href="/start" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-[#D62828] font-black text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl">
              DESPLEGAR MI AGENTE <ArrowRight size={20} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
