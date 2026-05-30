"use client";

import { useState } from "react";
import type { Plan } from "@/app/types/plan";
import PlanCard from "./PlanCard";
import AbandonarBtn from "./AbandonarBtn";
import ChatModalBtn from "./ChatModalBtn";
import FavoritoBtn from "./FavoritoBtn";
import JoinBtn from "./JoinBtn";

interface Props {
  apuntados: Plan[];
  favoritos: Plan[];
  userName: string;
  userId: number;
}

type Tab = "apuntados" | "favoritos";

/* Columna derecha de "mis planes" en desktop: alterna entre apuntados y
   favoritos con pestañas. Es cliente porque el cambio de pestaña vive en
   estado, lo que permite poner título (fuente propia) y contador (badge)
   como elementos aparte dentro de cada botón. */
const MisPlanesDesktopTabs = ({ apuntados, favoritos, userName, userId }: Props) => {
  const [tab, setTab] = useState<Tab>("apuntados");

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div role="tablist" className="tabs tabs-box">
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

      {tab === "apuntados" ? (
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
      ) : (
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

export default MisPlanesDesktopTabs;
