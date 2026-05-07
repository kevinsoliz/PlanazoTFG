// frontend/app/components/features/planes/ChatModalBtn.tsx
"use client";
import { useState } from "react";
import { BsChatFill } from "react-icons/bs";
import ChatPlan from "../chat/ChatPlan";

export default function ChatModalBtn({ planId, userName, userId, planTitulo }: { planId: number, userName: string, userId: number, planTitulo: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary btn-xs"
      >
        <BsChatFill className="size-4" />
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
              <ChatPlan planId={planId} userName={userName} userId={userId} canWrite={true} /> {/* En este modal, el usuario siempre puede escribir, ya que para abrirlo ya se ha comprobado que es participante. Si quieres ser más estricto, podrías pasar canWrite como prop desde el padre, pero en este caso lo dejamos siempre true. */}
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}