'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Code, Bot, Cpu, Globe, Search, Plus } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';

const T = {
  es: {
    home: "Inicio",
    projects: "Proyectos",
    portfolio: "/ Portafolio",
    title: "Proyectos",
    titleAccent: "Reales.",
    desc: "Cada línea de código, cada agente de IA desplegado y cada automatización conectada ha sido diseñada para resolver cuellos de botella y potenciar las ventas de negocios reales.",
    categories: ['Todos', 'Web', 'Automatización', 'IA'],
    searchPlaceholder: "Buscar por tecnología, cliente, título...",
    clear: "Limpiar",
    noResults: "Sin resultados",
    noResultsDesc: "No hay proyectos que coincidan con la búsqueda actual.",
    ctaTag: "/ ¿Listo para el tuyo?",
    ctaTitle: "Tu Proyecto",
    ctaTitleAccent: "Puede Ser el Siguiente.",
    ctaDesc: "Cada proyecto comienza con una conversación sencilla. Cuéntanos tu problema comercial actual y construyamos un sistema implacable para resolverlo.",
    ctaButton: "Iniciar Proyecto",
    ctaButtonSecondary: "Ver Soluciones",
    back: "[ VOLVER AL INICIO ]",
    details: "Ver Detalles",
    stats: {
      delivered: "Proyectos Entregados",
      web: "Desarrollo Web",
      automation: "Automatizaciones",
      ia: "Agentes IA",
    }
  },
  en: {
    home: "Home",
    projects: "Projects",
    portfolio: "/ Portfolio",
    title: "Real",
    titleAccent: "Projects.",
    desc: "Every line of code, every AI agent deployed, and every automation connected has been engineered to solve bottlenecks and power the sales of real businesses.",
    categories: ['All', 'Web', 'Automation', 'AI'],
    searchPlaceholder: "Search by technology, client, title...",
    clear: "Clear",
    noResults: "No results",
    noResultsDesc: "No projects match the current search criteria.",
    ctaTag: "/ Ready for yours?",
    ctaTitle: "Your Project",
    ctaTitleAccent: "Can Be Next.",
    ctaDesc: "Every project starts with a simple conversation. Tell us your current business problem and let us build an implacable system to solve it.",
    ctaButton: "Start Project",
    ctaButtonSecondary: "See Solutions",
    back: "[ BACK TO HOME ]",
    details: "View Details",
    stats: {
      delivered: "Projects Delivered",
      web: "Web Development",
      automation: "Automations",
      ia: "AI Agents",
    }
  }
};

const categoryMap: Record<string, string> = {
  'Todos': 'Todos',
  'Web': 'Web',
  'Automatización': 'Automatización',
  'IA': 'IA',
  'All': 'Todos',
  'Automation': 'Automatización',
  'AI': 'IA'
};

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

