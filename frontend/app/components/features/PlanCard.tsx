import type { Plan } from "@/app/types/plan";
import BaseCard from "../ui/BaseCard";
import { CATEGORIAS } from "../../constants/categorias";
import { ReactNode } from "react";

interface Props {
  plan: Plan;
  children: ReactNode
}

const Plan = ({ plan, children }: Props) => {

    const fecha = new Date(plan.fecha).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
    const hora = new Date(plan.fecha).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit"
    })
    
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

            <span className="badge badge-sm badge-outline">{`${plan.aforo_max - plan.participants} plazas`}</span>
            <p className="text-xs">{`El ${fecha} a las ${hora} en ${plan.ubicacion}`}</p>
          </div>
          {/* Botones */}
          <div className="flex place-content-end gap-3">
            {children}
          </div>
          
        </div>
      </BaseCard>

  );
};

export default Plan;
