import type { Plan } from "@/app/types/plan";
import BaseCard from "../ui/BaseCard";
import { CATEGORIAS } from "../../constants/categorias";
import { ReactNode } from "react";

interface Props {
  plan: Plan;
  children: ReactNode
}

const Plan = ({ plan, children }: Props) => {
  
  const dateObj = new Date(plan.fecha);

  // Formato: "Vie, 25 oct 2024"
  const fechaFormateada = dateObj.toLocaleDateString("es-ES", {
    weekday: "short", 
    day: "numeric",
    month: "short",   
    year: "numeric"
  });

  const fechaFinal = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

  const hora = dateObj.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <BaseCard boxShadow="0" bgColor="#ffff">
      <div className="card-body">
        <h2 className="card-title">{plan.titulo}</h2>
        <p className="text-sm text-base-content/70">{plan.descripcion}</p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {CATEGORIAS.filter((cat) => plan.categoria === cat.name).map(
            (cat) => (
              <span key={cat.name} className={`badge badge-sm ${cat.badge}`}>
                {cat.name}
              </span>
            ),
          )}

          <span className="badge badge-sm badge-outline">
            {`${plan.aforo_max - plan.participants} plazas disponibles`}
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <p className="text-xs font-medium text-base-content/80">
            📅 {fechaFinal} • {hora}
          </p>
          <p className="text-xs text-base-content/60">
            📍 {plan.ubicacion}
          </p>
        </div>

        <div className="flex place-content-end gap-3 mt-4">
          {children}
        </div>
        
      </div>
    </BaseCard>
  );
};

export default Plan;