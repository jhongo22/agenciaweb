import { NextResponse } from 'next/server';

const CHATWOOT_TOKEN = 'y88KcC5gPyGdQdXz8eBF3doF';
const CHATWOOT_API_URL = process.env.CHATWOOT_API_URL || 'https://chat.autonomek.com';

function generateResponse(message: string): string {
  const query = message.toLowerCase();
  
  if (query.includes('hola') || query.includes('buenos dias') || query.includes('buenas tardes')) {
    return '¡Hola! Bienvenido a Autonomek 🚀. ¿En qué podemos ayudarte hoy? Ofrecemos soluciones de Agentes de IA, Automatización de Procesos, Páginas Web de Alto Rendimiento y Software a Medida.';
  }
  
  if (query.includes('web') || query.includes('pagina') || query.includes('página')) {
    return 'En Autonomek diseñamos y desarrollamos Páginas Web de Alto Rendimiento utilizando Next.js y Tailwind CSS, optimizadas para velocidad, SEO y conversión. ¿Te gustaría cotizar una web para tu negocio?';
  }
  
  if (query.includes('agente') || query.includes('ia') || query.includes('bot') || query.includes('inteligencia')) {
    return 'Desarrollamos Agentes de Inteligencia Artificial personalizados para atención al cliente, ventas y soporte en canales como WhatsApp, Web y Redes Sociales. ¡Automatizan la interacción 24/7!';
  }
  
  if (query.includes('automatiz') || query.includes('proceso') || query.includes('n8n')) {
    return 'Somos expertos en la Automatización de Procesos utilizando n8n y herramientas low-code/no-code para conectar tus sistemas, ahorrar horas de trabajo manual y optimizar tu ROI.';
  }
  
  if (query.includes('precio') || query.includes('costo') || query.includes('cotizar') || query.includes('cuanto') || query.includes('presupuesto')) {
    return 'Para darte una cotización exacta de tu proyecto (Web, IA, Automatización o Software a Medida), cuéntanos un poco más sobre tus necesidades o déjanos tu correo/teléfono para agendar una breve llamada de valoración.';
  }
  
  // Default response
  return '¡Gracias por escribirnos! He recibido tu mensaje. Uno de nuestros asesores especializados de Autonomek se pondrá en contacto contigo en unos minutos. Mientras tanto, puedes contarnos más sobre tu proyecto.';
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('Chatwoot webhook payload received:', JSON.stringify(payload, null, 2));

    const { event, message_type, content, conversation, account, sender } = payload;

    // Process only message_created events that are incoming from a contact
    if (event === 'message_created' && message_type === 'incoming' && sender?.type === 'contact') {
      const conversationId = conversation?.id;
      const accountId = account?.id;

      if (!conversationId || !accountId) {
        console.error('Missing conversationId or accountId in payload');
        return NextResponse.json({ success: false, error: 'Missing identifiers' });
      }

      console.log(`Incoming message: "${content}"`);
      const replyText = generateResponse(content || '');

      // Send response back to Chatwoot
      const chatwootEndpoint = `${CHATWOOT_API_URL}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;
      
      console.log(`Sending reply to Chatwoot endpoint: ${chatwootEndpoint}`);
      
      const response = await fetch(chatwootEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': CHATWOOT_TOKEN
        },
        body: JSON.stringify({
          content: replyText,
          message_type: 'outgoing'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to send message to Chatwoot. Status: ${response.status}. Error:`, errorText);
        return NextResponse.json({ success: false, error: errorText });
      }

      console.log('Message sent back to Chatwoot successfully.');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error handling Chatwoot webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Chatwoot webhook endpoint active' });
}
