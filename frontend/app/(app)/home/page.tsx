import AnularBtn from "@/app/components/features/planes/AnularBtn";
import CategoriaFiltro from "@/app/components/features/planes/CategoriaFiltro";
import JoinBtn from "@/app/components/features/planes/JoinBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import PlanesApuntadosList from "@/app/components/features/planes/PlanesApuntadosList";
import PageHeader from "@/app/components/ui/PageHeader";
import { getPlanes } from "@/app/services/planes";


// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

const Planes = async ({ searchParams }: Props) => {
  const { categoria } = await searchParams;
  const planes = await getPlanes(categoria);

  return (
    
    <div className="flex flex-col lg:flex-row  gap-4">
      <section className="flex-1 flex flex-col gap-9">
        <PageHeader
          title="¿Qué se cuece hoy?"
          subtitle="Apúntate al que te apetezca. O monta el tuyo."
        />
        <CategoriaFiltro />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {planes.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <JoinBtn plan_id={plan.id} />
            </PlanCard>
          ))}
        </div>
      </section>

      <aside className="w-87.5 hidden lg:block shrink-0 lg:self-start lg:sticky lg:top-24">
        <div className="rounded-md border-2 overflow-hidden shadow-md">
          <header className="px-4 py-3 bg-neutral text-[#E0604D]">
            <h3 className="font-(family-name:--font-bagel-fat-one) text-lg">
              Tus próximos planes
            </h3>
          </header>
          <PlanesApuntadosList />
        </div>
      </aside>
    </div>
  );
};

export default Planes;
