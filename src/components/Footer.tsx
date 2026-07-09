'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Github, Linkedin, Instagram, Mail, Globe } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: "Servicios",
    links: [
      { name: "Páginas Web", href: "/servicios/paginas-web-alto-rendimiento" },
      { name: "Agentes IA", href: "/servicios/agentes-inteligencia-artificial" },
      { name: "Automatización", href: "/servicios/automatizacion-de-procesos" },
      { name: "Software a Medida", href: "/servicios/software-a-medida" }
    ]
  },
  {
    title: "Agencia",
    links: [
      { name: "Inicio", href: "/" },
      { name: "Explorar Servicios", href: "/servicios" },
      { name: "Iniciar Proyecto", href: "https://wa.me/573004435894?text=Hola%20Autonomek%2C%20me%20gustar%C3%ADa%20iniciar%20un%20proyecto." },
      { name: "Casos de Éxito", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacidad", href: "#" },
      { name: "Términos", href: "#" },
      { name: "Cookies", href: "#" }
    ]
  }
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="w-full bg-[#080808] border-t border-white/5 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        {/* Big Text CTA - ONLY ON HOME */}
        {isHome && (
          <div className="mb-24 overflow-hidden">
              <a 
                href="https://wa.me/573004435894?text=Hola%20Autonomek%2C%20me%20gustar%C3%ADa%20iniciar%20un%20proyecto." 
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                 <motion.div
                   whileHover={{ y: -20 }}
                   transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                   className="flex flex-col"
                 >
                   <span className="font-display text-[10vw] font-black uppercase tracking-tighter leading-none text-white/5 group-hover:text-[#D62828] transition-colors">ESTÁS LISTO?</span>
                   <span className="font-display text-[10vw] font-black uppercase tracking-tighter leading-none text-[#D62828] group-hover:text-white transition-colors">HABLEMOS_</span>
                 </motion.div>
              </a>
          </div>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24 ${isHome ? 'border-t border-white/5 pt-24' : ''}`}>
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-8 group">
              <span className="font-display font-black text-3xl tracking-[0.2em] text-white uppercase">
                AUTONOMEK<span className="text-[#72dbd3] group-hover:drop-shadow-[0_0_8px_#72dbd3] transition-all">_</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-10">
              Arquitectos de infraestructura digital y sistemas autónomos impulsados por Inteligencia Artificial de élite. Llevamos la tracción de tu negocio al siguiente nivel operativo.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" }
              ].map(({ icon: Icon, label }, i) => (
                <a 
                  key={i} 
                  href="#" 
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D62828] hover:border-[#D62828]/40 hover:bg-[#D62828]/5 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.title} className="lg:col-span-1">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D62828] mb-8 font-black">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white/40 hover:text-white text-sm transition-colors flex items-center group gap-1"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 font-mono text-[10px] uppercase tracking-widest text-white/30">
          <p>© {new Date().getFullYear()} AUTONOMEK WEB & IA. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#72dbd3] animate-pulse"></div>
                <span>Sistemas Operativos</span>
             </div>
             <p className="hover:text-white transition-colors cursor-pointer">LATAM / GLOBAL</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