export default function ProyectosPage({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const content = T[locale];
  const CATEGORIES = content.categories;

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const dbCategory = categoryMap[activeCategory];
      const matchesCategory = dbCategory === 'Todos' || p.category === dbCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.stack.some((tech) => tech.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Dynamically calculate counts for each category based on current search query
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: 0, Web: 0, Automatización: 0, IA: 0 };
    PROJECTS.forEach((p) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.stack.some((tech) => tech.toLowerCase().includes(query));

      if (matchesSearch) {
        counts.Todos++;
        if (p.category in counts) {
          counts[p.category]++;
        }
      }
    });

    // Map database counts back to the UI categories (in English or Spanish)
    const uiCounts: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      const dbCat = categoryMap[cat];
      uiCounts[cat] = counts[dbCat];
    });

    return uiCounts;
  }, [searchQuery, CATEGORIES]);

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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
            <Link href={locale === 'en' ? "/us" : "/"} className="hover:text-white transition-colors">{content.home}</Link>
            <span>/</span>
            <span className="text-[#D62828] font-bold">{content.projects}</span>
          </motion.div>

          {/* Hero */}
          <div className="mb-16 md:mb-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6"
            >
              {content.portfolio}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
            >
              {content.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D62828] to-white bg-[length:200%_auto] animate-shimmer">
                {content.titleAccent}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-base md:text-lg text-white/50 max-w-2xl leading-relaxed"
            >
              {content.desc}
            </motion.p>
          </div>

          {/* Controls: Search Bar and Category Pills */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-12 md:mb-16">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2.5"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const Icon = cat === 'Todos' ? null : CATEGORY_ICONS[cat];
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group relative px-4.5 py-3 rounded-2xl font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] transition-all duration-300 border ${
                      isActive
                        ? 'bg-[#D62828] text-white border-[#D62828] shadow-[0_0_20px_rgba(214,40,40,0.25)]'
                        : 'bg-[#111]/40 text-white/40 border-white/5 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {Icon && <Icon size={13} className={isActive ? 'text-white' : ''} />}
                      {cat}
                      <span className={`px-1.5 py-0.5 rounded-md font-sans text-[9px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30 group-hover:text-white/60'
                      }`}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="relative w-full lg:w-96"
            >
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30">
                <Search size={16} />
              </div>
               <input
                type="text"
                placeholder={content.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#111]/40 border border-white/5 focus:border-[#D62828]/50 rounded-2xl font-sans text-sm text-white placeholder-white/20 outline-none transition-all focus:shadow-[0_0_20px_rgba(214,40,40,0.05)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-white text-xs"
                >
                  {content.clear}
                </button>
              )}
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24"
          >
            {[
              { label: content.stats.delivered, value: PROJECTS.length, icon: Code },
              { label: content.stats.web, value: PROJECTS.filter(p => p.category === 'Web').length, icon: Globe },
              { label: content.stats.automation, value: PROJECTS.filter(p => p.category === 'Automatización').length, icon: Cpu },
              { label: content.stats.ia, value: PROJECTS.filter(p => p.category === 'IA').length, icon: Bot },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-5 sm:p-6 bg-[#111]/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all hover:bg-[#111]"
              >
                <stat.icon size={18} className="text-[#D62828] mb-3" />
                <p className="font-display text-2xl sm:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 leading-tight">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Project Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => {
                const mainImage = project.images[0];
                const imageCount = project.images.length;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleOpenDetails(project)}
                    className="group relative bg-[#111]/60 border border-white/5 rounded-3xl overflow-hidden hover:border-[#D62828]/40 hover:shadow-[0_0_30px_rgba(214,40,40,0.1)] transition-all duration-500 flex flex-col cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#080808]">
                      <img
                        src={`/projects/${project.folder}/${mainImage}`}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-103 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-transparent to-transparent pointer-events-none" />

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
                    <div className="flex flex-col flex-1 p-6 md:p-8 justify-between">
                      <div>
                        {/* Client Name */}
                        <p className="font-mono text-[10px] text-[#D62828] uppercase tracking-widest mb-2 font-bold">
                          {project.client}
                        </p>

                        {/* Title */}
                        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#D62828] transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-sm text-white/40 leading-relaxed mb-6 line-clamp-3 group-hover:text-white/60 transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack & Action Info */}
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[8px] md:text-[9px] text-white/40 uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 4 && (
                            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 font-mono text-[8px] md:text-[9px] text-white/40">
                              +{project.stack.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Click indicator */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono uppercase tracking-widest text-[#D62828] group-hover:text-white transition-colors duration-300">
                          <span>{content.details}</span>
                          <Plus size={14} className="transform group-hover:rotate-90 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <p className="font-display text-4xl text-white/20 mb-4 uppercase tracking-tighter">{content.noResults}</p>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
                {content.noResultsDesc}
              </p>
            </div>
          )}

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-32 md:mt-40 py-20 md:py-32 px-8 md:px-16 rounded-3xl md:rounded-[4rem] bg-white overflow-hidden text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6 font-bold">
                {content.ctaTag}
              </p>
              <h2 className="font-display text-3xl md:text-6xl font-black uppercase tracking-tighter text-[#080808] mb-6 leading-[0.95]">
                {content.ctaTitle}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] via-[#FF4D4D] to-[#D62828] bg-[length:200%_auto] animate-shimmer">
                  {content.ctaTitleAccent}
                </span>
              </h2>
              <p className="font-sans text-sm md:text-base text-black/50 leading-relaxed mb-10 max-w-lg mx-auto">
                {content.ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={locale === 'en' ? "https://wa.me/573004435894?text=Hello%20Autonomek%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20quote%20a%20project." : "https://wa.me/573004435894?text=Hola%20Autonomek%2C%20vi%20tu%20portafolio%20y%20quiero%20cotizar%20un%20proyecto."}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-[#080808] transition-all shadow-[0_0_30px_rgba(214,40,40,0.3)] hover:shadow-none inline-flex items-center justify-center gap-3"
                >
                  {content.ctaButton}
                  <ArrowUpRight size={16} />
                </a>
                <Link
                  href="/servicios"
                  className="px-8 py-4 border-2 border-[#080808] text-[#080808] font-bold text-xs tracking-widest uppercase hover:bg-[#080808] hover:text-white transition-all inline-flex items-center justify-center gap-3"
                >
                  {content.ctaButtonSecondary}
                  <ArrowUpRight size={16} />
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
              href={locale === 'en' ? "/us" : "/"}
              className="inline-flex items-center gap-4 font-mono uppercase tracking-widest text-xs text-[#D62828] hover:text-white transition-colors group"
            >
              <span className="w-8 h-[1px] bg-[#D62828] group-hover:bg-white group-hover:w-12 transition-all duration-300"></span>
              {content.back}
              <span className="w-8 h-[1px] bg-[#D62828] group-hover:bg-white group-hover:w-12 transition-all duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Reusable Project Details Modal */}
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
