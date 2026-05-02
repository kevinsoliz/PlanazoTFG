import Avatar from "@/app/components/ui/Avatar";
import JoinBtn from "@/app/components/features/planes/JoinBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import { CATEGORIAS } from "@/app/constants/categorias";
import type { Plan } from "@/app/types/plan";

// Datos mock — esta vista es solo diseño de momento, sin lógica de fetch
const perfil = {
  nombre: "Lucía García",
  username: "luciag",
  avatar_url: "/images/avatars/avatar-3.png",
  descripcion:
    "Foodie incurable, siempre a la caza de trattorias auténticas. Me encanta cocinar pasta fresca los domingos.",
  categorias: "Gastronomía,Cultura,Música",
};

const planes: Plan[] = [
  {
    id: 1,
    creator_id: 1,
    titulo: "Cena italiana en La Latina",
    categoria: "Gastronomía",
    descripcion:
      "Cena tranquila en una trattoria de toda la vida. Probamos pasta fresca casera y compartimos un par de botellas de vino italiano.",
    fecha: "2026-06-15T21:00:00+02:00",
    ubicacion: "Trattoria Il Faro, Madrid",
    aforo_max: 6,
    participants: 3,
    created_at: "2026-04-01T10:00:00+02:00",
    creador_nombre: perfil.nombre,
    creador_username: perfil.username,
    creador_avatar_url: perfil.avatar_url,
  },
  {
    id: 2,
    creator_id: 1,
    titulo: "Visita al Museo del Prado",
    categoria: "Cultura",
    descripcion:
      "Recorrido por la exposición temporal y los clásicos. Comemos algo después por el barrio.",
    fecha: "2026-05-20T11:00:00+02:00",
    ubicacion: "Museo del Prado, Madrid",
    aforo_max: 8,
    participants: 5,
    created_at: "2026-04-05T10:00:00+02:00",
    creador_nombre: perfil.nombre,
    creador_username: perfil.username,
    creador_avatar_url: perfil.avatar_url,
  },
  {
    id: 3,
    creator_id: 1,
    titulo: "Concierto de jazz en el Café Central",
    categoria: "Música",
    descripcion:
      "Concierto íntimo en uno de los locales más míticos. Vamos pronto para coger sitio.",
    fecha: "2026-06-22T22:00:00+02:00",
    ubicacion: "Café Central, Madrid",
    aforo_max: 4,
    participants: 2,
    created_at: "2026-04-10T10:00:00+02:00",
    creador_nombre: perfil.nombre,
    creador_username: perfil.username,
    creador_avatar_url: perfil.avatar_url,
  },
];

const UsuarioPage = () => {
  const userCategorias = perfil.categorias.split(",");

  return (
    <div className="flex flex-col gap-9">
      {/* Hero del perfil */}
      <section className="flex flex-col sm:flex-row gap-6 p-6 border-2 rounded-md lg:sticky lg:top-24 z-10 backdrop-blur-md bg-base-100/40 shadow-md">
        <div className="flex flex-col items-center border-2 rounded-2xl sm:rounded-full py-6 px-4 bg-white">
          <Avatar
            nombre={perfil.nombre}
            url={perfil.avatar_url}
            size="lg"
          />
          <h2 className="font-bold text-xl">{perfil.nombre}</h2>
          <p className="text-sm text-neutral/60">{`@${perfil.username}`}</p>
        </div>
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <h3 className="font-(family-name:--font-bagel-fat-one) text-2xl text-neutral">
            Sobre mí
          </h3>
          <p className="text-sm">{perfil.descripcion}</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.filter((cat) => userCategorias.includes(cat.name)).map(
              (cat) => (
                <span key={cat.name} className={`badge badge-sm ${cat.badge}`}>
                  {cat.name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Grid de planes del usuario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <PlanCard key={plan.id} plan={plan}>
            <JoinBtn plan_id={plan.id} />
          </PlanCard>
        ))}
      </div>
    </div>
  );
};

export default UsuarioPage;
