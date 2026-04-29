import AnularBtn from "@/app/components/features/planes/AnularBtn";
import JoinBtn from "@/app/components/features/planes/JoinBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import { getPlanes } from "@/app/services/planes";
import styles from "./page.module.css";

// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

const Planes = async () => {
  const planes = await getPlanes();

  return (
    
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      <section className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {planes.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <JoinBtn plan_id={plan.id} />
            </PlanCard>
          ))}
        </div>
      </section>

      <aside className={`w-87.5 hidden lg:block shrink-0`}>
        <div className="sticky top-24  rounded-sm border-2">
          <ul className="list shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 ">Tus próximos planes</li>
            {Array.from({ length: 4}, (_, i) => (
              <li key={i} className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                  />
                </div>
                <div className="list-col-grow">
                  <div>Dio Lupa</div>
                  <div className="text-xs font-semibold opacity-60">
                    Sabado 25 de Abril a las 10:00 en tal sitio bien largo
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Planes;
