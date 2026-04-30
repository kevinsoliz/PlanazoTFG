"use client";
import { useChat } from '@/app/hooks/useChat';
import { useRef, useEffect } from 'react';

export default function ChatPlan({ planId, userName }: { planId: number, userName: string }) {
  const { messages, sendMessage } = useChat(planId, userName);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    if (input.value) {
      sendMessage(input.value);
      form.reset();
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-base-100 rounded-xl overflow-hidden border border-neutral/20 shadow-xl">
      <div className="bg-primary p-4 text-primary-content font-bold shadow-md">
        Chat en vivo
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral/5">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.user_name === userName ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] opacity-50 mb-1 px-1">{m.user_name}</span>
            <div className={`max-w-[85%] px-4 py-2 rounded-2xl ${
              m.user_name === userName 
                ? 'bg-primary text-primary-content rounded-tr-none' 
                : 'bg-base-200 text-base-content border border-neutral/10 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral/20 flex gap-2">
        <input 
          name="message" 
          className="input input-bordered flex-1 rounded-full px-4" 
          placeholder="Escribe un mensaje..."
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.519 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}