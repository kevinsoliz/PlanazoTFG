// frontend/app/components/features/planes/ChatModalBtn.tsx
"use client";
import { useRouter } from "next/navigation";
import { BsChatFill } from "react-icons/bs";

export default function ChatModalBtn({ planId, planTitulo }: { planId: number, userName: string, userId: number, planTitulo: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/home/${planId}#chat`)}
      className="btn btn-primary btn-xs"
      aria-label={`Abrir chat del plan ${planTitulo}`}
    >
      <BsChatFill className="size-4" />
    </button>
  );
}