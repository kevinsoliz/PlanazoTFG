import Avatar from "@/app/components/ui/Avatar";
import { CATEGORIAS } from "@/app/constants/categorias";
import { getPlan } from "@/app/services/planes";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const PlanDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const detalle = await getPlan(Number(id));

  if (!detalle) notFound();

  const { plan, participantes, plazas_disponibles } = detalle;

  const ahora = Date.now();
  const planTime = new Date(plan.fecha).getTime();
  const diffSec = Math.max(0, Math.floor((planTime - ahora) / 1000));
  const dias = Math.floor(diffSec / (60 * 60 * 24));
  const horas = Math.floor((diffSec % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((diffSec % (60 * 60)) / 60);
  const segundos = diffSec % 60;

  const categoria = CATEGORIAS.find((c) => c.name === plan.categoria);

  const fecha = new Date(plan.fecha).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Madrid",
  });
  const hora = new Date(plan.fecha).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });

  return (
    <main className="max-w-4xl mx-auto w-full py-9 px-6 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Avatar
          nombre={plan.creador_nombre}
          url={plan.creador_avatar_url}
          size="md"
        />
        <div>
          <p className="text-sm opacity-70">Creado por</p>
          <p className="font-medium">{`@${plan.creador_username}`}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-(family-name:--font-bagel-fat-one) text-neutral leading-none">
          {plan.titulo}
        </h1>
        {categoria && (
          <span className={`badge ${categoria.badge} self-start`}>
            {plan.categoria}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Empieza en</h2>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": dias } as React.CSSProperties}
                aria-live="polite"
                aria-label={`${dias} días`}
              >
                {dias}
              </span>
            </span>
            días
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": horas } as React.CSSProperties}
                aria-live="polite"
                aria-label={`${horas} horas`}
              >
                {horas}
              </span>
            </span>
            horas
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": minutos } as React.CSSProperties}
                aria-live="polite"
                aria-label={`${minutos} minutos`}
              >
                {minutos}
              </span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": segundos } as React.CSSProperties}
                aria-live="polite"
                aria-label={`${segundos} segundos`}
              >
                {segundos}
              </span>
            </span>
            seg
          </div>
        </div>
      </div>

      {plan.descripcion && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Sobre el plan</h2>
          <p className="whitespace-pre-line wrap-break-word">
            {plan.descripcion}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t-2 pt-4">
        <p>{fecha} a las {hora}</p>
        {plan.ubicacion && <p>{plan.ubicacion}</p>}
        <p>
          {participantes.length} / {plan.aforo_max} plazas
          {plazas_disponibles > 0 && ` (${plazas_disponibles} libres)`}
        </p>
      </div>
    </main>
  );
};

export default PlanDetailPage;
