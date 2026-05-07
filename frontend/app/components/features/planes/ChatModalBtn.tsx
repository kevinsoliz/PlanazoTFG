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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
      </svg>

      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box p-0 max-w-2xl w-11/12 h-200 flex flex-col">
            <div className="px-4 py-3 bg-neutral text-[#E0604D] flex items-center justify-between">
              <h3 className="font-(family-name:--font-bagel-fat-one) text-lg">
                {planTitulo}
              </h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="btn btn-sm btn-circle btn-ghost"
              >✕</button>
            </div>
            <div className="flex-1 flex flex-col bg-base-100 overflow-hidden">
              <ChatPlan planId={planId} userName={userName} />
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}