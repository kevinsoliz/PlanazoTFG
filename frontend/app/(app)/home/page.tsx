import AnularBtn from "@/app/components/features/AnularBtn";
import JoinBtn from "@/app/components/features/JoinBtn";
import PlanCard from "@/app/components/features/PlanCard";
import { getPlanes } from "@/app/services/planes.server";
import styles from "./page.module.css";

// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

const Planes = async () => {
  const planes = await getPlanes();

  return (
    <div className="flex-1 w-full h-100 flex p-4 gap-4">
      <article className="flex-1 overflow-y-auto  rounded-sm bg-base-100 p-3  grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 ">
        {planes.map((plan) => (
          <PlanCard key={plan.id} plan={plan}>
            <JoinBtn plan_id={plan.id} />
          </PlanCard>
        ))}
      </article>

      {/* Esto es un div invisible que ocupa el mismo ancho que el aside */}
      {/* <div className="hidden lg:block w-200 shrink-0"></div> */}
      <aside className={`w-87.5 hidden lg:block overflow-y-auto  rounded-sm`}>
        <ul className="list bg-base-100 shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 ">Tus próximos planes</li>

          {Array.from({ length: 20 }, (_, i) => (
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
      </aside>
    </div>
  );
};

export default Planes;
