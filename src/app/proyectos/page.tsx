'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Code, Bot, Cpu, Globe, ExternalLink, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Alquiler de Ecógrafos',
    client: 'Alquiler de Ecógrafos',
    category: 'Web',
    url: 'https://alquilerdeecografos.com/',
    stack: ['TypeScript', 'Node.js', 'Supabase'],
    description: 'Plataforma full-stack para renta de equipos médicos de ultrasonido. Panel administrativo con calendario interactivo de disponibilidad, formulario de reserva con validación en tiempo real, registro automatizado en Google Sheets y notificaciones multicanal.',
    folder: 'alquiler-ecografos',
    images: ['alquiler-ecografos-medicos-plataforma.webp', 'alquiler-ecografos-calendario-reservas-1.webp', 'alquiler-ecografos-panel-administracion-2.webp', 'alquiler-ecografos-formulario-reserva-3.webp', 'alquiler-ecografos-notificaciones-whatsapp-4.webp', 'alquiler-ecografos-dashboard-stock-5.webp', 'alquiler-ecografos-version-movil-6.webp'],
  },
  {
    id: 2,
    title: 'IA Medicina Regenerativa',
    client: 'Clínica Medicina Regenerativa',
    category: 'Automatización',
    url: null,
    stack: ['OpenAI', 'Redis', 'n8n', 'Chatwoot', 'WhatsApp API'],
    description: 'Ecosistema CRM con agente IA omnichannel que procesa texto, audio y comprobantes de pago. Memoria conversacional con resúmenes automáticos, escalamiento a humanos vía WhatsApp y filtrado de prospectos calificados.',
    folder: 'ecosistema-ia-medicina',
    images: ['ecosistema-ia-medicina-regenerativa-crm.webp', 'ecosistema-ia-medicina-subflow-escalado.webp', 'ecosistema-ia-medicina-seguimiento-descuentos.webp', 'ecosistema-ia-medicina-extraccion-datos-crm.webp'],
  },
  {
    id: 3,
    title: 'Panel de Control Agentes IA',
    client: 'Dashboard Winners',
    category: 'Web',
    url: null,
    stack: ['Next.js', 'TypeScript', 'n8n Webhooks', 'Chart.js'],
    description: 'Aplicación web para monitoreo y gestión de agentes de IA. Dashboard en tiempo real con análisis de conversaciones, sentimientos, tiempos de respuesta y configuración dinámica de personalidad del agente.',
    folder: 'panel-control-agentes-ia',
    images: ['panel-control-agentes-ia-analytics-1.webp', 'panel-control-agentes-ia-sentimientos-2.webp', 'panel-control-agentes-ia-configuracion-3.webp', 'panel-control-agentes-ia-plantillas-4.webp', 'panel-control-agentes-ia-conversaciones-5.webp', 'panel-control-agentes-ia-metricas-6.webp', 'panel-control-agentes-ia-dashboard-7.webp', 'panel-control-agentes-ia-vista-general-1.webp', 'panel-control-agentes-ia-reportes-2.webp', 'panel-control-agentes-ia-gestion-3.webp', 'panel-control-agentes-ia-monitoreo-4.webp'],
  },
  {
    id: 4,
    title: 'La Juana de Cerro Tusa',
    client: 'Finca Vacacional',
    category: 'Web',
    url: 'https://lajuanacerrotusa.com/',
    stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'Airbnb API'],
    description: 'Landing page premium para finca de descanso con integración de reservas multi-plataforma. Fotografía de gran formato con estética colonial, sincronización con Airbnb, Booking y VRBO. SEO local optimizado.',
    folder: 'lajuana-cerro-tusa',
    images: ['lajuana-cerro-tusa-fachada-principal-1.webp', 'lajuana-cerro-tusa-piscina-jardines-2.webp', 'lajuana-cerro-tusa-interior-colonial-3.webp', 'lajuana-cerro-tusa-habitacion-principal-4.webp', 'lajuana-cerro-tusa-vista-panoramica-5.webp', 'lajuana-cerro-tusa-galeria-6.webp', 'lajuana-cerro-tusa-galeria-7.webp', 'lajuana-cerro-tusa-panel-admin-reservas-1.webp', 'lajuana-cerro-tusa-panel-admin-calendario-2.webp'],
  },
  {
    id: 5,
    title: 'Toxxic',
    client: 'Tienda de Ropa Urbana',
    category: 'Web',
    url: 'https://toxxic.vercel.app/',
    stack: ['Laravel', 'PHP', 'MySQL'],
    description: 'E-commerce de ropa urbana en Medellín construido con Laravel. Carrito de compras completo, panel administrativo para gestión de productos, usuarios y mensajes. Diseño responsivo y optimizado.',
    folder: 'toxxic-tienda-ropa-urbana',
    images: ['toxxic-tienda-ropa-urbana-main.webp', 'toxxic-tienda-catalogo-productos-1.webp', 'toxxic-tienda-carrito-compras-2.webp', 'toxxic-tienda-panel-admin-3.webp', 'toxxic-tienda-version-movil-4.webp'],
  },
  {
    id: 6,
    title: 'Telocalizo MX',
    client: 'Distribuidora GPS Mayorista',
    category: 'Web',
    url: 'https://telocalizo.mx/',
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    description: 'Landing page B2B para distribuidores de rastreadores GPS en México. Catálogo de productos con fichas técnicas, precios al mayoreo y formulario de cotización. SEO optimizado para mercado mexicano.',
    folder: 'telocalizo-rastreadores-gps',
    images: ['telocalizo-rastreadores-gps-mexico-main-1.webp', 'telocalizo-catalogo-gps-rastreadores-2.webp', 'telocalizo-cotizacion-mayoreo-gps-3.webp', 'telocalizo-landing-page-gps-4.webp'],
  },
  {
    id: 7,
    title: 'Villa Grande La Misia',
    client: 'Finca Vacacional',
    category: 'Web',
    url: null,
    stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'Airbnb API'],
    description: 'Landing page inmersiva para finca de descanso en Llanogrande, Rionegro. Integración con Airbnb, Booking y VRBO para reservas sincronizadas. SEO local y diseño visual con fotografía de alta calidad.',
    folder: 'villa-grande-la-misia',
    images: ['villa-grande-la-misia-fachada-principal-1.webp', 'villa-grande-la-misia-piscina-exterior-2.webp', 'villa-grande-la-misia-salon-principal-3.webp', 'villa-grande-la-misia-habitacion-vip-4.webp', 'villa-grande-la-misia-jardines-vista-5.webp', 'villa-grande-la-misia-cocina-comedor-6.webp', 'villa-grande-la-misia-terraza-atardecer-7.webp', 'villa-grande-la-misia-landing-page-8.webp'],
  },
  {
    id: 8,
    title: 'Prospección y Leads IA',
    client: 'Sistema de Lead Generation',
    category: 'Automatización',
    url: null,
    stack: ['Apify', 'Firecrawl', 'OpenAI', 'n8n'],
    description: 'Sistema automatizado de prospección masiva. Extracción inteligente de prospectos por búsqueda, scraping avanzado de sitios web, calificación IA y generación de mensajes personalizados para Instagram y Email con seguimiento programado.',
    folder: 'sistema-prospeccion-leads',
    images: ['sistema-prospeccion-leads-automatizado-main.webp', 'sistema-prospeccion-leads-instagram.webp', 'sistema-prospeccion-leads-email.webp'],
  },
  {
    id: 9,
    title: 'Agente IA Restaurante Mexicano',
    client: 'Restaurante de Comida Mexicana',
    category: 'IA',
    url: null,
    stack: ['WhatsApp API', 'OpenAI Vision', 'Postgres SQL', 'Telegram API'],
    description: 'Agente IA multimodal para restaurante mexicano. Procesa pedidos por voz e interpreta comprobantes de pago. Gestión interactiva vía Telegram con botones Aceptar/Rechazar. Menú SQL con recomendaciones inteligentes y disponibilidad en tiempo real.',
    folder: 'agente-ia-restaurante-mexicano',
    images: ['agente-ia-restaurante-mexicano-pedidos.webp', 'agente-ia-restaurante-mexicano-subflow-pago.webp'],
  },
  {
    id: 10,
    title: 'Sistema RAG Empresarial',
    client: 'Knowledge Base Inteligente',
    category: 'IA',
    url: null,
    stack: ['OpenAI Embeddings', 'n8n', 'Postgres Vector', 'Google Drive API'],
    description: 'Sistema RAG para bases de conocimiento dinámicas. Monitorea Google Drive, clasifica y vectoriza documentos automáticamente con embeddings de OpenAI. Resúmenes contextuales y actualización en tiempo real en Supabase Vector.',
    folder: 'sistema-rag-conocimiento',
    images: ['sistema-rag-conocimiento-empresarial-ia.webp'],
  },
  {
    id: 11,
    title: 'Hot Cheese',
    client: 'Hamburguesas y Perros',
    category: 'Web',
    url: 'https://www.hotcheese.com.co/',
    stack: ['Next.js', 'Tailwind CSS', 'WhatsApp API'],
    description: 'Landing page para cadena de comidas rápidas en Colombia. Menú digital completo con precios, selector de sedes y pedidos directos por WhatsApp redirigiendo a la sucursal correspondiente. Optimizado para móviles.',
    folder: 'hotcheese-hamburguesas-perros',
    images: ['hotcheese-hamburguesas-perros-main-1.webp', 'hotcheese-menu-digital-sedes-2.webp', 'hotcheese-pedidos-whatsapp-3.webp'],
  },
  {
    id: 12,
    title: 'Agente IA Comidas Rápidas',
    client: 'Restaurante Fast Food',
    category: 'IA',
    url: null,
    stack: ['WhatsApp API', 'n8n', 'OpenAI Vision', 'Telegram'],
    description: 'Agente IA especializado en restaurantes de hamburguesas y perros. Procesa pedidos por voz, interpreta recibos de pago y gestiona órdenes vía Telegram con botones de acción. Generación automatizada de links de pago.',
    folder: 'agente-ia-comidas-rapidas',
    images: ['agente-ia-comidas-rapidas-pedidos.webp', 'agente-ia-comidas-rapidas-gestion-telegram.webp'],
  },
  {
    id: 13,
    title: 'Vive Feliz Sin Dolor',
    client: 'Clínica Medicina Regenerativa',
    category: 'Web',
    url: 'https://vivefelizsindolor.com/',
    stack: ['WordPress', 'ElevenLabs AI', 'SEO'],
    description: 'Sitio web integral para clínica de medicina regenerativa con diseño conversional. Integración de agente IA de voz con ElevenLabs para atención 24/7. SEO local avanzado y optimización en Google Search Console.',
    folder: 'vivefeliz-sin-dolor',
    images: ['vivefeliz-sin-dolor-medicina-regenerativa.webp'],
  },
  {
    id: 14,
    title: 'Contratos Digitales Automáticos',
    client: 'Legal Tech',
    category: 'Automatización',
    url: null,
    stack: ['n8n', 'Gmail API', 'WhatsApp API', 'Google Sheets'],
    description: 'Flujo completo de creación y envío de documentación legal. Recibe datos vía Webhook, completa contratos legales al instante y los despacha por WhatsApp y Email con políticas y términos adjuntos. Registro centralizado en Google Sheets.',
    folder: 'contratos-digitales',
    images: ['generacion-automatica-contratos-digitales.webp'],
  },
  {
    id: 15,
    title: 'Backup Cloud Dual n8n',
    client: 'Infraestructura Interna',
    category: 'Automatización',
    url: null,
    stack: ['n8n', 'Google Drive API'],
    description: 'Automatización de respaldos para infraestructura crítica. Monitorea y extrae flujos de dos instancias n8n independientes, los empaqueta y sube automáticamente a Google Drive garantizando continuidad del negocio.',
    folder: 'backup-cloud-n8n',
    images: ['sistema-backup-cloud-n8n-automatizado.webp'],
  },
];

