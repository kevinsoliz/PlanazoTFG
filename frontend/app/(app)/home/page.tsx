import AnularBtn from "@/app/components/features/planes/AnularBtn";
import JoinBtn from "@/app/components/features/planes/JoinBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import PlanesApuntadosList from "@/app/components/features/planes/PlanesApuntadosList";
import PageHeader from "@/app/components/ui/PageHeader";
import { getPlanes } from "@/app/services/planes";
import styles from "./page.module.css";

// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

const Planes = async () => {
  const planes = await getPlanes();

  return (
    
    <div className="flex flex-col lg:flex-row  gap-4">
      <section className="flex-1 flex flex-col gap-9">
        <PageHeader
          title="¿Qué se cuece hoy?"
          subtitle="Descubre planes a los que apuntarte. Hay sitio para tu energía."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {planes.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <JoinBtn plan_id={plan.id} />
            </PlanCard>
          ))}
        </div>
      </section>

      <aside className="w-87.5 hidden lg:block shrink-0">
        <div className="sticky top-21  rounded-md border-2 overflow-hidden shadow-md">
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

export default Planes;
