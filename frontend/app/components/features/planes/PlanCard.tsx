import type { Plan } from "@/app/types/plan";
import BaseCard from "../../ui/BaseCard";
import UsuarioMini from "../perfiles/UsuarioMini";
import { CATEGORIAS } from "../../../constants/categorias";
import { ReactNode } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import DetalleBtn from "./DetalleBtn";
import MediaPlan from "../valoraciones/media-plan";

interface Props {
  plan: Plan;
  children?: ReactNode
}

/* Tarjeta de plan reutilizable: muestra creador, título, descripción, fecha, ubicación,
   plazas y categoría. Por children le pasamos los botones que cambian según el contexto
   (Join, Edit, Delete, Abandonar, etc.). */
const PlanCard = ({ plan, children }: Props) => {

    const dateObj = new Date(plan.fecha + "Z");
    const planTerminado = dateObj < new Date();

    const fechaFormateada = dateObj.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
    });

    const fechaFinal = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

    const hora = dateObj.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC"
    });

  return (

      <BaseCard boxShadow="3px 3px 0px"bgColor="#ffff" className="max-w-85">
        <div className="card-body">
          <div className="flex justify-between items-start gap-2">
            <UsuarioMini
              userId={plan.creator_id}
              nombre={plan.creador_nombre}
              username={plan.creador_username}
              avatar_url={plan.creador_avatar_url}
            />
            {planTerminado && (
              <MediaPlan notaMedia={plan.nota_media ? Number(plan.nota_media) : 0} />
            )}
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
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <p className="text-xs font-medium flex items-center gap-2">
              <FiCalendar className="h-3.5 w-3.5 shrink-0" />
              <span>{fechaFinal} • {hora}</span>
            </p>
            {plan.ubicacion && (
              <p className="text-xs text-base-content/60 flex items-center gap-2">
                <FiMapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="wrap-break-word">{plan.ubicacion}</span>
              </p>
            )}
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