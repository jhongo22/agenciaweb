'use client';

import { useState, useRef, useEffect, useContext, createContext, useCallback } from 'react';

type MessageStatus = 'sent' | 'delivered' | 'read';

type Message = {
  id: string;
  text: string;
  time: Date;
  userID: number;
  status?: MessageStatus;
};

type Conversation = {
  id: string;
  messages: Message[];
  users: number[];
  title: string;
  avatar: string;
  unread: number;
};

const YOUR_USER_ID = 1;
const OTHER_USER_ID = 2;

const mkMsg = (id: string, text: string, minAgo: number, userId: number, status?: MessageStatus): Message => ({
  id, text, time: new Date(Date.now() - minAgo * 60000), userID: userId, ...(status ? { status } : {}),
});

const initialConversations: Conversation[] = [
  {
    id: '101', title: 'María García', avatar: 'MG', users: [1, 2], unread: 2,
    messages: [
      mkMsg('101-0', 'Hola buenas tardes, quisiera pedir una cita de valoración', 8, 2),
      mkMsg('101-1', '¡Hola María! Claro que sí, bienvenida a Clínica Sonrisas 🦷. ¿Para cuándo te gustaría agendar tu valoración?', 6, 1, 'delivered'),
      mkMsg('101-2', 'Tendrían espacio para este jueves en la tarde?', 4, 2),
      mkMsg('101-3', 'Tengo disponible este Jueves a las 3:00 PM o 4:30 PM. ¿Cuál prefieres?', 2, 1, 'delivered'),
    ],
  },
  {
    id: '102', title: 'Carlos López', avatar: 'CL', users: [1, 2], unread: 1,
    messages: [
      mkMsg('102-0', 'Buenas noches, qué precio tiene el blanqueamiento dental?', 12, 2),
      mkMsg('102-1', '¡Hola Carlos! El blanqueamiento LED cuesta $350.000 e incluye valoración previa y limpieza profesional.', 8, 1, 'read'),
      mkMsg('102-2', 'Super, y manejan facilidades de pago o tarjetas?', 3, 2),
    ],
  },
  {
    id: '103', title: 'Ana Martínez', avatar: 'AM', users: [1, 2], unread: 0,
    messages: [
      mkMsg('103-0', 'Hola, me duele mucho una muela desde anoche 😭', 25, 2),
      mkMsg('103-1', '¡Hola Ana! Lamento escuchar eso. Te recomendamos no automedicarte. Tenemos cupos de urgencia hoy a las 11:00 AM. ¿Te agendamos de inmediato?', 20, 1, 'read'),
      mkMsg('103-2', 'Sí por favor, a las 11am estoy allá', 15, 2),
      mkMsg('103-3', '¡Listo Ana! Cita de Urgencia agendada a las 11:00 AM con el Dr. Ramírez. Nos vemos pronto.', 10, 1, 'read'),
    ],
  },
  {
    id: '104', title: 'David Gómez', avatar: 'DG', users: [1, 2], unread: 2,
    messages: [
      mkMsg('104-0', 'Hola, necesitan convenio con SURA para atender?', 15, 2),
      mkMsg('104-1', '¡Hola David! Atendemos de forma particular y expedimos factura electrónica detallada para que solicites tu reembolso con SURA.', 10, 1, 'read'),
      mkMsg('104-2', 'Ah genial, ¿dónde quedan ubicados?', 1, 2),
    ],
  },
  {
    id: '105', title: 'Pedro Rodríguez', avatar: 'PR', users: [1, 2], unread: 1,
    messages: [
      mkMsg('105-0', 'Buenas, necesito correr mi cita de mañana viernes', 30, 2),
      mkMsg('105-1', 'Hola Pedro, con gusto. Tu cita actual es el viernes a las 10:00 AM. ¿Para qué día de la próxima semana deseas moverla?', 25, 1, 'read'),
      mkMsg('105-2', 'Para el martes en la mañana si se puede', 5, 2),
    ],
  },
  {
    id: '106', title: 'Laura Sánchez', avatar: 'LS', users: [1, 2], unread: 0,
    messages: [
      mkMsg('106-0', 'Me hice un diseño ayer y me molesta un poquito al morder', 45, 2),
      mkMsg('106-1', 'Hola Laura, es normal sentir una leve sensibilidad las primeras 48h. Sin embargo, podemos agendarte un ajuste oclusal sin costo adicional.', 42, 1, 'read'),
      mkMsg('106-2', 'Ah perfecto, voy a esperar a mañana a ver si mejora', 40, 2),
      mkMsg('106-3', 'Excelente Laura, quedamos atentos. Si persiste la molestia nos escribes y te asignamos turno prioritario.', 35, 1, 'read'),
    ],
  },
  {
    id: '107', title: 'Camilo Torres', avatar: 'CT', users: [1, 2], unread: 0,
    messages: [
      mkMsg('107-0', 'Hola buenas, ¿tienen parqueadero en la sede?', 55, 2),
      mkMsg('107-1', '¡Hola Camilo! Sí, contamos con parqueadero propio vigilado gratis para nuestros pacientes en el sótano del edificio.', 50, 1, 'read'),
      mkMsg('107-2', 'Excelente servicio, gracias!', 48, 2),
    ],
  },
  {
    id: '108', title: 'Andrés Mendoza', avatar: 'AM', users: [1, 2], unread: 1,
    messages: [
      mkMsg('108-0', 'Hola, hacen ortodoncia invisible con placas Alineadoras?', 60, 2),
      mkMsg('108-1', '¡Hola Andrés! Sí, somos especialistas en Alineadores Invisibles. Incluye escáner 3D inicial.', 50, 1, 'read'),
      mkMsg('108-2', '¿Cuánto tiempo dura el tratamiento promedio?', 2, 2),
    ],
  },
];

