# Contexto Global del Proyecto: Autonomek (Zenit Web & IA)

Este documento centraliza el análisis completo de la arquitectura, componentes, configuración y tecnologías del proyecto **Autonomek**. Sirve como punto de entrada de contexto para cualquier desarrollador o agente de IA que trabaje en el repositorio.

---

## 🚀 1. Pila Tecnológica (Tech Stack)

El proyecto está construido sobre el ecosistema moderno de React/Next.js. A continuación, se detalla la configuración real declarada en el [package.json](file:///d:/Jhongo/Autonomek/package.json):

*   **Framework Principal:** [Next.js 15.5.15](file:///d:/Jhongo/Autonomek/package.json#L12) (App Router).
*   **Biblioteca de UI:** [React 18.3.1](file:///d:/Jhongo/Autonomek/package.json#L13) y [React DOM 18.3.1](file:///d:/Jhongo/Autonomek/package.json#L14).
*   **Estilos:** [Tailwind CSS 3.4.14](file:///d:/Jhongo/Autonomek/package.json#L27) con PostCSS y Autoprefixer.
*   **Animaciones:** [Framer Motion 11.11.17](file:///d:/Jhongo/Autonomek/package.json#L15), junto con `motion-dom` y `motion-utils`.
*   **Desplazamiento Suave (Smooth Scroll):** `@studio-freight/lenis 1.0.42` para mejorar la experiencia de navegación en desktop.
*   **Iconos:** `lucide-react 0.460.0`.
*   **Tipado:** TypeScript 5.6.3.

> ℹ️ **Discrepancia con el README.md:** El archivo [README.md](file:///d:/Jhongo/Autonomek/README.md) menciona versiones superiores (Next.js 16, React 19, Tailwind CSS 4) y nombres de carpetas ligeramente diferentes para los servicios. El código y el `package.json` reales usan la pila descrita arriba.

---

## 📁 2. Estructura de Directorios

La estructura real de archivos del proyecto se organiza de la siguiente manera:

```
Autonomek/
├── public/                 # Recursos estáticos (imágenes, logos, etc.)
├── src/
│   ├── app/                # Rutas y páginas del Next.js App Router
│   │   ├── servicios/      # Sección de servicios ofertados
│   │   │   ├── agentes-inteligencia-artificial/
│   │   │   │   └── page.tsx
│   │   │   ├── automatizacion-de-procesos/
│   │   │   │   └── page.tsx
│   │   │   ├── paginas-web-alto-rendimiento/
│   │   │   │   └── page.tsx
│   │   │   ├── software-a-medida/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx    # Listado general de servicios
│   │   ├── start/          # Formulario para iniciar proyectos
│   │   │   └── page.tsx
│   │   ├── globals.css     # Estilos globales y variables CSS de Tailwind
│   │   ├── layout.tsx      # Estructura HTML base con navegación y pie de página
│   │   └── page.tsx        # Página de inicio (Landing Page principal)
│   └── components/         # Componentes compartidos de React
│       ├── AiChatWidget.tsx
│       ├── CanvasBackground.tsx
│       ├── CustomCursor.tsx
│       ├── Footer.tsx
│       ├── Navigation.tsx
│       ├── Preloader.tsx
│       └── SmoothScrollProvider.tsx
├── package.json            # Scripts y dependencias
├── tailwind.config.ts      # Configuración de colores, fuentes y temas de Tailwind
├── tsconfig.json           # Configuración de compilación de TypeScript
└── vercel.json             # Ajustes para el despliegue en Vercel
```

---

## ⚙️ 3. Configuración de Diseño y Estilos

El diseño del sitio sigue una estética premium "oscura con toques cyber-crimson". La configuración de Tailwind [tailwind.config.ts](file:///d:/Jhongo/Autonomek/tailwind.config.ts) destaca por:

*   **Colores personalizados:**
    *   Fondo dominante ultraoscuro: `#080808`
    *   Color de acento primario: Rojo carmesí `#D62828`
    *   Variantes y sombras de acento para gradientes y brillos.
*   **Tipografía:**
    *   Uso de fuentes personalizadas de visualización (`font-display`) y monoespaciadas (`font-mono`) para dar un aspecto de ingeniería y alta tecnología.
*   **Animaciones:** Clases personalizadas de Tailwind para efectos de brillo (shimmer), pulsaciones suaves y efectos hover dinámicos.

---

## 🧩 4. Componentes Clave

Los componentes en [src/components/](file:///d:/Jhongo/Autonomek/src/components) manejan la interactividad y experiencia inmersiva:

1.  [CanvasBackground.tsx](file:///d:/Jhongo/Autonomek/src/components/CanvasBackground.tsx): Crea un fondo interactivo en 2D Canvas con partículas de colores machiavélicos (rojo, blanco, gris) que interactúan con el cursor del mouse, simulando una red inteligente conectada.
2.  [AiChatWidget.tsx](file:///d:/Jhongo/Autonomek/src/components/AiChatWidget.tsx): Widget flotante en la esquina inferior derecha que simula un agente de inteligencia artificial interactivo con respuestas predefinidas para prospectos.
3.  [Navigation.tsx](file:///d:/Jhongo/Autonomek/src/components/Navigation.tsx): Barra de navegación con comportamiento inteligente (se oculta al hacer scroll hacia abajo, aparece al hacer scroll hacia arriba).
4.  [SmoothScrollProvider.tsx](file:///d:/Jhongo/Autonomek/src/components/SmoothScrollProvider.tsx): Implementa Lenis para proporcionar transiciones y scroll suave a lo largo del sitio.
5.  [CustomCursor.tsx](file:///d:/Jhongo/Autonomek/src/components/CustomCursor.tsx): Reemplaza el cursor estándar por un puntero personalizado que reacciona a los elementos del sitio.
6.  [Preloader.tsx](file:///d:/Jhongo/Autonomek/src/components/Preloader.tsx): Pantalla de carga inicial con animaciones para una experiencia premium desde el primer segundo.

---

## 🗺️ 5. Rutas y Contenidos del Sitio

*   **Página Principal ([src/app/page.tsx](file:///d:/Jhongo/Autonomek/src/app/page.tsx)):**
    *   Hero section con el simulador de chat interactivo.
    *   Calculadora de Retorno de Inversión (ROI) en vivo para automatización (empleados, salario medio, horas desperdiciadas, inversión).
    *   Exposición de los pilares de la propuesta de valor de la agencia.
*   **Sección Servicios ([src/app/servicios/page.tsx](file:///d:/Jhongo/Autonomek/src/app/servicios/page.tsx)):**
    *   Un hub dinámico con tarjetas que enlazan a las cuatro especialidades de la empresa:
        1.  **Páginas Web de Alto Rendimiento:** [/servicios/paginas-web-alto-rendimiento](file:///d:/Jhongo/Autonomek/src/app/servicios/paginas-web-alto-rendimiento/page.tsx)
        2.  **Agentes de Inteligencia Artificial:** [/servicios/agentes-inteligencia-artificial](file:///d:/Jhongo/Autonomek/src/app/servicios/agentes-inteligencia-artificial/page.tsx)
        3.  **Automatización de Procesos:** [/servicios/automatizacion-de-procesos](file:///d:/Jhongo/Autonomek/src/app/servicios/automatizacion-de-procesos/page.tsx)
        4.  **Software a Medida:** [/servicios/software-a-medida](file:///d:/Jhongo/Autonomek/src/app/servicios/software-a-medida/page.tsx)
*   **Formulario de Inicio ([src/app/start/page.tsx](file:///d:/Jhongo/Autonomek/src/app/start/page.tsx)):**
    *   Formulario interactivo guiado para calificar las necesidades del cliente (tipo de servicio, presupuesto, alcance).

---

## 🛠️ 6. Comandos Disponibles

El proyecto utiliza scripts estándar de Next.js detallados en [package.json](file:///d:/Jhongo/Autonomek/package.json):

*   `npm run dev`: Lanza el servidor de desarrollo local en `http://localhost:3000`.
*   `npm run build`: Genera la versión optimizada de producción (compilación estática y de servidor).
*   `npm start`: Inicia el servidor de Next.js en producción.
*   `npm run lint`: Ejecuta las comprobaciones de código estático (ESLint).

---

## 🔖 7. Etiquetado de Google & Integraciones de Terceros

Todas las integraciones de terceros se inyectan en el layout raíz (`src/app/layout.tsx`) mediante el componente `next/script`.

### 7.1. Google Analytics 4 (GA4)

- **Measurement ID:** `G-W5P7806J2F`
- **Tipo:** Google Analytics 4 (gtag.js) directo, **sin** Google Tag Manager (GTM).
- **Estrategia de carga:** `afterInteractive` — se descarga después de que la página sea interactiva.
- **Implementación actual:**
  ```tsx
  // Carga del script gtag.js
  <Script strategy="afterInteractive"
    src="https://www.googletagmanager.com/gtag/js?id=G-W5P7806J2F" />

  // Inicialización del dataLayer y envío de page_view
  <Script id="gtag-init" strategy="afterInteractive">
    {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-W5P7806J2F');`}
  </Script>
  ```
- **Eventos:** Solo se envía `page_view` automático. **No hay eventos de conversión** (contact_form_submit, button_click, etc.) implementados actualmente.
- **ID hardcodeado:** El Measurement ID está escrito directamente en el código. Se recomienda migrar a variable de entorno (`NEXT_PUBLIC_GA_ID`) para facilitar cambios por entorno.
- **Sin banner de consentimiento:** No hay implementación de cookie consent banner. La cookie `_ga` de GA4 se instala sin consentimiento previo.

### 7.2. Chatwoot (Widget de Chat)

- **URL de instancia:** `https://chatwoot.autonomek.com`
- **Website Token:** `sgKYEgxKz4TFe6LqbeTCupQA`
- **Estrategia de carga:** `lazyOnload` — se descarga después de todos los demás recursos.
- **Comportamiento responsive:** El widget se oculta automáticamente en dispositivos móviles (viewport < 768px).
- **ID de cuenta hardcodeado:** Misma recomendación de migrar a variable de entorno.

### 7.3. WhatsApp (Botón Flotante)

- **Número:** `+573004435894`
- **Componentes que lo usan:** `WhatsAppButton.tsx`, `Navigation.tsx`, `Footer.tsx`, `start/page.tsx`
- **Número hardcodeado** en todos los componentes.

### 7.4. Resumen de Etiquetado

| Servicio | Tipo | ID/Token | Estrategia | Cookie |
|---|---|---|---|---|
| Google Analytics 4 | Analítica web | G-W5P7806J2F | afterInteractive | _ga, _gid, _gat |
| Chatwoot | Chat en vivo | sgKYEgxKz4TFe6LqbeTCupQA | lazyOnload | chatwoot-* |
| WhatsApp | Mensajería | +573004435894 | N/A (link) | Ninguna |

> ⚠️ **Pendientes:** No hay eventos de conversión personalizados en GA4, no hay Google Tag Manager, no hay Facebook Pixel, y no hay banner de consentimiento de cookies. Todos los IDs están hardcodeados — se recomienda moverlos a variables de entorno (`NEXT_PUBLIC_*`).
