'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Globe, MessageSquare, CheckCircle } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const images = project.images;
  const folder = project.folder;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsappMessage = `Hola Autonomek, vi el proyecto de "${project.title}" en tu portafolio y me gustaría cotizar un sistema similar para mi negocio.`;
  const whatsappUrl = `https://wa.me/573004435894?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative w-full max-w-5xl bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-[#D62828] text-white/80 hover:text-white border border-white/10 hover:border-[#D62828] transition-all z-20"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            {/* Left: Image Carousel */}
            <div className="relative w-full lg:w-[60%] bg-[#080808] flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-0 relative overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={`/projects/${folder}/${images[currentImageIndex]}`}
                  alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-contain max-h-[350px] sm:max-h-[450px] lg:max-h-full aspect-[16/10]"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/55 text-white hover:bg-[#D62828] border border-white/5 hover:border-[#D62828] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/55 text-white hover:bg-[#D62828] border border-white/5 hover:border-[#D62828] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-[#D62828] w-4' : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Ir a imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Content Details */}
            <div className="w-full lg:w-[40%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0d0d0d] max-h-[45vh] lg:max-h-full">
              <div>
                {/* Client / Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#D62828] uppercase font-bold">
                    Cliente: {project.client}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
                  {project.title}
                </h2>

                {/* Description */}
                <div className="text-white/60 font-sans text-sm leading-relaxed mb-6 space-y-4">
                  <p>{project.longDescription || project.description}</p>

                  {/* Highlight Phrase */}
                  {project.highlightPhrase && (
                    <blockquote className="border-l-2 border-[#D62828] pl-3 italic font-medium text-white/95 my-4 bg-white/5 py-2 pr-2 rounded-r-xl">
                      "{project.highlightPhrase}"
                    </blockquote>
                  )}

                  {/* Key Features */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-2 font-mono">
                        ¿Qué hace el sistema?
                      </h4>
                      <ul className="space-y-1.5">
                        {project.keyFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-white/70 text-xs">
                            <CheckCircle size={14} className="text-[#D62828] mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Technical Stack */}
                <div className="mb-6">
                  <span className="block font-mono text-[9px] tracking-widest text-white/40 uppercase mb-2">Tecnologías</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 font-mono text-[9px] text-white/50 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-6 border-t border-white/10 mt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-[#D62828] hover:bg-white text-white hover:text-black font-bold text-xs tracking-wider uppercase text-center transition-all inline-flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-[#D62828]/10 hover:shadow-none"
                >
                  <MessageSquare size={16} />
                  Cotizar Proyecto Similar
                </a>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 border border-white/10 hover:border-white text-white hover:bg-white/5 font-bold text-xs tracking-wider uppercase text-center transition-all inline-flex items-center justify-center gap-2 rounded-xl"
                  >
                    <Globe size={16} />
                    Visitar Sitio Web
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
