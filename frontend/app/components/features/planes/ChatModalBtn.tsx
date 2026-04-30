// frontend/app/components/features/planes/ChatModalBtn.tsx
"use client";
import { useState } from "react";
import ChatPlan from "../chat/ChatPlan";

export default function ChatModalBtn({ planId, userName, planTitulo }: { planId: number, userName: string, planTitulo: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn btn-circle btn-ghost btn-sm"
        title="Abrir chat"
      >
        {/* Icono de mensaje (Heroicons o similar) */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3.75 0l1.232-1.232a.75.75 0 0 1 .53-.22h7.038a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v10.5a2.25 2.25 0 0 0 2.25 2.25h.75a.75.75 0 0 1 .75.75v1.75Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box p-0 max-w-md">
            <button 
              onClick={() => setIsOpen(false)} 
              className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
            >✕</button>
            <ChatPlan planId={planId} userName={userName} />
          </div>
          <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}