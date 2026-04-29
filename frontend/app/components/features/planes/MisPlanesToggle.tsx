"use client";

import { useState } from "react";
import type { Plan } from "@/app/types/plan";
import PlanCard from "./PlanCard";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import AnularBtn from "./AnularBtn";
import CounterBadge from "@/app/components/ui/CounterBadge";

interface Props {
  creados: Plan[];
  apuntados: Plan[];
}

// Este componente solo se ve en la versión móvil
// Controla el toggler con el state showCreados (los planes creados se muestran por defecto)

const MisPlanesToggle = ({ creados, apuntados }: Props) => {
  const [showCreados, setShowCreados] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      {/* toggler con sus labels */}
      <div className="flex items-center justify-center gap-3">
        <span className="font-bold">Apuntados</span>
        <input
          type="checkbox"
          checked={showCreados}
          onChange={(e) => setShowCreados(e.target.checked)}
          className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
        />
        <span className="font-bold">Creados</span>
      </div>

      {showCreados ? (
        <section className="flex flex-col gap-4">
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 sticky top-50 z-5 backdrop-blur-md bg-base-100/40 mx-3">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Has creado
            </h2>
            <CounterBadge value={creados.length} accent="#F87A36" />
          </header>
          {creados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <DeleteBtn plan_id={plan.id} />
              <EditBtn plan={plan} />
            </PlanCard>
          ))}
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 sticky top-50 z-5 backdrop-blur-md bg-base-100/40 mx-3">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Te has apuntado a
            </h2>
            <CounterBadge value={apuntados.length} accent="#FCCE09" />
          </header>
          {apuntados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <AnularBtn plan_id={plan.id} />
            </PlanCard>
          ))}
        </section>
      )}
    </div>
  );
};

export default MisPlanesToggle;
