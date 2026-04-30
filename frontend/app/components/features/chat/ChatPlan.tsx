"use client";
import { useChat } from '@/app/hooks/useChat';
import { useEffect, useRef } from 'react';

/**
 * ChatPlan - Componente de chat en tiempo real para un plan
 * 
 * Funcionalidades:
 * - Historial de mensajes con auto-scroll
 * - Indicador de conexión en tiempo real
 * - Formulario para enviar mensajes
 * - Manejo de errores de conexión
 * - Responsive en mobile y desktop
 */
export default function ChatPlan({ planId, userName }: { planId: number, userName: string }) {
  const { messages, sendMessage, isConnected, error } = useChat(planId, userName);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * useEffect - Auto-scroll hacia el último mensaje
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * handleSubmit - Procesar el envío del formulario del chat
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    
    if (input.value.trim()) {
      sendMessage(input.value);
      form.reset();
      // Mantener focus en el input
      input.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-100 rounded-lg overflow-hidden border border-neutral/20 shadow-xl">
      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-content font-bold shadow-md flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M4.913 18.1q-.896 0-1.405-.509Q3 17.082 3 16.187V4.882q0-.896.508-1.404Q4.017 3 4.913 3h14.174q.896 0 1.405.509.509.508.509 1.404v11.305q0 .896-.509 1.405-.509.509-1.405.509H6.46l-1.547 2.107q-.36.508-.918.508-.286 0-.525-.13-.24-.13-.386-.393-.145-.264-.145-.567V18.1Z" />
          </svg>
          <span>Chat en vivo</span>
        </div>
        
        {/* Indicador de conexión */}
        <div className="flex items-center gap-1.5 text-xs font-normal bg-white/20 px-3 py-1 rounded-full">
          <div
            className={`w-2 h-2 rounded-full transition-all ${
              isConnected 
                ? 'bg-success animate-pulse' 
                : 'bg-warning'
            }`}
            title={isConnected ? 'Conectado' : 'Conectando...'}
          />
          <span>
            {isConnected ? 'En línea' : 'Conectando...'}
          </span>
        </div>
      </div>

      {/* ===== ÁREA DE MENSAJES ===== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral/2 scroll-smooth">
        {/* Mostrar error de conexión si existe */}
        {error && (
          <div className="alert alert-warning shadow-lg rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7m0 6h4.5M7.5 12H3m4.5 0H3m13.5 0h4.5" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Mostrar mensajes */}
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-neutral/50">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm font-medium">No hay mensajes aún</p>
              <p className="text-xs">¡Sé el primero en escribir!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex flex-col gap-1 ${
                  m.user_name === userName ? 'items-end' : 'items-start'
                }`}
              >
                {/* Nombre del usuario */}
                <span className="text-[11px] opacity-60 px-2 font-medium">
                  {m.user_name === userName ? 'Tú' : m.user_name}
                </span>
                
                {/* Burbuja del mensaje */}
                <div
                  className={`px-4 py-2.5 rounded-2xl break-words max-w-[85%] md:max-w-[70%] shadow-sm transition-all ${
                    m.user_name === userName 
                      ? 'bg-primary text-primary-content rounded-br-none' 
                      : 'bg-base-300 text-base-content rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            {/* Elemento invisible para auto-scroll */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* ===== FORMULARIO ===== */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-neutral/20 flex gap-2 bg-base-100 flex-shrink-0"
      >
        <input 
          name="message" 
          className="input input-bordered flex-1 rounded-full px-4 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-primary/50" 
          placeholder={isConnected ? "Escribe un mensaje..." : "Conectando..."}
          disabled={!isConnected}
          autoComplete="off"
          autoFocus
        />
        <button 
          type="submit" 
          className={`btn btn-primary btn-circle btn-sm h-10 w-10 flex items-center justify-center transition-all ${
            isConnected ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isConnected}
          title={isConnected ? "Enviar" : "Desconectado"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.519 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}