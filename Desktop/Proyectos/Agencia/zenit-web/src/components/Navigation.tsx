'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

const NAV_ITEMS = [
  { name: 'Inicio', href: '/' },
  { name: 'Web', href: '/servicios/desarrollo-web-alto-impacto' },
  { name: 'I.A.', href: '/servicios/agentes-ia' },
  { name: 'Autom.', href: '/servicios/automatizacion-n8n' },
  { name: 'Sistemas', href: '/servicios/soluciones-a-medida' },
];

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
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
          className="flex-shrink-0 flex items-center justify-center px-6 md:px-12 border-r border-white/10 group hover:bg-white/5 transition-colors magnetic-area"
        >
          <span className="font-display font-black text-xl md:text-2xl tracking-[0.2em] text-white uppercase">
            ZENIT<span className="text-[#D62828] group-hover:drop-shadow-[0_0_8px_#D62828] transition-all">_</span>
          </span>
        </Link>

        {/* MIDDLE LINKS BLOCK (Spans remaining space, hidden on mobile) */}
        <nav className="hidden md:flex flex-grow items-center justify-center">
          <ul className="flex h-full w-full justify-center">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.name} className={`flex-1 flex max-w-[150px] border-r border-white/5 ${index === 0 ? 'border-l' : ''}`}>
                <Link
                  href={item.href}
                  className="w-full h-full flex items-center justify-center font-mono text-[10px] md:text-xs tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all uppercase magnetic-area"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA BLOCK (Right) */}
        <Link
          href="/start"
          className="flex-shrink-0 flex items-center justify-center px-8 md:px-12 bg-[#D62828] hover:bg-white text-white hover:text-[#080808] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors border-l border-white/10 magnetic-area"
        >
          Iniciar Proyecto
        </Link>

        {/* Mobile Menu Burger (Visible only on small screens) */}
        <button className="flex md:hidden items-center justify-center px-6 border-l border-white/10 text-white hover:bg-white/5 transition-colors">
          <div className="flex flex-col gap-1.5 w-6">
            <span className="h-[1px] w-full bg-current"></span>
            <span className="h-[1px] w-full bg-current"></span>
          </div>
        </button>

      </div>
    </motion.header>
  );
}
