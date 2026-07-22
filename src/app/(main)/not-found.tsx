import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#080808] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D62828]/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="relative z-10">
        <p className="font-mono text-[#D62828] text-xs tracking-[0.3em] uppercase mb-6">/ Error 404</p>
        <h1 className="font-display text-7xl md:text-9xl font-black text-white mb-4">404</h1>
        <p className="text-white/50 text-base md:text-lg mb-10 max-w-md">
          Esta página no existe o fue movida. Mientras tanto, nuestros agentes IA siguen atendiendo 24/7.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#D62828] text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-[#080808] transition-all rounded-xl"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
