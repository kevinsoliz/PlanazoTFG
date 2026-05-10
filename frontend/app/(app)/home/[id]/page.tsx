import UsuarioMini from "@/app/components/features/perfiles/UsuarioMini";
import AbandonarBtn from "@/app/components/features/planes/AbandonarBtn";
import DeleteBtn from "@/app/components/features/planes/DeleteBtn";
import EditBtn from "@/app/components/features/planes/EditBtn";
import JoinBtn from "@/app/components/features/planes/JoinBtn";
import BaseCard from "@/app/components/ui/BaseCard";
import CounterBadge from "@/app/components/ui/CounterBadge";
import Countdown from "@/app/components/ui/Countdown";
import PageHeader from "@/app/components/ui/PageHeader";
import { CATEGORIAS } from "@/app/constants/categorias";
import { getCurrentUser } from "@/app/services/auth-server";
import { getPlan } from "@/app/services/planes";
import { notFound } from "next/navigation";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import ChatPlan from "@/app/components/features/chat/ChatPlan";

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

  const ahoraWallClock = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .replace(" ", "T");
  const estado: EstadoPlan =
    plan.fecha < ahoraWallClock
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

  const puedeEscribir = rolActual !== "no-participante";

  const fechaTexto = new Date(plan.fecha + "Z").toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  const horaTexto = new Date(plan.fecha + "Z").toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
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
          {rolActual === "no-participante" && <JoinBtn plan_id={plan.id} />}
          {rolActual === "participante" && <AbandonarBtn plan_id={plan.id} />}
          {rolActual === "creador" && (
            <>
              <EditBtn plan={plan} />
              <DeleteBtn plan_id={plan.id} />
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
                <UsuarioMini
                  userId={plan.creator_id}
                  nombre={plan.creador_nombre}
                  username={plan.creador_username}
                  avatar_url={plan.creador_avatar_url}
                />
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
                  <UsuarioMini
                    userId={p.id}
                    nombre={p.nombre}
                    username={p.username}
                    avatar_url={p.avatar_url}
                    size="sm"
                  />
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
        <div className="h-125 flex flex-col bg-base-100">
           <ChatPlan planId={plan.id} userName={userActual? userActual.nombre : ""} userId={userActual?.id || 0} canWrite={puedeEscribir} /> {/* Pasamos el userId para que el chat pueda identificar los mensajes del usuario actual y mostrar un estilo diferente, además de para la autorización de envío de mensajes */}
        </div>
      </section>
    </div>
  );
};

export default PlanDetailPage;
