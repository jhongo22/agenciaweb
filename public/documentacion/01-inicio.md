# Página de Inicio — Landing Page Principal

**URL:** https://autonomek.com

---

## 1. HEADER (Fragmento arriba del hero)
"MÁS CLIENTES EN AUTOMÁTICO. CERO COMPLICACIONES."

---

## 2. HERO SECTION

### Título principal
"Agencia de Automatización & Desarrollo Web con IA."

### Subtítulo
"Convertimos tu flujo de WhatsApp, tus redes y tu web en una máquina de adquisición de clientes. Creamos empleados de ventas inteligentes que responden, cotizan y agendan citas 24/7 de forma autónoma."

### CTAs
- Botón principal: "Diseñar Mi Agente" (link a /start)
- Botón secundario: "Explorar Soluciones" (link a /servicios)

### Simulador de Chat en Vivo (Estilo WhatsApp)
Tabs: "💬 Ventas IA" | "📅 Agenda Citas" | "👤 Escalar Humano"

**Diseño:** Réplica exacta de WhatsApp en modo oscuro.
- Header verde oscuro (#1F2C33) con avatar circular "A", nombre "Agente Autonomek", estado "en línea" en verde (#00A884), e iconos de llamada, videollamada y menú
- Burbujas del usuario: verde oscuro (#005C4B) alineadas a la derecha, con palomita azul doble (leída)
- Burbujas del bot: gris oscuro (#202C33) alineadas a la izquierda
- Fondo con patrón de rombos sutil (#0B141A)
- Barra de input con iconos de adjuntar, sticker y micrófono
- Auto-scroll suave a medida que aparecen los mensajes

#### Secuencia Ventas IA:
- **Usuario:** "Hola, me interesa implementar un sistema de reservas y respuestas automáticas para mi negocio. ¿Es muy complicado?"
- **Bot:** "¡Hola! Para nada. Nosotros nos encargamos de toda la configuración. Entrenamos a tu agente con la información de tus servicios para que responda 24/7 y agende citas en piloto automático."
- **Usuario:** "Excelente. ¿Y cómo sé si un cliente realmente está interesado?"
- **Bot:** "El agente califica al prospecto en la conversación. Si detecta intención de compra o agenda una cita, te envía los detalles ordenados al instante. ¡Tú solo cierras la venta! 🚀"

#### Secuencia Agenda Citas:
- **Usuario:** "¿Cómo funciona el agendamiento de citas automático?"
- **Bot:** "El agente se conecta en tiempo real a tu Google Calendar o CRM. Le presenta al cliente los horarios disponibles directamente en WhatsApp o la web."
- **Usuario:** "Y si el cliente necesita cancelar o reagendar, ¿tiene que llamar?"
- **Bot:** "No, para nada. El cliente le escribe al bot 'quiero reagendar' y el bot le ofrece nuevas horas libres. También envía recordatorios automáticos para reducir inasistencias al 90%. 📅"

#### Secuencia Escalar Humano:
- **Usuario:** "¿Qué pasa si un cliente hace una pregunta muy compleja que la IA no sabe?"
- **Bot:** "El agente está entrenado con tu base de conocimientos (RAG). Si detecta una duda no registrada o una solicitud humana, se detiene automáticamente."
- **Usuario:** "¿Cómo me entero de que un humano debe intervenir?"
- **Bot:** "Te envía una alerta inmediata a tu WhatsApp o panel de Chatwoot. Tu equipo entra a la conversación de forma transparente con un solo clic. ¡Eficiencia pura! 👤"

---

## 3. PAIN POINTS — "¿Te suena familiar?"

**Título sección:** "/ Fugas de Dinero Ocultas"
**Subtítulo:** "¿Te suena familiar?"

Cada tarjeta incluye un **background Lottie animation** (animación JSON) en la esquina inferior derecha, que escala al hover.

### Tarjeta 1: Mensajes sin Responder
- Icono: ShieldAlert (Lucide)
- Lottie BG: `/SVG/Desarrollo web.json`
- "Clientes que escriben en la noche, fines de semana o durante picos de trabajo y no reciben respuesta. Se van directo a tu competencia en menos de 5 minutos."

### Tarjeta 2: Horas de Trabajo Manual
- Icono: Clock (Lucide)
- Lottie BG: `/SVG/Workflows.json`
- "Tu equipo pasa el día agendando citas, enviando recordatorios, persiguiendo links de pago y facturando en vez de enfocarse en las actividades comerciales que sí traen dinero."

### Tarjeta 3: Pérdida de Prospectos
- Icono: Coins (Lucide)
- Lottie BG: `/SVG/Inteligencia artificial.json`
- "Citas que se olvidan confirmar, cotizaciones sin seguimiento proactivo y prospectos B2B que se enfrían porque nadie les dio atención inmediata y personalizada."

---

## 4. SOLUCIONES — "Sistemas y Agentes IA"

**Título sección:** "/ Soluciones Llave en Mano"
**Título:** "Sistemas y **Agentes IA**" (acento rojo en "Agentes IA")
**Subtítulo:** "Desplegamos infraestructura de software diseñada para vender, automatizar procesos internos y captar clientes de forma constante."

**Estilo diferenciado:** La sección tiene un fondo con glow radial rojo sutil. Cada card tiene:
- Gradient accent stripe de 2px en el borde superior
- Icono SVG animado (flotación y axis Y con framer-motion)
- Entrada por scroll (`whileInView`)
- Min-height de 380px

### Solución 1: Empleado de Ventas IA ★ Producto Estrella
- **SVG icon:** `/icons/ventas-ia.svg`
- "Para cualquier empresa que atienda clientes por WhatsApp. Atiende 24/7, responde dudas, cotiza, agenda citas, envía enlaces de pago y escala automáticamente a humanos cuando hace falta."
- **Impacto:** "Cierra ventas y captura leads en piloto automático"

### Solución 2: Prospector IA B2B
- **SVG icon:** `/icons/prospector-b2b.svg`
- "El motor definitivo para adquisición corporativa. Busca empresas objetivo de forma masiva, extrae teléfonos y correos verificados, califica leads, redacta y envía el primer contacto de forma personalizada."
- **Impacto:** "Generación de pipeline de reuniones de negocios"

### Solución 3: Recepcionista IA
- **SVG icon:** `/icons/recepcionista.svg`
- "Optimizado para consultorios médicos, clínicas, dentistas, barberías y spas. Gestiona la reserva de turnos, confirma asistencia, procesa reprogramaciones y responde preguntas frecuentes."
- **Impacto:** "Reduce inasistencias en más de un 90%"

### Solución 4: Servicio al Cliente IA
- **SVG icon:** `/icons/servicio-cliente.svg`
- "Sistemas omnicanal con almacenamiento de base de conocimientos en vectores (RAG) integrados a Chatwoot y WhatsApp. Resuelve de forma instantánea el 85% de las dudas recurrentes de soporte."
- **Impacto:** "Tiempos de respuesta reducidos a cero segundos"

### Solución 5: Automatización Comercial
- **SVG icon:** `/icons/automatizacion.svg`
- "Conexión total de tu stack comercial. Sincroniza formularios web, excels de Google Sheets, bandejas de Gmail y tus sistemas CRM/ERP de forma directa sin tareas repetitivas de copiado y pegado."
**Impacto:** "Cero errores de captura y ahorro masivo de horas"

### Solución 6: Desarrollo Web Premium
"No vendemos una página web básica; construimos una máquina de atracción de clientes lista para Google (SEO). Incluye embudos, chat de IA, integración a WhatsApp, formularios y CRM."
**Impacto:** "Aparición en primeras posiciones y captación directa"

---

## 5. SECTORES — "Sectores de Alto Retorno"

**Título sección:** "/ Nichos de Cierre Rápido"
**Título:** "Sectores de Alto Retorno"
**Subtítulo:** "Implementamos sistemas adaptados a las dinámicas reales de tu industria. Si tu negocio recibe un gran volumen de mensajes y gestiona datos de forma manual, esto es para ti."

### Nicho 1: Clínicas & Odontólogos
"El agente responde dudas sobre tratamientos y precios, agenda citas automáticamente y envía recordatorios reduciendo el ausentismo en un 90%."
**Impacto:** "+90% Asistencia a Consultas"

### Nicho 2: Inmobiliarias & Constructoras
"Calificación de leads en segundos, filtrado por presupuesto, envío de fichas técnicas de inmuebles y agendamiento de visitas físicas a los proyectos."
**Impacto:** "+35% Visitas Físicas Agendadas"

### Nicho 3: Talleres Automotrices
"Asistentes de IA que reservan turnos de mantenimiento, notifican a clientes sobre el estado del vehículo y permiten envíos directos de cotizaciones y facturas."
**Impacto:** "Operaciones de agendamiento 100% automatizadas"

### Nicho 4: Hoteles & Academias
"Respuestas de tarifas de habitaciones o matrículas de cursos, reservas y cobro de inscripciones/estadías de forma directa desde WhatsApp."
**Impacto:** "Captación 24/7 sin dependencias"

### Nicho 5: Tiendas E-commerce
"Resolución de dudas sobre envíos y stock de productos en segundos, y disparadores automatizados para recuperar compras o carritos abandonados."
**Impacto:** "+22% Ventas Recuperadas"

### Nicho 6: Logística & Distribuidores
"Consulta de estado de envíos, cotización de fletes al mayoreo para distribuidores industriales, y carga automática de órdenes a sistemas ERP."
**Impacto:** "Cero demoras en consultas de rastreo"

---

## 6. MANIFIESTO / FILOSOFÍA

**Título sección:** "Nuestra Filosofía"

**Frase principal:**
"No vendemos código ni plantillas. Construimos sistemas integrados de adquisición y eficiencia."

**Cuerpo:**
"Nos acoplamos a las necesidades exactas de tu negocio. Si tu equipo de ventas está saturado, tus prospectos se enfrían o tus empleados pasan horas en tareas manuales repetitivas, diseñamos la solución a la medida de tus procesos actuales."

**CTA secundario:** "[ VER TODAS LAS SOLUCIONES ]"

---

## 7. TECH STACK — "Infraestructura de Ingeniería Robusta"

**Título sección:** "/ Stack Tecnológico"
**Título:** "Infraestructura de Ingeniería Robusta."

### 01 Carga Ultra Rápida (Next.js & Supabase)
"Páginas cargadas de forma instantánea preparadas para retener visitas y posicionar directamente en Google (SEO local y nacional)."

### 02 Modelos de Lenguaje Avanzados (LLM)
"Agentes conversacionales capaces de entender texto, voz, audio e imágenes, operando bajo flujos lógicos controlados sin alucinaciones."

### 03 Orquestadores de Integraciones (n8n)
"Conexión directa entre bases de datos, CRMs, APIs de mensajería (WhatsApp Cloud API) y paneles de control en la nube."

---

## 8. CALCULADORA ROI — "Calcula tu ahorro al automatizar"

**Título sección:** "/ Calculadora de Retorno"
**Título:** "Calcula tu ahorro al automatizar"
**Subtítulo:** "Descubre cuánto dinero y tiempo productivo puede recuperar tu empresa al eliminar tareas repetitivas mediante flujos de información inteligentes."

### Parámetros ajustables
- Número de Empleados (1-50)
- Salario Promedio Anual por empleado ($12M - $120M COP)
- Horas semanales en tareas repetitivas (2-25h)
- Inversión estimada única en automatización ($4M - $60M COP)

### Resultados calculados
- **Ahorro anual estimado:** $X COP
- **En tiempo productivo recuperado para tu empresa**
- **ROI Primer Año:** +X%
- **Punto de Equilibrio:** X meses
- **Ahorro proyectado a 5 años:** $X COP

**CTA:** "Reclamar Auditoría de Procesos Gratuita"
**Disclaimer:** "*Los cálculos son estimaciones basadas en datos promedio de eficiencia industrial. Te ayudamos a realizar un análisis de retorno personalizado sin compromiso alguno."

---

## 9. VENTAJA COMPETITIVA — "Tecnología sin Complicaciones"

**Título sección:** "/ Ventaja Competitiva"
**Título:** "Tecnología sin Complicaciones."
**Subtítulo:** "La mayoría de las agencias complican el software. Nosotros estudiamos las dinámicas y cuellos de botella de tu negocio para construir sistemas sumamente intuitivos, veloces y enfocados 100% en retorno comercial."

**Estadística destacada:** "99% Estabilidad & Eficiencia"

### Tarjeta 1: Desarrollo Ágil & IA
"Utilizamos inteligencia artificial para optimizar nuestros propios procesos internos, lo que nos permite entregar sistemas de alta calidad en tiempo récord."

### Tarjeta 2: Infraestructura Escalable
"Alojamos tus agentes y webs en servidores en la nube de alta disponibilidad. Tu sistema seguirá operando sin caídas a medida que crezca tu volumen de clientes."

### Tarjeta 3: Seguridad y Privacidad
"Diseñamos con protocolos robustos. Los datos de tus clientes y de tu empresa se mantienen cifrados y fuera de peligro."

### Tarjeta 4: Soporte e Iteración Mensual
"Monitoreamos la estabilidad 24/7. Ajustamos el tono de los agentes y actualizamos el SEO para asegurar que tu máquina de ventas no se detenga."

---

## 10. PROYECTOS DESTACADOS — "Sistemas en Operación"

**Título sección:** "/ Casos de Éxito Reales"
**Título:** "Sistemas en Operación"
**Link:** "Ver Todos Los Proyectos →"

**Proyectos destacados (4):**
1. Toxxic — Tienda de Ropa Urbana (Web)
2. Villa Grande La Misia — Finca Vacacional (Web)
3. Alquiler de Ecógrafos — Renta equipos médicos (Web)
4. Agente IA Comidas Rápidas — Restaurante Fast Food (IA)

---

## 11. METODOLOGÍA — "Del Caos al Orden"

**Título sección:** "/ Metodología Autonomek"
**Título:** "Del Caos al Orden."

**Paso 01 — Diagnóstico:**
"Analizamos tu proceso comercial actual sin costo para detectar cuellos de botella."

**Paso 02 — Propuesta:**
"Te entregamos un alcance cerrado, costos claros y retorno estimado de inversión."

**Paso 03 — Desarrollo:**
"Diseñamos tus webs de alto rendimiento e integramos tus asistentes en piloto automático."

**Paso 04 — Optimización:**
"Monitoreamos la estabilidad 24/7 y mejoramos el entrenamiento de los agentes mensualmente."

---

## 12. FAQ — "Despeja tus Dudas"

**Título sección:** "/ Preguntas Frecuentes"
**Título:** "Despeja tus Dudas."

### Pregunta 1:
**Q:** "¿Cuánto tarda en implementarse un Empleado de Ventas IA?"
**A:** "Dependiendo de la complejidad y los canales de mensajería, un Agente de IA funcional y calificado puede estar listo en un plazo de 2 a 4 semanas."

### Pregunta 2:
**Q:** "¿Tengo que saber programar o administrar servidores?"
**A:** "Para nada. Nosotros nos encargamos de todo el hosting, las conexiones API y el mantenimiento técnico. Te entregamos un sistema llave en mano listo para operar."

### Pregunta 3:
**Q:** "¿Cómo se entrenan los agentes conversacionales?"
**A:** "Los alimentamos directamente con la información oficial de tus servicios, catálogos, políticas de entrega y preguntas frecuentes para asegurar respuestas 100% correctas."

### Pregunta 4:
**Q:** "¿Qué pasa si mis herramientas actuales no son modernas?"
**A:** "Nuestros orquestadores de software (n8n) nos permiten conectar sistemas antiguos, hojas de cálculo de Excel e incluso correos electrónicos con agentes modernos de IA de forma transparente."

---


## Widgets Flotantes
- **Botón WhatsApp** (esquina inferior izquierda): "Escríbenos por WhatsApp"
- **Chat IA Widget** (esquina inferior derecha): "Autonomek AI Agent — En línea"
- **Chatwoot Widget** (visible en todos los dispositivos, incluido móvil)
