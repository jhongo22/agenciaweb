'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

// Simulación de respuestas del Agente
const AGENT_RESPONSES = [
  "Hola, soy el agente de IA de Autonomek. ¿En qué puedo ayudarte a escalar tu negocio hoy?",
  "Nuestros sistemas de automatización de tareas y procesos pueden ahorrarte hasta 20 horas de trabajo a la semana. ¿Quieres saber cómo?",
  "Diseñamos plataformas web inteligentes, no solo páginas simples. ¿Cuál es tu mayor desafío actual?",
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D62828] to-[#ff4d4d] flex items-center justify-center text-white shadow-[0_0_15px_rgba(214,40,40,0.4)]">
                    <Bot size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-white font-display font-bold text-sm tracking-wide">Autonomek AI Agent</h3>
                  <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest">En línea</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`mt-auto w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-[#D62828]/20'}`}>
                      {msg.role === 'user' ? <User size={12} className="text-white/70" /> : <Bot size={12} className="text-[#D62828]" />}
                    </div>
                    <div 
                      className={`p-3 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-[#D62828] text-white rounded-2xl rounded-tr-none shadow-[0_5px_15px_rgba(214,40,40,0.2)]' 
                          : 'bg-white/5 text-white/90 border border-white/10 rounded-2xl rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D62828]/50 focus:ring-1 focus:ring-[#D62828]/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-[#D62828] hover:bg-[#ff4d4d] disabled:opacity-50 disabled:hover:bg-[#D62828] text-white flex items-center justify-center transition-all shadow-[0_5px_15px_rgba(214,40,40,0.3)] hover:shadow-[0_8px_20px_rgba(214,40,40,0.4)] active:scale-95"
                >
                  <Send size={18} />
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
        className="w-14 h-14 bg-[#D62828] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(214,40,40,0.4)] text-white relative group border border-white/20 hover:bg-[#ff4d4d] transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#D62828] animate-bounce"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
