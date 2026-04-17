'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AutomatizacionPage() {
  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-24 md:pt-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background optimized for performance */}
      <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vh] bg-[#D62828]/5 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-mono text-xs text-white/40 mb-8 md:mb-12 uppercase tracking-widest"
        >
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-[#D62828] font-bold">Automatización</span>
        </motion.div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00CC66]/30 rounded-full mb-6 bg-[#00CC66]/5">
              <span className="w-2 h-2 rounded-full bg-[#00CC66] animate-pulse"></span>
              <span className="font-mono text-[10px] text-[#00CC66] uppercase tracking-widest">Sistemas Conectados</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-[1.1]">
              Operaciones en <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-[#D62828]">Piloto Automático.</span>
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg">
              Dejamos de depender de la intervención humana para que los datos viajen. Usando n8n corporativo, conectamos tu CRM, correo, bases de datos y WhatsApp en flujos de trabajo autónomos.
            </p>
            
            <Link href="/start" className="inline-block px-8 py-4 bg-transparent border border-[#00CC66]/50 text-white font-bold text-xs tracking-widest uppercase hover:bg-[#00CC66] hover:text-[#080808] transition-all text-center magnetic-area shadow-[0_0_15px_rgba(0,204,102,0.1)]">
              Auditoría de Procesos
            </Link>
          </motion.div>

          {/* Visual: Connected Node Workflow (Optimized Layout) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full aspect-square md:aspect-[4/3] bg-[#0A0A0A] border border-white/5 rounded-xl p-8 relative overflow-hidden flex flex-col justify-center"
          >
             {/* Subtle Grid background inside mock */}
             <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
             
             {/* Clean Vertical Flow Pipeline */}
             <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-start gap-8 border-l-2 border-[#1A1A1A] ml-8 pl-8">
                
                {/* Node 1: Webhook / Trigger */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#111] border border-white/10 rounded-lg p-3 w-56 flex items-center gap-3 relative shadow-lg"
                >
                  <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-[#0A0A0A] bg-[#DFDFDF] flex items-center justify-center z-10">
                     <div className="w-1.5 h-1.5 bg-[#00CC66] rounded-full animate-ping"></div>
                  </div>
                  
                  <div className="w-8 h-8 rounded bg-[#1A1A1A] flex items-center justify-center border border-white/5">
                    <span className="text-white text-[10px] font-mono">WH</span>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold">Webhook</h4>
                    <p className="text-[#00CC66] text-[9px] font-mono">Lead Recibido</p>
                  </div>
                </motion.div>

                {/* Node 2: HubSpot CRM */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-[#111] border border-[#FF7A59]/30 rounded-lg p-3 w-56 flex items-center gap-3 relative shadow-lg mt-2"
                >
                  <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-[#0A0A0A] bg-[#FF7A59] z-10"></div>
                  
                  {/* Animated connection line overlay */}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "120px" }}
                    transition={{ duration: 1, delay: 0.5, ease: "linear" }}
                    className="absolute -left-[33px] bottom-[16px] w-[2px] bg-gradient-to-b from-[#DFDFDF] to-[#FF7A59] -z-10"
                  ></motion.div>

                  <div className="w-8 h-8 rounded bg-[#FF7A59]/10 flex items-center justify-center border border-[#FF7A59]/20">
                    <span className="text-[#FF7A59] font-bold text-[10px]">CRM</span>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold">HubSpot</h4>
                    <p className="text-white/40 text-[9px] font-mono">Crear Contacto</p>
                  </div>
                </motion.div>

                {/* Node 3: WhatsApp API */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#111] border border-[#25D366]/30 rounded-lg p-3 w-56 flex items-center gap-3 relative shadow-lg mt-2"
                >
                   <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-[#0A0A0A] bg-[#25D366] z-10"></div>
                   
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "120px" }}
                    transition={{ duration: 1, delay: 0.7, ease: "linear" }}
                    className="absolute -left-[33px] bottom-[16px] w-[2px] bg-gradient-to-b from-[#FF7A59] to-[#25D366] -z-10"
                  ></motion.div>

                  <div className="w-8 h-8 rounded bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/20">
                    <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold">WhatsApp API</h4>
                    <p className="text-white/40 text-[9px] font-mono">Disparar Mensaje</p>
                  </div>
                </motion.div>

             </div>
          </motion.div>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-l-2 border-[#D62828] bg-[#111] p-10 hover:bg-[#1A1A1A] transition-colors"
          >
            <h3 className="font-display text-5xl md:text-6xl font-black mb-2 text-white/10 relative">
               <span className="absolute inset-0 text-[#D62828]">100%</span>
               100%
            </h3>
            <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4">Eficiencia Operativa</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Pasar datos de un Excel a un CRM, enviar facturas por correo, o responder manualmente &quot;sí, tenemos stock&quot;, destruyen el tiempo de tu equipo. Automatizamos de raíz.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-l-2 border-[#00CC66] bg-[#111] p-10 hover:bg-[#1A1A1A] transition-colors"
          >
            <h3 className="font-display text-5xl md:text-6xl font-black mb-2 text-white/10 relative">
               <span className="absolute inset-0 text-[#00CC66]">0.05s</span>
               0.05s
            </h3>
             <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4">Tiempo de Reacción</h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Un servidor no hace pausas. Tan pronto un usuario hace un pago en Stripe o llena un formulario, el flujo se ejecuta instantáneamente en milisegundos.
            </p>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
