import NavbarApp from "@/app/components/layout/NavbarApp";
import PageHeader from "@/app/components/ui/PageHeader";
import BaseCard from "@/app/components/ui/BaseCard";
import Avatar from "@/app/components/ui/Avatar";
import CounterBadge from "@/app/components/ui/CounterBadge";
import Countdown from "@/app/components/ui/Countdown";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

const plan = {
  titulo: "Cena italiana en La Latina",
  estado: "Próximo",
  fecha: "Sábado 15 de junio · 21:00",
  fechaIso: "2026-06-15T21:00:00+02:00",
  ubicacion: "Trattoria Il Faro, Madrid",
  plazasOcupadas: 3,
  aforoMax: 6,
  descripcion:
    "Cena tranquila en una trattoria de toda la vida. La idea es probar pasta fresca casera y compartir un par de botellas de vino italiano. Plan ideal para charlar sin prisas. Llegamos sobre las 21:00, podemos quedar antes si alguien quiere tomar algo cerca.",
  creador: {
    nombre: "Lucía García",
    username: "luciag",
    avatarUrl: null as string | null,
    descripcion:
      "Foodie incurable, siempre a la caza de trattorias auténticas. Me encanta cocinar pasta fresca los domingos.",
  },
  participantes: [
    {
      nombre: "Carlos Ruiz",
      username: "carlos_r",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Marta Sánchez",
      username: "martas",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Pablo Fernández",
      username: "pablof",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Andrea Gómez",
      username: "andreag",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Javier Moreno",
      username: "javim",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Lucía Torres",
      username: "luciat",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Miguel Castro",
      username: "miguelc",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Sara Jiménez",
      username: "saraj",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Diego Romero",
      username: "diegor",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Elena Navarro",
      username: "elenan",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Adrián Vega",
      username: "adrianv",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Paula Ortega",
      username: "paulao",
      avatarUrl: null as string | null,
    },
    {
      nombre: "Iván Delgado",
      username: "ivand",
      avatarUrl: null as string | null,
    },
  ],
};

const PlanDetallePlayground = () => {
  return (
    <>
      <NavbarApp />
      <main className="max-w-7xl mx-auto w-full pt-24 px-6 flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-stretch sticky top-21 z-10">
          <div className="flex-1 min-w-0">
            <PageHeader title={plan.titulo} />
          </div>
          <div className="shrink-0 flex flex-col gap-2 justify-center">
            <span className="badge badge-success badge-lg">{plan.estado}</span>
            <button className="btn btn-primary">Unirme</button>
          </div>
        </div>

        {/* Countdown */}
        <section className="flex justify-center">
          <Countdown targetDate={plan.fechaIso} />
        </section>

        <div className="flex flex-row gap-4 items-stretch">
          {/* Card del plan */}
          <div className="flex-1 min-w-0">
            <BaseCard bgColor="#ffff">
              <div className="grid md:grid-cols-2">
                {/* Detalles del plan */}
                <div className="p-6 flex flex-col gap-3 border-b-2 border-dashed border-neutral md:border-b-0 md:border-r-2">
                  <h2 className="text-lg font-semibold">Detalles</h2>
                  <div className="flex items-center gap-3">
                    <FiCalendar className="h-5 w-5 shrink-0" />
                    <span>{plan.fecha}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMapPin className="h-5 w-5 shrink-0" />
                    <span>{plan.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiUsers className="h-5 w-5 shrink-0" />
                    <span>
                      {plan.plazasOcupadas} de {plan.aforoMax} plazas ocupadas
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <h3 className="text-sm font-semibold opacity-70 uppercase tracking-wide">
                      Sobre el plan
                    </h3>
                    <p className="whitespace-pre-line">{plan.descripcion}</p>
                  </div>
                </div>

                {/* Info del creador */}
                <div className="p-6 flex flex-col gap-3">
                  <h2 className="text-lg font-semibold">Creador</h2>
                  <div className="flex items-center gap-4">
                    <Avatar
                      nombre={plan.creador.nombre}
                      url={plan.creador.avatarUrl}
                      size="md"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{plan.creador.nombre}</p>
                      <p className="text-sm opacity-70">
                        @{plan.creador.username}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{plan.creador.descripcion}</p>
                </div>
              </div>
            </BaseCard>
          </div>

          {/* Lista de participantes */}
          <aside className="w-87.5 shrink-0 relative">
            <div className="absolute inset-0 rounded-md border-2 overflow-hidden shadow-md flex flex-col">
              <header className="px-4 py-3 border-b-2 flex items-center justify-between gap-2">
                <h3 className="font-(family-name:--font-bagel-fat-one) text-lg text-neutral">
                  Participantes
                </h3>
                <CounterBadge
                  value={plan.participantes.length}
                  accent="#FCCE09"
                />
              </header>
              <ul className="list shadow-md flex-1 min-h-0 overflow-y-auto scrollbar-hide cursor-grab [mask-image:linear-gradient(to_bottom,black_calc(100%-2rem),transparent)]">
                {plan.participantes.map((p) => (
                  <li key={p.username} className="list-row">
                    <Avatar
                      nombre={p.nombre}
                      url={p.avatarUrl}
                      size="sm"
                    />
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
      </main>
    </>
  );
};

export default PlanDetallePlayground;
