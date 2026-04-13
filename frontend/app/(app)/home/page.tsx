import PlanCard from "@/app/components/features/PlanCard";
import { getPlanes } from "@/app/services/planes.server";


// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

const Planes = async () => {
  const planes = await getPlanes();

  return (
    <section className=" flex-1 flex flex-col overflow-y-auto rounded-xl pt-4">
      <article className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 ">
        {planes.map((plan) => (
          <PlanCard key={plan.id} plan={plan}>
            <button className="btn btn-primary btn-outline btn-sm">Unirme</button>
          </PlanCard>
        ))}
      </article>
    </section>
  );
};

export default Planes;
