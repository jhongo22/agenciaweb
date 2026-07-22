'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Search, Calendar, MessageSquare, Zap, Globe, Sparkles, CheckCircle } from 'lucide-react';

const SERVICES_ES = [
  {
    id: "01",
    title: "Empleado de Ventas IA",
    desc: " WhatsApp con atención continua 24/7. Responde preguntas recurrentes, cotiza servicios, cierra ventas, agenda citas directamente y envía enlaces de pago. Escala a un humano de inmediato si es necesario.",
    client: "Clínicas, Inmobiliarias, Concesionarios, Tiendas, Academias, Constructoras.",
    icon: <Bot className="text-[#D62828]" size={36} />,
    tags: ["WhatsApp Business API", "Cierre de Ventas", "Atención 24/7"],
    star: true
  },
  {
    id: "02",
    title: "Prospector IA (B2B)",
    desc: "Tu motor de generación de oportunidades automatizado. Scrapea y busca empresas objetivo, extrae correos y teléfonos verificados, califica el interés inicial del prospecto y agenda reuniones automáticas en tu calendario.",
    client: "Empresas de servicios, consultoras, software, distribuidores y cualquier negocio B2B.",
    icon: <Search className="text-[#72dbd3]" size={36} />,
    tags: ["Outreach Inteligente", "Búsqueda de Leads", "Agenda Automática"],
    star: false
  },
  {
    id: "03",
    title: "Recepcionista IA",
    desc: "Asistente digital enfocado en la reserva y gestión de citas. Agenda nuevos turnos en tiempo real, procesa cancelaciones y reagendamientos, y envía recordatorios para minimizar inasistencias.",
    client: "Dentistas, médicos, veterinarias, spas, barberías, consultorios y abogados.",
    icon: <Calendar className="text-[#00CC66]" size={36} />,
    tags: ["Reserva de Turnos", "Recordatorio WhatsApp", "Cero Inasistencias"],
    star: false
  },
  {
    id: "04",
    title: "Agente de Servicio al Cliente",
    desc: "Sistema de atención al cliente omnicanal. Integra WhatsApp con base de conocimientos vectorizada (RAG) y Chatwoot. Reduce drásticamente los tiempos de espera al responder instantáneamente el 85% de las dudas de soporte.",
    client: "Empresas con alto volumen de consultas, e-commerce, logística y servicios posventa.",
    icon: <MessageSquare className="text-white" size={36} />,
    tags: ["Base Conocimiento (RAG)", "Chatwoot Sync", "WhatsApp Omnicanal"],
    star: false
  },
  {
    id: "05",
    title: "Automatización Comercial",
    desc: "Eliminamos las tareas manuales repetitivas conectando tu stack comercial. Sincroniza de manera automática formularios web, hojas de cálculo de Excel/Google Sheets, Gmail, CRMs (HubSpot, Salesforce) y ERPs.",
    client: "Empresas que gastan horas copiando datos de clientes y gestionando facturación manual.",
    icon: <Zap className="text-[#D62828]" size={36} />,
    tags: ["Integración API", "Sincronización Sheets", "Automatización CRM"],
    star: false
  },
  {
    id: "06",
    title: "Desarrollo Web Premium",
    desc: "No diseñamos páginas informativas genéricas; construimos una máquina de atracción de clientes. Sitios ultrarrápidos listos para Google (SEO) con embudo integrado, chat IA y WhatsApp directo.",
    client: "Empresas que quieren aparecer en los primeros puestos de búsqueda y convertir visitas.",
    icon: <Globe className="text-[#72dbd3]" size={36} />,
    tags: ["Posicionamiento Google SEO", "Carga Ultra Rápida", "Conversión Inmediata"],
    star: false
  }
];

