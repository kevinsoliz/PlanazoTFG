import PlanCard from "@/app/components/features/planes/PlanCard";
import PageHeader from "@/app/components/ui/PageHeader";
import { getPlanes } from "@/app/services/planes";

const PlanesPublic = async () => {
  const planes = await getPlanes();

  return (
    <main className="max-w-6xl mx-auto w-full px-4 py-9 flex flex-col gap-9">
      <PageHeader
        title="¿Qué se cuece hoy?"
        subtitle="Descubre planes que están pasando cerca de ti."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {planes.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </main>
  );
};

export default PlanesPublic;