const CATEGORIES = ['Todos', 'Web', 'Automatización', 'IA'];

const CATEGORY_COLORS: Record<string, string> = {
  Web: 'text-[#72dbd3] border-[#72dbd3]/30 bg-[#72dbd3]/5',
  Automatización: 'text-[#D62828] border-[#D62828]/30 bg-[#D62828]/5',
  IA: 'text-[#00CC66] border-[#00CC66]/30 bg-[#00CC66]/5',
};

const CATEGORY_ICONS: Record<string, typeof Globe> = {
  Web: Globe,
  Automatización: Cpu,
  IA: Bot,
};

export default function ProyectosPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeCategory === 'Todos'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen w-full bg-[#080808] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vh] bg-[#D62828]/8 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vh] bg-[#72dbd3]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vh] bg-[#D62828]/3 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 pt-28 md:pt-36 pb-24 md:pb-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 font-mono text-xs text-white/40 mb-12 uppercase tracking-widest"
          >
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-[#D62828] font-bold">Proyectos</span>
          </motion.div>

          {/* Hero */}
          <div className="mb-24 md:mb-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6"
            >
              / Portafolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
            >
              Proyectos
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D62828] to-white bg-[length:200%_auto] animate-shimmer">
                Reales.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-base md:text-lg text-white/50 max-w-2xl leading-relaxed"
            >
              Cada línea de código, cada agente desplegado y cada dashboard construido ha sido
              para resolver problemas reales de negocios. Esto es lo que hemos construido.
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-16 md:mb-20"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const Icon = cat === 'Todos' ? null : CATEGORY_ICONS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`group relative px-5 py-3 rounded-2xl font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-500 border ${
                    isActive
                      ? 'bg-[#D62828] text-white border-[#D62828] shadow-[0_0_20px_rgba(214,40,40,0.3)]'
                      : 'bg-transparent text-white/40 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon size={14} className={isActive ? 'text-white' : ''} />}
                    {cat}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 md:mb-28"
          >
            {[
              { label: 'Proyectos Entregados', value: PROJECTS.length, icon: Code },
              { label: 'Desarrollo Web', value: PROJECTS.filter(p => p.category === 'Web').length, icon: Globe },
              { label: 'Automatizaciones', value: PROJECTS.filter(p => p.category === 'Automatización').length, icon: Cpu },
              { label: 'Agentes IA', value: PROJECTS.filter(p => p.category === 'IA').length, icon: Bot },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-6 bg-[#111] border border-white/5 rounded-2xl hover:border-white/10 transition-all"
              >
                <stat.icon size={18} className="text-[#D62828] mb-3" />
                <p className="font-display text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Project Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filtered.map((project, index) => {
                const mainImage = project.images[0];
                const imageCount = project.images.length;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group relative bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-[#D62828]/40 hover:shadow-[0_0_40px_rgba(214,40,40,0.15)] transition-all duration-700 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#080808]">
                      <img
                        src={`/projects/${project.folder}/${mainImage}`}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />

                      {/* Category Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full border font-mono text-[8px] md:text-[9px] uppercase tracking-widest ${CATEGORY_COLORS[project.category]}`}>
                        {project.category}
                      </div>

                      {/* Image Count */}
                      {imageCount > 1 && (
                        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 font-mono text-[8px] text-white/60 tracking-wider">
                          +{imageCount}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 md:p-8">
                      {/* Client Name */}
                      <p className="font-mono text-[10px] text-[#D62828] uppercase tracking-widest mb-2">
                        {project.client}
                      </p>

                      {/* Title */}
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#D62828] transition-colors duration-500">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-sm text-white/40 leading-relaxed mb-6 line-clamp-3 group-hover:text-white/60 transition-colors duration-500 flex-1">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/5 font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <Link
                          href={`/proyectos/${project.id}`}
                          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/30 hover:text-[#D62828] transition-colors group/link"
                        >
                          Ver Detalle
                          <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/30 hover:text-[#72dbd3] transition-colors"
                          >
                            <ExternalLink size={12} />
                            Visitar
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Hover glow overlay */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r from-[#D62828]/0 via-[#D62828]/5 to-[#D62828]/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10`}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-32">
              <p className="font-display text-4xl text-white/20 mb-4">Sin proyectos</p>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
                No hay proyectos en esta categoría
              </p>
            </div>
          )}

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-32 md:mt-40 py-20 md:py-32 px-8 md:px-16 rounded-3xl md:rounded-[4rem] bg-white overflow-hidden text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6">
                / ¿Listo para el tuyo?
              </p>
              <h2 className="font-display text-3xl md:text-6xl font-black uppercase tracking-tighter text-[#080808] mb-6 leading-[0.95]">
                Tu Proyecto
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] via-[#FF4D4D] to-[#D62828] bg-[length:200%_auto] animate-shimmer">
                  Puede Ser el Siguiente.
                </span>
              </h2>
              <p className="font-sans text-sm md:text-base text-black/50 leading-relaxed mb-10 max-w-lg mx-auto">
                Cada proyecto comienza con una conversación. Cuéntanos qué necesitas y
                construyamos algo extraordinario juntos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/573004435894?text=Hola%20Autonomek%2C%20vi%20tu%20portafolio%20y%20quiero%20cotizar%20un%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-[#080808] transition-all shadow-[0_0_30px_rgba(214,40,40,0.3)] hover:shadow-[0_0_40px_rgba(214,40,40,0.4)] inline-flex items-center gap-3"
                >
                  Iniciar Proyecto
                  <ArrowUpRight size={16} />
                </a>
                <Link
                  href="/servicios"
                  className="px-8 py-4 border-2 border-[#080808] text-[#080808] font-bold text-xs tracking-widest uppercase hover:bg-[#080808] hover:text-white transition-all inline-flex items-center gap-3"
                >
                  Ver Servicios
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-4 font-mono uppercase tracking-widest text-xs text-[#D62828] hover:text-white transition-colors group"
            >
              <span className="w-8 h-[1px] bg-[#D62828] group-hover:bg-white group-hover:w-12 transition-all duration-300"></span>
              [ VOLVER AL INICIO ]
              <span className="w-8 h-[1px] bg-[#D62828] group-hover:bg-white group-hover:w-12 transition-all duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
