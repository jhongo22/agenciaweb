# Análisis y Documentación de la Estrategia SEO & GEO

Este documento detalla la arquitectura, el estado de implementación actual, los puntos fuertes y las oportunidades de mejora para el Posicionamiento en Motores de Búsqueda Tradicionales (SEO) y la Optimización para Motores de Respuesta Generativa (GEO / AI Search) en **Autonomek**.

---

## 🚀 1. Estado de Implementación Actual

La infraestructura SEO y GEO en Autonomek está dividida en cuatro pilares principales:

### A. Configuración de Metadatos (Next.js Metadata API)
* **Metadata Base:** Declarado globalmente en [layout.tsx](file:///d:/Jhongo/Autonomek/src/app/layout.tsx) como `https://autonomek.com` para resolver de forma segura rutas relativas de imágenes OpenGraph y URLs canónicas.
* **Metadatos Globales (Root):**
  * `title`: Utiliza una plantilla por defecto (`default: 'Autonomek Web & IA | Tecnología Implacable'`) y una plantilla para subpáginas (`template: '%s | Autonomek'`).
  * `description`: Texto descriptivo global con las palabras clave fundamentales de la propuesta de valor.
  * `openGraph` / `twitter`: Configurados con el logotipo oficial, tipo `website`, idioma base `es_CO` y tarjetas enriquecidas.
  * `robots`: Indexación global activada con rastreo completo (`index: true, follow: true`).
* **Metadatos a Nivel de Ruta (Page-level):**
  * Cada página individual e internacional (ej. [agentes-inteligencia-artificial/page.tsx](file:///d:/Jhongo/Autonomek/src/app/servicios/agentes-inteligencia-artificial/page.tsx)) declara sus metadatos específicos sobreescribiendo los genéricos.

### B. Estructura Multirregión e Idiomas (Alternates & Hreflang)
El sitio maneja localizaciones regionales específicas:
* **Colombia (Default):** `/` y `/servicios/*` (en español).
* **México:** `/mx` (en español).
* **España:** `/es` (en español).
* **Estados Unidos / Internacional:** `/us` y `/us/services/*` (en inglés).

* **Etiquetado de Alternancia:**
  Se declaran `alternates.languages` dentro de cada página. Next.js traduce esto automáticamente en etiquetas `<link rel="alternate" hreflang="x" href="y">` en el `<head>` del HTML. Esto previene penalizaciones por contenido duplicado e indica a Google qué versión regional mostrar según la IP/idioma del usuario.

### C. Indexación Dinámica (Robots & Sitemap)
* **[sitemap.ts](file:///d:/Jhongo/Autonomek/src/app/sitemap.ts):** Genera dinámicamente un mapa del sitio en formato XML (`/sitemap.xml`) al compilar. Detalla todas las páginas disponibles, frecuencias de cambio, prioridades y su mapeo multirregional.
* **[robots.ts](file:///d:/Jhongo/Autonomek/src/app/robots.ts):** Genera dinámicamente `/robots.txt`. Permite el rastreo total de todos los buscadores (`userAgent: '*'`), define el enlace al sitemap y restringe accesos innecesarios (como `/api/*` y carpetas `/private/`).

### D. Optimización para Inteligencia Artificial (GEO)
* **[llms.txt](file:///d:/Jhongo/Autonomek/public/llms.txt):** Guía rápida de indexación para bots de IA (ChatGPT Search, ClaudeBot, Perplexity, Gemini, etc.) según el estándar abierto de `llmstxt.org`.
* **[llms-full.txt](file:///d:/Jhongo/Autonomek/public/llms-full.txt):** Archivo extendido con todo el contexto técnico de la agencia, stack detallado de desarrollo, lista estructurada de los 15 proyectos completados y tarifas transparentes. Permite a los motores de respuesta semántica resolver búsquedas complejas ("*¿Qué proyectos de IA ha desarrollado Autonomek en salud?*").

---

## 📊 2. Análisis de Fortalezas (SEO & GEO)

1. **Estructura Hreflang Automatizada:** Muy pocos sitios en fase de lanzamiento configuran de forma correcta la localización internacional con la API de Next.js. El mapeo cruzado de idiomas (es-CO -> en-US -> es-MX) es impecable.
2. **Excelente SEO Técnico Base:** El renderizado estático de Next.js (SSG) garantiza que el HTML llegue 100% renderizado desde el servidor, lo cual facilita el scraping por parte de bots que no ejecutan JavaScript complejo.
3. **Pioneros en GEO:** La adición de los archivos `llms.txt` y `llms-full.txt` coloca a Autonomek en una posición privilegiada para búsquedas por voz y resúmenes de inteligencia artificial, un canal en rápido crecimiento.
4. **Metadatos OpenGraph Completos:** Todas las páginas cuentan con tags correctos de OG e imágenes asociadas, permitiendo que al compartir enlaces en WhatsApp, Slack o LinkedIn se visualice una tarjeta de presentación premium.

---

## ⚠️ 3. Puntos Críticos y Oportunidades de Mejora

### 1. Títulos de Páginas que Ignoran el Template Global
En algunas páginas (ej. `servicios/agentes-inteligencia-artificial/page.tsx`), se declara el título como:
```typescript
title: 'Agentes de Inteligencia Artificial & Chatbots | Autonomek'
```
* **Problema:** Next.js ya tiene configurada una plantilla global: `template: '%s | Autonomek'`. Al escribir manualmente `| Autonomek` en el título hijo, se anula la plantilla o se arriesga a que se renderice duplicado si no se maneja bien.
* **Solución recomendada:** Declarar solo la sección específica en la página hija: `title: 'Agentes de Inteligencia Artificial & Chatbots'`. Next.js le agregará automáticamente el sufijo de forma consistente.

### 2. Falta de Datos Estructurados (JSON-LD)
* **Problema:** No se han implementado esquemas estructurados de Schema.org en formato JSON-LD.
* **Importancia:** Google utiliza esquemas para entender si un sitio es una organización, ofrece servicios o tiene preguntas frecuentes, habilitando resultados enriquecidos (rich snippets).
* **Solución recomendada:** Inyectar scripts JSON-LD en el layout para declarar a Autonomek como una `ProfessionalService` u `Organization`, y esquemas de `FAQPage` en el Home y `Service` en las páginas de servicios.

### 3. SEO Local (Google Business Profile) e Inbound Linkbuilding
* **Problema:** El dominio es relativamente nuevo y carece de enlaces de autoridad que lo apunten (backlinks).
* **Solución recomendada:** Registrar la ficha de Google Business Profile (Medellín/Colombia) para fortalecer las búsquedas locales ("agencia de desarrollo web medellin", "automatizacion whatsapp colombia") y enlazar el dominio principal.

---

## 🛠️ 4. Estructura Sugerida para JSON-LD (Próximo Nivel)

Para disparar el SEO, podemos inyectar esto en el `<head>` del [layout.tsx](file:///d:/Jhongo/Autonomek/src/app/layout.tsx):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Autonomek",
  "url": "https://autonomek.com",
  "logo": "https://autonomek.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57-3004435894",
    "contactType": "sales",
    "email": "contacto@autonomek.com",
    "areaServed": ["CO", "MX", "ES", "US"],
    "availableLanguage": ["Spanish", "English"]
  }
}
```
