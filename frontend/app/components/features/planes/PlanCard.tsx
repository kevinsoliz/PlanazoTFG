import type { Plan } from "@/app/types/plan";
import BaseCard from "../../ui/BaseCard";
import Avatar from "../../ui/Avatar";
import { CATEGORIAS } from "../../../constants/categorias";
import { ReactNode } from "react";
import DetalleBtn from "./DetalleBtn";

interface Props {
  plan: Plan;
  children?: ReactNode
}

const PlanCard = ({ plan, children }: Props) => {

    const fecha = new Date(plan.fecha).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Madrid"
    })
    const hora = new Date(plan.fecha).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid"
    })
    
  return (

      <BaseCard boxShadow="3px 3px 0px"bgColor="#ffff" className="max-w-85">
        <div className="card-body">
          <div className="flex items-center gap-2">
            <Avatar
              nombre={plan.creador_nombre}
              url={plan.creador_avatar_url}
              size="md"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{plan.creador_nombre}</span>
              <span className="text-xs opacity-70">{`@${plan.creador_username}`}</span>
            </div>
          </div>
          <h2 className="card-title line-clamp-2">{plan.titulo}</h2>
          <p className="text-sm text-base-content/70 wrap-break-word line-clamp-2">{plan.descripcion}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {CATEGORIAS.filter((cat) => plan.categoria === cat.name).map(
              (cat) => (
                <span key={cat.name} className={`badge badge-sm ${cat.badge}`}>
                  {cat.name}
                </span>
              ),
            )}

            <span className="badge badge-sm badge-outline">{`${plan.aforo_max - plan.participants} plazas`}</span>
            <p className="text-xs wrap-break-word">{`El ${fecha} a las ${hora} en ${plan.ubicacion}`}</p>
          </div>
          {/* Botones */}
          <div className="flex place-content-end gap-3">
            <DetalleBtn plan_id={plan.id} />
            {children}
          </div>
          
        </div>
      </BaseCard>

  );
};

export default PlanCard;

/*
Datos: la clase wrap-break-word es para cortar palabras largas. TODO: Se podría validar ese aspecto en la descripción:
No permitir la entrada de palabras largas y sin sentido.
*/