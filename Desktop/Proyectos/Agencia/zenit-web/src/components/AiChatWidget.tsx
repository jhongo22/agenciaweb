'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simulación de respuestas del Agente
const AGENT_RESPONSES = [
  "Hola, soy el agente de IA de Zenit. ¿En qué puedo ayudarte a escalar tu negocio hoy?",
  "Nuestras automatizaciones con n8n pueden ahorrarte hasta 20 horas a la semana. ¿Quieres saber cómo?",
  "Diseñamos ecosistemas digitales, no solo páginas web. ¿Cuál es tu mayor desafío actual?",
];

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'agent', text: string}[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ role: 'agent', text: AGENT_RESPONSES[0] }]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    setInputValue("");
    
    // Simular respuesta
    setTimeout(() => {
      const resp = AGENT_RESPONSES[Math.floor(Math.random() * (AGENT_RESPONSES.length - 1)) + 1];
      setMessages(prev => [...prev, { role: 'agent', text: resp }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-surface/90 backdrop-blur-xl border border-accent/20 rounded-none flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-accent/20 bg-background flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-none bg-accent flex items-center justify-center text-background font-mono font-bold text-lg">
                    [Z]
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent border-2 border-background rounded-none animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-accent font-mono font-black uppercase text-sm tracking-widest">Zenit.SYS</h3>
                  <p className="text-xs text-foreground/50 font-mono">ONLINE_</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-foreground/50 hover:text-accent font-mono text-xl transition-colors magnetic-area"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-background/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 text-sm font-mono ${
                      msg.role === 'user' 
                        ? 'bg-accent text-background border border-accent' 
                        : 'bg-surface text-foreground border border-accent/20'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-accent/20 bg-background">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="COMANDOS..."
                  className="w-full bg-surface border border-accent/20 rounded-none py-3 px-4 text-sm font-mono text-accent focus:outline-none focus:border-accent transition-colors uppercase"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 p-2 bg-accent hover:bg-foreground text-background transition-colors magnetic-area"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-accent rounded-none flex items-center justify-center shadow-2xl text-background relative group magnetic-area border border-background"
      >
        {isOpen ? (
          <span className="text-2xl font-mono">✕</span>
        ) : (
          <div className="font-mono font-black text-sm tracking-widest flex flex-col items-center">
            <span>SYS</span>
            <span className="w-full h-0.5 bg-background mt-1"></span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
