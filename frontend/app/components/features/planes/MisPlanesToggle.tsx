"use client";

import { useState } from "react";
import type { Plan } from "@/app/types/plan";
import PlanCard from "./PlanCard";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import AbandonarBtn from "./AbandonarBtn";
import ChatModalBtn from "./ChatModalBtn";
import FavoritoBtn from "./FavoritoBtn";
import JoinBtn from "./JoinBtn";

interface Props {
  creados: Plan[];
  apuntados: Plan[];
  favoritos?: Plan[];
  userName: string;
  userId: number;
}

type Tab = "creados" | "apuntados" | "favoritos";

// Solo se ve en móvil. Alterna entre creados, apuntados y favoritos con pestañas.
const MisPlanesToggle = ({ creados, apuntados, favoritos = [], userName, userId }: Props) => {
  const [tab, setTab] = useState<Tab>("creados");

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" className="tabs tabs-box">
        <button
          role="tab"
          className={`tab ${tab === "creados" ? "tab-active" : ""}`}
          onClick={() => setTab("creados")}
        >
          <span className="font-(family-name:--font-bagel-fat-one)">Creados</span>
          <span className="badge badge-sm badge-warning ml-2">{creados.length}</span>
        </button>
        <button
          role="tab"
          className={`tab ${tab === "apuntados" ? "tab-active" : ""}`}
          onClick={() => setTab("apuntados")}
        >
          <span className="font-(family-name:--font-bagel-fat-one)">Apuntados</span>
          <span className="badge badge-sm badge-warning ml-2">{apuntados.length}</span>
        </button>
        <button
          role="tab"
          className={`tab ${tab === "favoritos" ? "tab-active" : ""}`}
          onClick={() => setTab("favoritos")}
        >
          <span className="font-(family-name:--font-bagel-fat-one)">Favoritos</span>
          <span className="badge badge-sm badge-warning ml-2">{favoritos.length}</span>
        </button>
      </div>

      {tab === "creados" && (
        <div className="flex flex-col gap-4">
          {creados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <DeleteBtn plan_id={plan.id} />
              <EditBtn plan={plan} />
              <ChatModalBtn planId={plan.id} userName={userName} userId={userId} planTitulo={plan.titulo} />
            </PlanCard>
          ))}
        </div>
      )}

      {tab === "apuntados" && (
        <div className="flex flex-col gap-4">
          {apuntados.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              favorito={<FavoritoBtn plan_id={plan.id} es_favorito={plan.es_favorito ?? false} />}
            >
              <AbandonarBtn plan_id={plan.id} />
              <ChatModalBtn planId={plan.id} userName={userName} userId={userId} planTitulo={plan.titulo} />
            </PlanCard>
          ))}
        </div>
      )}

      {tab === "favoritos" && (
        <div className="flex flex-col gap-4">
          {favoritos.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              favorito={<FavoritoBtn plan_id={plan.id} es_favorito={plan.es_favorito ?? true} />}
            >
              <JoinBtn plan_id={plan.id} />
            </PlanCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPlanesToggle;
