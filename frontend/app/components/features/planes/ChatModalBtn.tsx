// frontend/app/components/features/planes/ChatModalBtn.tsx
"use client";
import { useRouter } from "next/navigation";

/**
 * ChatModalBtn - Botón para acceder al chat de un plan
 * 
 * Funcionalidad:
 * - Click abre el chat del plan en una página dedicada
 * - Mejor UX que un modal para un chat completo
 * - Acceso a conversaciones con mejor espacio
 */
export default function ChatModalBtn({ 
  planId, 
  userName, 
  planTitulo 
}: { 
  planId: number
  userName: string
  planTitulo: string 
}) {
  const router = useRouter();

  /**
   * handleChatClick - Navegar a la página de chat del plan
   */
  const handleChatClick = () => {
    router.push(`/plan-chat/${planId}`);
  };

  return (
    <button 
      onClick={handleChatClick}
      className="btn btn-circle btn-ghost btn-sm hover:bg-primary/20 transition-colors"
      title={`Abrir chat de ${planTitulo}`}
    >
      {/* Icono de mensaje (Heroicons) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-5 h-5"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3.75 0l1.232-1.232a.75.75 0 0 1 .53-.22h7.038a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v10.5a2.25 2.25 0 0 0 2.25 2.25h.75a.75.75 0 0 1 .75.75v1.75Z" 
        />
      </svg>
    </button>
  );
}