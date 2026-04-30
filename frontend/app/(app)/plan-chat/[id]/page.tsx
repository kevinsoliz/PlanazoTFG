"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/app/components/ui/PageHeader";
import ChatPlan from "@/app/components/features/chat/ChatPlan";
import { useRouter } from "next/navigation";

/**
 * PlanChatPage - Página dedicada para visualizar y usar el chat de un plan
 * Ruta: /plan-chat/[id]
 * 
 * Esta página permite:
 * - Ver el plan en detalle
 * - Acceder al chat en tiempo real
 * - Comunicarse con otros miembros del plan
 */
export default function PlanChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const planId = parseInt(params.id);
  const [userName, setUserName] = useState<string>("Usuario");
  const [planTitle, setPlanTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  /**
   * useEffect - Obtener información del usuario y del plan
   */
  useEffect(() => {
    const fetchUserAndPlan = async () => {
      try {
        // Obtener nombre del usuario
        const authResponse = await fetch("/api/auth/me", {
          credentials: "include"
        });
        
        if (authResponse.ok) {
          const authData = await authResponse.json();
          setUserName(authData.user?.nombre || "Usuario");
        }

        // Obtener información del plan
        const planResponse = await fetch(`/api/planes/${planId}`, {
          credentials: "include"
        });
        
        if (planResponse.ok) {
          const planData = await planResponse.json();
          setPlanTitle(planData.titulo || `Plan #${planId}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPlan();
  }, [planId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen gap-4">
      {/* Header */}
      <PageHeader
        title={`Chat - ${planTitle}`}
        subtitle="Comunícate con los participantes de este plan"
      />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col px-4 pb-4 max-w-6xl mx-auto w-full">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm mb-4 w-fit"
        >
          ← Volver
        </button>

        {/* Chat Component */}
        <div className="flex-1 rounded-lg shadow-lg overflow-hidden border border-neutral/20">
          <ChatPlan 
            planId={planId} 
            userName={userName}
          />
        </div>
      </div>
    </div>
  );
}