const sortConversations = (convs: Conversation[]) =>
  [...convs].sort((a, b) => {
    const lastA = a.messages[a.messages.length - 1]?.time.getTime() || 0;
    const lastB = b.messages[b.messages.length - 1]?.time.getTime() || 0;
    return lastB - lastA;
  });

const formatTime = (date: Date) =>
  date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

type ConversationsContextType = {
  conversations: Conversation[];
  sendMessage: (msg: string, convId: string, userId?: number) => void;
  setCurrentConversation: (id: string) => void;
  getCurrentConversation: () => Conversation | null;
};

const ConversationsContext = createContext<ConversationsContextType>({
  conversations: initialConversations,
  sendMessage: () => {},
  setCurrentConversation: () => {},
  getCurrentConversation: () => null,
});

function ConversationsProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(
    () => sortConversations(initialConversations)
  );
  const [currentId, setCurrentId] = useState<string | null>(null);

  const getCurrentConversation = useCallback(() => {
    return conversations.find(c => c.id === currentId) || null;
  }, [conversations, currentId]);

  const sendMessage = useCallback((newMsg: string, convId: string, userId = YOUR_USER_ID) => {
    if (!newMsg.trim()) return;
    const msg: Message = {
      id: `${convId}-${Date.now()}`,
      text: newMsg.trim(),
      time: new Date(),
      userID: userId,
      ...(userId === YOUR_USER_ID ? { status: 'delivered' } : {}),
    };
    setConversations(prev => {
      const updated = prev.map(conv => {
        if (conv.id === convId) {
          const messages = [...conv.messages];
          if (userId === OTHER_USER_ID) {
            const lastMyIdx = messages.map((m, i) => m.userID === YOUR_USER_ID ? i : -1).filter(i => i >= 0).pop();
            if (lastMyIdx !== undefined) {
              messages[lastMyIdx] = { ...messages[lastMyIdx], status: 'read' };
            }
          }
          return { ...conv, messages: [...messages, msg], unread: 0 };
        }
        return conv;
      });
      return sortConversations(updated);
    });
  }, []);

  const setCurrentConversation = useCallback((id: string) => {
    setCurrentId(id);
  }, []);

  return (
    <ConversationsContext.Provider value={{ conversations, sendMessage, setCurrentConversation, getCurrentConversation }}>
      {children}
    </ConversationsContext.Provider>
  );
}

