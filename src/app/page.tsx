'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import CanvasBackground from '@/components/effects/CanvasBackground';
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
  Phone,
  Terminal,
  Calendar,
  TrendingUp,
  Gauge,
  Server,
  Play,
  ArrowUpRight,
  Check,
  Database
} from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import LottieBgIcon from '@/components/widgets/LottieBgIcon';

const SOLUTIONS_DATA = [
  {
    title: "Empleado de Ventas IA",
    tagline: "Producto Estrella",
    icon: MessageSquare,
    desc: "Para cualquier empresa que atienda clientes por WhatsApp. Atiende 24/7, responde dudas, cotiza, agenda citas, envía enlaces de pago y escala automáticamente a humanos cuando hace falta.",
    benefits: [
      "Atiende clientes B2C y B2B 24/7 de forma autónoma.",
      "Responde preguntas frecuentes sobre tu catálogo y políticas.",
      "Cotiza productos y servicios en tiempo real.",
      "Cierra ventas directamente dentro del chat.",
      "Agenda citas integrando a tu calendario preferido.",
      "Envía enlaces de pago seguros automatizados.",
      "Escala a un humano de tu equipo cuando hace falta."
    ],
    impact: "Cierra ventas y captura leads en piloto automático",
    metric: "24/7",
    metricLabel: "Disponibilidad de ventas",
    tech: ["WhatsApp API", "n8n", "OpenAI GPT-4", "Supabase"],
    previewType: "chat",
    previewData: [
      { text: "Hola, me interesa implementar un sistema de reservas y respuestas automáticas para mi negocio. ¿Es muy complicado?", isBot: false },
      { text: "¡Hola! Para nada. Nosotros nos encargamos de toda la configuración. Entrenamos a tu agente con la información de tus servicios para que responda 24/7 y agende citas en piloto automático.", isBot: true },
      { text: "Excelente. ¿Y cómo sé si un cliente realmente está interesado?", isBot: false },
      { text: "El agente califica al prospecto en la conversación. Si detecta intención de compra o agenda una cita, te envía los detalles ordenados al instante. ¡Tú solo cierras la venta! 🚀", isBot: true }
    ]
  },
  {
    title: "Prospector IA B2B",
    icon: Search,
    desc: "El motor definitivo para adquisición corporativa. Busca empresas objetivo de forma masiva, extrae teléfonos y correos verificados, califica leads, redacta y envía el primer contacto de forma personalizada.",
    benefits: [
      "Busca empresas objetivo de tu nicho de forma masiva.",
      "Extrae correos electrónicos y teléfonos móviles verificados.",
      "Filtra e identifica tomadores de decisiones clave.",
      "Redacta mensajes hiper-personalizados con IA.",
      "Envía secuencias automatizadas de contacto inicial.",
      "Agenda reuniones de negocio directamente en tu agenda.",
      "Sincroniza prospectos calificados con tu CRM."
    ],
    impact: "Generación de pipeline de reuniones de negocios",
    metric: "+35%",
    metricLabel: "Tasa de respuesta inicial",
    tech: ["n8n", "Apollo.io", "DeepSeek-V3", "SMTP/IMAP Sync"],
    previewType: "console",
    previewData: [
      { type: "info", text: "Iniciando escaneo de empresas objetivo..." },
      { type: "success", text: "52 empresas encontradas en nicho 'Logística y Distribución'." },
      { type: "info", text: "Extrayendo contactos verificados de directores de operaciones..." },
      { type: "success", text: "38 correos y 14 teléfonos móviles obtenidos." },
      { type: "process", text: "Generando propuestas personalizadas con IA..." },
      { type: "success", text: "38 emails secuenciados. Tasa de entrega proyectada: 98.4%" }
    ]
  },
  {
    title: "Recepcionista IA",
    icon: Calendar,
    desc: "Optimizado para consultorios médicos, clínicas, dentistas, barberías y spas. Gestiona la reserva de turnos, confirma asistencia, procesa reprogramaciones y responde preguntas frecuentes.",
    benefits: [
      "Gestiona la reserva y confirmación de turnos 24/7.",
      "Confirmación automatizada de asistencia por WhatsApp.",
      "Reduce el ausentismo de tus clientes en un 90%.",
      "Procesa reprogramaciones y cancelaciones automáticas.",
      "Envía recordatorios previos con enlaces de confirmación.",
      "Sincronización en tiempo real con Google Calendar y Cal.com.",
      "Responde preguntas comunes sobre ubicación y horarios."
    ],
    impact: "Reduce inasistencias en más de un 90%",
    metric: "-90%",
    metricLabel: "Reducción de inasistencias",
    tech: ["Google Calendar", "n8n", "WhatsApp API", "Cal.com"],
    previewType: "calendar",
    previewData: {
      slots: ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM"],
      booked: [
        { time: "09:00 AM", patient: "Clínica Dental - Valoración", status: "Confirmado por Bot" },
        { time: "10:30 AM", patient: "Dr. Mendoza - Limpieza", status: "Confirmado por Bot" },
        { time: "02:00 PM", patient: "Especialista - Ortodoncia", status: "Pendiente" }
      ]
    }
  },
  {
    title: "Servicio al Cliente IA",
    icon: Bot,
    desc: "Sistemas omnicanal con almacenamiento de base de conocimientos en vectores (RAG) integrados a Chatwoot y WhatsApp. Resuelve de forma instantánea el 85% de las dudas recurrentes de soporte.",
    benefits: [
      "Tiempo de primera respuesta reducido a cero segundos.",
      "Resuelve más del 85% de las dudas y preguntas recurrentes.",
      "Conectado a tu base de conocimientos con tecnología RAG.",
      "Integrado a Chatwoot para intervención humana instantánea.",
      "Atención omnicanal por WhatsApp, Chat Web y Redes.",
      "Respuestas coherentes y profesionales sin alucinaciones.",
      "Clasifica y asigna incidentes automáticamente."
    ],
    impact: "Tiempos de respuesta reducidos a cero segundos",
    metric: "0s",
    metricLabel: "Tiempo de respuesta",
    tech: ["Chatwoot", "Qdrant Vector DB", "n8n", "OpenAI Assistant"],
    previewType: "rag",
    previewData: {
      query: "¿Cuál es la garantía de los agentes?",
      knowledgeSource: "Autonomek_v2.pdf",
      retrievedChunks: [
        "Sección 4.2: Todos los desarrollos de software y agentes de IA cuentan con una garantía de 30 días de estabilidad..."
      ],
      aiResponse: "Nuestros agentes de IA cuentan con una garantía de estabilidad de 30 días posteriores al despliegue, cubriendo ajustes y calibración."
    }
  },
  {
    title: "Automatización Comercial",
    icon: Cpu,
    desc: "Conexión total de tu stack comercial. Sincroniza formularios web, excels de Google Sheets, bandejas de Gmail y tus sistemas CRM/ERP de forma directa sin tareas repetitivas de copiado y pegado.",
    benefits: [
      "Sincroniza la información de tus prospectos al instante.",
      "Elimina horas de copiado y pegado manual en tu equipo.",
      "Conecta formularios web directos con Sheets y HubSpot/CRM.",
      "Reduce errores de registro y descuidos comerciales a cero.",
      "Envía alertas inmediatas a tus vendedores vía WhatsApp o Slack.",
      "Orquestación fluida y robusta con flujos visuales en n8n.",
      "Dispara flujos de facturación o envío de contratos al firmar."
    ],
    impact: "Cero errores de captura y ahorro masivo de horas",
    metric: "+15h",
    metricLabel: "Ahorradas por semana",
    tech: ["n8n Workflows", "Google Sheets API", "ActiveCampaign", "HubSpot CRM"],
    previewType: "workflow",
    previewData: [
      { name: "Webhook Inicial", status: "success", type: "trigger", desc: "Formulario Web enviado" },
      { name: "Formatear Datos IA", status: "success", type: "action", desc: "Clasificación de lead" },
      { name: "Sincronizar CRM", status: "success", type: "action", desc: "HubSpot CRM" },
      { name: "Notificación de Alerta", status: "success", type: "action", desc: "WhatsApp de ventas" }
    ]
  },
  {
    title: "Desarrollo Web Premium",
    icon: Globe,
    desc: "No vendemos una página web básica; construimos una máquina de atracción de clientes lista para Google (SEO). Incluye embudos, chat de IA, integración a WhatsApp, formularios y CRM.",
    benefits: [
      "Desarrollado en Next.js App Router para carga instantánea.",
      "Optimización SEO semántica para aparecer en primeros puestos.",
      "Estructuras y embudos orientados al registro y venta.",
      "Chat de IA interactivo y WhatsApp flotante integrados.",
      "Formularios de contacto directos sincronizados a tu CRM.",
      "Código limpio y responsivo con enfoque Mobile-First.",
      "Puntuación perfecta de 100/100 en auditorías PageSpeed."
    ],
    impact: "Aparición en primeras posiciones y captación directa",
    metric: "100%",
    metricLabel: "Puntuación en PageSpeed",
    tech: ["Next.js (App Router)", "TailwindCSS", "Vercel Edge Network", "SEO Semántico"],
    previewType: "webSpeed",
    previewData: {
      performance: 100,
      accessibility: 98,
      bestPractices: 100,
      seo: 100
    }
  }
];

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
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

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Projects Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);

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

          {/* Right: WhatsApp-Style Chat Simulator */}
          <div className="lg:col-span-5 w-full flex flex-col items-center">
            {/* Mode selector tabs */}
            <div className="flex gap-1.5 mb-3 w-full max-w-sm mx-auto">
              {[
                { id: 'ventas' as const, label: '💬 Ventas IA' },
                { id: 'agendamiento' as const, label: '📅 Agenda Citas' },
                { id: 'soporte' as const, label: '👤 Escalar Humano' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleModeChange(tab.id)}
                  className={`flex-1 py-1.5 rounded-lg text-[9px] font-semibold tracking-wide transition-all ${
                    chatMode === tab.id
                      ? 'bg-[#075E54] text-white shadow-lg'
                      : 'bg-white/5 text-white/40 hover:text-white/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full max-w-sm relative"
            >

              {/* WhatsApp container */}
              <div className="w-full bg-[#0B141A] rounded-[28px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative">
                
                {/* WhatsApp Header - Exact WhatsApp Dark Style */}
                <div className="bg-[#1F2C33] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00A884] to-[#075E54] flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-semibold leading-tight">Agente Autonomek</h3>
                      <p className="text-[#00A884] text-[10px] font-medium">en línea</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-white/70">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.55 12c0 1.09-.29 2.12-.79 3l2.53 2.53-1.42 1.42-2.53-2.53c-.88.5-1.91.79-3 .79-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6zm-6-4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-10 4c0-1.09.29-2.12.79-3l-2.53-2.53 1.42-1.42 2.53 2.53c.88-.5 1.91-.79 3-.79v2c-2.21 0-4 1.79-4 4zm2 4c0 2.21 1.79 4 4 4v2c-3.31 0-6-2.69-6-6h2z"/></svg>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  </div>
                </div>

                {/* Chat Background Pattern */}
                <div className="relative" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
                  {/* Messages area */}
                  <div ref={chatContainerRef} className="h-[360px] md:h-[420px] overflow-y-auto flex flex-col p-3 gap-2 scrollbar-thin">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-1`}>
                        <div className={`relative max-w-[85%] px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
                          msg.isBot
                            ? 'bg-[#202C33] text-[#E9EDEF] rounded-lg rounded-tl-none self-start'
                            : 'bg-[#005C4B] text-white rounded-lg rounded-tr-none self-end'
                        }`}>
                          <span className="block whitespace-pre-wrap text-[13px] leading-[1.45]">{msg.text}</span>
                          <span className={`text-[10px] mt-1 flex items-center gap-1 ${
                            msg.isBot ? 'text-white/40' : 'text-white/60'
                          }`}>
                            {msg.isBot ? '10:30' : '10:31'}
                            {!msg.isBot && (
                              <svg viewBox="0 0 16 11" width="14" height="11" fill="currentColor" className="text-[#53BDEB]">
                                <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.46.46 0 0 0-.336.153.478.478 0 0 0-.127.33c0 .124.048.245.127.33l2.291 2.38a.48.48 0 0 0 .343.165c.14 0 .27-.06.369-.165L11.2 1.31a.5.5 0 0 0 .14-.34.48.48 0 0 0-.14-.34.3.3 0 0 0-.129.023zm-1.676 5.283a.464.464 0 0 0-.35-.165.44.44 0 0 0-.344.153l-3.19 3.726-1.087-1.147a.464.464 0 0 0-.337-.14.438.438 0 0 0-.33.16.467.467 0 0 0-.101.328.491.491 0 0 0 .164.31l1.23 1.273c.099.098.224.14.35.14a.43.43 0 0 0 .33-.14l3.58-4.242a.523.523 0 0 0 .149-.34.483.483 0 0 0-.141-.316z"/>
                              </svg>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[#202C33] rounded-lg rounded-tl-none px-4 py-3.5 flex items-center gap-1">
                          <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                          <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Input Bar */}
                  <div className="bg-[#1F2C33] px-3 py-2 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                      <path d="M1.816 15.556v.002a.753.753 0 0 0 1.188.608l5.791-4.275a.75.75 0 0 1 .912 0l5.792 4.275a.754.754 0 0 0 1.188-.608.767.767 0 0 0-.275-.583l-6.25-5.542a.75.75 0 0 0-.976 0l-6.25 5.542a.766.766 0 0 0-.42.581z"/>
                    </svg>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                      <path d="M9.153 16.408a.5.5 0 0 1-.702-.704l3.736-3.736a.5.5 0 0 1 .703.704l-3.737 3.736zm4.182-8.414a.5.5 0 0 1 .703.703L8.944 13.79a.5.5 0 0 1-.703-.703l4.094-4.093zM5.5 19h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 1h-13A2.5 2.5 0 0 0 3 3.5v13A2.5 2.5 0 0 0 5.5 19zm-1-15.5A1.5 1.5 0 0 1 6 2h12a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18 18H6a1.5 1.5 0 0 1-1.5-1.5v-13z"/>
                    </svg>
                    <div className="flex-1 bg-[#2A3942] rounded-lg px-4 py-2 text-sm text-white/70 cursor-text">
                      <span className="text-white/30">Escribe un mensaje...</span>
                    </div>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                      <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.468 2.35 8.468 4.35v7.061c0 2.001 1.53 3.531 3.531 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"/>
                    </svg>
                  </div>
                </div>
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
            <div className="group p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-[#D62828]/30 hover:shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)] hover:-translate-y-1 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D62828]/20 relative z-10">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight transition-all duration-300 relative z-10">Mensajes sin Responder</h3>
              <p className="text-white/40 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/60 relative z-10">
                Clientes que escriben en la noche, fines de semana o durante picos de trabajo y no reciben respuesta. Se van directo a tu competencia en menos de 5 minutos.
              </p>
              <LottieBgIcon path="/SVG/MCP.json" />
            </div>

            <div className="group p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-[#D62828]/30 hover:shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)] hover:-translate-y-1 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D62828]/20 relative z-10">
                <Clock size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight transition-all duration-300 relative z-10">Horas de Trabajo Manual</h3>
              <p className="text-white/40 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/60 relative z-10">
                Tu equipo pasa el día agendando citas, enviando recordatorios, persiguiendo links de pago y facturando en vez de enfocarse en las actividades comerciales que sí traen dinero.
              </p>
              <LottieBgIcon path="/SVG/Desarrollo web.json" />
            </div>

            <div className="group p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-[#D62828]/30 hover:shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)] hover:-translate-y-1 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D62828]/20 relative z-10">
                <Coins size={24} />
              </div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight transition-all duration-300 relative z-10">Pérdida de Prospectos</h3>
              <p className="text-white/40 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/60 relative z-10">
                Citas que se olvidan confirmar, cotizaciones sin seguimiento proactivo y prospectos B2B que se enfrían porque nadie les dio atención inmediata y personalizada.
              </p>
              <LottieBgIcon path="/SVG/Base de datos.json" />
            </div>
          </div>
        </div>
      </section>

      {/* CORE SOLUTIONS SECTION */}
      <section id="soluciones" className="w-full bg-[#080808] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none animate-pulse-slow" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(214,40,40,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header de la sección */}
          <div className="text-center lg:text-left lg:flex lg:justify-between lg:items-end mb-16 md:mb-20">
            <div>
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Soluciones Llave en Mano</p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
                Sistemas y <span className="text-[#D62828]">Agentes IA</span>
              </h2>
            </div>
            <p className="font-sans text-sm text-white/50 max-w-sm mt-4 lg:mt-0 leading-relaxed">
              Desplegamos infraestructura de software diseñada para vender, automatizar procesos internos y captar clientes de forma constante.
            </p>
          </div>

          {/* Selector para móvil (Horizontal Scroll) */}
          <div className="flex lg:hidden overflow-x-auto pb-4 mb-8 gap-3 scrollbar-none snap-x snap-mandatory">
            {SOLUTIONS_DATA.map((sol, index) => (
              <button
                key={index}
                onClick={() => setActiveSolution(index)}
                className={`snap-center flex-shrink-0 px-5 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeSolution === index
                    ? 'bg-[#D62828] text-white border-[#D62828] shadow-[0_0_15px_rgba(214,40,40,0.3)]'
                    : 'bg-[#111] text-white/40 border-white/5 hover:text-white/70'
                }`}
              >
                {sol.title}
              </button>
            ))}
          </div>

          {/* Layout Principal Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* MENÚ DE SELECCIÓN (IZQUIERDA - DESKTOP) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-3 justify-center">
              {SOLUTIONS_DATA.map((sol, index) => {
                const isActive = activeSolution === index;
                return (
                  <motion.button
                    key={index}
                    onClick={() => setActiveSolution(index)}
                    whileHover={{ x: 6 }}
                    className={`relative p-5 text-left rounded-2xl border transition-all duration-300 group flex items-center gap-4 ${
                      isActive
                        ? 'bg-[#111] border-[#D62828]/50 shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)]'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                    }`}
                  >
                    {/* Indicador de barra roja lateral */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#D62828] rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Icono de la solución */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'bg-[#D62828]/20 text-[#D62828]' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60'
                    }`}>
                      <sol.icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-[#72dbd3] tracking-widest uppercase">0{index + 1}</span>
                        {sol.tagline && (
                          <span className="text-[8px] bg-[#D62828]/10 text-[#D62828] border border-[#D62828]/20 px-1.5 py-0.5 rounded font-mono uppercase font-bold">
                            ★ Pop
                          </span>
                        )}
                      </div>
                      <h3 className={`font-display text-lg font-bold transition-colors ${
                        isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'
                      }`}>
                        {sol.title}
                      </h3>
                    </div>

                    <ArrowRight size={16} className={`transition-all duration-300 ${
                      isActive ? 'opacity-100 text-[#D62828] translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                    }`} />
                  </motion.button>
                );
              })}
            </div>

            {/* PANEL DE DEMOSTRACIÓN E INFO (DERECHA) */}
            <div className="lg:col-span-8 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-8 relative overflow-hidden group/panel shadow-2xl"
                >
                  {/* Gradiente superior decorativo */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D62828] via-[#72dbd3] to-transparent opacity-60" />
                  
                  {/* Grid de contenido */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Información Técnica */}
                    <div className="md:col-span-6 flex flex-col gap-5">
                      <div>
                        {SOLUTIONS_DATA[activeSolution].tagline && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest bg-[#D62828]/10 text-[#D62828] border border-[#D62828]/20 uppercase mb-3">
                            <Sparkles size={10} /> {SOLUTIONS_DATA[activeSolution].tagline}
                          </span>
                        )}
                        <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white leading-tight">
                          {SOLUTIONS_DATA[activeSolution].title}
                        </h3>
                        <p className="text-white/50 text-xs md:text-sm font-light mt-3 leading-relaxed">
                          {SOLUTIONS_DATA[activeSolution].desc}
                        </p>
                        {SOLUTIONS_DATA[activeSolution].benefits && (
                          <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                            {SOLUTIONS_DATA[activeSolution].benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-white/70 text-[11px] font-sans font-light">
                                <span className="w-1 h-1 rounded-full bg-[#D62828] flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Bloque de Impacto Comercial */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                        <div className="flex flex-col flex-1">
                          <span className="text-[9px] font-mono text-[#72dbd3] uppercase tracking-wider mb-1">Impacto Comercial</span>
                          <span className="text-white text-xs font-semibold leading-snug">
                            {SOLUTIONS_DATA[activeSolution].impact}
                          </span>
                        </div>
                      </div>

                      {/* Tech stack badges */}
                      <div>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-2">Ingeniería & Stack</span>
                        <div className="flex flex-wrap gap-1.5">
                          {SOLUTIONS_DATA[activeSolution].tech.map((t, idx) => (
                            <span key={idx} className="bg-white/5 hover:bg-white/10 text-white/70 text-[9px] font-mono px-2.5 py-1 rounded-md border border-white/5 transition-colors cursor-default">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Simulación Visual Interactive Preview */}
                    <div className="md:col-span-6 w-full flex flex-col h-full justify-center">
                      <div className="w-full bg-[#080808] rounded-2xl border border-white/10 overflow-hidden shadow-inner flex flex-col h-[280px] relative">
                        
                        {/* Browser/Window Header Controls */}
                        <div className="bg-[#181818] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D62828]/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                          </div>
                          <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
                            Live Demo - {SOLUTIONS_DATA[activeSolution].previewType}
                          </span>
                        </div>

                        {/* Contenedor de la Simulación en base al previewType */}
                        <div className="flex-1 p-4 overflow-y-auto flex flex-col text-left justify-start scrollbar-none">
                          
                          {/* 1. CHAT SIMULATION */}
                          {SOLUTIONS_DATA[activeSolution].previewType === 'chat' && (
                            <div className="flex flex-col gap-2.5 text-[11px]">
                              {(SOLUTIONS_DATA[activeSolution].previewData as {text: string, isBot: boolean}[]).map((msg, i) => (
                                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                  <div className={`max-w-[85%] px-3 py-2 rounded-xl leading-relaxed shadow-sm ${
                                    msg.isBot 
                                      ? 'bg-[#202C33] text-[#E9EDEF] rounded-tl-none' 
                                      : 'bg-[#005C4B] text-white rounded-tr-none'
                                  }`}>
                                    {msg.text}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* 2. CONSOLE SIMULATION */}
                          {SOLUTIONS_DATA[activeSolution].previewType === 'console' && (
                            <div className="font-mono text-[9px] flex flex-col gap-1.5 text-white/60">
                              {(SOLUTIONS_DATA[activeSolution].previewData as {type: string, text: string}[]).map((line, i) => {
                                const colors: Record<string, string> = {
                                  success: 'text-green-400',
                                  info: 'text-[#72dbd3]',
                                  process: 'text-yellow-400'
                                };
                                return (
                                  <div key={i} className="flex gap-2 items-start">
                                    <span className="text-white/20 select-none">&gt;</span>
                                    <span className={colors[line.type] || 'text-white'}>{line.text}</span>
                                  </div>
                                );
                              })}
                              <div className="mt-3 flex items-center gap-2 self-start bg-[#D62828]/10 border border-[#D62828]/30 px-3 py-1.5 rounded-lg text-white font-bold cursor-pointer hover:bg-[#D62828]/20 transition-all select-none">
                                <Terminal size={10} />
                                <span>RE-EJECUTAR PROSPECCIÓN</span>
                              </div>
                            </div>
                          )}

                          {/* 3. CALENDAR SIMULATION */}
                          {SOLUTIONS_DATA[activeSolution].previewType === 'calendar' && (
                            <div className="flex flex-col gap-3 text-xs">
                              <div className="grid grid-cols-2 gap-2">
                                {((SOLUTIONS_DATA[activeSolution].previewData as any).slots).map((slot: string, i: number) => (
                                  <div key={i} className="bg-white/5 border border-white/5 p-2 rounded-lg text-center font-mono text-[10px] text-white/70 hover:border-[#D62828] transition-colors cursor-pointer">
                                    {slot}
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-2">
                                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Turnos de Hoy</span>
                                {((SOLUTIONS_DATA[activeSolution].previewData as any).booked).map((item: any, i: number) => (
                                  <div key={i} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-2 rounded-lg text-[10px]">
                                    <div className="flex flex-col">
                                      <span className="text-white font-medium">{item.patient}</span>
                                      <span className="text-white/40 text-[8px] font-mono">{item.time}</span>
                                    </div>
                                    <span className="text-green-400 bg-green-400/10 border border-green-400/20 px-1.5 py-0.5 rounded text-[8px] font-mono">
                                      {item.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 4. RAG SIMULATION */}
                          {SOLUTIONS_DATA[activeSolution].previewType === 'rag' && (
                            <div className="flex flex-col gap-3 text-[10px]">
                              <div className="bg-white/5 border border-white/5 p-2.5 rounded-xl">
                                <span className="text-[7px] font-mono text-[#72dbd3] uppercase block mb-1">Consulta del Cliente</span>
                                <p className="text-white font-medium">{((SOLUTIONS_DATA[activeSolution].previewData as any).query)}</p>
                              </div>
                              
                              <div className="flex items-center gap-2 border-l border-[#D62828] pl-2 py-0.5 text-white/40">
                                <Database size={10} />
                                <span className="text-[8px] font-mono">Búsqueda en {((SOLUTIONS_DATA[activeSolution].previewData as any).knowledgeSource)}</span>
                              </div>

                              <div className="bg-[#D62828]/5 border border-[#D62828]/10 p-2 rounded-lg text-[9px] leading-relaxed text-white/60 italic">
                                &ldquo;{((SOLUTIONS_DATA[activeSolution].previewData as any).retrievedChunks[0])}&rdquo;
                              </div>

                              <div className="bg-[#181818] border border-white/5 p-2.5 rounded-xl">
                                <span className="text-[7px] font-mono text-green-400 uppercase block mb-1">Respuesta Formulada</span>
                                <p className="text-white/80 leading-normal">{((SOLUTIONS_DATA[activeSolution].previewData as any).aiResponse)}</p>
                              </div>
                            </div>
                          )}

                          {/* 5. WORKFLOW SIMULATION */}
                          {SOLUTIONS_DATA[activeSolution].previewType === 'workflow' && (
                            <div className="flex flex-col gap-3 justify-center h-full">
                              {(SOLUTIONS_DATA[activeSolution].previewData as any[]).map((step, i) => (
                                <div key={i} className="flex flex-col items-center">
                                  <div className="flex items-center justify-between w-full bg-white/[0.02] border border-white/5 px-3.5 py-2.5 rounded-xl text-[10px] hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[8px] font-bold">
                                        <Check size={8} />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-white font-bold">{step.name}</span>
                                        <span className="text-white/40 text-[8px] font-mono">{step.desc}</span>
                                      </div>
                                    </div>
                                    <span className="text-white/20 font-mono text-[8px]">{step.type}</span>
                                  </div>
                                  {i < (SOLUTIONS_DATA[activeSolution].previewData as any[]).length - 1 && (
                                    <div className="w-[1px] h-3 bg-gradient-to-b from-green-500 to-transparent my-0.5 animate-pulse" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* 6. WEBSPEED SIMULATION */}
                          {SOLUTIONS_DATA[activeSolution].previewType === 'webSpeed' && (
                            <div className="flex flex-col justify-center h-full items-center gap-6">
                              <div className="grid grid-cols-4 gap-4 w-full">
                                {[
                                  { score: 100, label: "Performance", color: "text-green-400" },
                                  { score: 98, label: "Accessibility", color: "text-green-400" },
                                  { score: 100, label: "Best Practices", color: "text-green-400" },
                                  { score: 100, label: "SEO", color: "text-green-400" }
                                ].map((stat, i) => (
                                  <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full border-2 border-green-500/30 flex items-center justify-center relative shadow-[0_0_15px_rgba(74,222,128,0.1)]">
                                      <span className={`text-[10px] font-bold font-mono ${stat.color}`}>{stat.score}</span>
                                    </div>
                                    <span className="text-white/40 text-[8px] text-center leading-tight font-mono">{stat.label}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="border-t border-white/5 w-full pt-4 text-center">
                                <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest mb-1.5">Tiempo de carga del sitio</div>
                                <div className="text-2xl font-bold font-mono text-[#72dbd3]">0.3s</div>
                                <div className="text-[7px] text-white/20 mt-1">Listo para Google (Core Web Vitals óptimo)</div>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Panel inferior / Key Metric Widget */}
                  <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      {/* Gran métrica */}
                      <div className="bg-[#D62828]/10 border border-[#D62828]/20 px-4 py-2 rounded-2xl flex items-center justify-center text-[#D62828] font-display text-2xl font-black">
                        {SOLUTIONS_DATA[activeSolution].metric}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Indicador Clave</span>
                        <span className="text-white text-xs font-semibold">{SOLUTIONS_DATA[activeSolution].metricLabel}</span>
                      </div>
                    </div>

                    <Link href="/start" className="w-full sm:w-auto px-6 py-3 bg-[#D62828] hover:bg-white text-white hover:text-black font-bold text-[10px] tracking-wider uppercase transition-all duration-300 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(214,40,40,0.15)]">
                      <span>Diseñar este sistema</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>

                </motion.div>
              </AnimatePresence>
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

      {/* TESTIMONIALS SECTION */}
      <section className="w-full bg-[#080808] relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">/ Opiniones de Clientes</p>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Testimonios Reales.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Duplicamos nuestras ventas en el primer mes de lanzar el sitio web con embudo e integraciones de WhatsApp. El proceso fue limpio y rápido.",
                author: "Mateo Gómez",
                role: "Fundador de Toxxic",
                initials: "MG",
                gradient: "from-[#D62828] to-[#990000]"
              },
              {
                quote: "Antes pasábamos el día respondiendo disponibilidades de la finca. Con el bot de reservas, las fechas se agendan solas. Redujimos el trabajo un 80%.",
                author: "Carolina Rojas",
                role: "Administradora de Villa Grande La Misia",
                initials: "CR",
                gradient: "from-[#72dbd3] to-[#00A884]"
              },
              {
                quote: "El empleado de ventas IA atiende y toma pedidos automáticos a la media noche por WhatsApp. No perdemos ni un solo cliente con hambre.",
                author: "Sofía Medina",
                role: "Gerente de Agente IA Comidas Rápidas",
                initials: "SM",
                gradient: "from-white/20 to-white/5"
              }
            ].map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="p-8 bg-[#111] border border-white/5 rounded-3xl flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-all duration-300 shadow-xl"
              >
                <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#D62828]" />
                
                {/* 5 Stars Rating */}
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-sm">★</span>
                  ))}
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
                  &ldquo;{test.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${test.gradient} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                    {test.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{test.author}</span>
                    <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">{test.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
