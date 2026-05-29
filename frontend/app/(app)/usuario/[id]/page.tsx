import Avatar from "@/app/components/ui/Avatar";
import FavoritoBtn from "@/app/components/features/planes/FavoritoBtn";
import JoinBtn from "@/app/components/features/planes/JoinBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import { CATEGORIAS } from "@/app/constants/categorias";
import { getPerfilPorId } from "@/app/services/perfiles";
import { getPlanesCreadosPor, getPlanesApuntados } from "@/app/services/planes";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

// Perfil público de otro usuario con sus planes. Sin botón de editar; en su lugar, "Seguir" (aún no funciona).
const UsuarioPage = async ({ params }: Props) => {
  const { id } = await params;
  const userId = Number(id);
  if (Number.isNaN(userId)) notFound();

  const perfil = await getPerfilPorId(userId);
  if (!perfil) notFound();

  const planes = await getPlanesCreadosPor(userId);
  const apuntados = await getPlanesApuntados();
  const apuntadosIds = new Set(apuntados.map((p) => p.id));
  const userCategorias = perfil.categorias ? perfil.categorias.split(",") : [];

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
          <div className="tooltip mt-4" data-tip="Próximamente">
            <button
              className="btn btn-accent btn-sm rounded-full"
              disabled
            >
              Seguir
            </button>
          </div>
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
            <FavoritoBtn plan_id={plan.id} es_favorito={plan.es_favorito ?? false} />
            {apuntadosIds.has(plan.id) ? (
              <span className="badge badge-success badge-sm badge-dash place-self-center">Apuntado</span>
            ) : (
              <JoinBtn plan_id={plan.id} />
            )}
          </PlanCard>
        ))}
      </div>
    </div>
  );
};

export default UsuarioPage;
