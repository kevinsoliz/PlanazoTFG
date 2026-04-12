import PlanCard from "@/app/components/features/Plan";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { getPlanes } from "@/app/services/planes.server";
import Link from "next/link";

// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

const Planes = async () => {
  const planes = await getPlanes();

  return (
    <section className="inset-shadow-sm flex-1 flex flex-col overflow-y-auto rounded-xl p-4">
      <article className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
        {planes.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </article>
    </section>
  );
};

export default Planes;
