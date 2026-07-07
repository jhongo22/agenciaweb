'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import CanvasBackground from '@/components/CanvasBackground';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Coins,
  Building,
  Activity,
  Briefcase,
  ShoppingBag,
  Bot
} from 'lucide-react';

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textBgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Interactive ROI Calculator State
  const [employees, setEmployees] = useState(5);
  const [averageSalary, setAverageSalary] = useState(25000);
  const [hoursWasted, setHoursWasted] = useState(8);
  const [investment, setInvestment] = useState(3000);

  // ROI Calculations
  const hourlyRate = averageSalary / 1880;
  const annualHoursSaved = Math.round(employees * (hoursWasted * 0.8) * 47);
  const annualSavings = Math.round(annualHoursSaved * hourlyRate);
  const roi = Math.round(((annualSavings - investment) / investment) * 100);
  const breakeven = Number((investment / (annualSavings / 12)).toFixed(1));
  const fiveYearSavings = annualSavings * 5;

  // Live Chat Simulator State
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([]);
  
  useEffect(() => {
    const sequence = [
      { text: "Hola, me interesa implementar un sistema de reservas y respuestas automáticas para mi negocio. ¿Es muy complicado?", isBot: false, delay: 1000 },
      { text: "¡Hola! Para nada. Nosotros nos encargamos de toda la configuración. Entrenamos a tu agente con la información de tus servicios para que responda 24/7 y agende citas en piloto automático.", isBot: true, delay: 3500 },
      { text: "Excelente. ¿Y cómo sé si un cliente realmente está interesado?", isBot: false, delay: 6500 },
      { text: "El agente califica al prospecto en la conversación. Si detecta intención de compra o agenda una cita, te envía los detalles ordenados al instante. ¡Tú solo cierras la venta! 🚀", isBot: true, delay: 9000 }
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
    <main ref={containerRef} className="relative w-full text-foreground bg-[#080808] overflow-hidden">
      {/* 1. Base Layer: The Interactive Canvas */}
      <CanvasBackground />

      {/* 2. Middle Layer: Giant Distorted Background Text */}
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
            AUTONOMEK<span className="text-[#D62828]">.</span>
          </span>
          <span className="font-display text-[25vw] font-black leading-none text-white tracking-tighter pr-16">
            AUTONOMEK<span className="text-[#D62828]">.</span>
          </span>
          <span className="font-display text-[25vw] font-black leading-none text-white tracking-tighter pr-16">
            AUTONOMEK<span className="text-[#D62828]">.</span>
          </span>
          <span className="font-display text-[25vw] font-black leading-none text-white tracking-tighter pr-16">
            AUTONOMEK<span className="text-[#D62828]">.</span>
          </span>
        </motion.div>
      </motion.div>

      {/* 3. HERO SECTION WITH SPLIT CHAT SIMULATOR */}
      <motion.section 
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-screen w-full flex flex-col justify-center px-6 md:px-12 relative z-10 pt-32 pb-24"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="w-8 md:w-12 h-[1px] bg-[#D62828]"></span>
              <p className="font-mono text-[#D62828] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                Más clientes. Menos tareas manuales.
              </p>
            </motion.div>
            
            <h1 className="font-display text-[clamp(2.2rem,5vw,5rem)] leading-[1.05] font-black tracking-tighter text-white drop-shadow-2xl uppercase relative">
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#D62828]/15 blur-[100px] -z-10 animate-pulse-slow"></div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Agencia de Automatización &
              </motion.div>
              <motion.div 
                className="mt-2 lg:mt-0 relative overflow-hidden inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D62828] to-white bg-[length:200%_auto] animate-shimmer">
                  Desarrollo Web con IA.
                </span>
              </motion.div>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 text-white/50 font-sans max-w-xl text-base md:text-lg font-light leading-relaxed"
            >
              Creamos sistemas automatizados, asistentes virtuales inteligentes y páginas web rápidas. <strong className="text-white font-medium">Soluciones sencillas y eficientes para que tu negocio crezca y aparezca en los primeros puestos de Google.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto"
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

          {/* Right: Live Chat Simulator */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="bg-[#1A1A1A] p-5 border-b border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D62828] to-[#ff4d4d] flex items-center justify-center text-white shadow-lg shadow-[#D62828]/20">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Asistente Autonomek</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#00CC66] rounded-full animate-pulse"></span>
                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">En línea 24/7</p>
                  </div>
                </div>
              </div>

              <div className="p-6 h-[380px] md:h-[480px] overflow-y-auto flex flex-col gap-5 bg-black/20">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`max-w-[85%] p-3.5 text-xs leading-relaxed ${
                      msg.isBot 
                        ? 'bg-[#1A1A1A] border border-white/5 text-white/90 rounded-2xl rounded-tl-sm self-start shadow-sm' 
                        : 'bg-[#D62828] text-white rounded-2xl rounded-tr-sm self-end shadow-md'
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                {messages.length < 4 && (
                  <div className="flex gap-1.5 p-3.5 bg-[#1A1A1A] rounded-2xl rounded-tl-sm self-start w-14">
                    <span className="w-1 h-1 bg-[#D62828] rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-[#D62828] rounded-full animate-bounce delay-75"></span>
                    <span className="w-1 h-1 bg-[#D62828] rounded-full animate-bounce delay-150"></span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* PAIN POINTS SECTION */}
      <section className="w-full bg-[#111111] relative z-10 py-20 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Problemas Comunes</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white">¿Te suena familiar?</h2>
            <div className="w-16 h-[2px] bg-[#D62828] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828]">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight">Leads y Clientes Perdidos</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Mensajes de WhatsApp o Instagram que llegan en la noche o fines de semana y nadie responde. Tu cliente potencial no espera: se va directo con tu competencia.
              </p>
            </div>

            <div className="p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828]">
                <Clock size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight">Horas Perdidas en Tareas Manuales</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Tu equipo pasa el día redactando cotizaciones, copiando datos en excels, enviando recordatorios de pago y facturando manualmente en vez de dedicarse a vender.
              </p>
            </div>

            <div className="p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828]">
                <Coins size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight">Fugas de Dinero Constantes</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Cobros que se olvian enviar, cotizaciones sin seguimiento proactivo y prospectos que se enfrían porque nadie les dio atención inmediata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="servicios" className="w-full bg-[#080808] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
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
              <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Nuestras Áreas de Dominio</p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Soluciones.</h2>
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
              <Link href="/servicios/paginas-web-alto-rendimiento" className="group h-full relative bg-[#111] overflow-hidden p-10 md:p-14 border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.2)] transition-all duration-500 flex flex-col justify-between min-h-[400px]">
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
                    Páginas Web<br />Alto Rendimiento
                  </h3>
                  <p className="text-white/50 font-sans text-sm group-hover:text-white/80 transition-colors">Velocidad extrema de carga, diseño visual de primer nivel y estructura preparada para captar clientes.</p>
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
                <Link href="/servicios/agentes-inteligencia-artificial" className="group h-full relative bg-[#111] overflow-hidden p-8 border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.2)] transition-all duration-500 flex flex-col justify-between min-h-[250px]">
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
                    <p className="text-white/50 font-sans text-sm group-hover:text-white/80 transition-colors">Atención 24/7 y filtrado automático de prospectos en tus canales de mensajería.</p>
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
                <Link href="/servicios/automatizacion-de-procesos" className="group h-full relative bg-[#111] overflow-hidden p-8 border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.2)] transition-all duration-500 flex flex-col justify-between min-h-[250px]">
                  <div className="absolute inset-0 z-0">
                    <img src="/projects/dashboard-winners-1.webp" alt="Automatización" className="w-full h-full object-cover opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent"></div>
                  </div>

                  <div className="relative z-10 flex justify-between items-start mb-6">
                    <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#D62828]">03 / OP.</span>
                    <svg className="w-5 h-5 text-white/30 group-hover:text-[#D62828] transition-colors transform group-hover:-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                  <div className="relative z-10 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2">Automatización de Procesos</h3>
                    <p className="text-white/50 font-sans text-sm group-hover:text-white/80 transition-colors">Flujos de información que conectan tus herramientas para eliminar tareas repetitivas.</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

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
            El Paradigma Autonomek
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.2] font-semibold tracking-tight text-white"
          >
            No somos solo una agencia web. <br/>
            <span className="text-white/40 italic font-light">Somos tus arquitectos de automatización e inteligencia artificial.</span> 
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-white/70 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            Integramos tecnología de vanguardia para que tu negocio trabaje por ti. Desde sitios web ultrarrápidos hasta agentes inteligentes que responden tus mensajes y te ayudan a concretar ventas 24/7. Si puede ser automatizado, nosotros lo llevamos al siguiente nivel.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Link href="/servicios" className="group mt-16 inline-flex items-center gap-4 font-mono uppercase tracking-widest text-sm text-[#D62828] hover:text-white transition-colors magnetic-area">
              [ EXPLORAR SERVICIOS ]
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
                  <span className="font-mono text-[10px] text-[#D62828]">01</span> Páginas Web de Alto Rendimiento
                </h3>
                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                  Desarrollo de sitios web ultrarrápidos y completamente preparados para aparecer en los primeros puestos de Google. Garantizamos velocidad instantánea y máxima retención de clientes.
                </p>
              </div>

              <div className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#D62828]">02</span> Inteligencia Artificial
                </h3>
                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                  Implementación de agentes autónomos y asistentes virtuales interactivos en tus canales principales de atención para filtrar consultas y automatizar tus ventas.
                </p>
              </div>

              <div className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#D62828]">03</span> Automatización de Procesos
                </h3>
                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                  Conexión y sincronización total de tus herramientas de trabajo. Eliminamos tareas repetitivas mediante flujos de información inteligentes que operan en piloto automático.
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
        
        {/* Core Architecture CSS */}
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

      {/* SECTOR SPECIALIZATION (IMPROVED & PREMIUM) */}
      <section className="w-full bg-[#111] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Especialización</p>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase text-white">Soluciones por Sector</h2>
            <p className="text-white/40 text-base mt-4 font-light max-w-xl mx-auto">
              Implementamos sistemas adaptados a las dinámicas comerciales de tu industria para maximizar tu rentabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Sector 1 */}
            <div className="group p-8 bg-[#080808] border border-white/5 rounded-3xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[360px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D62828]/5 rounded-bl-full group-hover:bg-[#D62828]/10 transition-colors"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] mb-6">
                  <Building size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-4">Inmobiliaria</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Asistentes de IA que atienden consultas de propiedades en WhatsApp, califican interesados de portales y agendan visitas automáticamente en tu calendario.
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Impacto Estimado</span>
                <span className="text-[#D62828] font-bold text-lg">+35% Citas Agendadas</span>
              </div>
            </div>

            {/* Sector 2 */}
            <div className="group p-8 bg-[#080808] border border-white/5 rounded-3xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[360px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D62828]/5 rounded-bl-full group-hover:bg-[#D62828]/10 transition-colors"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] mb-6">
                  <Activity size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-4">Salud y Clínicas</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Automatización de reserva de turnos, recordatorios interactivos de citas para evitar inasistencias y resolución inmediata de dudas de servicios.
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Impacto Estimado</span>
                <span className="text-[#D62828] font-bold text-lg">90% Menos Inasistencias</span>
              </div>
            </div>

            {/* Sector 3 */}
            <div className="group p-8 bg-[#080808] border border-white/5 rounded-3xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[360px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D62828]/5 rounded-bl-full group-hover:bg-[#D62828]/10 transition-colors"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] mb-6">
                  <Briefcase size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-4">Servicios</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Sistemas de onboarding automatizado, generación y firma de propuestas y contratos digitales al instante, y facturación recurrente en piloto automático.
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Impacto Estimado</span>
                <span className="text-[#D62828] font-bold text-lg">80% Menos Carga Manual</span>
              </div>
            </div>

            {/* Sector 4 */}
            <div className="group p-8 bg-[#080808] border border-white/5 rounded-3xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[360px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D62828]/5 rounded-bl-full group-hover:bg-[#D62828]/10 transition-colors"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] mb-6">
                  <ShoppingBag size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-4">E-commerce</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Bots conversacionales que resuelven dudas de envíos y stock en segundos, y disparadores de WhatsApp para recuperar carritos abandonados.
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Impacto Estimado</span>
                <span className="text-[#D62828] font-bold text-lg">+22% Ventas Recuperadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROI CALCULATOR */}
      <section className="w-full bg-[#080808] relative z-10 py-20 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Calculadora de Retorno</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white mb-6">
              Calcula tu ahorro real al automatizar
            </h2>
            <p className="text-white/50 font-sans text-base leading-relaxed mb-8 max-w-xl">
              Descubre cuánto dinero y tiempo productivo puede recuperar tu empresa al eliminar tareas repetitivas mediante flujos de información inteligentes.
            </p>

            {/* Form Sliders */}
            <div className="space-y-6 max-w-lg">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Número de Empleados</span>
                  <span className="text-white font-bold">{employees} personas</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={employees} 
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Salario Promedio Anual (por empleado)</span>
                  <span className="text-white font-bold">${averageSalary.toLocaleString()} USD</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="100000" 
                  step="5000"
                  value={averageSalary} 
                  onChange={(e) => setAverageSalary(Number(e.target.value))}
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Horas semanales en tareas repetitivas (por empleado)</span>
                  <span className="text-white font-bold">{hoursWasted} horas</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="25" 
                  value={hoursWasted} 
                  onChange={(e) => setHoursWasted(Number(e.target.value))}
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Inversión única estimada en automatización</span>
                  <span className="text-white font-bold">${formatNumber(investment)} USD</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="15000" 
                  step="500"
                  value={investment} 
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col gap-6 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D62828]/5 blur-3xl rounded-full"></div>
            
            <div className="border-b border-white/5 pb-6">
              <span className="text-xs font-mono text-white/40 block mb-2 uppercase">Ahorro anual estimado</span>
              <span className="text-4xl md:text-5xl font-display font-black text-[#D62828]">${formatNumber(annualSavings)} USD</span>
              <span className="text-xs text-white/30 block mt-2">En tiempo productivo recuperado para tu empresa</span>
            </div>

            <div className="grid grid-cols-2 gap-6 border-b border-white/5 pb-6">
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">ROI Primer Año</span>
                <span className="text-2xl font-bold text-white">+{roi}%</span>
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">Punto de Equilibrio</span>
                <span className="text-2xl font-bold text-white">{breakeven} meses</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-white/40 block mb-2">Ahorro proyectado a 5 años</span>
              <span className="text-2xl md:text-3xl font-display font-bold text-white">${formatNumber(fiveYearSavings)} USD</span>
            </div>

            <Link href="/start" className="mt-4 w-full py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase text-center hover:bg-white hover:text-black transition-all">
              Reclamar Auditoría de Procesos Gratuita
            </Link>
            
            <p className="text-[10px] text-white/20 text-center leading-relaxed">
              *Los cálculos son estimaciones basadas en datos promedio de eficiencia industrial. Te ayudamos a realizar un análisis de retorno personalizado sin compromiso alguno.
            </p>
          </div>
        </div>
      </section>

      {/* WHY AUTONOMEK - DIFFERENTIATORS */}
      <section className="w-full bg-[#080808] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-6">/ Ventaja Competitiva</p>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
                Tecnología <br /> sin <span className="text-[#D62828]">Complicaciones.</span>
              </h2>
              <p className="text-white/50 font-light leading-relaxed mb-10">
                La mayoría de las agencias complican las cosas. Nosotros estudiamos las necesidades reales de tu negocio para construir sistemas sencillos de usar, rápidos y extremadamente eficientes.
              </p>
              <div className="flex items-center gap-4">
                 <div className="text-white font-display text-5xl font-black">99%</div>
                 <div className="text-white/30 font-mono text-[10px] uppercase tracking-widest leading-tight">Estabilidad & <br/> Eficiencia</div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               {[
                 { title: "Procesos Optimizados con IA", desc: "Utilizamos la inteligencia artificial para automatizar nuestras tareas de diseño y desarrollo, entregando tu proyecto en tiempo récord." },
                 { title: "Sistemas que Crecen Contigo", desc: "Tus páginas y plataformas estarán alojadas de forma segura y seguirán funcionando a la perfección a medida que crezca tu cantidad de clientes." },
                 { title: "Protección y Seguridad Total", desc: "Implementamos medidas de seguridad avanzadas en cada sistema para proteger la información de tu empresa y la de tus clientes." },
                 { title: "Cuidado Continuo 24/7", desc: "Monitoreamos tu sistema las 24 horas del día. Si ocurre algún inconveniente, nuestro equipo lo resolverá de inmediato sin que tengas que preocuparte." }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all group"
                 >
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] group-hover:scale-150 transition-transform"></span>
                      {item.title}
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS GALLERY */}
      <section className="w-full bg-[#111] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
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
              className="group relative w-full aspect-[4/3] bg-[#080808] overflow-hidden border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.3)] transition-all duration-500 cursor-pointer"
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
              whileInView={{ opacity: 1, y: 64 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full aspect-[4/3] bg-[#080808] overflow-hidden border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.3)] transition-all duration-500 cursor-pointer"
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

      {/* WORK PROCESS SECTION */}
      <section className="w-full bg-[#080808] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#D62828]/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto text-center mb-24">
           <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Metodología Autonomek</p>
           <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-white">Del Caos al <span className="text-[#D62828]">Orden.</span></h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
           {[
             { step: "01", title: "Diagnóstico", desc: "Analizamos tu negocio gratis para detectar qué procesos son automatizables." },
             { step: "02", title: "Propuesta", desc: "Definimos herramientas y te entregamos un presupuesto cerrado y claro." },
             { step: "03", title: "Desarrollo", desc: "Creamos tus webs e integramos tus asistentes de IA en tiempo real." },
             { step: "04", title: "Cuidado", desc: "Monitoreamos la estabilidad 24/7 y realizamos optimizaciones mensuales." }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2 }}
               className="relative z-10 flex flex-col items-center text-center group"
             >
                <div className="w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D62828] group-hover:shadow-[0_0_20px_rgba(214,40,40,0.2)] transition-all">
                   <span className="font-display text-2xl font-black text-white/20 group-hover:text-[#D62828] transition-colors">{item.step}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed px-4">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full bg-[#0A0A0A] relative z-10 py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-20">
              <p className="font-mono text-[#D62828] text-xs tracking-[0.2em] uppercase mb-4">/ Preguntas Frecuentes</p>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-white">Despeja tus <span className="text-[#D62828]">Dudas.</span></h2>
           </div>

           <div className="space-y-6">
              {[
                { q: "¿Cuánto tarda en implementarse un sistema de IA?", a: "Dependiendo de la complejidad, un Agente de IA funcional puede estar listo en 2 a 4 semanas. Sistemas de automatización más complejos pueden tomar un poco más." },
                { q: "¿Tengo que saber programar para usar las herramientas?", a: "En absoluto. Nosotros diseñamos interfaces intuitivas y paneles de control para que tú y tu equipo operen el sistema sin tocar una sola línea de código." },
                { q: "¿Cómo garantizan que la IA no cometa errores?", a: "Utilizamos capas de seguridad para que la IA solo responda basándose en tu información oficial y con el tono de tu marca." },
                { q: "¿Qué mantenimiento requieren estos sistemas?", a: "Ofrecemos planes de soporte continuo para asegurar que las integraciones y conexiones se mantengan al día y que los modelos sigan aprendiendo de tu negocio." }
              ].map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-white/10 transition-all cursor-help"
                >
                   <h4 className="text-white font-bold text-lg mb-4 flex items-start gap-4">
                      <span className="text-[#D62828] font-mono">?</span>
                      {faq.q}
                   </h4>
                   <p className="text-white/40 text-sm leading-relaxed pl-6">{faq.a}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

    </main>
  );
}
