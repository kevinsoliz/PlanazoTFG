import AnularBtn from "@/app/components/features/AnularBtn";
import JoinBtn from "@/app/components/features/JoinBtn";
import PlanCard from "@/app/components/features/PlanCard";
import { getPlanes } from "@/app/services/planes.server";
import styles from "./page.module.css";

// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

const Planes = async () => {
  const planes = await getPlanes();

  return (
    <div className={`${styles.home}`}>
      <article className={`${styles.planesContainer}`}>
        {planes.map((plan) => (
          <PlanCard key={plan.id} plan={plan}>
            <JoinBtn plan_id={plan.id} />
          </PlanCard>
        ))}
      </article>

      {/* Esto es un div invisible que ocupa el mismo ancho que el aside */}
      {/* <div className="hidden lg:block w-200 shrink-0"></div> */}
      <aside className={`${styles.stack} w-87.5 hidden lg:block`}>
        <ul className="list bg-base-100 rounded-box shadow-md">
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