const SERVICES_EN = [
  {
    id: "01",
    title: "AI Sales Employee",
    desc: "WhatsApp automation with 24/7 uptime. Responds to FAQs, quotes services, closes sales, books appointments directly, and sends payment links. Escalates to a human agent immediately when needed.",
    client: "Clinics, Real Estate, Dealerships, Shops, Academies, Developers.",
    icon: <Bot className="text-[#D62828]" size={36} />,
    tags: ["WhatsApp Business API", "Sales Closing", "24/7 Response"],
    star: true
  },
  {
    id: "02",
    title: "AI Prospector (B2B)",
    desc: "Your automated B2B opportunity generator. Scrapes and searches target companies, extracts verified emails and phones, qualifies initial interest, and schedules meetings in your calendar.",
    client: "Service providers, consultants, software, wholesalers, and any B2B company.",
    icon: <Search className="text-[#72dbd3]" size={36} />,
    tags: ["Smart Outreach", "Lead Mining", "Automated Booking"],
    star: false
  },
  {
    id: "03",
    title: "AI Receptionist",
    desc: "Digital assistant focused on reservation and appointment management. Books new slots in real time, processes cancellations and reschedules, and sends automatic reminders to eliminate no-shows.",
    client: "Dentists, clinics, veterinarians, spas, barbershops, offices, and lawyers.",
    icon: <Calendar className="text-[#00CC66]" size={36} />,
    tags: ["Slot Booking", "WhatsApp Reminders", "Zero No-Shows"],
    star: false
  },
  {
    id: "04",
    title: "Customer Support Agent",
    desc: "Omnichannel customer support system. Integrates WhatsApp with custom vectorized knowledge base (RAG) and Chatwoot. Slashes response times by handling 85% of support tickets instantly.",
    client: "High-volume inquiry companies, e-commerce, logistics, and post-sale support.",
    icon: <MessageSquare className="text-white" size={36} />,
    tags: ["Knowledge Base (RAG)", "Chatwoot Sync", "Omnichannel WhatsApp"],
    star: false
  },
  {
    id: "05",
    title: "Commercial Automation",
    desc: "We eliminate repetitive manual tasks by connecting your software stack. Seamlessly sync web forms, Google Sheets, Gmail accounts, CRMs (HubSpot, Salesforce), and ERP platforms.",
    client: "Businesses spending hours copy-pasting customer data and billing manually.",
    icon: <Zap className="text-[#D62828]" size={36} />,
    tags: ["API Integration", "Sheets Sync", "CRM Automation"],
    star: false
  },
  {
    id: "06",
    title: "Premium Web Development",
    desc: "We don't design generic static pages; we build acquisition machines. Ultra-fast, Google SEO-optimized websites with built-in sales funnels, AI chat, and WhatsApp integrations.",
    client: "Businesses wanting to rank first in Google searches and convert traffic into leads.",
    icon: <Globe className="text-[#72dbd3]" size={36} />,
    tags: ["Google SEO Rankings", "Ultra Fast Loading", "Immediate Conversion"],
    star: false
  }
];

