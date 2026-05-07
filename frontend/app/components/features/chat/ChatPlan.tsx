"use client";
import { useChat } from '@/app/hooks/useChat';
import { useRef, useEffect } from 'react';

export default function ChatPlan({ planId, userName, userId, canWrite }: { planId: number, userName: string, userId: number, canWrite: boolean }) {
  const { messages, sendMessage } = useChat(planId, userName, userId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatCreatedAt = (createdAt: string) => {
    try {
      return new Intl.DateTimeFormat('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(new Date(createdAt));
    } catch {
      return '';
    }
  };

  const getUserColor = (userId: number) => {
    // Genera un color HSL único basado en userId
    const hue = (userId * 137.5) % 360; // Distribución uniforme usando ángulo dorado
    return `hsl(${hue}, 65%, 88%)`; // Color claro y saturado
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canWrite) return;

    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    if (input.value) {
      sendMessage(input.value);
      form.reset();
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral/5">
        {messages.map((m, i) => (
          <div key={i} className={`chat ${m.user_name === userName ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={m.avatar || '/images/avatars/avatar-1.png'} alt={m.user_name} />
              </div>
            </div>
            <div className="chat-header">
              {m.user_name}
            </div>
            <div className="chat-bubble" style={{ backgroundColor: getUserColor(m.user_id) }}>
              {m.content}
            </div>
            <div className="chat-footer opacity-50 text-[11px]">
              {m.created_at ? formatCreatedAt(m.created_at) : ''}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {!canWrite && (
        <div className="px-4 py-3 text-sm text-neutral">
          Solo los usuarios apuntados pueden escribir en este chat.
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral/20 flex gap-2">
        <input 
          name="message" 
          disabled={!canWrite}
          className="input input-bordered flex-1 rounded-full px-4" 
          placeholder={canWrite ? "Escribe un mensaje..." : "Debes apuntarte para escribir"}
          autoComplete="off"
        />
        <button type="submit" disabled={!canWrite} className="btn btn-primary btn-circle bg-neutral disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.519 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </>
  );
}