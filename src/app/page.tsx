'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
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
  Bot,
  Zap,
  Globe,
  Cpu,
  CheckCircle,
  MessageSquare,
  Search,
  Sparkles,
  Phone
} from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';

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

  const [mounted, setMounted] = useState(false);

  // Interactive ROI Calculator State
  const [employees, setEmployees] = useState(5);
  const [averageSalary, setAverageSalary] = useState(24000000);
  const [hoursWasted, setHoursWasted] = useState(8);
  const [investment, setInvestment] = useState(12000000);

  // ROI Calculations
  const hourlyRate = averageSalary / 1880;
  const annualHoursSaved = Math.round(employees * (hoursWasted * 0.8) * 47);
  const annualSavings = Math.round(annualHoursSaved * hourlyRate);
  const roi = Math.round(((annualSavings - investment) / investment) * 100);
  const breakeven = Number((investment / (annualSavings / 12)).toFixed(1));
  const fiveYearSavings = annualSavings * 5;

  // Live Chat Simulator State
  const [chatMode, setChatMode] = useState<'ventas' | 'agendamiento' | 'soporte'>('ventas');
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Projects Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic projects selection for featured list (Toxxic, Lamisia, Ecógrafos, Comidas Rápidas)
  const featuredProjects = useMemo(() => {
    return PROJECTS.filter(p => [5, 4, 1, 12].includes(p.id));
  }, []);

  const triggerChatSequence = (mode: 'ventas' | 'agendamiento' | 'soporte') => {
    setChatMode(mode);
    setMessages([]);
    setIsTyping(true);

    let sequence: { text: string; isBot: boolean; delay: number }[] = [];

    if (mode === 'ventas') {
      sequence = [
        { text: "Hola, me interesa implementar un sistema de reservas y respuestas automáticas para mi negocio. ¿Es muy complicado?", isBot: false, delay: 500 },
        { text: "¡Hola! Para nada. Nosotros nos encargamos de toda la configuración. Entrenamos a tu agente con la información de tus servicios para que responda 24/7 y agende citas en piloto automático.", isBot: true, delay: 2000 },
        { text: "Excelente. ¿Y cómo sé si un cliente realmente está interesado?", isBot: false, delay: 4500 },
        { text: "El agente califica al prospecto en la conversación. Si detecta intención de compra o agenda una cita, te envía los detalles ordenados al instante. ¡Tú solo cierras la venta! 🚀", isBot: true, delay: 6500 }
      ];
    } else if (mode === 'agendamiento') {
      sequence = [
        { text: "¿Cómo funciona el agendamiento de citas automático?", isBot: false, delay: 500 },
        { text: "El agente se conecta en tiempo real a tu Google Calendar o CRM. Le presenta al cliente los horarios disponibles directamente en WhatsApp o la web.", isBot: true, delay: 2200 },
        { text: "Y si el cliente necesita cancelar o reagendar, ¿tiene que llamar?", isBot: false, delay: 5000 },
        { text: "No, para nada. El cliente le escribe al bot 'quiero reagendar' y el bot le ofrece nuevas horas libres. También envía recordatorios automáticos para reducir inasistencias al 90%. 📅", isBot: true, delay: 7000 }
      ];
    } else if (mode === 'soporte') {
      sequence = [
        { text: "¿Qué pasa si un cliente hace una pregunta muy compleja que la IA no sabe?", isBot: false, delay: 500 },
        { text: "El agente está entrenado con tu base de conocimientos (RAG). Si detecta una duda no registrada o una solicitud humana, se detiene automáticamente.", isBot: true, delay: 2500 },
        { text: "¿Cómo me entero de que un humano debe intervenir?", isBot: false, delay: 5000 },
        { text: "Te envía una alerta inmediata a tu WhatsApp o panel de Chatwoot. Tu equipo entra a la conversación de forma transparente con un solo clic. ¡Eficiencia pura! 👤", isBot: true, delay: 7000 }
      ];
    }

    let timeouts: NodeJS.Timeout[] = [];
    sequence.forEach((msg) => {
      const t = setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (msg === sequence[sequence.length - 1]) {
          setIsTyping(false);
        }
      }, msg.delay);
      timeouts.push(t);
    });

    return timeouts;
  };

  useEffect(() => {
    setMounted(true);
    const timeouts = triggerChatSequence('ventas');
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleModeChange = (mode: 'ventas' | 'agendamiento' | 'soporte') => {
    triggerChatSequence(mode);
  };

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <main ref={containerRef} className="relative w-full text-foreground bg-[#080808] overflow-hidden">
      {/* 1. Base Layer: The Interactive Canvas */}
      <CanvasBackground />

      {/* 2. Middle Layer: Giant Distorted Background Text */}
      {mounted && (
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
      )}

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
              <span className="w-8 md:w-12 h-[1px] bg-[#72dbd3]"></span>
              <p className="font-mono text-[#72dbd3] text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                MÁS CLIENTES EN AUTOMÁTICO. CERO COMPLICACIONES.
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
              Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes. <strong className="text-white font-medium">Creamos empleados de ventas inteligentes que responden, cotizan y agendan citas 24/7 de forma autónoma.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto"
            >
              <Link href="/start" className="w-full sm:w-auto px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[#080808] transition-all text-center magnetic-area shadow-[0_0_20px_rgba(214,40,40,0.3)] rounded-xl">
                Diseñar Mi Agente
              </Link>
              <Link href="/servicios" className="group w-full sm:w-auto px-8 py-4 text-white font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-4 hover:opacity-80 transition-all magnetic-area">
                Explorar Soluciones
                <span className="w-8 h-[1px] bg-[#D62828] group-hover:w-12 transition-all"></span>
              </Link>
            </motion.div>
          </div>

          {/* Right: Live Chat Simulator */}
          <div className="lg:col-span-5 w-full flex flex-col items-center">
            {/* Simulator Tabs */}
            <div className="flex gap-2 mb-4 bg-white/5 p-1 rounded-2xl border border-white/5 w-full max-w-md">
              <button
                onClick={() => handleModeChange('ventas')}
                className={`flex-1 py-2 rounded-xl text-[10px] uppercase font-mono tracking-wider font-bold transition-all ${
                  chatMode === 'ventas' ? 'bg-[#D62828] text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                Ventas IA
              </button>
              <button
                onClick={() => handleModeChange('agendamiento')}
                className={`flex-1 py-2 rounded-xl text-[10px] uppercase font-mono tracking-wider font-bold transition-all ${
                  chatMode === 'agendamiento' ? 'bg-[#D62828] text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                Agenda Citas
              </button>
              <button
                onClick={() => handleModeChange('soporte')}
                className={`flex-1 py-2 rounded-xl text-[10px] uppercase font-mono tracking-wider font-bold transition-all ${
                  chatMode === 'soporte' ? 'bg-[#D62828] text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                Escalar Humano
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* Header Info */}
              <div className="bg-[#1A1A1A] p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D62828] to-[#ff4d4d] flex items-center justify-center text-white shadow-lg shadow-[#D62828]/20">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Agente Autonomek</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#00CC66] rounded-full animate-pulse"></span>
                      <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Atendiendo 24/7</p>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase border border-white/10 px-2 py-0.5 rounded-md">Demo en Vivo</span>
              </div>

              {/* Chat screen */}
              <div className="p-6 h-[320px] md:h-[400px] overflow-y-auto flex flex-col gap-5 bg-black/20">
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
                {isTyping && (
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
            <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Fugas de Dinero Ocultas</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white">¿Te suena familiar?</h2>
            <div className="w-16 h-[2px] bg-[#72dbd3] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-[#D62828]/30 hover:shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D62828]/20">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight transition-all duration-300">Mensajes sin Responder</h3>
              <p className="text-white/40 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/60">
                Clientes que escriben en la noche, fines de semana o durante picos de trabajo y no reciben respuesta. Se van directo a tu competencia en menos de 5 minutos.
              </p>
            </div>

            <div className="group p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-[#D62828]/30 hover:shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D62828]/20">
                <Clock size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight transition-all duration-300">Horas de Trabajo Manual</h3>
              <p className="text-white/40 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/60">
                Tu equipo pasa el día agendando citas, enviando recordatorios, persiguiendo links de pago y facturando en vez de enfocarse en las actividades comerciales que sí traen dinero.
              </p>
            </div>

            <div className="group p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-[#D62828]/30 hover:shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D62828]/20">
                <Coins size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight transition-all duration-300">Pérdida de Prospectos</h3>
              <p className="text-white/40 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/60">
                Citas que se olvidan confirmar, cotizaciones sin seguimiento proactivo y prospectos B2B que se enfrían porque nadie les dio atención inmediata y personalizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SOLUTIONS SECTION (REPLACED GENERIC GRID WITH THE 6 KEY COMMERCIAL SOLUTIONS) */}
      <section id="soluciones" className="w-full bg-[#080808] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
            <div>
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Soluciones Llave en Mano</p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Sistemas y Agentes IA</h2>
            </div>
            <p className="font-sans text-sm text-white/50 max-w-sm mt-4 md:mt-0">
              Desplegamos infraestructura de software diseñada para vender, automatizar procesos internos y captar clientes de forma constante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Solución 1 */}
            <div className="p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-[#D62828]/40 hover:shadow-[0_0_20px_rgba(214,40,40,0.1)] transition-all flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
              <div className="absolute top-4 right-4 bg-[#D62828]/10 text-[#D62828] text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#D62828]/20 flex items-center gap-1">
                <Sparkles size={10} /> Producto Estrella
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] mb-6">
                  <Bot size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-3">Empleado de Ventas IA</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  Para cualquier empresa que atienda clientes por WhatsApp. Atiende 24/7, responde dudas, cotiza, agenda citas, envía enlaces de pago y escala automáticamente a humanos cuando hace falta.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-4">
                <span className="text-[10px] font-mono text-[#72dbd3] uppercase block mb-1">Impacto comercial</span>
                <span className="text-white text-xs font-semibold">Cierra ventas y captura leads en piloto automático</span>
              </div>
            </div>

            {/* Solución 2 */}
            <div className="p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-[#D62828]/40 hover:shadow-[0_0_20px_rgba(214,40,40,0.1)] transition-all flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#72dbd3] mb-6">
                  <Search size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-3">Prospector IA B2B</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  El motor definitivo para adquisición corporativa. Busca empresas objetivo de forma masiva, extrae teléfonos y correos verificados, califica leads, redacta y envía el primer contacto de forma personalizada.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-4">
                <span className="text-[10px] font-mono text-[#72dbd3] uppercase block mb-1">Impacto comercial</span>
                <span className="text-white text-xs font-semibold">Generación de pipeline de reuniones de negocios</span>
              </div>
            </div>

            {/* Solución 3 */}
            <div className="p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-[#D62828]/40 hover:shadow-[0_0_20px_rgba(214,40,40,0.1)] transition-all flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6">
                  <Activity size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-3">Recepcionista IA</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  Optimizado para consultorios médicos, clínicas, dentistas, barberías y spas. Gestiona la reserva de turnos, confirma asistencia, procesa reprogramaciones y responde preguntas frecuentes.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-4">
                <span className="text-[10px] font-mono text-[#72dbd3] uppercase block mb-1">Impacto comercial</span>
                <span className="text-white text-xs font-semibold">Reduce inasistencias en más de un 90%</span>
              </div>
            </div>

            {/* Solución 4 */}
            <div className="p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-[#D62828]/40 hover:shadow-[0_0_20px_rgba(214,40,40,0.1)] transition-all flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6">
                  <MessageSquare size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-3">Servicio al Cliente IA</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  Sistemas omnicanal con almacenamiento de base de conocimientos en vectores (RAG) integrados a Chatwoot y WhatsApp. Resuelve de forma instantánea el 85% de las dudas recurrentes de soporte.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-4">
                <span className="text-[10px] font-mono text-[#72dbd3] uppercase block mb-1">Impacto comercial</span>
                <span className="text-white text-xs font-semibold">Tiempos de respuesta reducidos a cero segundos</span>
              </div>
            </div>

            {/* Solución 5 */}
            <div className="p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-[#D62828]/40 hover:shadow-[0_0_20px_rgba(214,40,40,0.1)] transition-all flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#D62828] mb-6">
                  <Zap size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-3">Automatización Comercial</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  Conexión total de tu stack comercial. Sincroniza formularios web, excels de Google Sheets, bandejas de Gmail y tus sistemas CRM/ERP de forma directa sin tareas repetitivas de copiado y pegado.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-4">
                <span className="text-[10px] font-mono text-[#72dbd3] uppercase block mb-1">Impacto comercial</span>
                <span className="text-white text-xs font-semibold">Cero errores de captura y ahorro masivo de horas</span>
              </div>
            </div>

            {/* Solución 6 */}
            <div className="p-8 bg-[#111] border border-white/5 rounded-3xl hover:border-[#D62828]/40 hover:shadow-[0_0_20px_rgba(214,40,40,0.1)] transition-all flex flex-col justify-between min-h-[350px] relative overflow-hidden group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6">
                  <Globe size={22} />
                </div>
                <h3 className="text-white font-display text-2xl font-bold mb-3">Desarrollo Web Premium</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">
                  No vendemos una página web básica; construimos una máquina de atracción de clientes lista para Google (SEO). Incluye embudos, chat de IA, integración a WhatsApp, formularios y CRM.
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 mt-4">
                <span className="text-[10px] font-mono text-[#72dbd3] uppercase block mb-1">Impacto comercial</span>
                <span className="text-white text-xs font-semibold">Aparición en primeras posiciones y captación directa</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMBINED SECTOR & NICHES SECTION (USER REQUESTED MIX) */}
      <section className="w-full bg-[#111111] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Nichos de Cierre Rápido</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white">Sectores de Alto Retorno</h2>
            <p className="text-white/40 text-sm mt-4 font-light max-w-xl mx-auto">
              Implementamos sistemas adaptados a las dinámicas reales de tu industria. Si tu negocio recibe un gran volumen de mensajes y gestiona datos de forma manual, esto es para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nicho 1: Odontología y Clínicas */}
            <div className="group p-6 bg-[#080808] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] mb-4">
                  <Activity size={20} />
                </div>
                <h4 className="text-white font-display text-xl font-bold mb-2">Clínicas & Odontólogos</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  El agente responde dudas sobre tratamientos y precios, agenda citas automáticamente y envía recordatorios reduciendo el ausentismo en un 90%.
                </p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-3">
                <span className="text-[9px] font-mono text-white/30 uppercase block">Impacto Comercial</span>
                <span className="text-[#D62828] font-bold text-sm">+90% Asistencia a Consultas</span>
              </div>
            </div>

            {/* Nicho 2: Inmobiliarias y Constructoras */}
            <div className="group p-6 bg-[#080808] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                  <Building size={20} />
                </div>
                <h4 className="text-white font-display text-xl font-bold mb-2">Inmobiliarias & Constructoras</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Calificación de leads en segundos, filtrado por presupuesto, envío de fichas técnicas de inmuebles y agendamiento de visitas físicas a los proyectos.
                </p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-3">
                <span className="text-[9px] font-mono text-white/30 uppercase block">Impacto Comercial</span>
                <span className="text-[#D62828] font-bold text-sm">+35% Visitas Físicas Agendadas</span>
              </div>
            </div>

            {/* Nicho 3: Talleres y Concesionarios */}
            <div className="group p-6 bg-[#080808] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                  <Cpu size={20} />
                </div>
                <h4 className="text-white font-display text-xl font-bold mb-2">Talleres Automotrices</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Asistentes de IA que reservan turnos de mantenimiento, notifican a clientes sobre el estado del vehículo y permiten envíos directos de cotizaciones y facturas.
                </p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-3">
                <span className="text-[9px] font-mono text-white/30 uppercase block">Impacto Comercial</span>
                <span className="text-[#D62828] font-bold text-sm">Operaciones de agendamiento 100% automatizadas</span>
              </div>
            </div>

            {/* Nicho 4: Hoteles & Academias */}
            <div className="group p-6 bg-[#080808] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                  <Briefcase size={20} />
                </div>
                <h4 className="text-white font-display text-xl font-bold mb-2">Hoteles & Academias</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Respuestas de tarifas de habitaciones o matrículas de cursos, reservas y cobro de inscripciones/estadías de forma directa desde WhatsApp.
                </p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-3">
                <span className="text-[9px] font-mono text-white/30 uppercase block">Impacto Comercial</span>
                <span className="text-[#D62828] font-bold text-sm">Captación 24/7 sin dependencias</span>
              </div>
            </div>

            {/* Nicho 5: Shopify & E-commerce */}
            <div className="group p-6 bg-[#080808] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                  <ShoppingBag size={20} />
                </div>
                <h4 className="text-white font-display text-xl font-bold mb-2">Tiendas E-commerce</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Resolución de dudas sobre envíos y stock de productos en segundos, y disparadores automatizados para recuperar compras o carritos abandonados.
                </p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-3">
                <span className="text-[9px] font-mono text-white/30 uppercase block">Impacto Comercial</span>
                <span className="text-[#D62828] font-bold text-sm">+22% Ventas Recuperadas</span>
              </div>
            </div>

            {/* Nicho 6: Logística & Distribuidores */}
            <div className="group p-6 bg-[#080808] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                  <Globe size={20} />
                </div>
                <h4 className="text-white font-display text-xl font-bold mb-2">Logística & Distribuidores</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Consulta de estado de envíos, cotización de fletes al mayoreo para distribuidores industriales, y carga automática de órdenes a sistemas ERP.
                </p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-3">
                <span className="text-[9px] font-mono text-white/30 uppercase block">Impacto Comercial</span>
                <span className="text-[#D62828] font-bold text-sm">Cero demoras en consultas de rastreo</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE MANIFESTO */}
      <section className="min-h-[60vh] w-full bg-[#080808] relative z-10 py-20 md:py-32 px-6 md:px-12 flex items-center border-t border-[#D62828]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid-scroll pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D62828]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-[1px] bg-[#72dbd3] mb-8 origin-left"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-8 flex items-center gap-4"
          >
            Nuestra Filosofía
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.2] font-semibold tracking-tight text-white"
          >
            No vendemos código ni plantillas. <br/>
            <span className="text-white/40 italic font-light">Construimos sistemas integrados de adquisición y eficiencia.</span> 
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-white/70 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            Nos acoplamos a las necesidades exactas de tu negocio. Si tu equipo de ventas está saturado, tus prospectos se enfrían o tus empleados pasan horas en tareas manuales repetitivas, diseñamos la solución a la medida de tus procesos actuales.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Link href="/servicios" className="group mt-16 inline-flex items-center gap-4 font-mono uppercase tracking-widest text-sm text-[#D62828] hover:text-white transition-colors magnetic-area">
              [ VER TODAS LAS SOLUCIONES ]
              <span className="w-8 h-[1px] bg-[#D62828] group-hover:bg-white group-hover:w-16 transition-all duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK & 3D ARCHITECTURE CUBE */}
      <section className="min-h-[90vh] w-full bg-[#080808] relative z-10 py-24 md:py-32 px-6 md:px-12 flex items-center border-t border-white/5 overflow-hidden">
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
              className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-[#72dbd3]"></span> Stack Tecnológico
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black tracking-tight text-white mb-8"
            >
              Infraestructura de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D62828]">Ingeniería Robusta.</span>
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
                  <span className="font-mono text-[10px] text-[#D62828]">01</span> Carga Ultra Rápida (Next.js & Supabase)
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Páginas cargadas de forma instantánea preparadas para retener visitas y posicionar directamente en Google (SEO local y nacional).
                </p>
              </div>

              <div className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#D62828]">02</span> Modelos de Lenguaje Avanzados (LLM)
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Agentes conversacionales capaces de entender texto, voz, audio e imágenes, operando bajo flujos lógicos controlados sin alucinaciones.
                </p>
              </div>

              <div className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#D62828]">03</span> Orquestadores de Integraciones (n8n)
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Conexión directa entre bases de datos, CRMs, APIs de mensajería (WhatsApp Cloud API) y paneles de control en la nube.
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
                  <div className="ui-mock bg-[#111] border border-white/10 rounded-t-xl rounded-bl-sm rounded-br-xl w-[70%] h-[55%] relative flex flex-col p-2 gap-2 shadow-[0_0_15px_rgba(214,40,40,0.1)]">
                    <div className="flex gap-1.5 items-center">
                       <div className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse"></div>
                       <div className="w-[60%] h-1 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="w-[85%] h-1.5 bg-white/10 rounded-full mt-1"></div>
                    <div className="w-[45%] h-1.5 bg-white/10 rounded-full"></div>
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
          
          .face-top { width: 100%; height: 100%; transform: translateZ(20px); }
          .face-s1  { width: 100%; height: 20px; top: 100%; left: 0; transform-origin: top; transform: rotateX(90deg); background: rgba(10,10,10,0.8); }
          .face-s2  { width: 20px; height: 100%; right: 0; top: 0; transform-origin: right; transform: rotateY(90deg); background: rgba(5,5,5,0.9); }
          .face-s3  { width: 100%; height: 20px; bottom: 92%; left: 0; transform-origin: top; transform: rotateX(90deg); background: rgba(10,10,10,0.8); }
          .face-s4  { width: 20px; height: 100%; left: 0; top: 0; transform-origin: left; transform: rotateY(-90deg); background: rgba(5,5,5,0.9); }

          .layer-base { transform: translateZ(0px); }
          .base-top {
              background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
              background-size: 20px 20px;
          }
          
          .layer-mid { transform: translateZ(50px); }
          .mid-top { border-color: rgba(214,40,40,0.4); }
          
          .layer-top { transform: translateZ(100px); }

          @keyframes spin3D {
              0% { transform: rotateX(55deg) rotateZ(0deg); }
              100% { transform: rotateX(55deg) rotateZ(360deg); }
          }

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

      {/* INTERACTIVE ROI CALCULATOR */}
      <section className="w-full bg-[#080808] relative z-10 py-20 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Calculadora de Retorno</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white mb-6">
              Calcula tu ahorro al automatizar
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
                  aria-label="Número de Empleados"
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Salario Promedio Anual (por empleado)</span>
                  <span className="text-white font-bold">${formatNumber(averageSalary)} COP</span>
                </div>
                <input 
                  type="range" 
                  min="12000000" 
                  max="120000000" 
                  step="2000000"
                  value={averageSalary} 
                  onChange={(e) => setAverageSalary(Number(e.target.value))}
                  aria-label="Salario Promedio Anual"
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Horas semanales en tareas repetitivas</span>
                  <span className="text-white font-bold">{hoursWasted} horas</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="25" 
                  value={hoursWasted} 
                  onChange={(e) => setHoursWasted(Number(e.target.value))}
                  aria-label="Horas semanales"
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Inversión estimada única en automatización</span>
                  <span className="text-white font-bold">${formatNumber(investment)} COP</span>
                </div>
                <input 
                  type="range" 
                  min="4000000" 
                  max="60000000" 
                  step="1000000"
                  value={investment} 
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  aria-label="Inversión única"
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
              <span className="text-4xl md:text-5xl font-display font-black text-[#D62828]">${formatNumber(annualSavings)} COP</span>
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
              <span className="text-2xl md:text-3xl font-display font-bold text-white">${formatNumber(fiveYearSavings)} COP</span>
            </div>

            <Link href="/start" className="mt-4 w-full py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase text-center hover:bg-white hover:text-black transition-all rounded-xl shadow-lg shadow-[#D62828]/10">
              Reclamar Auditoría de Procesos Gratuita
            </Link>
            
            <p className="text-[10px] text-white/20 text-center leading-relaxed">
              *Los cálculos son estimaciones basadas en datos promedio de eficiencia industrial. Te ayudamos a realizar un análisis de retorno personalizado sin compromiso alguno.
            </p>
          </div>
        </div>
      </section>

      {/* WHY AUTONOMEK - DIFFERENTIATORS */}
      <section className="w-full bg-[#080808] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-6">/ Ventaja Competitiva</p>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
                Tecnología <br /> sin <span className="text-[#D62828]">Complicaciones.</span>
              </h2>
              <p className="text-white/50 font-light leading-relaxed mb-10 text-sm">
                La mayoría de las agencias complican el software. Nosotros estudiamos las dinámicas y cuellos de botella de tu negocio para construir sistemas sumamente intuitivos, veloces y enfocados 100% en retorno comercial.
              </p>
              <div className="flex items-center gap-4">
                 <div className="text-white font-display text-5xl font-black">99%</div>
                 <div className="text-white/30 font-mono text-[10px] uppercase tracking-widest leading-tight">Estabilidad & <br/> Eficiencia</div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               {[
                 { title: "Desarrollo Ágil & IA", desc: "Utilizamos inteligencia artificial para optimizar nuestros propios procesos internos, lo que nos permite entregar sistemas de alta calidad en tiempo récord." },
                 { title: "Infraestructura Escalable", desc: "Alojamos tus agentes y webs en servidores en la nube de alta disponibilidad. Tu sistema seguirá operando sin caídas a medida que crezca tu volumen de clientes." },
                 { title: "Seguridad y Privacidad", desc: "Diseñamos con protocolos robustos. Los datos de tus clientes y de tu empresa se mantienen cifrados y fuera de peligro." },
                 { title: "Soporte e Iteración Mensual", desc: "Monitoreamos la estabilidad 24/7. Ajustamos el tono de los agentes y actualizamos el SEO para asegurar que tu máquina de ventas no se detenga." }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-[#D62828]/30 transition-all group"
                 >
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] group-hover:scale-150 transition-transform"></span>
                      {item.title}
                    </h4>
                    <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS GALLERY (CONNECTED TO THE DETAILED MODAL NOW!) */}
      <section className="w-full bg-[#111] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
          >
            <div>
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Casos de Éxito Reales</p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Sistemas en Operación</h2>
            </div>
            <Link href="/proyectos" className="mt-6 md:mt-0 font-mono text-xs uppercase tracking-widest text-[#D62828] hover:text-white transition-colors border-b border-[#D62828]/30 pb-1">
              Ver Todos Los Proyectos →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: idx % 2 === 0 ? 50 : 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleOpenDetails(project)}
                className="group relative w-full aspect-[4/3] bg-[#080808] overflow-hidden border border-white/5 hover:border-[#D62828] hover:shadow-[0_0_30px_rgba(214,40,40,0.2)] transition-all duration-500 cursor-pointer rounded-3xl"
              >
                <img 
                  src={`/projects/${project.folder}/${project.images[0]}`} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-103 transition-all duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-mono text-[9px] tracking-widest text-[#D62828] mb-2 block uppercase font-bold">{project.category} / {project.client}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-black text-white">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK PROCESS SECTION */}
      <section className="w-full bg-[#080808] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#D62828]/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto text-center mb-24">
           <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Metodología Autonomek</p>
           <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-white">Del Caos al <span className="text-[#D62828]">Orden.</span></h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
           {[
             { step: "01", title: "Diagnóstico", desc: "Analizamos tu proceso comercial actual sin costo para detectar cuellos de botella." },
             { step: "02", title: "Propuesta", desc: "Te entregamos un alcance cerrado, costos claros y retorno estimado de inversión." },
             { step: "03", title: "Desarrollo", desc: "Diseñamos tus webs de alto rendimiento e integramos tus asistentes en piloto automático." },
             { step: "04", title: "Optimización", desc: "Monitoreamos la estabilidad 24/7 y mejoramos el entrenamiento de los agentes mensualmente." }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.15 }}
               className="relative z-10 flex flex-col items-center text-center group"
             >
                <div className="w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D62828] group-hover:shadow-[0_0_20px_rgba(214,40,40,0.2)] transition-all">
                   <span className="font-display text-2xl font-black text-white/20 group-hover:text-[#D62828] transition-colors">{item.step}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed px-4">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full bg-[#0A0A0A] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-20">
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Preguntas Frecuentes</p>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-white">Despeja tus <span className="text-[#D62828]">Dudas.</span></h2>
           </div>

           <div className="space-y-6">
              {[
                { q: "¿Cuánto tarda en implementarse un Empleado de Ventas IA?", a: "Dependiendo de la complejidad y los canales de mensajería, un Agente de IA funcional y calificado puede estar listo en un plazo de 2 a 4 semanas." },
                { q: "¿Tengo que saber programar o administrar servidores?", a: "Para nada. Nosotros nos encargamos de todo el hosting, las conexiones API y el mantenimiento técnico. Te entregamos un sistema llave en mano listo para operar." },
                { q: "¿Cómo se entrenan los agentes conversacionales?", a: "Los alimentamos directamente con la información oficial de tus servicios, catálogos, políticas de entrega y preguntas frecuentes para asegurar respuestas 100% correctas." },
                { q: "¿Qué pasa si mis herramientas actuales no son modernas?", a: "Nuestros orquestadores de software (n8n) nos permiten conectar sistemas antiguos, hojas de cálculo de Excel e incluso correos electrónicos con agentes modernos de IA de forma transparente." }
              ].map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 md:p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-white/10 transition-all"
                >
                   <h4 className="text-white font-bold text-base md:text-lg mb-4 flex items-start gap-4">
                      <span className="text-[#D62828] font-mono">?</span>
                      {faq.q}
                   </h4>
                   <p className="text-white/40 text-xs md:text-sm leading-relaxed pl-6">{faq.a}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Global Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </main>
  );
}