const T = {
  es: {
    tag: "/ Soluciones de Negocios",
    title1: "Nuestros",
    title2: "Sistemas.",
    sub: "No vendemos software abstracto. Construimos herramientas y asistentes digitales enfocados en resolver problemas específicos de ventas, tiempo y organización para tu industria.",
    cta: "Cotizar Solución",
    idealFor: "Ideal Para",
    starProduct: "Producto Estrella",
    
    // Pricing
    pricingTag: "/ Inversión Transparente",
    pricingTitle1: "Planes desde",
    pricingTitle2: "$1.200.000 COP",
    pricingSub: "Precios de referencia para que dimensiones tu inversión. Cada proyecto se cotiza exactamente a tu medida.",
    pricingDisclaimer: "* Los precios son referencias de inversión inicial. El costo final depende del alcance, integraciones y personalización requerida. Incluye diagnóstico gratuito previo.",
    pricingCta: "Cotizar este Plan",
    setup: "Setup único",
    setupWeb: "Proyecto completo",
    
    plans: [
      {
        name: "Agente IA",
        from: "$1.200.000",
        setup: "Setup único",
        month: "$150 USD/mes",
        desc: "Agente para WhatsApp o Web con respuestas basadas en tu base de conocimiento.",
        popular: false
      },
      {
        name: "Web Premium",
        from: "$2.800.000",
        setup: "Proyecto completo",
        month: "Desde $200 USD/mes",
        desc: "Sitio ultra rápido con SEO, chat IA y panel administrable.",
        popular: true
      },
      {
        name: "Automatización",
        from: "$1.800.000",
        setup: "Setup único",
        month: "$100 USD/mes",
        desc: "Conexión de tus herramientas actuales en un flujo automático sin intervención humana.",
        popular: false
      }
    ],

    // Trust items
    trust: [
      { label: "Diagnóstico sin costo", desc: "Primera reunión sin compromiso" },
      { label: "Precio cerrado", desc: "Sin costos ocultos ni sorpresas" },
      { label: "Soporte 24/7", desc: "Monitoreo constante" },
      { label: "Resultados medibles", desc: "ROI demostrable" }
    ],

    // Final CTA
    finalCtaTag: "/ Diagnóstico Sin Costo",
    finalCtaTitle: "Diseñemos el sistema para tu negocio",
    finalCtaDesc: "Agenda un diagnóstico de procesos gratuito y analizaremos qué tareas podemos automatizar en tu empresa para recuperar tiempo productivo y ventas perdidas.",
    finalCtaButton: "Comenzar Diagnóstico"
  },
  en: {
    tag: "/ Business Solutions",
    title1: "Our",
    title2: "Systems.",
    sub: "We don't sell abstract software. We build digital tools and assistants focused on solving specific sales, time, and organization problems for your industry.",
    cta: "Quote Solution",
    idealFor: "Ideal For",
    starProduct: "Star Product",
    
    // Pricing
    pricingTag: "/ Transparent Investment",
    pricingTitle1: "Plans starting at",
    pricingTitle2: "$300 USD",
    pricingSub: "Reference pricing to help you gauge your investment. Each project is quoted exactly to your scale.",
    pricingDisclaimer: "* Pricing values are starting investment references. The final cost depends on scope, integrations, and customization needed. Includes a free initial audit.",
    pricingCta: "Quote this Plan",
    setup: "One-time setup",
    setupWeb: "Complete project",
    
    plans: [
      {
        name: "AI Agent",
        from: "$300 USD",
        setup: "One-time setup",
        month: "$150 USD/month",
        desc: "Agent for WhatsApp or Web with responses powered by your custom knowledge base.",
        popular: false
      },
      {
        name: "Premium Web",
        from: "$800 USD",
        setup: "Complete project",
        month: "From $200 USD/month",
        desc: "Ultra-fast website with built-in SEO, AI chat assistant, and administration dashboard.",
        popular: true
      },
      {
        name: "Automation",
        from: "$500 USD",
        setup: "One-time setup",
        month: "$100 USD/month",
        desc: "Connection of your current workflow tools in an automated flow without human intervention.",
        popular: false
      }
    ],

    // Trust items
    trust: [
      { label: "Free Process Audit", desc: "First meeting with zero commitment" },
      { label: "Fixed Scope Pricing", desc: "No hidden costs or surprises" },
      { label: "24/7 Monitoring", desc: "Continuous uptime support" },
      { label: "Measurable Results", desc: "Verifiable ROI metrics" }
    ],

    // Final CTA
    finalCtaTag: "/ Free Process Audit",
    finalCtaTitle: "Let's design the system for your business",
    finalCtaDesc: "Book a free process diagnosis, and we will analyze which tasks can be automated to recover productive time and lost sales.",
    finalCtaButton: "Start Discovery"
  }
};

