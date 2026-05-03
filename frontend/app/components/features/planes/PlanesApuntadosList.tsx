import { getPlanesApuntados } from "@/app/services/planes";
import Avatar from "../../ui/Avatar";

const PlanesApuntadosList = async () => {
  const planes = await getPlanesApuntados();

  if (planes.length === 0) {
    return (
      <p className="px-4 py-3 text-sm opacity-60">
        No tienes planes apuntados todavia.
      </p>
    );
  }

  return (
    <ul className="list shadow-md max-h-96 overflow-y-auto scrollbar-hide cursor-grab [mask-image:linear-gradient(to_bottom,black_calc(100%-2rem),transparent)]">
      {planes.map((plan) => {
        const fecha = new Date(plan.fecha).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          timeZone: "Europe/Madrid",
        });
        const hora = new Date(plan.fecha).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Madrid",
        });
        return (
          <li key={plan.id} className="list-row">
            <Avatar
              nombre={plan.creador_nombre}
              url={plan.creador_avatar_url}
              size="sm"
            />
            <div className="list-col-grow">
              <div className="font-medium">{plan.titulo}</div>
              <div className="text-xs font-semibold opacity-60">
                {`${fecha} a las ${hora}${plan.ubicacion ? ` en ${plan.ubicacion}` : ""}`}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PlanesApuntadosList;