const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

function Avatar({ name, colorIndex }: { name: string; colorIndex: number }) {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-xs shrink-0"
      style={{ backgroundColor: avatarColors[colorIndex % avatarColors.length] }}
    >
      {name}
    </div>
  );
}

function StatusIcon({ status }: { status?: MessageStatus }) {
  if (!status) return null;
  if (status === 'read') {
    return (
      <svg width="15" height="10" viewBox="0 0 16 11" fill="none" className="shrink-0">
        <path d="M1 5.5l3.5 3.5L10 1" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 5.5l3.5 3.5L15 1" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (status === 'delivered') {
    return (
      <svg width="15" height="10" viewBox="0 0 16 11" fill="none" className="shrink-0">
        <path d="M1 5.5l3.5 3.5L10 1" stroke="#8696A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 5.5l3.5 3.5L15 1" stroke="#8696A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  return (
    <svg width="15" height="10" viewBox="0 0 12 9" fill="none" className="shrink-0">
      <path d="M1 4.5l3.5 3.5L10 1" stroke="#8696A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ConversationPreview({ conversation, onSelect, colorIndex }: {
  conversation: Conversation;
  onSelect: (id: string) => void;
  colorIndex: number;
}) {
  const lastMsg = conversation.messages[conversation.messages.length - 1];
  const hasUnread = conversation.unread > 0;
  return (
    <button
      onClick={() => onSelect(conversation.id)}
      className="w-full flex items-center px-3 py-2.5 hover:bg-gray-100/80 transition-colors border-b border-gray-100 text-left"
    >
      <Avatar name={conversation.avatar} colorIndex={colorIndex} />
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-baseline justify-between">
          <span className="font-semibold text-xs text-[#1A1A1A]">{conversation.title}</span>
          {lastMsg && (
            <span className={`text-[10px] shrink-0 ml-2 ${hasUnread ? 'text-[#25D366] font-semibold' : 'text-gray-400'}`}>{formatTime(lastMsg.time)}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            {lastMsg && lastMsg.userID === YOUR_USER_ID && <StatusIcon status={lastMsg.status} />}
            <span className={`text-xs truncate ${hasUnread ? 'text-[#1A1A1A] font-medium' : 'text-gray-500'}`}>
              {lastMsg?.text || 'Sin mensajes'}
            </span>
          </div>
          {hasUnread && (
            <div className="bg-[#25D366] rounded-full min-w-[18px] h-4 flex items-center justify-center shrink-0 ml-2 px-1">
              <span className="text-white text-[9px] font-bold">{conversation.unread}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function ChatBubble({ message, isMine }: { message: Message; isMine: boolean }) {
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-1.5 px-3`}>
      <div
        className={`max-w-[80%] rounded-lg px-3 py-1.5 ${isMine ? 'bg-[#D9FDD3] rounded-tr-none' : 'bg-white rounded-tl-none'}`}
        style={{ boxShadow: '0 1px 1px rgba(0,0,0,0.06)' }}
      >
        <p className="text-xs text-[#1A1A1A] leading-relaxed">{message.text}</p>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[9px] text-gray-400">{formatTime(message.time)}</span>
          {isMine && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  );
}

function ChatList({ onSelectChat }: { onSelectChat: (id: string) => void }) {
  const { conversations } = useContext(ConversationsContext);
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {conversations.map((conv, i) => (
        <ConversationPreview key={conv.id} conversation={conv} onSelect={onSelectChat} colorIndex={i} />
      ))}
    </div>
  );
}

const backgrounds = [
  {
    name: 'Diamantes',
    value: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='%23e5ddd5' opacity='0.4'/%3E%3C/svg%3E")`,
  },
  {
    name: 'Puntos',
    value: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='%23ddd' /%3E%3C/svg%3E")`,
  },
];

function ChatMessages({ conversation, bgIndex }: { conversation: Conversation; bgIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversation.messages.length]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto py-2 scrollbar-thin"
      style={{ backgroundImage: backgrounds[bgIndex % backgrounds.length].value }}
    >
      <div className="flex flex-col">
        {conversation.messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} isMine={msg.userID === YOUR_USER_ID} />
        ))}
      </div>
    </div>
  );
}

function SendBar({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { sendMessage } = useContext(ConversationsContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (text.trim()) {
      setIsTyping(true);
      sendMessage(text, conversationId);
      setText('');
      setTimeout(() => setIsTyping(false), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#F0F0F0] px-2 py-1.5 flex items-center gap-1.5">
      <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center">
        <input
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          className="flex-1 outline-none text-xs bg-transparent"
        />
      </div>
      <button
        onClick={handleSend}
        className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors shrink-0"
      >
        {isTyping ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        )}
      </button>
    </div>
  );
}

const chatDemos: Record<string, { userId: number; text: string }[]> = {
  '101': [
    { userId: 2, text: 'Me sirve mucho a las 4:30 PM por favor' },
    { userId: 1, text: '¡Excelente! Cita reservada: Jueves 4:30 PM con la Dra. Morales 👩‍⚕️' },
    { userId: 1, text: 'Te enviamos la ubicación y recordatorio 2 horas antes.' },
    { userId: 2, text: 'Mil gracias por la atención!' },
  ],
  '102': [
    { userId: 2, text: 'Reciben tarjeta de crédito o Nequi?' },
    { userId: 1, text: '¡Sí! Recibimos todas las tarjetas de crédito, débito, Nequi y Daviplata.' },
    { userId: 1, text: '¿Te gustaría agendar una valoración gratuita?' },
    { userId: 2, text: 'Dale me parece bien, ¿tienen espacio el sábado?' },
    { userId: 1, text: '¡Claro! Tengo disponible el Sábado a las 10:00 AM.' },
  ],
  '103': [
    { userId: 2, text: 'Ya voy saliendo para allá' },
    { userId: 1, text: '¡Perfecto Ana! Te esperamos en el Consultorio 402.' },
    { userId: 1, text: 'Te atenderá el Dr. Ramírez de inmediato.' },
  ],
  '104': [
    { userId: 2, text: 'Súper. ¿Me regalas la dirección exacta?' },
    { userId: 1, text: 'Estamos en la Calle 10 # 43-20, Edificio Médicos de la 10, Piso 4.' },
    { userId: 1, text: '¿Te gustaría agendar tu cita de una vez?' },
  ],
  '105': [
    { userId: 2, text: 'El martes a las 9am estaría perfecto' },
    { userId: 1, text: '¡Listo Pedro! Tu cita quedó reprogramada para el Martes a las 9:00 AM.' },
  ],
  '106': [
    { userId: 2, text: 'Vale mil gracias, si algo aviso' },
    { userId: 1, text: '¡Con todo gusto Laura! Que tengas un feliz día 🦷' },
  ],
  '107': [
    { userId: 2, text: '¿En qué piso está el consultorio?' },
    { userId: 1, text: 'Estamos en el Piso 4, Consultorio 402. Hay ascensor directo.' },
  ],
  '108': [
    { userId: 2, text: 'Genial, ¿cuánto cuesta la valoración inicial?' },
    { userId: 1, text: 'La valoración con escáner 3D es gratuita si inicias tratamiento.' },
  ],
};

function ChatView({ conversation, onBack, bgIndex, onBgChange }: {
  conversation: Conversation;
  onBack: () => void;
  bgIndex: number;
  onBgChange: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2.5 shrink-0">
        <button
          onClick={onBack}
          className="text-white p-1 hover:bg-[#128C7E] rounded transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <Avatar name={conversation.avatar} colorIndex={parseInt(conversation.id)} />
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-xs truncate">{conversation.title}</div>
          <div className="text-[#87A8A4] text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
            en línea • Agente IA
          </div>
        </div>
      </div>
      <ChatMessages conversation={conversation} bgIndex={bgIndex} />
      <SendBar conversationId={conversation.id} />
    </div>
  );
}

type Tab = 'Chats' | 'Status' | 'Calls';

function MainScreen({ onSelectChat }: { onSelectChat: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('Chats');
  const tabs: Tab[] = ['Chats', 'Status', 'Calls'];

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-[#075E54] px-3 py-2.5 shrink-0 flex justify-between items-center">
        <div>
          <h1 className="text-white text-base font-bold leading-tight">WhatsApp</h1>
          <p className="text-[#87A8A4] text-[10px]">Clínica Sonrisas • Agente IA</p>
        </div>
      </div>
      <div className="flex bg-[#075E54] shrink-0">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-center text-xs font-semibold transition-colors relative ${activeTab === tab ? 'text-white' : 'text-[#87A8A4]'}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
      {activeTab === 'Chats' ? (
        <ChatList onSelectChat={onSelectChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white text-gray-400 text-xs">
          {tab => tab} - Próximamente
        </div>
      )}
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex flex-col items-center select-none w-full max-w-[340px]">
      <div
        className="relative rounded-[3rem] border-[8px] border-gray-900 bg-gray-900 overflow-visible w-full h-[580px] sm:h-[620px]"
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pt-[4px]">
          <div className="w-[80px] h-[5px] bg-gray-800 rounded-full" />
        </div>
        <div className="h-full w-full overflow-hidden rounded-[2.2rem] bg-[#EFEFEF]">
          {children}
        </div>
        <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 z-20">
          <div className="w-[90px] h-[4px] bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function WhatsAppInner() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [bgIndex] = useState(0);
  const { conversations, sendMessage, setCurrentConversation } = useContext(ConversationsContext);
  const cycleRef = useRef<{ convs: string[]; idx: number }>({ convs: ['101', '102', '103', '104', '105', '106', '107', '108'], idx: 0 });

  const handleSelectChat = (id: string) => {
    setCurrentConversation(id);
    setActiveChatId(id);
  };

  const handleBack = () => {
    setActiveChatId(null);
  };

  const handleBgChange = () => {};

  const activeConversation = activeChatId
    ? conversations.find(c => c.id === activeChatId)
    : null;

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const c = cycleRef.current;

    const runListPhase = () => {
      setActiveChatId(null);
      const listDuration = c.idx === 0 ? 15000 : 8000;
      timers.push(setTimeout(runChatPhase, listDuration));
    };

    const runChatPhase = () => {
      const convId = c.convs[c.idx % c.convs.length];
      c.idx++;
      setCurrentConversation(convId);
      setActiveChatId(convId);

      const demo = chatDemos[convId];
      if (demo) {
        demo.forEach((msg, i) => {
          const delay = 800 + i * 2200 + Math.random() * 500;
          timers.push(setTimeout(() => {
            sendMessage(msg.text, convId, msg.userId);
          }, delay));
        });
        const totalDelay = 800 + demo.length * 2200 + 3000;
        timers.push(setTimeout(runListPhase, totalDelay));
      } else {
        timers.push(setTimeout(runListPhase, 4000));
      }
    };

    timers.push(setTimeout(runListPhase, 500));

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="w-full flex items-center justify-center font-sans">
      <PhoneFrame>
        <div className="h-full w-full flex flex-col">
          {activeConversation ? (
            <ChatView conversation={activeConversation} onBack={handleBack} bgIndex={bgIndex} onBgChange={handleBgChange} />
          ) : (
            <MainScreen onSelectChat={handleSelectChat} />
          )}
        </div>
      </PhoneFrame>
    </div>
  );
}

export default function WhatsAppDemoWidget() {
  return (
    <ConversationsProvider>
      <WhatsAppInner />
    </ConversationsProvider>
  );
}
