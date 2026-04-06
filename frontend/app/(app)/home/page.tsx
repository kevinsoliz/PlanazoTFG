'use client'
import PlanCard from "@/app/components/features/Plan";
import planesService from "@/app/services/planes-service";
import type { Plan } from "@/app/types/plan";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const Planes = () => {
  const [planes, setPlanes] = useState<Plan[]>([]);

  useEffect(() => {
    planesService
      .getAll<{planes: Plan[]}>()
      .then((res) => setPlanes(res.data.planes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-5 px-8 flex flex-col gap-8">
      {/* Acciones */}
      <article className="flex justify-between gap-5">
        <label className="input rounded-full">
          <CiSearch className="text-neutral/40" />
          <input type="text" placeholder="Buscar" />
        </label>

        <div className="flex items-center gap-6">
          <FaBell size={20} className="text-primary cursor-pointer" />
          <FaMessage size={20} className="text-primary cursor-pointer" />
          <button className="btn btn-primary btn-outline">Crear plan</button>
        </div>
      </article>

      {/* Planes */}
      <section className="inset-shadow-sm flex-1 flex flex-col overflow-y-auto rounded-xl p-4">
        <article className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          
            {
            
            planes.map(plan => (

              <PlanCard key={plan.id} plan={plan}/>

            ))}
              
          
        </article>
      </section>
    </section>
  );
};

export default Planes;
