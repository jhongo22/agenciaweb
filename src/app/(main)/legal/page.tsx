import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso Legal, Privacidad y Cookies | Autonomek',
  description: 'Términos legales, política de privacidad y uso de cookies de Autonomek Web & IA.',
};

const sections = [
  {
    id: 'privacidad',
    title: 'Política de Privacidad',
    content: `
      En AUTONOMEK WEB & IA, tratamos tus datos personales con total transparencia y seguridad, cumpliendo con la Ley 1581 de 2012 (Colombia) y el Reglamento General de Protección de Datos (RGPD) de la Unión Europea.

      Recopilamos información como nombre, correo electrónico y número de teléfono cuando nos contactas a través de nuestro formulario, WhatsApp o chat. Estos datos son utilizados exclusivamente para:

      - Responder a tus solicitudes de información y cotizaciones.
      - Prestarte nuestros servicios de desarrollo web, agentes IA y automatización.
      - Enviarte comunicaciones relacionadas con tu proyecto (facturación, soporte, actualizaciones).

      No compartimos tus datos personales con terceros sin tu consentimiento explícito, salvo obligación legal. Tus datos se almacenan en servidores seguros con acceso restringido.

      Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiéndonos a contacto@autonomek.com.
    `
  },
  {
    id: 'terminos',
    title: 'Términos y Condiciones',
    content: `
      Al contratar los servicios de AUTONOMEK WEB & IA, aceptas los siguientes términos:

      1. **Alcance del Servicio:** Cada proyecto se define en una propuesta escrita con alcance, entregables, plazos y costos acordados mutuamente antes del inicio.

      2. **Propiedad Intelectual:** Una vez pagado en su totalidad, el código fuente y los activos digitales desarrollados son propiedad del cliente. AUTONOMEK se reserva el derecho de mostrar el trabajo en su portafolio.

      3. **Pagos:** Se requiere un anticipo del 50% para iniciar los proyectos. El 50% restante se paga contra entrega. Los planes de mantenimiento se facturan mensualmente.

      4. **Confidencialidad:** Toda la información compartida durante el desarrollo del proyecto se mantiene estrictamente confidencial.

      5. **Soporte:** El soporte técnico incluido cubre fallos del sistema desarrollado. No incluye modificaciones de alcance no contempladas en la propuesta inicial.
    `
  },
  {
    id: 'cookies',
    title: 'Política de Cookies',
    content: `
      Este sitio web utiliza cookies propias y de terceros para mejorar tu experiencia de navegación y analizar el tráfico.

      **Cookies utilizadas:**

      - **Google Analytics (GA4):** Utilizamos la cookie _ga para analizar cómo los usuarios interactúan con el sitio, lo que nos permite mejorar continuamente. Es una cookie de análisis anónima.

      - **Chatwoot:** Utilizamos cookies funcionales para el widget de chat en vivo, permitiendo mantener la conversación activa entre páginas.

      - **Cookies técnicas:** Necesarias para el funcionamiento básico del sitio.

      Puedes configurar tu navegador para rechazar todas las cookies o indicar cuándo se envía una. Sin embargo, algunas funciones del sitio podrían no funcionar correctamente.

      Al continuar navegando, aceptas el uso de estas cookies.
    `
  }
];

export default function LegalPage() {
  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-32 pb-24 relative">
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12">
          <Link href="/" className="font-mono text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            ← Volver al inicio
          </Link>
        </div>
        <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">Legal</h1>
        <p className="text-white/50 text-sm mb-16 max-w-xl">
          Información legal, política de privacidad y términos de uso de Autonomek Web & IA.
        </p>

        <div className="space-y-20">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-[#D62828] mb-6">
                {section.title}
              </h2>
              <div className="prose prose-invert max-w-none text-white/70 text-sm leading-relaxed space-y-4">
                {section.content.split('\n').filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} AUTONOMEK WEB & IA. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-[10px] mt-2">
            contacto@autonomek.com — Colombia
          </p>
        </div>
      </div>
    </main>
  );
}
