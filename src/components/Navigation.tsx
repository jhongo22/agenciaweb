'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Inicio', href: '/' },
  { name: 'Páginas Web', href: '/servicios/paginas-web-alto-rendimiento' },
  { name: 'Agentes IA', href: '/servicios/agentes-inteligencia-artificial' },
  { name: 'Automatización', href: '/servicios/automatizacion-de-procesos' },
  { name: 'Software a Medida', href: '/servicios/software-a-medida' },
];

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-[150] w-full bg-[#080808]/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="w-full flex h-16 md:h-20">
          
          {/* LOGO BLOCK (Left) */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="flex-shrink-0 flex items-center justify-center px-6 md:px-12 border-r border-white/10 group hover:bg-white/5 transition-colors magnetic-area"
          >
            <span className="font-display font-black text-xl md:text-2xl tracking-[0.2em] text-white uppercase">
              AUTONOMEK<span className="text-[#D62828] group-hover:drop-shadow-[0_0_8px_#D62828] transition-all">_</span>
            </span>
          </Link>

          {/* MIDDLE LINKS BLOCK (Spans remaining space, hidden on mobile/tablet) */}
          <nav className="hidden lg:flex flex-grow items-center justify-center">
            <ul className="flex h-full w-full justify-center">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.name} className={`flex-grow flex border-r border-white/5 ${index === 0 ? 'border-l' : ''}`}>
                  <Link
                    href={item.href}
                    className="w-full h-full flex items-center justify-center px-4 font-mono text-[9px] xl:text-[10px] tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/5 transition-all uppercase magnetic-area whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA BLOCK (Right - Hidden on small mobile screens to save space) */}
          <a
            href="https://wa.me/573004435894?text=Hola%20Autonomek%2C%20me%20gustar%C3%ADa%20iniciar%20un%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex flex-shrink-0 items-center justify-center px-6 md:px-12 bg-[#D62828] hover:bg-white text-white hover:text-[#080808] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors border-l border-white/10 magnetic-area"
          >
            Iniciar Proyecto
          </a>

          {/* Mobile Menu Burger (Visible only when desktop layout is hidden) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden items-center justify-center px-6 border-l border-white/10 text-white hover:bg-white/5 transition-colors z-[200]"
            aria-label="Abrir menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </motion.header>

      {/* MOBILE MENU DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#080808]/98 backdrop-blur-xl z-[140] flex flex-col justify-center px-8 lg:hidden"
          >
            {/* Background decoration in drawer */}
            <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
            
            <nav className="relative z-10 w-full max-w-lg mx-auto">
              <ul className="flex flex-col gap-6 text-left">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white/50 hover:text-white transition-all hover:pl-4 block"
                    >
                      <span className="text-[#D62828] font-mono text-sm mr-4">0{index + 1}.</span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Iniciar Proyecto button in Mobile Menu (only visible if hidden in header) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <a
                  href="https://wa.me/573004435894?text=Hola%20Autonomek%2C%20me%20gustar%C3%ADa%20iniciar%20un%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-block text-center py-4 bg-[#D62828] hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(214,40,40,0.3)]"
                >
                  Iniciar Proyecto (WhatsApp)
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
