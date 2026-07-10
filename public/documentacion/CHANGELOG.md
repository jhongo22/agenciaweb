# Changelog — Cambios Implementados

## 10 Julio 2026 (Tercera tanda)

### Sistemas y Agentes IA — Dashboard Interactivo
- Reemplazada la cuadrícula estática de 6 tarjetas por un Dashboard interactivo tipo Linear/Stripe.
- Agregadas demostraciones visuales simuladas por tipo de solución (chat, consola, calendario, RAG, n8n, PageSpeed).
- Alineado el contenido al centro (`items-center`) y fijada la altura general del contenedor a `lg:h-[560px]` para estabilización del layout.
- Agregada una lista de viñetas con beneficios detallados por solución para enriquecer el contenido y rellenar espacios.

### Iconos en Soluciones — Lucide React
- Eliminados los archivos SVG externos en `public/icons` y reemplazados por componentes vectoriales directos de `lucide-react` (`MessageSquare`, `Search`, `Calendar`, `Bot`, `Cpu`, `Globe`).

### Rendimiento Web & Optimización CLS (Lighthouse)
- **Eliminación de CLS por Marquesina:** Reemplazamos la marquesina de Framer Motion por una marquesina nativa pura en CSS (`marquee-horizontal` con `translate3d`). Esto elimina el retraso por hidratación del lado del cliente y reduce el Cumulative Layout Shift (CLS) de `0.684` a `0`.
- **Alineación de CTA en Footer:** Modificado el componente `Footer` para mostrar el CTA "ESTÁS LISTO? HABLEMOS_" en todas las variantes localizadas (`/mx`, `/es`, `/us`), resolviendo un fallo donde solo se renderizaba en el root `/`.
- **Optimización de Preconnect:** Agregado el atributo `crossOrigin="anonymous"` al tag `link rel="preconnect"` de Chatwoot en `layout.tsx`, solucionando el aviso de Lighthouse y ahorrando `340ms` de LCP al reutilizar la conexión socket.

### Testimonios — Nueva Sección
- Creada una nueva sección de testimonios de clientes del portafolio (Toxxic, Villa Grande La Misia, Agente IA Comidas Rápidas) con diseño de tarjetas premium, estrellas y avatars personalizados.

### Trust Badges — Eliminados
- Se eliminó por completo la sección de Trust Badges (Diagnóstico Gratuito, Precio Cerrado, etc.) del Home y se actualizó la documentación de la página de inicio (`01-inicio.md`).

### SEO — Sitemap & Robots
- Agregada la ruta `/start` en `sitemap.ts` para permitir el rastreo e indexado de la página del cotizador.
- Modificado `robots.ts` para prohibir explícitamente el rastreo en la ruta de endpoints de la API (`/api/`), protegiendo webhooks de Chatwoot.

## 10 Julio 2026 (Segunda tanda)

### Hero Chat — Eliminado efecto REC
- Se removió el badge "REC ● 00:23" del chat simulator (no encajaba con el diseño)

### Lottie Animations — Fondos animados en Pain Points
- Copiados 6 archivos Lottie JSON de `portafolio/public/SVG/` a `public/SVG/`
- Instalado `lottie-react` (v2.4.1)
- Creado componente `LottieBgIcon.tsx` que carga y renderiza animaciones via fetch + dynamic import
- Cada card de "¿Te suena familiar?" tiene un Lottie de fondo en la esquina inferior derecha (opacidad 70%, escala al hover)

### Iconos SVG — Reemplazo de Lucide en Soluciones
- Creados 6 SVGs en `public/icons/`: `ventas-ia.svg`, `prospector-b2b.svg`, `recepcionista.svg`, `servicio-cliente.svg`, `automatizacion.svg`, `web-premium.svg`
- Cada icono tiene animación flotante (framer-motion `y: [0, -6, 0]`)

### Sección Soluciones — Rediseño visual
- Fondo con glow radial rojo
- Gradient accent stripe de 2px en cada card
- Entrada por scroll con `whileInView`
- Título con acento rojo en "Agentes IA"
- Cards más altos (380px)

## 10 Julio 2026 (Primera tanda)

### Chatwoot — Visible en móviles
- Eliminada la regla CSS `@media (max-width: 767px)` que ocultaba `.woot-widget-bubble` y contenedores asociados
- Eliminado el `toggleBubbleVisibility('hide')` del evento `chatwoot:ready` en layout.tsx
- Ahora el widget de chat en vivo se muestra en todos los dispositivos

### Hero Chat — Rediseñado a estilo WhatsApp
- Header con colores exactos de WhatsApp dark (`#1F2C33`)
- Avatar circular con inicial "A" y fondo degradado verde
- Estado "en línea" en verde (`#00A884`)
- Iconos de llamada, videollamada y menú (SVG inline)
- Burbujas de usuario: verde oscuro `#005C4B` con palomita azul doble
- Burbujas de bot: gris oscuro `#202C33`
- Fondo de chat con patrón de rombos (`#0B141A`)
- Barra de input con iconos adjuntar, sticker, micrófono
- Efecto "REC" superior con punto rojo pulsante y temporizador
- Auto-scroll suave con `messagesEndRef`

### AiChatWidget — Activado
- Componente `AiChatWidget` importado y agregado en `layout.tsx`
- Ahora visible en todas las páginas del sitio

### Precios — Nueva sección en /servicios
- 3 planes con precios "desde" en pesos colombianos
- Plan "Más Elegido" destacado con borde rojo y badge
- Costos de mantenimiento mensual en USD
- Disclaimer de precios de referencia

### Trust Badges — Nuevas secciones
- Home: 5 iconos (Diagnóstico Gratuito, Precio Cerrado, Resultados Garantizados, Soporte 24/7, ROI Medible)
- Servicios: 4 sellos de confianza con CheckCircle

### Páginas Legales — Creadas
- Nuevo archivo: `src/app/legal/page.tsx`
- Secciones: Privacidad (Ley 1581/2012 Colombia), Términos y Condiciones, Política de Cookies
- Footer actualizado para apuntar a `/legal#privacidad`, `/legal#terminos`, `/legal#cookies`

### Página 404 — Creada
- Nuevo archivo: `src/app/not-found.tsx`
- Diseño acorde a la marca con fondo oscuro y glow rojo

### Sitemap — Actualizado
- Agregadas rutas: `/proyectos`, `/legal`
