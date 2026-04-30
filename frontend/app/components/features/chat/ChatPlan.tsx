"use client";
import { useChat } from '@/app/hooks/useChat';

/**
 * ChatPlan - Componente de chat en tiempo real para un plan
 * Muestra:
 * - Historial de mensajes
 * - Indicador de conexión
 * - Formulario para enviar mensajes
 */
export default function ChatPlan({ planId, userName }: { planId: number, userName: string }) {
  const { messages, sendMessage, isConnected, error } = useChat(planId, userName);

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
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-base-100 rounded-xl overflow-hidden border border-neutral/20 shadow-xl">
      {/* HEADER - Título y estado de conexión */}
      <div className="bg-primary p-4 text-primary-content font-bold shadow-md flex items-center justify-between">
        <span>Chat en vivo</span>
        <div className="flex items-center gap-2">
          {/* Indicador de conexión */}
          <div className="flex items-center gap-1 text-sm font-normal">
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                isConnected 
                  ? 'bg-success animate-pulse' 
                  : 'bg-warning'
              }`}
              title={isConnected ? 'Conectado' : 'Conectando...'}
            />
            <span className="text-xs">
              {isConnected ? 'En línea' : 'Conectando...'}
            </span>
          </div>
        </div>
      </div>

      {/* MENSAJES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral/5">
        {/* Mostrar error de conexión si existe */}
        {error && (
          <div className="alert alert-warning shadow-lg">
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Mostrar mensajes */}
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-neutral/50">
            <p className="text-center text-sm">
              No hay mensajes aún.<br />
              ¡Sé el primero en escribir!
            </p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${
                m.user_name === userName ? 'items-end' : 'items-start'
              }`}
            >
              {/* Nombre del usuario */}
              <span className="text-[10px] opacity-50 mb-1 px-1">
                {m.user_name}
              </span>
              
              {/* Burbuja del mensaje */}
              <div
                className={`max-w-[85%] px-4 py-2 rounded-2xl break-words ${
                  m.user_name === userName 
                    ? 'bg-primary text-primary-content rounded-tr-none shadow-sm' 
                    : 'bg-base-200 text-base-content border border-neutral/10 rounded-tl-none shadow-sm'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* FORMULARIO */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-neutral/20 flex gap-2 bg-base-100"
      >
        <input 
          name="message" 
          className="input input-bordered flex-1 rounded-full px-4 text-sm" 
          placeholder={isConnected ? "Escribe un mensaje..." : "Conectando..."}
          disabled={!isConnected}
          autoComplete="off"
        />
        <button 
          type="submit" 
          className="btn btn-primary btn-circle btn-sm"
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