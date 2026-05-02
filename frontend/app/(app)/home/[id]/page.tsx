import Avatar from "@/app/components/ui/Avatar";
import BaseCard from "@/app/components/ui/BaseCard";
import CounterBadge from "@/app/components/ui/CounterBadge";
import Countdown from "@/app/components/ui/Countdown";
import PageHeader from "@/app/components/ui/PageHeader";
import { CATEGORIAS } from "@/app/constants/categorias";
import { getCurrentUser } from "@/app/services/auth-server";
import { getPlan } from "@/app/services/planes";
import { notFound } from "next/navigation";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

type EstadoPlan = "Próximo" | "Lleno" | "Pasado";

const ESTADOS = {
  "Próximo": { badge: "badge-success", mostrarCountdown: true, mensaje: "" },
  "Lleno": { badge: "badge-warning", mostrarCountdown: true, mensaje: "" },
  "Pasado": {
    badge: "badge-neutral",
    mostrarCountdown: false,
    mensaje: "Este plan ya tuvo lugar",
  },
} as const satisfies Record<EstadoPlan, unknown>;

type Rol = "no-participante" | "participante" | "creador";

type Props = {
  params: Promise<{ id: string }>;
};

const PlanDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const detalle = await getPlan(Number(id));
  if (!detalle) notFound();

  const { plan, participantes } = detalle;
  const userActual = await getCurrentUser();

  const planTime = new Date(plan.fecha).getTime();
  const estado: EstadoPlan =
    planTime < Date.now()
      ? "Pasado"
      : participantes.length >= plan.aforo_max
        ? "Lleno"
        : "Próximo";
  const estadoConfig = ESTADOS[estado];

  const rolActual: Rol = !userActual
    ? "no-participante"
    : userActual.id === plan.creator_id
      ? "creador"
      : participantes.some((p) => p.id === userActual.id)
        ? "participante"
        : "no-participante";

  const fechaTexto = new Date(plan.fecha).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Madrid",
  });
  const horaTexto = new Date(plan.fecha).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });
  const fechaMostrada = `${fechaTexto} · ${horaTexto}`;

  const categoria = CATEGORIAS.find((c) => c.name === plan.categoria);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch lg:sticky lg:top-24 z-10">
        <div className="flex-1 min-w-0">
          <PageHeader title={plan.titulo} />
        </div>
        <div className="shrink-0 flex flex-row gap-2 items-center">
          <span className={`badge ${estadoConfig.badge} badge-lg`}>
            {estado}
          </span>
          {rolActual === "no-participante" && (
            <button className="btn btn-primary btn-sm">Unirme</button>
          )}
          {rolActual === "participante" && (
            <button className="btn btn-error btn-sm">Abandonar</button>
          )}
          {rolActual === "creador" && (
            <>
              <button className="btn btn-success btn-sm">Editar</button>
              <button className="btn btn-warning btn-sm">Anular</button>
              <button className="btn btn-error btn-sm">Borrar</button>
            </>
          )}
        </div>
      </div>

      <section className="flex justify-center">
        {estadoConfig.mostrarCountdown ? (
          <Countdown targetDate={plan.fecha} />
        ) : (
          <div className="border-2 rounded-md px-8 py-6 text-center font-(family-name:--font-bagel-fat-one) text-2xl text-neutral">
            {estadoConfig.mensaje}
          </div>
        )}
      </section>

      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
        <div className="flex-1 min-w-0">
          <BaseCard bgColor="#ffff" className="overflow-hidden">
            <div className="grid lg:grid-cols-[2fr_1fr]">
              <div className="p-6 flex flex-col gap-3 border-b-2 border-dashed border-neutral lg:border-b-0 lg:border-r-2 bg-white text-neutral">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-(family-name:--font-bagel-fat-one) text-lg">
                    Detalles
                  </h2>
                  {categoria && (
                    <span className={`badge ${categoria.badge}`}>
                      {plan.categoria}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar className="h-5 w-5 shrink-0" />
                  <span>{fechaMostrada}</span>
                </div>
                {plan.ubicacion && (
                  <div className="flex items-center gap-3">
                    <FiMapPin className="h-5 w-5 shrink-0" />
                    <span>{plan.ubicacion}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <FiUsers className="h-5 w-5 shrink-0" />
                  <span>
                    {participantes.length} de {plan.aforo_max} plazas ocupadas
                  </span>
                </div>

                {plan.descripcion && (
                  <div className="flex flex-col gap-2 mt-2">
                    <h3 className="text-sm font-semibold opacity-70 uppercase tracking-wide">
                      Sobre el plan
                    </h3>
                    <p className="whitespace-pre-line">{plan.descripcion}</p>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-3 bg-base-200">
                <h2 className="font-(family-name:--font-bagel-fat-one) text-lg text-neutral">
                  Creador
                </h2>
                <div className="flex items-center gap-4">
                  <Avatar
                    nombre={plan.creador_nombre}
                    url={plan.creador_avatar_url}
                    size="md"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{plan.creador_nombre}</p>
                    <p className="text-sm opacity-70">
                      @{plan.creador_username}
                    </p>
                  </div>
                </div>
                {plan.creador_descripcion && (
                  <p className="text-sm">{plan.creador_descripcion}</p>
                )}
              </div>
            </div>
          </BaseCard>
        </div>

        <aside className="w-full lg:w-87.5 lg:shrink-0 lg:relative">
          <div className="rounded-md border-2 overflow-hidden shadow-md flex flex-col lg:absolute lg:inset-0">
            <header className="px-4 py-3 flex items-center justify-between gap-2 bg-neutral text-[#E0604D]">
              <h3 className="font-(family-name:--font-bagel-fat-one) text-lg">
                Participantes
              </h3>
              <CounterBadge value={participantes.length} accent="#FCCE09" />
            </header>
            <ul className="list shadow-md flex-1 min-h-0 overflow-y-auto scrollbar-hide cursor-grab lg:[mask-image:linear-gradient(to_bottom,black_calc(100%-2rem),transparent)]">
              {participantes.map((p) => (
                <li key={p.id} className="list-row">
                  <Avatar nombre={p.nombre} url={p.avatar_url} size="sm" />
                  <div className="list-col-grow">
                    <div className="font-medium">{p.nombre}</div>
                    <div className="text-xs font-semibold opacity-60">
                      @{p.username}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="rounded-md border-2 overflow-hidden shadow-md">
        <header className="px-4 py-3 bg-neutral text-[#E0604D]">
          <h3 className="font-(family-name:--font-bagel-fat-one) text-lg">
            Chat del plan
          </h3>
        </header>
        <div className="min-h-96 flex items-center justify-center p-6 opacity-40">
          <p className="text-sm">Aquí irá el chat</p>
        </div>
      </section>
    </div>
  );
};

export default PlanDetailPage;
