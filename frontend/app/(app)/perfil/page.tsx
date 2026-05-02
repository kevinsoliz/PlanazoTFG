import Avatar from "@/app/components/ui/Avatar";
import DeleteBtn from "@/app/components/features/planes/DeleteBtn";
import EditBtn from "@/app/components/features/planes/EditBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import PlanesApuntadosList from "@/app/components/features/planes/PlanesApuntadosList";
import EditProfileBtn from "@/app/components/features/perfiles/EditProfileBtn";
import { CATEGORIAS } from "@/app/constants/categorias";
import { getPlanesCreados } from "@/app/services/planes";
import { getPerfil } from "@/app/services/perfiles";

const PerfilPage = async () => {
  const perfil = await getPerfil();
  const planesCreados = await getPlanesCreados();
  const userCategorias = perfil?.categorias
    ? perfil.categorias.split(",")
    : [];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <section className="flex-1 flex flex-col gap-9">
        {/* Hero del perfil donde en home va el PageHeader */}
        <section className="flex flex-row gap-6 p-6 border-2 rounded-md lg:sticky lg:top-24 z-10 backdrop-blur-md bg-base-100/40 shadow-md">
          <div className="flex flex-col items-center">
            <Avatar
              nombre={perfil?.nombre ?? ""}
              url={perfil?.avatar_url ?? null}
              size="lg"
            />
            <h2 className="font-bold text-xl">{perfil?.nombre}</h2>
            <p className="text-sm text-neutral/60">{`@${perfil?.username}`}</p>
            <div className="mt-auto">
              <EditProfileBtn perfil={perfil} />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="font-(family-name:--font-bagel-fat-one) text-2xl text-neutral">
              Sobre mí
            </h3>
            <p className="text-sm">{perfil?.descripcion}</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.filter((cat) =>
                userCategorias.includes(cat.name),
              ).map((cat) => (
                <span key={cat.name} className={`badge badge-sm ${cat.badge}`}>
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de planes creados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {planesCreados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <EditBtn plan={plan} />
              <DeleteBtn plan_id={plan.id} />
            </PlanCard>
          ))}
        </div>
      </section>

      {/* Aside — mismo bloque que en home */}
      <aside className="w-87.5 hidden lg:block shrink-0">
        <div className="sticky top-24 rounded-md border-2 overflow-hidden shadow-md">
          <header className="px-4 py-3 border-b-2">
            <h3 className="font-(family-name:--font-bagel-fat-one) text-lg text-neutral">
              Tus próximos planes
            </h3>
          </header>
          <PlanesApuntadosList />
        </div>
      </aside>
    </div>
  );
};

export default PerfilPage;