export default function ServiciosClient({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const isEn = locale === 'en';
  const t = T[locale];
  const SERVICES = isEn ? SERVICES_EN : SERVICES_ES;
  const startUrl = isEn ? "/us/start" : "/start";

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-[-10%] w-[50vw] h-[50vh] bg-[#72dbd3]/3 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6 font-bold">{t.tag}</p>
          <h1 className="font-display text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            {t.title1} <br /> <span className="text-white/20">{t.title2}</span>
          </h1>
          <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
            {t.sub}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 md:mb-32">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="h-full"
            >
              <div 
                className="group block p-8 bg-[#111] border border-white/5 hover:border-[#D62828]/40 transition-all rounded-3xl relative overflow-hidden h-full flex flex-col justify-between shadow-2xl"
              >
                {/* Background ID number */}
                <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-[#D62828]/10 transition-colors pointer-events-none select-none">
                  <span className="font-display text-8xl font-black">{service.id}</span>
                </div>

                <div className="relative z-10 flex-1">
                  {/* Star Badge */}
                  {service.star && (
                    <div className="mb-4 inline-flex items-center gap-1 bg-[#D62828]/10 text-[#D62828] text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#D62828]/20">
                      <Sparkles size={10} /> {t.starProduct}
                    </div>
                  )}

                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">
                    {service.icon}
                  </div>
                  
                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 group-hover:text-white transition-colors uppercase tracking-tight">{service.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-6">{service.desc}</p>
                  
                  {/* Client targets */}
                  <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="block font-mono text-[9px] text-[#72dbd3] uppercase tracking-wider mb-1 font-bold">{t.idealFor}</span>
                    <p className="text-white/60 text-xs leading-normal font-sans">{service.client}</p>
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-white/5 rounded-md font-mono text-[8px] uppercase tracking-widest text-white/30 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={startUrl} className="flex items-center gap-2 text-white/40 group-hover:text-[#D62828] font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    {t.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PRICING REFERENCE SECTION */}
        <section className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <p className="font-mono text-[#72dbd3] text-xs tracking-[0.3em] uppercase mb-4 font-bold">{t.pricingTag}</p>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter">
              {t.pricingTitle1} <span className="text-[#D62828]">{t.pricingTitle2}</span>
            </h2>
            <p className="text-white/50 text-sm mt-4 max-w-xl mx-auto">
              {t.pricingSub}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl border transition-all ${
                  plan.popular
                    ? 'bg-[#111] border-[#D62828]/40 shadow-[0_0_30px_rgba(214,40,40,0.1)]'
                    : 'bg-[#111] border-white/5 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D62828] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                    {isEn ? "Most Popular" : "Más Elegido"}
                  </div>
                )}
                <div className="mt-4">
                  <p className="font-mono text-[#D62828] text-[10px] tracking-widest uppercase mb-2">{isEn ? "From" : "Desde"}</p>
                  <p className="font-display text-4xl font-black text-white mb-1">{plan.from}</p>
                  <p className="text-white/30 text-xs mb-4">{plan.setup}</p>
                  <p className="text-white/60 text-sm mb-6">{plan.desc}</p>
                  <div className="border-t border-white/5 pt-4 mb-6">
                    <p className="text-[10px] font-mono text-white/30 uppercase">{isEn ? "Maintenance" : "Mantenimiento"}</p>
                    <p className="text-white font-semibold text-sm">{plan.month}</p>
                  </div>
                  <Link
                    href={startUrl}
                    className={`block w-full text-center py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      plan.popular
                        ? 'bg-[#D62828] text-white hover:bg-white hover:text-black'
                        : 'border border-white/10 text-white/70 hover:border-[#D62828] hover:text-white'
                    }`}
                  >
                    {t.pricingCta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[10px] text-white/20 mt-8 max-w-md mx-auto">
            {t.pricingDisclaimer}
          </p>
        </section>

        {/* Garantía / Confianza */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 md:mb-32 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-16 px-8 py-10 bg-[#111] border border-white/5 rounded-3xl max-w-4xl mx-auto w-full">
            {t.trust.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#D62828]/10 flex items-center justify-center mb-2">
                  <CheckCircle size={18} className="text-[#D62828]" />
                </div>
                <p className="text-white font-bold text-xs uppercase tracking-wider">{item.label}</p>
                <p className="text-white/40 text-[10px] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl md:rounded-[4rem] bg-white p-8 md:p-24 overflow-hidden text-center"
        >
           <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
           <div className="relative z-10 max-w-2xl mx-auto">
              <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6 font-bold">{t.finalCtaTag}</p>
              <h2 className="font-display text-3xl md:text-6xl font-black uppercase text-[#080808] mb-6 leading-[0.95] tracking-tighter">
                {t.finalCtaTitle}
              </h2>
              <p className="text-[#080808]/60 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
                {t.finalCtaDesc}
              </p>
              <Link href={startUrl} className="inline-flex items-center gap-3 px-8 py-4 bg-[#D62828] text-white font-black text-xs tracking-widest uppercase hover:scale-103 transition-all shadow-xl rounded-xl">
                {t.finalCtaButton} <ArrowRight size={16} />
              </Link>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
