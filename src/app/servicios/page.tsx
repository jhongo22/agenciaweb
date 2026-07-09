'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Search, Calendar, MessageSquare, Zap, Globe, Sparkles } from 'lucide-react';

const SERVICES = [
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

export default function ServiciosPage() {
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
          <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6 font-bold">/ Soluciones de Negocios</p>
          <h1 className="font-display text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Nuestros <br /> <span className="text-white/20">Sistemas.</span>
          </h1>
          <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
            No vendemos software abstracto. Construimos herramientas y asistentes digitales enfocados en resolver problemas específicos de ventas, tiempo y organización para tu industria.
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
                      <Sparkles size={10} /> Producto Estrella
                    </div>
                  )}

                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">
                    {service.icon}
                  </div>
                  
                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 group-hover:text-white transition-colors uppercase tracking-tight">{service.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-6">{service.desc}</p>
                  
                  {/* Client targets */}
                  <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="block font-mono text-[9px] text-[#72dbd3] uppercase tracking-wider mb-1 font-bold">Ideal Para</span>
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

                  <Link href="/start" className="flex items-center gap-2 text-white/40 group-hover:text-[#D62828] font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Cotizar Solución <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl md:rounded-[4rem] bg-white p-8 md:p-24 overflow-hidden text-center"
        >
           <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
           <div className="relative z-10 max-w-2xl mx-auto">
              <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6 font-bold">/ Diagnóstico Sin Costo</p>
              <h2 className="font-display text-3xl md:text-6xl font-black uppercase text-[#080808] mb-6 leading-[0.95] tracking-tighter">
                Diseñemos el sistema para tu negocio
              </h2>
              <p className="text-[#080808]/60 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
                Agenda un diagnóstico de procesos gratuito y analizaremos qué tareas podemos automatizar en tu empresa para recuperar tiempo productivo y ventas perdidas.
              </p>
              <Link href="/start" className="inline-flex items-center gap-3 px-8 py-4 bg-[#D62828] text-white font-black text-xs tracking-widest uppercase hover:scale-103 transition-all shadow-xl rounded-xl">
                Comenzar Diagnóstico <ArrowRight size={16} />
              </Link>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
