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
import WhatsAppDemoWidget from '@/components/widgets/WhatsAppDemoWidget';

const SOLUTIONS_DATA_ES = [
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

const SOLUTIONS_DATA_EN = [
  {
    title: "AI Sales Agent",
    tagline: "Star Product",
    icon: MessageSquare,
    desc: "For any business that serves customers via WhatsApp. It operates 24/7, answers questions, quotes, schedules appointments, sends payment links, and automatically scales to humans when needed.",
    benefits: [
      "Serves B2C and B2B clients 24/7 autonomously.",
      "Answers FAQs about your catalog and policies.",
      "Quotes products and services in real time.",
      "Closes sales directly inside the chat.",
      "Schedules appointments by integrating with your calendar.",
      "Sends secure automated payment links.",
      "Escalates to a human in your team when necessary."
    ],
    impact: "Closes sales and captures leads on autopilot",
    metric: "24/7",
    metricLabel: "Sales availability",
    tech: ["WhatsApp API", "n8n", "OpenAI GPT-4", "Supabase"],
    previewType: "chat",
    previewData: [
      { text: "Hi, I'm interested in setting up an automated booking and responses system for my business. Is it very complicated?", isBot: false },
      { text: "Hello! Not at all. We handle all the setup. We train your agent with your services info so it responds 24/7 and books appointments on autopilot.", isBot: true },
      { text: "Great. And how do I know if a customer is really interested?", isBot: false },
      { text: "The agent qualifies the prospect in the chat. If it detects buying intent or schedules an appointment, it sends you the sorted details instantly. You just close the sale! 🚀", isBot: true }
    ]
  },
  {
    title: "AI B2B Prospector",
    icon: Search,
    desc: "The ultimate engine for corporate client acquisition. Search target companies in bulk, extract verified phones and emails, qualify leads, and write and send personalized first contacts.",
    benefits: [
      "Search target companies in your niche in bulk.",
      "Extract verified emails and mobile phones.",
      "Filters and identifies key decision makers.",
      "Writes hyper-personalized messages with AI.",
      "Sends automated sequences for initial contact.",
      "Schedules business meetings directly in your calendar.",
      "Syncs qualified prospects with your CRM."
    ],
    impact: "Generation of business meeting pipeline",
    metric: "+35%",
    metricLabel: "Initial response rate",
    tech: ["n8n", "Apollo.io", "DeepSeek-V3", "SMTP/IMAP Sync"],
    previewType: "console",
    previewData: [
      { type: "info", text: "Starting target company scan..." },
      { type: "success", text: "52 companies found in 'Logistics & Distribution' niche." },
      { type: "info", text: "Extracting verified contacts from operations directors..." },
      { type: "success", text: "38 emails and 14 mobile phones obtained." },
      { type: "process", text: "Generating custom proposals with AI..." },
      { type: "success", text: "38 emails sequenced. Projected delivery rate: 98.4%" }
    ]
  },
  {
    title: "AI Receptionist",
    icon: Calendar,
    desc: "Optimized for medical clinics, dentists, barber shops, and spas. Manages booking of slots, confirms attendance, processes reschedules, and answers FAQs.",
    benefits: [
      "Manages booking and confirmation of slots 24/7.",
      "Automated attendance confirmation via WhatsApp.",
      "Reduces customer no-shows by 90%.",
      "Processes automated reschedules and cancellations.",
      "Sends prior reminders with confirmation links.",
      "Real-time sync with Google Calendar and Cal.com.",
      "Answers common questions about location and hours."
    ],
    impact: "Reduces no-shows by more than 90%",
    metric: "-90%",
    metricLabel: "Reduction in no-shows",
    tech: ["Google Calendar", "n8n", "WhatsApp API", "Cal.com"],
    previewType: "calendar",
    previewData: {
      slots: ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM"],
      booked: [
        { time: "09:00 AM", patient: "Dental Clinic - Evaluation", status: "Confirmed by Bot" },
        { time: "10:30 AM", patient: "Dr. Mendoza - Cleaning", status: "Confirmed by Bot" },
        { time: "02:00 PM", patient: "Specialist - Orthodontics", status: "Pending" }
      ]
    }
  },
  {
    title: "AI Customer Support",
    icon: Bot,
    desc: "Omnichannel systems with vector database knowledge storage (RAG) integrated into Chatwoot and WhatsApp. Instantly solves 85% of recurring support questions.",
    benefits: [
      "First response time reduced to zero seconds.",
      "Solves more than 85% of recurring doubts and questions.",
      "Connected to your knowledge base using RAG technology.",
      "Integrated into Chatwoot for instant human takeover.",
      "Omnichannel support via WhatsApp, Web Chat, and Social.",
      "Coherent and professional answers without hallucinations.",
      "Classifies and assigns incidents automatically."
    ],
    impact: "Response times reduced to zero seconds",
    metric: "0s",
    metricLabel: "Response time",
    tech: ["Chatwoot", "Qdrant Vector DB", "n8n", "OpenAI Assistant"],
    previewType: "rag",
    previewData: {
      query: "What is the warranty for the agents?",
      knowledgeSource: "Autonomek_v2.pdf",
      retrievedChunks: [
        "Section 4.2: All software developments and AI agents come with a 30-day stability warranty..."
      ],
      aiResponse: "Our AI agents come with a 30-day stability warranty after deployment, covering tweaks and calibration."
    }
  },
  {
    title: "Commercial Automation",
    icon: Cpu,
    desc: "Total connection of your commercial stack. Directly syncs web forms, Google Sheets, Gmail inboxes, and your CRM/ERP systems without repetitive copy-pasting tasks.",
    benefits: [
      "Syncs your prospect information instantly.",
      "Eliminates hours of manual copy-pasting in your team.",
      "Connects web forms directly with Sheets and HubSpot/CRM.",
      "Reduces entry errors and commercial oversights to zero.",
      "Sends instant alerts to your salespeople via WhatsApp or Slack.",
      "Fluid and robust orchestration with visual flows in n8n.",
      "Triggers billing or contract sending flows upon signing."
    ],
    impact: "Zero entry errors and massive hours saved",
    metric: "+15h",
    metricLabel: "Saved per week",
    tech: ["n8n Workflows", "Google Sheets API", "ActiveCampaign", "HubSpot CRM"],
    previewType: "workflow",
    previewData: [
      { name: "Initial Webhook", status: "success", type: "trigger", desc: "Web Form submitted" },
      { name: "Format Data AI", status: "success", type: "action", desc: "Lead classification" },
      { name: "Sync CRM", status: "success", type: "action", desc: "HubSpot CRM" },
      { name: "Alert Notification", status: "success", type: "action", desc: "Sales WhatsApp" }
    ]
  },
  {
    title: "Premium Web Dev",
    icon: Globe,
    desc: "We don't just sell a basic page; we build a customer acquisition machine ready for Google (SEO). Includes funnels, AI chat, WhatsApp integration, forms, and CRM.",
    benefits: [
      "Developed in Next.js App Router for instant load.",
      "Semantic SEO optimization to rank high.",
      "Structures and funnels focused on registration and sales.",
      "Interactive AI Chat and floating WhatsApp integrated.",
      "Direct contact forms synchronized to your CRM.",
      "Clean, responsive code with Mobile-First focus.",
      "Perfect 100/100 score in PageSpeed audits."
    ],
    impact: "Appearance in top positions and direct capture",
    metric: "100%",
    metricLabel: "PageSpeed Score",
    tech: ["Next.js (App Router)", "TailwindCSS", "Vercel Edge Network", "Semantic SEO"],
    previewType: "webSpeed",
    previewData: {
      performance: 100,
      accessibility: 98,
      bestPractices: 100,
      seo: 100
    }
  }
];

const LOCALIZED_CONTENT = {
  co: {
    heroTag: "POSICIONAMIENTO EN GOOGLE & AUTOMATIZACIÓN COMERCIAL",
    heroTitle1: "Automatización de Procesos &",
    heroTitle2: "Desarrollo Web para tu Negocio.",
    heroSub: "Posicionamos tu página web en los primeros resultados de Google y convertimos tus visitas en clientes potenciales. Creamos agentes de IA y sistemas de atención 24/7 por WhatsApp para escalar tus ventas.",
    heroCtaPrimary: "Diseñar Mi Agente",
    heroCtaSecondary: "Explorar Soluciones",
    painTitle: "/ Fugas de Dinero Ocultas",
    painSub: "¿Te suena familiar?",
    calcTitle: "/ Calculadora de Retorno",
    calcSub: "Calcula tu ahorro al automatizar",
    calcDesc: "Descubre cuánto dinero y tiempo productivo puede recuperar tu empresa al eliminar tareas repetitivas mediante flujos de información inteligentes.",
    calcEmployees: "Número de Empleados",
    calcSalary: "Salario Promedio Anual (por empleado)",
    calcHours: "Horas semanales en tareas repetitivas",
    calcInvestment: "Inversión estimada única en automatización",
    calcEstSavings: "Ahorro anual estimado",
    calcEstSavingsSub: "En tiempo de trabajo recuperado",
    calcRoi: "ROI Primer Año",
    calcBreakeven: "Punto de Equilibrio",
    calcFiveYear: "Ahorro proyectado a 5 años",
    calcCta: "Reclamar Auditoría de Procesos Gratuita",
    calcDisclaimer: "*Los cálculos son estimaciones basadas en datos promedio. Te ayudamos a realizar un análisis de retorno personalizado sin compromiso.",
    calcCurrency: "COP",
    calcCurrencySymbol: "$",
    calcMinSalary: 12000000,
    calcMaxSalary: 120000000,
    calcStepSalary: 2000000,
    calcMinInvestment: 4000000,
    calcMaxInvestment: 60000000,
    calcStepInvestment: 1000000,
    calcDefaultSalary: 24000000,
    calcDefaultInvestment: 12000000,
    sectorTag: "/ Nichos de Cierre Rápido",
    sectorTitle: "Sectores de Alto Retorno",
    sectorSub: "Implementamos sistemas adaptados a las dinámicas reales de tu industria en Colombia. Si tu negocio recibe un gran volumen de mensajes y gestiona datos de forma manual, esto es para ti.",
    ventajaTag: "/ Ventaja Competitiva",
    ventajaTitle: "Tecnología sin Complicaciones.",
    ventajaSub: "La mayoría de las agencias complican el software. Nosotros estudiamos las dinámicas y cuellos de botella de tu negocio para construir sistemas sumamente intuitivos, veloces y enfocados 100% en retorno comercial.",
    metodologiaTag: "/ Metodología Autonomek",
    metodologiaTitle: "Del Caos al Orden.",
    faqTag: "/ Preguntas Frecuentes",
    faqTitle: "Despeja tus Dudas.",
    testTag: "/ Opiniones de Clientes",
    testTitle: "Testimonios Reales."
  },
  mx: {
    heroTag: "MÁS PROSPECTOS EN AUTOMÁTICO. CERO COMPLICACIONES.",
    heroTitle1: "Agencia de Automatización &",
    heroTitle2: "Desarrollo Web con IA en México.",
    heroSub: "Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes. Creamos empleados de ventas inteligentes que responden, cotizan y agendan citas 24/7 en Ciudad de México y todo el país.",
    heroCtaPrimary: "Diseñar Mi Agente",
    heroCtaSecondary: "Explorar Soluciones",
    painTitle: "/ Fugas de Dinero Ocultas",
    painSub: "¿Te suena familiar?",
    calcTitle: "/ Calculadora de Retorno",
    calcSub: "Calcula tu ahorro al automatizar",
    calcDesc: "Descubre cuánto dinero y tiempo productivo puede recuperar tu empresa al eliminar tareas repetitivas mediante flujos de información inteligentes.",
    calcEmployees: "Número de Empleados",
    calcSalary: "Salario Promedio Anual (por empleado)",
    calcHours: "Horas semanales en tareas repetitivas",
    calcInvestment: "Inversión estimada única en automatización",
    calcEstSavings: "Ahorro anual estimado",
    calcEstSavingsSub: "En tiempo de trabajo recuperado",
    calcRoi: "ROI Primer Año",
    calcBreakeven: "Punto de Equilibrio",
    calcFiveYear: "Ahorro proyectado a 5 años",
    calcCta: "Reclamar Auditoría de Procesos Gratuita",
    calcDisclaimer: "*Los cálculos son estimaciones basadas en datos promedio. Te ayudamos a realizar un análisis de retorno personalizado sin compromiso.",
    calcCurrency: "MXN",
    calcCurrencySymbol: "$",
    calcMinSalary: 80000,
    calcMaxSalary: 800000,
    calcStepSalary: 10000,
    calcMinInvestment: 25000,
    calcMaxInvestment: 400000,
    calcStepInvestment: 5000,
    calcDefaultSalary: 180000,
    calcDefaultInvestment: 80000,
    sectorTag: "/ Nichos de Cierre Rápido",
    sectorTitle: "Sectores de Alto Retorno",
    sectorSub: "Implementamos sistemas adaptados a las dinámicas reales de tu industria en México. Si tu negocio recibe un gran volumen de mensajes y gestiona datos de forma manual, esto es para ti.",
    ventajaTag: "/ Ventaja Competitiva",
    ventajaTitle: "Tecnología sin Complicaciones.",
    ventajaSub: "La mayoría de las agencias complican el software. Nosotros estudiamos las dinámicas y cuellos de botella de tu negocio en México para construir sistemas sumamente intuitivos, veloces y enfocados 100% en retorno comercial.",
    metodologiaTag: "/ Metodología Autonomek",
    metodologiaTitle: "Del Caos al Orden.",
    faqTag: "/ Preguntas Frecuentes",
    faqTitle: "Despeja tus Dudas.",
    testTag: "/ Opiniones de Clientes",
    testTitle: "Testimonios Reales."
  },
  es: {
    heroTag: "MÁS CLIENTES EN AUTOMÁTICO. CERO COMPLICACIONES.",
    heroTitle1: "Agencia de Automatización &",
    heroTitle2: "Desarrollo Web con IA en España.",
    heroSub: "Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes. Creamos empleados de ventas inteligentes que responden, cotizan y agendan citas 24/7 de forma autónoma para pymes españolas.",
    heroCtaPrimary: "Diseñar Mi Agente",
    heroCtaSecondary: "Explorar Soluciones",
    painTitle: "/ Fugas de Dinero Ocultas",
    painSub: "¿Te suena familiar?",
    calcTitle: "/ Calculadora de Retorno",
    calcSub: "Calcula tu ahorro al automatizar",
    calcDesc: "Descubre cuánto dinero y tiempo de trabajo puede recuperar tu empresa al eliminar tareas repetitivas mediante flujos de información inteligentes.",
    calcEmployees: "Número de Empleados",
    calcSalary: "Salario Promedio Anual (por empleado)",
    calcHours: "Horas semanales en tareas repetitivas",
    calcInvestment: "Inversión estimada única en automatización",
    calcEstSavings: "Ahorro anual estimado",
    calcEstSavingsSub: "En tiempo de trabajo recuperado",
    calcRoi: "ROI Primer Año",
    calcBreakeven: "Punto de Equilibrio",
    calcFiveYear: "Ahorro proyectado a 5 años",
    calcCta: "Reclamar Auditoría de Procesos Gratuita",
    calcDisclaimer: "*Los cálculos son estimaciones basadas en datos promedio. Te ayudamos a realizar un análisis de retorno personalizado sin compromiso.",
    calcCurrency: "EUR",
    calcCurrencySymbol: "€",
    calcMinSalary: 15000,
    calcMaxSalary: 120000,
    calcStepSalary: 2000,
    calcMinInvestment: 2000,
    calcMaxInvestment: 35000,
    calcStepInvestment: 1000,
    calcDefaultSalary: 30000,
    calcDefaultInvestment: 8000,
    sectorTag: "/ Nichos de Cierre Rápido",
    sectorTitle: "Sectores de Alto Retorno",
    sectorSub: "Implementamos sistemas adaptados a las dinámicas reales de tu industria en España. Si tu negocio recibe un gran volumen de mensajes y gestiona datos de forma manual, esto es para ti.",
    ventajaTag: "/ Ventaja Competitiva",
    ventajaTitle: "Tecnología sin Complicaciones.",
    ventajaSub: "La mayoría de las agencias complican el software. Nosotros estudiamos las dinámicas y cuellos de botella de tu negocio en España para construir sistemas sumamente intuitivos, veloces y enfocados 100% en retorno comercial.",
    metodologiaTag: "/ Metodología Autonomek",
    metodologiaTitle: "Del Caos al Orden.",
    faqTag: "/ Preguntas Frecuentes",
    faqTitle: "Despeja tus Dudas.",
    testTag: "/ Opiniones de Clientes",
    testTitle: "Testimonios Reales."
  },
  us: {
    heroTag: "MORE CLIENTS AUTOMATICALLY. ZERO HASSLE.",
    heroTitle1: "AI Automation & Web",
    heroTitle2: "Development Agency.",
    heroSub: "We turn your WhatsApp flow, social networks, and web into a customer acquisition engine. We build intelligent sales agents that respond, quote, and book appointments 24/7 autonomously.",
    heroCtaPrimary: "Design My Agent",
    heroCtaSecondary: "Explore Solutions",
    painTitle: "/ Hidden Money Leaks",
    painSub: "Does this sound familiar?",
    calcTitle: "/ Return Calculator",
    calcSub: "Calculate your savings from automation",
    calcDesc: "Discover how much money and productive time your business can recover by eliminating repetitive tasks through smart information flows.",
    calcEmployees: "Number of Employees",
    calcSalary: "Average Annual Salary (per employee)",
    calcHours: "Weekly hours on repetitive tasks",
    calcInvestment: "One-time estimated investment in automation",
    calcEstSavings: "Estimated Annual Savings",
    calcEstSavingsSub: "In work time recovered",
    calcRoi: "First Year ROI",
    calcBreakeven: "Breakeven Point",
    calcFiveYear: "5-Year Projected Savings",
    calcCta: "Claim Free Process Audit",
    calcDisclaimer: "*Calculations are estimates based on average efficiency data. We help you perform a personalized return analysis without any commitment.",
    calcCurrency: "USD",
    calcCurrencySymbol: "$",
    calcMinSalary: 30000,
    calcMaxSalary: 250000,
    calcStepSalary: 5000,
    calcMinInvestment: 2000,
    calcMaxInvestment: 50000,
    calcStepInvestment: 1000,
    calcDefaultSalary: 65000,
    calcDefaultInvestment: 10000,
    sectorTag: "/ Fast-Closing Niches",
    sectorTitle: "High-Return Sectors",
    sectorSub: "We implement systems tailored to the actual dynamics of your industry in the US. If your business handles a large volume of messages and manages data manually, this is for you.",
    ventajaTag: "/ Competitive Advantage",
    ventajaTitle: "Technology Without Complications.",
    ventajaSub: "Most agencies overcomplicate software. We study your business dynamics and bottlenecks to build extremely intuitive, fast, and 100% commercial return-focused systems.",
    metodologiaTag: "/ Autonomek Methodology",
    metodologiaTitle: "From Chaos to Order.",
    faqTag: "/ FAQ",
    faqTitle: "Clear Your Doubts.",
    testTag: "/ Client Feedback",
    testTitle: "Real Testimonials."
  }
};

const painPointsEs = [
  {
    title: "Mensajes sin Responder",
    desc: "Clientes que escriben en la noche, fines de semana o durante picos de trabajo y no reciben respuesta. Se van directo a tu competencia en menos de 5 minutos."
  },
  {
    title: "Horas de Trabajo Manual",
    desc: "Tu equipo pasa el día agendando citas, enviando recordatorios, persiguiendo links de pago y facturando en vez de enfocarse en las actividades comerciales que sí traen dinero."
  },
  {
    title: "Pérdida de Prospectos",
    desc: "Citas que se olvidan confirmar, cotizaciones sin seguimiento proactivo y prospectos B2B que se enfrían porque nadie les dio atención inmediata y personalizada."
  }
];

const painPointsEn = [
  {
    title: "Unanswered Messages",
    desc: "Customers writing at night, weekends, or during peak hours without response. They leave for your competitors in less than 5 minutes."
  },
  {
    title: "Hours of Manual Labor",
    desc: "Your team spends the day booking appointments, sending reminders, chasing payment links, and billing instead of focusing on commercial activities that generate revenue."
  },
  {
    title: "Lost Prospects",
    desc: "Appointments forgotten to confirm, quotes with no proactive follow-up, and B2B leads that cool down because no one gave them immediate attention."
  }
];

const sectorsEs = [
  {
    title: "Clínicas & Odontólogos",
    desc: "El agente responde dudas sobre tratamientos y precios, agenda citas automáticamente y envía recordatorios reduciendo el ausentismo en un 90%.",
    impact: "+90% Asistencia a Consultas"
  },
  {
    title: "Inmobiliarias & Constructoras",
    desc: "Calificación de leads en segundos, filtrado por presupuesto, envío de fichas técnicas de inmuebles y agendamiento de visitas físicas a los proyectos.",
    impact: "+35% Visitas Físicas Agendadas"
  },
  {
    title: "Talleres Automotrices",
    desc: "Asistentes de IA que reservan turnos de mantenimiento, notifican a clientes sobre el estado del vehículo y permiten envíos directos de cotizaciones y facturas.",
    impact: "Operaciones de agendamiento 100% automatizadas"
  },
  {
    title: "Hoteles & Academias",
    desc: "Respuestas de tarifas de habitaciones o matrículas de cursos, reservas y cobro de inscripciones/estadías de forma directa desde WhatsApp.",
    impact: "Captación 24/7 sin dependencias"
  },
  {
    title: "Tiendas E-commerce",
    desc: "Resolución de dudas sobre envíos y stock de productos en segundos, y disparadores automatizados para recuperar compras o carritos abandonados.",
    impact: "+22% Ventas Recuperadas"
  },
  {
    title: "Logística & Distribuidores",
    desc: "Consulta de estado de envíos, cotización de fletes al mayoreo para distribuidores industriales, y carga automática de órdenes a sistemas ERP.",
    impact: "Cero demoras en consultas de rastreo"
  }
];

const sectorsEn = [
  {
    title: "Clinics & Dentists",
    desc: "The agent answers questions about treatments and pricing, books appointments automatically, and sends reminders, reducing no-shows by 90%.",
    impact: "+90% Appointment Attendance"
  },
  {
    title: "Real Estate & Developers",
    desc: "Qualify leads in seconds, filter by budget, send property spec sheets, and schedule physical visits to development projects.",
    impact: "+35% Scheduled Property Visits"
  },
  {
    title: "Auto Repair Shops",
    desc: "AI assistants that book maintenance slots, notify customers of vehicle repair status, and allow direct delivery of quotes and invoices.",
    impact: "100% Automated Scheduling Operations"
  },
  {
    title: "Hotels & Academies",
    desc: "Instantly respond to room rates or course enrollments, process bookings, and handle registration/stay payments directly from WhatsApp.",
    impact: "24/7 Acquisition with No Overhead"
  },
  {
    title: "E-commerce Stores",
    desc: "Resolve questions about shipping and product stock in seconds, and trigger automated flows to recover abandoned carts and sales.",
    impact: "+22% Recovered Sales"
  },
  {
    title: "Logistics & Distributors",
    desc: "Check shipment tracking status, quote wholesale freight shipping for industrial distributors, and auto-load orders into ERP systems.",
    impact: "Zero Delays in Tracking Queries"
  }
];

const diffsEs = [
  { title: "Desarrollo Ágil & IA", desc: "Utilizamos inteligencia artificial para optimizar nuestros propios procesos internos, lo que nos permite entregar sistemas de alta calidad en tiempo récord." },
  { title: "Infraestructura Escalable", desc: "Alojamos tus agentes y webs en servidores en la nube de alta disponibilidad. Tu sistema seguirá operando sin caídas a medida que crezca tu volumen de clientes." },
  { title: "Seguridad y Privacidad", desc: "Diseñamos con protocolos robustos. Los datos de tus clientes y de tu empresa se mantienen cifrados y fuera de peligro." },
  { title: "Soporte e Iteración Mensual", desc: "Monitoreamos la estabilidad 24/7. Ajustamos el tono de los agentes y actualizamos el SEO para asegurar que tu máquina de ventas no se detenga." }
];

const diffsEn = [
  { title: "Agile Dev & AI", desc: "We use artificial intelligence to optimize our own internal workflows, enabling us to deliver top-tier systems in record time." },
  { title: "Scalable Infrastructure", desc: "We host your agents and web apps on high-availability cloud servers. Your system stays active as your customer volume scales." },
  { title: "Security & Privacy", desc: "We design with robust protocols. Your customers' data and company records remain encrypted and completely secure." },
  { title: "Monthly Support & Iteration", desc: "We monitor stability 24/7. We tweak agent tone and update SEO to ensure your sales machine never stops." }
];

const methodologyEs = [
  { step: "01", title: "Diagnóstico", desc: "Analizamos tu proceso comercial actual sin costo para detectar cuellos de botella." },
  { step: "02", title: "Propuesta", desc: "Te entregamos un alcance cerrado, costos claros y retorno estimado de inversión." },
  { step: "03", title: "Desarrollo", desc: "Diseñamos tus webs de alto rendimiento e integramos tus asistentes en piloto automático." },
  { step: "04", title: "Optimización", desc: "Monitoreamos la estabilidad 24/7 y mejoramos el entrenamiento de los agentes mensualmente." }
];

const methodologyEn = [
  { step: "01", title: "Discovery", desc: "We analyze your current sales pipeline free of charge to pinpoint bottlenecks." },
  { step: "02", title: "Proposal", desc: "We deliver a fixed scope, clear pricing, and estimated return on investment." },
  { step: "03", title: "Development", desc: "We engineer your high-performance web pages and deploy your agents on autopilot." },
  { step: "04", title: "Optimization", desc: "We monitor stability 24/7 and refine agent training on a monthly basis." }
];

const testimonialsEs = [
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
];

const testimonialsEn = [
  {
    quote: "We doubled our sales in the first month after launching the web page with funnels and WhatsApp integration. Clean and fast process.",
    author: "Mateo Gómez",
    role: "Founder of Toxxic",
    initials: "MG",
    gradient: "from-[#D62828] to-[#990000]"
  },
  {
    quote: "We used to spend the whole day responding about villa availability. With the booking bot, dates are booked on their own. Reduced work by 80%.",
    author: "Carolina Rojas",
    role: "Manager of Villa Grande La Misia",
    initials: "CR",
    gradient: "from-[#72dbd3] to-[#00A884]"
  },
  {
    quote: "The AI sales employee takes orders automatically at midnight via WhatsApp. We don't lose a single hungry customer.",
    author: "Sofía Medina",
    role: "Manager of Fast Food AI Agent",
    initials: "SM",
    gradient: "from-white/20 to-white/5"
  }
];

const faqEs = [
  { q: "¿Cuánto tarda en implementarse un Empleado de Ventas IA?", a: "Dependiendo de la complejidad y los canales de mensajería, un Agente de IA funcional y calificado puede estar listo en un plazo de 2 a 4 semanas." },
  { q: "¿Tengo que saber programar o administrar servidores?", a: "Para nada. Nosotros nos encargamos de todo el hosting, las conexiones API y el mantenimiento técnico. Te entregamos un sistema llave en mano listo para operar." },
  { q: "¿Cómo se entrenan los agentes conversacionales?", a: "Los alimentamos directamente con la información oficial de tus servicios, catálogos, políticas de entrega y preguntas frecuentes para asegurar respuestas 100% correctas." },
  { q: "¿Qué pasa si mis herramientas actuales no son modernas?", a: "Nuestros orquestadores de software (n8n) nos permiten conectar sistemas antiguos, hojas de cálculo de Excel e incluso correos electrónicos con agentes modernos de IA de forma transparente." }
];

const faqEn = [
  { q: "How long does it take to deploy an AI Sales Agent?", a: "Depending on complexity and messaging channels, a fully functional and qualified AI Agent can be ready in 2 to 4 weeks." },
  { q: "Do I need to know how to code or manage servers?", a: "Not at all. We handle all hosting, API connections, and technical maintenance. We deliver a turnkey system ready to operate." },
  { q: "How are the conversational agents trained?", a: "We train them directly with your official services info, catalogs, delivery policies, and FAQs to guarantee 100% accurate responses." },
  { q: "What if my current tools are outdated?", a: "Our workflow orchestrators (n8n) allow us to connect legacy systems, Excel spreadsheets, and email accounts with modern AI agents seamlessly." }
];

const stackListEs = [
  { title: "Carga Ultra Rápida (Next.js & Supabase)", desc: "Páginas cargadas de forma instantánea preparadas para retener visitas y posicionar directamente en Google (SEO local y nacional)." },
  { title: "Modelos de Lenguaje Avanzados (LLM)", desc: "Agentes conversacionales capaces de entender texto, voz, audio e imágenes, operando bajo flujos lógicos controlados sin alucinaciones." },
  { title: "Orquestadores de Integraciones (n8n)", desc: "Conexión directa entre bases de datos, CRMs, APIs de mensajería (WhatsApp Cloud API) y paneles de control en la nube." }
];

const stackListEn = [
  { title: "Ultra Fast Load (Next.js & Supabase)", desc: "Instantly loaded pages optimized to retain visits and rank directly on Google (local and national SEO)." },
  { title: "Advanced Language Models (LLM)", desc: "Conversational agents capable of understanding text, voice, audio, and images, operating under controlled logic flows without hallucinations." },
  { title: "Integration Orchestrators (n8n)", desc: "Direct connection between databases, CRMs, messaging APIs (WhatsApp Cloud API), and cloud control panels." }
];

const formatCurrency = (num: number, symbol = "$", region = "co") => {
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, region === 'us' ? "," : ".");
  if (region === 'es') {
    return `${formatted} ${symbol}`;
  }
  return `${symbol}${formatted}`;
};
export default function Home({ region = 'co' }: { region?: 'co' | 'mx' | 'es' | 'us' }) {
  const content = LOCALIZED_CONTENT[region];
  const SOLUTIONS_DATA = region === 'us' ? SOLUTIONS_DATA_EN : SOLUTIONS_DATA_ES;
  const isEn = region === 'us';
  const painPoints = isEn ? painPointsEn : painPointsEs;
  const sectors = isEn ? sectorsEn : sectorsEs;
  const diffs = isEn ? diffsEn : diffsEs;
  const methodology = isEn ? methodologyEn : methodologyEs;
  const testimonials = isEn ? testimonialsEn : testimonialsEs;
  const faq = isEn ? faqEn : faqEs;

  const solTag = isEn ? "/ Turnkey Solutions" : "/ Soluciones Llave en Mano";
  const solTitleMain = isEn ? "Systems & " : "Sistemas y ";
  const solTitleAccent = isEn ? "AI Agents" : "Agentes IA";
  const solSubText = isEn ? "We deploy software infrastructure engineered to sell, automate internal workflows, and constantly acquire customers." : "Desplegamos infraestructura de software diseñada para vender, automatizar procesos internos y captar clientes de forma constante.";
  const solutionsImpact = isEn ? "Commercial Impact" : "Impacto Comercial";
  const solutionsEngineering = isEn ? "Engineering & Stack" : "Ingeniería & Stack";
  const solutionsCta = isEn ? "Design this system" : "Diseñar este sistema";

  const philosophyTag = isEn ? "Our Philosophy" : "Nuestra Filosofía";
  const philosophyTitleMain = isEn ? "We don't sell code or templates." : "No vendemos código ni plantillas.";
  const philosophyTitleAccent = isEn ? "We build integrated systems of acquisition and efficiency." : "Construimos sistemas integrados de adquisición y eficiencia.";
  const philosophyDesc = isEn 
    ? "We adapt to the exact needs of your business. If your sales team is saturated, your prospects cool down, or your employees spend hours on repetitive manual tasks, we design the solution tailored to your current processes."
    : "Nos acoplamos a las necesidades exactas de tu negocio. Si tu equipo de ventas está saturado, tus prospectos se enfrían o tus empleados pasan horas en tareas manuales repetitivas, diseñamos la solución a la medida de tus procesos actuales.";
  const philosophyCta = isEn ? "[ SEE ALL SOLUTIONS ]" : "[ VER TODAS LAS SOLUCIONES ]";

  const stackList = isEn ? stackListEn : stackListEs;
  const stackTag = isEn ? "Tech Stack" : "Stack Tecnológico";
  const stackTitleMain = isEn ? "Robust Engineering" : "Infraestructura de";
  const stackTitleAccent = isEn ? "Infrastructure." : "Ingeniería Robusta.";

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
  const [averageSalary, setAverageSalary] = useState(content.calcDefaultSalary);
  const [hoursWasted, setHoursWasted] = useState(8);
  const [investment, setInvestment] = useState(content.calcDefaultInvestment);

  // Reset values when region changes
  useEffect(() => {
    setAverageSalary(content.calcDefaultSalary);
    setInvestment(content.calcDefaultInvestment);
  }, [region, content]);

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
  const [activeSector, setActiveSector] = useState(0);

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
      <div 
        className="hidden md:block absolute top-[10%] md:top-[20%] left-[-10%] w-[120vw] h-[60vh] overflow-hidden pointer-events-none z-[1] opacity-20 select-none rotate-[-6deg]"
        style={{ contain: 'layout paint' }}
      >
        <div className="flex whitespace-nowrap items-center h-full marquee-text-bg">
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
        </div>
      </div>

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
                {content.heroTag}
              </p>
            </motion.div>
            
            <h1 className="font-display text-[clamp(2.2rem,5vw,5rem)] leading-[1.05] font-black tracking-tighter text-white drop-shadow-2xl uppercase relative">
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#D62828]/15 blur-[100px] -z-10 animate-pulse-slow"></div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {content.heroTitle1}
              </motion.div>
              <motion.div 
                className="mt-2 lg:mt-0 relative overflow-hidden inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D62828] to-white bg-[length:200%_auto] animate-shimmer">
                  {content.heroTitle2}
                </span>
              </motion.div>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 text-white/50 font-sans max-w-xl text-base md:text-lg font-light leading-relaxed"
            >
              {content.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto"
            >
              <Link href="/start" className="w-full sm:w-auto px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[#080808] transition-all text-center magnetic-area shadow-[0_0_20px_rgba(214,40,40,0.3)] rounded-xl">
                {content.heroCtaPrimary}
              </Link>
              <Link href="/servicios" className="group w-full sm:w-auto px-8 py-4 text-white font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-4 hover:opacity-80 transition-all magnetic-area">
                {content.heroCtaSecondary}
                <span className="w-8 h-[1px] bg-[#D62828] group-hover:w-12 transition-all"></span>
              </Link>
            </motion.div>
          </div>

          {/* Right: WhatsApp-Style Chat Simulator (Only visible on Desktop/Tablet md+) */}
          <div className="lg:col-span-5 w-full hidden md:flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full flex justify-center"
            >
              <WhatsAppDemoWidget />
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* PAIN POINTS SECTION */}
      <section className="w-full bg-[#111111] relative z-10 py-20 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">{content.painTitle}</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white">{content.painSub}</h2>
            <div className="w-16 h-[2px] bg-[#72dbd3] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((item, idx) => {
              const Icon = idx === 0 ? ShieldAlert : idx === 1 ? Clock : Coins;
              const jsonPath = idx === 0 ? "/SVG/MCP.json" : idx === 1 ? "/SVG/Desarrollo web.json" : "/SVG/Base de datos.json";
              return (
                <div key={idx} className="group p-8 bg-[#080808] border border-white/5 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-[#D62828]/30 hover:shadow-[0_10px_30px_-10px_rgba(214,40,40,0.15)] hover:-translate-y-1 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-[#D62828]/10 flex items-center justify-center text-[#D62828] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D62828]/20 relative z-10">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-white font-bold text-xl uppercase tracking-tight transition-all duration-300 relative z-10">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed transition-all duration-300 group-hover:text-white/60 relative z-10">
                    {item.desc}
                  </p>
                  <LottieBgIcon path={jsonPath} />
                </div>
              );
            })}
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
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">{solTag}</p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
                {solTitleMain}<span className="text-[#D62828]">{solTitleAccent}</span>
              </h2>
            </div>
            <p className="font-sans text-sm text-white/50 max-w-sm mt-4 lg:mt-0 leading-relaxed">
              {solSubText}
            </p>
          </div>

          {/* Bento Grid Principal (6 Soluciones de Alto Nivel) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {SOLUTIONS_DATA.map((sol, idx) => {
              const Icon = sol.icon;
              const isLarge = idx === 0 || idx === 1; // Las dos primeras ocupan 6 columnas
              const colSpan = isLarge ? "md:col-span-6" : "md:col-span-6 lg:col-span-3";

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative ${colSpan} bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#080808] border border-white/10 hover:border-[#D62828]/50 rounded-3xl p-7 md:p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_rgba(214,40,40,0.15)] hover:-translate-y-1.5 overflow-hidden`}
                >
                  {/* Neon Line Highlight Top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D62828] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-[#D62828]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top Bar inside Card */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:text-[#D62828] group-hover:bg-[#D62828]/10 group-hover:border-[#D62828]/30 transition-all duration-300 shadow-inner">
                          <Icon size={22} />
                        </div>
                        {sol.tagline && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest bg-[#D62828]/15 text-[#D62828] border border-[#D62828]/30 uppercase shadow-[0_0_15px_rgba(214,40,40,0.2)]">
                            <Sparkles size={10} /> {sol.tagline}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-white/20 font-bold tracking-widest group-hover:text-[#72dbd3] transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight group-hover:text-[#72dbd3] transition-colors duration-300 mb-3">
                      {sol.title}
                    </h3>
                    
                    <p className="text-white/50 text-xs md:text-sm font-sans font-light leading-relaxed mb-6">
                      {sol.desc}
                    </p>

                    {/* Key Benefits List */}
                    <div className="space-y-2 border-t border-white/5 pt-4 mb-6">
                      {sol.benefits.slice(0, isLarge ? 4 : 2).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-white/70 text-xs font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] mt-1.5 shrink-0 shadow-[0_0_8px_#D62828]" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Metric & Tech Stack */}
                  <div className="border-t border-white/5 pt-5 mt-2 flex flex-col gap-4">
                    {/* Metric Highlight */}
                    <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 group-hover:border-white/10 px-4 py-3 rounded-2xl transition-all">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-[#72dbd3] uppercase tracking-widest font-bold">
                          {isEn ? "Impact Metric" : "Métrica de Impacto"}
                        </span>
                        <span className="text-white text-xs font-semibold mt-0.5">
                          {sol.metricLabel}
                        </span>
                      </div>
                      <span className="font-display text-xl font-black text-[#D62828] tracking-tight">
                        {sol.metric}
                      </span>
                    </div>

                    {/* Stack Badges & CTA Link */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {sol.tech.slice(0, isLarge ? 4 : 2).map((t, tIdx) => (
                          <span key={tIdx} className="text-[9px] font-mono bg-white/5 text-white/40 px-2 py-0.5 rounded border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>

                      <Link 
                        href={isEn ? "/us/start" : "/start"}
                        className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#D62828] text-white/60 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0"
                        title={solutionsCta}
                      >
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              );
            })}

          </div>

          {/* Banner inferior de conversión */}
          <div className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#140505] via-[#0D0D0D] to-[#080808] border border-[#D62828]/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_rgba(214,40,40,0.1)]">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#D62828]/10 border border-[#D62828]/30 flex items-center justify-center text-[#D62828] shrink-0">
                <Bot size={32} />
              </div>
              <div>
                <h4 className="font-display text-xl md:text-2xl font-black uppercase text-white">
                  {isEn ? "Need a tailored architecture for your workflow?" : "¿Necesitas una arquitectura a la medida de tu proceso?"}
                </h4>
                <p className="text-white/40 text-xs md:text-sm font-light mt-1">
                  {isEn ? "We audit your commercial operations free of charge and estimate your ROI." : "Auditamos tu operación comercial sin costo y proyectamos tu retorno de inversión."}
                </p>
              </div>
            </div>

            <Link
              href={isEn ? "/us/start" : "/start"}
              className="px-8 py-4 bg-[#D62828] hover:bg-white text-white hover:text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-2xl shrink-0 shadow-[0_0_25px_rgba(214,40,40,0.3)] flex items-center gap-3"
            >
              <span>{isEn ? "REQUEST TAILORED BLUEPRINT" : "SOLICITAR BLUEPRINT A MEDIDA"}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* HIGH-RETURN SECTORS SECTION — FULL HERO SHOWCASE BANNER (NO CARDS / NO GRID) */}
      <section className="w-full bg-[#030303] relative z-10 py-28 md:py-40 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        {/* Glows de alta intensidad de fondo tipo escenario */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#D62828]/10 blur-[180px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#72dbd3]/5 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header de la sección */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[2px] bg-[#D62828]" />
                <p className="font-mono text-[#72dbd3] text-xs tracking-[0.3em] uppercase font-bold">
                  {content.sectorTag}
                </p>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
                {content.sectorTitle}
              </h2>
            </div>

            <p className="text-white/40 text-sm max-w-md font-sans font-light leading-relaxed">
              {content.sectorSub}
            </p>
          </div>

          {/* FULL HERO BANNER CONTENEDOR TIPO ESCENARIO */}
          <div className="relative w-full border-y border-white/10 py-10 md:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Columna Izquierda: Información del Nicho Activo */}
                <div className="lg:col-span-8 flex flex-col items-start text-left">
                  
                  {/* Badge del Sector & Número */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs text-[#D62828] font-bold tracking-widest bg-[#D62828]/10 border border-[#D62828]/30 px-3 py-1 rounded-lg">
                      0{activeSector + 1} / 0{sectors.length}
                    </span>
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
                      {isEn ? "Specialized Industry Solution" : "Solución Especializada por Industria"}
                    </span>
                  </div>

                  {/* Título del Nicho */}
                  <h3 className="font-display text-2xl md:text-4xl font-black uppercase text-white tracking-tight leading-tight mb-4">
                    {sectors[activeSector].title}
                  </h3>

                  {/* Descripción Inmersiva */}
                  <p className="text-white/70 font-sans text-sm md:text-lg font-light leading-relaxed max-w-2xl mb-8">
                    {sectors[activeSector].desc}
                  </p>

                  {/* Botón CTA del Hero */}
                  <Link
                    href={isEn ? "/us/start" : "/start"}
                    className="px-8 py-4 bg-[#D62828] hover:bg-white text-white hover:text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-xl shadow-[0_0_25px_rgba(214,40,40,0.3)] flex items-center gap-3 group/btn"
                  >
                    <span>{isEn ? "DEPLOY SYSTEM FOR THIS SECTOR" : "DESPLEGAR SISTEMA PARA ESTE SECTOR"}</span>
                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>

                </div>

                {/* Columna Derecha: Métrica Gigante Highlight */}
                <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                  <div className="bg-gradient-to-br from-[#180808] to-[#0A0A0A] border border-[#D62828]/30 p-8 md:p-10 rounded-3xl w-full max-w-sm flex flex-col gap-4 shadow-[0_0_50px_rgba(214,40,40,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D62828]/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <span className="text-[10px] font-mono text-[#72dbd3] uppercase tracking-widest font-bold">
                      {isEn ? "Guaranteed Impact Metric" : "Métrica de Impacto Garantizada"}
                    </span>

                    <span className="font-display text-3xl md:text-4xl font-black text-white leading-tight">
                      {sectors[activeSector].impact}
                    </span>

                    <div className="flex items-center gap-2 border-t border-white/10 pt-4 mt-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/50 text-xs font-mono">
                        {isEn ? "Tested in active operations" : "Validado en operaciones reales"}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* BARRA DE BOTONES DE SECTORES ABAJO (TIPO TICKER DE NAVEGACIÓN EN VIVO) */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
              {sectors.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSector(idx)}
                  className={`px-5 py-3 rounded-2xl text-xs font-mono font-bold uppercase transition-all duration-300 whitespace-nowrap border flex items-center gap-3 ${
                    activeSector === idx
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-white/5 text-white/40 border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeSector === idx ? 'bg-[#D62828]' : 'bg-white/20'}`} />
                  <span>{sec.title}</span>
                </button>
              ))}
            </div>

            {/* Controles Flecha Anterior / Siguiente */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSector(prev => (prev === 0 ? sectors.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-[#D62828] border border-white/10 text-white flex items-center justify-center transition-all duration-300"
                title="Anterior"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <button
                onClick={() => setActiveSector(prev => (prev === sectors.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-[#D62828] border border-white/10 text-white flex items-center justify-center transition-all duration-300"
                title="Siguiente"
              >
                <ArrowRight size={20} />
              </button>
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
            {philosophyTag}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.2] font-semibold tracking-tight text-white"
          >
            {philosophyTitleMain} <br/>
            <span className="text-white/40 italic font-light">{philosophyTitleAccent}</span> 
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-white/70 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            {philosophyDesc}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Link href="/servicios" className="group mt-16 inline-flex items-center gap-4 font-mono uppercase tracking-widest text-sm text-[#D62828] hover:text-white transition-colors magnetic-area">
              {philosophyCta}
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
              <span className="w-8 h-[1px] bg-[#72dbd3]"></span> {stackTag}
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black tracking-tight text-white mb-8"
            >
              {stackTitleMain} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D62828]">{stackTitleAccent}</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {stackList.map((item, idx) => (
                <div key={idx} className="border-l border-[#D62828]/30 pl-6 group hover:border-[#D62828] transition-colors">
                  <h3 className="font-sans font-bold text-white text-xl mb-2 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#D62828]">0{idx + 1}</span> {item.title}
                  </h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
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
            <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-4">{content.calcTitle}</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white mb-6">
              {content.calcSub}
            </h2>
            <p className="text-white/50 font-sans text-base leading-relaxed mb-8 max-w-xl">
              {content.calcDesc}
            </p>

            {/* Form Sliders */}
            <div className="space-y-6 max-w-lg">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">{content.calcEmployees}</span>
                  <span className="text-white font-bold">{employees} {region === 'us' ? 'people' : 'personas'}</span>
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
                  <span className="text-white/60">{content.calcSalary}</span>
                  <span className="text-white font-bold">{formatCurrency(averageSalary, content.calcCurrencySymbol, region)}</span>
                </div>
                <input 
                  type="range" 
                  min={content.calcMinSalary} 
                  max={content.calcMaxSalary} 
                  step={content.calcStepSalary}
                  value={averageSalary} 
                  onChange={(e) => setAverageSalary(Number(e.target.value))}
                  aria-label="Salario Promedio Anual"
                  className="w-full accent-[#D62828] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">{content.calcHours}</span>
                  <span className="text-white font-bold">{hoursWasted} {region === 'us' ? 'hours' : 'horas'}</span>
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
                  <span className="text-white/60">{content.calcInvestment}</span>
                  <span className="text-white font-bold">{formatCurrency(investment, content.calcCurrencySymbol, region)}</span>
                </div>
                <input 
                  type="range" 
                  min={content.calcMinInvestment} 
                  max={content.calcMaxInvestment} 
                  step={content.calcStepInvestment}
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
              <span className="text-xs font-mono text-white/40 block mb-2 uppercase">{content.calcEstSavings}</span>
              <span className="text-4xl md:text-5xl font-display font-black text-[#D62828]">{formatCurrency(annualSavings, content.calcCurrencySymbol, region)}</span>
              <span className="text-xs text-white/30 block mt-2">{content.calcEstSavingsSub}</span>
            </div>

            <div className="grid grid-cols-2 gap-6 border-b border-white/5 pb-6">
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">{content.calcRoi}</span>
                <span className="text-2xl font-bold text-white">+{roi}%</span>
              </div>
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">{content.calcBreakeven}</span>
                <span className="text-2xl font-bold text-white">{breakeven} {region === 'us' ? 'months' : 'meses'}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-white/40 block mb-2">{content.calcFiveYear}</span>
              <span className="text-2xl md:text-3xl font-display font-bold text-white">{formatCurrency(fiveYearSavings, content.calcCurrencySymbol, region)}</span>
            </div>

            <Link href="/start" className="mt-4 w-full py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase text-center hover:bg-white hover:text-black transition-all rounded-xl shadow-lg shadow-[#D62828]/10">
              {content.calcCta}
            </Link>
            
            <p className="text-[10px] text-white/20 text-center leading-relaxed">
              {content.calcDisclaimer}
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
              <p className="font-mono text-[#72dbd3] text-xs tracking-[0.2em] uppercase mb-6">{content.ventajaTag}</p>
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
                {content.ventajaTitle}
              </h2>
              <p className="text-white/50 font-light leading-relaxed mb-10 text-sm">
                {content.ventajaSub}
              </p>
              <div className="flex items-center gap-4">
                 <div className="text-white font-display text-5xl font-black">99%</div>
                 <div className="text-white/30 font-mono text-[10px] uppercase tracking-widest leading-tight">{isEn ? "Stability & \n Efficiency" : "Estabilidad & \n Eficiencia"}</div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               {diffs.map((item, i) => (
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
