'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Database, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  ArrowRight,
  MessageSquare,
  Building,
  Smartphone,
  Server,
  Sparkles
} from 'lucide-react';

export default function AgentesIAPage() {
  // Playground Configurator State
  const [channel, setChannel] = useState<'whatsapp' | 'web' | 'instagram'>('whatsapp');
  const [goal, setGoal] = useState<'leads' | 'citas' | 'soporte'>('citas');
  const [dataSource, setDataSource] = useState<'pdf' | 'sheets' | 'crm'>('sheets');

  const getGoalAction = () => {
    switch (goal) {
      case 'leads': return 'Calificación de Leads Fríos';
      case 'citas': return 'Agendamiento Directo de Turnos';
      case 'soporte': return 'Soporte Post-Venta 24/7';
    }
  };

  const getSourceDisplay = () => {
    switch (dataSource) {
      case 'pdf': return 'Catálogo de Productos y PDFs de Servicios';
      case 'sheets': return 'Google Sheets del Negocio';
      case 'crm': return 'Tu API CRM (Hubspot / Pipedrive)';
    }
  };

  const getOutcomeSummary = () => {
    const channelDisplay = channel.toUpperCase();
    const actionDisplay = getGoalAction();
    const sourceDisplay = getSourceDisplay();

    return {
      title: `Arquitectura de Agente en ${channelDisplay}`,
      step1: `1. El cliente envía un mensaje de consulta a tu ${channelDisplay}.`,
      step2: `2. La IA consulta de forma segura tu ${sourceDisplay} para extraer la información exacta.`,
      step3: `3. La IA responde en 3 segundos y ejecuta la acción: [${actionDisplay}].`,
      impact: goal === 'citas' 
        ? 'Reduce inasistencias en un 85% y libera 10+ horas semanales de tu recepción.'
        : goal === 'leads'
        ? 'Aumenta tu tasa de conversión de leads calificados en un 40% de forma autónoma.'
        : 'Resuelve el 90% de las preguntas de soporte post-venta sin intervención humana.'
    };
  };

  const outcome = getOutcomeSummary();

  const features = [
    {
      icon: <Database className="text-[#D62828]" />,
      title: "Memoria del Negocio",
      desc: "Alimentamos al agente con tus documentos y bases de datos para que responda con precisión absoluta sobre tu empresa."
    },
    {
      icon: <TrendingUp className="text-[#D62828]" />,
      title: "Filtrado de Prospectos",
      desc: "El agente detecta la necesidad e intención de compra del cliente antes de contactarte, ahorrándote tiempo en llamadas improductivas."
    },
    {
      icon: <Zap className="text-[#D62828]" />,
      title: "Atención Multipestaña",
      desc: "WhatsApp, Instagram o tu sitio Web. Tu agente está activo en tus canales principales de atención con la misma precisión."
    },
    {
      icon: <ShieldCheck className="text-[#D62828]" />,
      title: "Seguridad Corporativa",
      desc: "Implementamos capas de seguridad para evitar errores y asegurar que el agente responda siempre con el tono correcto."
    }
  ];

  const useCases = [
    {
      title: "Clínicas y Salud",
      items: ["Agendamiento de citas", "Preguntas sobre servicios", "Seguimiento post-consulta"]
    },
    {
      title: "Inmobiliarias",
      items: ["Filtrado de presupuesto", "Envío de opciones", "Coordinación de visitas"]
    },
    {
      title: "Comercio & Servicios",
      items: ["Soporte de primer nivel", "Estado de pedidos", "Respuestas de precios"]
    }
  ];

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
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
          <span className="text-[#D62828] font-bold">Agentes Inteligentes</span>
        </motion.div>

        {/* Hero split layout with Playground Constructor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-40">
          
          {/* Left Side: Copy */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full mb-8 bg-white/5">
                <span className="w-2 h-2 rounded-full bg-[#00CC66] animate-pulse"></span>
                <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">Sistemas de Respuesta Autónoma</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Agentes que <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] via-[#FF4D4D] to-[#D62828] animate-shimmer bg-[length:200%_auto]">
                  Piensan y Venden.
                </span>
              </h1>
              
              <p className="font-sans text-base md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
                No construimos chatbots básicos. Desarrollamos empleados digitales entrenados con tu conocimiento corporativo para cerrar ventas y atender clientes con precisión.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8 lg:mb-0">
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
          </div>

          {/* Right Side: Interactive AI Agent Blueprint Playground */}
          <div className="lg:col-span-6 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D62828]/5 blur-2xl pointer-events-none rounded-full"></div>
              <h3 className="font-display text-xl font-bold mb-6 text-white flex items-center gap-2">
                <Cpu size={18} className="text-[#D62828]" />
                Diseña tu Agente de IA
              </h3>

              {/* Selector 1: Channel */}
              <div className="mb-6">
                <span className="text-xs font-mono text-white/40 block mb-3 uppercase tracking-wider">1. Canal de Entrada</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp', icon: <Smartphone size={14} /> },
                    { id: 'web', label: 'Sitio Web', icon: <Smartphone size={14} /> },
                    { id: 'instagram', label: 'Instagram', icon: <Smartphone size={14} /> }
                  ].map(ch => (
                    <button
                      key={ch.id}
                      onClick={() => setChannel(ch.id as any)}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                        channel === ch.id 
                          ? 'bg-[#D62828]/10 border-[#D62828] text-white shadow-[0_0_15px_rgba(214,40,40,0.1)]' 
                          : 'bg-[#080808] border-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Goal */}
              <div className="mb-6">
                <span className="text-xs font-mono text-white/40 block mb-3 uppercase tracking-wider">2. Objetivo Operativo</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'citas', label: 'Reservar Citas' },
                    { id: 'leads', label: 'Calificar Leads' },
                    { id: 'soporte', label: 'Soporte 24/7' }
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id as any)}
                      className={`py-3 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center border transition-all ${
                        goal === g.id 
                          ? 'bg-[#D62828]/10 border-[#D62828] text-white shadow-[0_0_15px_rgba(214,40,40,0.1)]' 
                          : 'bg-[#080808] border-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 3: Data Source */}
              <div className="mb-8">
                <span className="text-xs font-mono text-white/40 block mb-3 uppercase tracking-wider">3. Base de Conocimiento</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'pdf', label: 'PDFs / Catálogo' },
                    { id: 'sheets', label: 'Google Sheets' },
                    { id: 'crm', label: 'Tu CRM (API)' }
                  ].map(ds => (
                    <button
                      key={ds.id}
                      onClick={() => setDataSource(ds.id as any)}
                      className={`py-3 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center border transition-all ${
                        dataSource === ds.id 
                          ? 'bg-[#D62828]/10 border-[#D62828] text-white shadow-[0_0_15px_rgba(214,40,40,0.1)]' 
                          : 'bg-[#080808] border-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {ds.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Blueprint Schematic Diagram */}
              <div className="bg-[#080808] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <Sparkles size={14} className="text-[#D62828] animate-pulse" />
                </div>
                
                <h4 className="text-xs font-mono text-[#D62828] mb-3 uppercase tracking-widest">{outcome.title}</h4>
                <div className="space-y-2.5 text-xs text-white/60 font-sans leading-relaxed">
                  <p>{outcome.step1}</p>
                  <p>{outcome.step2}</p>
                  <p>{outcome.step3}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Impacto Esperado</span>
                  <p className="text-white text-xs font-semibold leading-relaxed">{outcome.impact}</p>
                </div>
              </div>

              <Link href={`/start?channel=${channel}&goal=${goal}`} className="mt-6 w-full py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase text-center hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                Solicitar este Blueprint de Agente <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

        </div>

        {/* Feature Grid */}
        <section className="mb-24 md:mb-40">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase mb-6">Capacidades de Élite</h2>
            <div className="w-20 h-1 bg-[#D62828] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 bg-[#111] border border-white/5 hover:border-[#D62828]/30 transition-all group rounded-2xl"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg md:text-xl mb-4 text-white group-hover:text-[#D62828] transition-colors">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-24 md:mb-40 bg-[#111] rounded-3xl p-6 md:p-20 border border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D62828]/5 blur-[100px] -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase mb-8 leading-tight">
                El fin de los <br />
                <span className="text-white/20 italic">Chatbots Torpes.</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg mb-8 md:mb-12">
                Los sistemas tradicionales con botones rígidos son obsoletos. Bienvenido a la era de la atención fluida que comprende de forma natural a tus clientes.
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
            <div className="relative aspect-square bg-black/40 rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="p-4 bg-white/5 border-l-4 border-white/20 opacity-40">
                  <p className="text-xs font-mono text-white/40 mb-2">BOT TRADICIONAL</p>
                  <p className="text-sm">"No entiendo tu pregunta. Por favor, selecciona una opción del menú: 1) Precios, 2) Horarios..."</p>
                </div>
                <div className="p-6 bg-[#D62828]/10 border-l-4 border-[#D62828] shadow-lg shadow-[#D62828]/5">
                  <p className="text-xs font-mono text-[#D62828] mb-2 uppercase tracking-widest font-bold">AUTONOMEK AI AGENT</p>
                  <p className="text-sm leading-relaxed italic">
                    "Claro, entiendo que buscas una solución personalizada para tu clínica en Madrid. Basado en tus requerimientos, el plan de automatización e integración sería el ideal. ¿Te gustaría que te agende una llamada con un consultor para mañana a las 10:00?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="mb-24 md:mb-40">
          <div className="text-center mb-16 md:mb-20">
             <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-4">Adaptabilidad Total</p>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight">Casos de Éxito</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-[#111] p-6 md:p-10 rounded-2xl border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D62828]/5 group-hover:bg-[#D62828]/20 transition-all duration-500 rounded-bl-full"></div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-8">{uc.title}</h3>
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
        <section className="relative py-16 md:py-32 rounded-2xl md:rounded-[3rem] bg-[#D62828] overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="font-display text-3xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter leading-none">
              ¿Listo para el <br /> Siguiente Nivel?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 md:mb-12 font-light">
              Tus competidores ya están usando IA. No te quedes atrás en la carrera por la eficiencia.
            </p>
            <Link href="/start" className="inline-flex items-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-white text-[#D62828] font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-2xl">
              DESPLEGAR MI AGENTE <ArrowRight size={20} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
